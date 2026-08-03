import type { APIRoute } from 'astro';
import { BUILD_ID } from '../lib/build';

/**
 * The service worker, served from the root so its scope covers the whole site.
 *
 * Strategy, and the reasoning behind each part:
 *
 * - **Never touch /api/ or /my/.** Those carry session cookies and personal
 *   data. Caching them would be a privacy bug, and serving a stale one would be
 *   worse than being offline.
 * - **Content-hashed assets are cache-first.** /_astro/* filenames change when
 *   their contents change, so a cached copy is never wrong.
 * - **Pages are network-first.** A deploy should land as soon as you have
 *   signal. The cache is only a fallback, which is what makes the course
 *   readable standing in a garden with two bars.
 * - **One cache per build.** Old caches are deleted on activate, so a deploy
 *   cannot leave a mix of old and new pages behind.
 */
const source = `
const BUILD = ${JSON.stringify(BUILD_ID)};
const PAGES = 'pages-' + BUILD;
const ASSETS = 'assets-' + BUILD;
const OFFLINE_URL = '/offline/';

// Enough to open the app cold with no signal.
const PRECACHE = ['/', '/curriculum/', OFFLINE_URL, '/manifest.webmanifest', '/icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES)
      .then((cache) => cache.addAll(PRECACHE))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== PAGES && k !== ASSETS).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

const isAsset = (url) =>
  url.pathname.startsWith('/_astro/') ||
  url.pathname.startsWith('/pagefind/') ||
  /\\.(?:woff2?|png|jpg|jpeg|svg|webp|avif|ico)$/.test(url.pathname);

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Session and personal data: straight to the network, never stored.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/my/')) return;
  if (url.pathname === '/version.json') return;

  if (isAsset(url)) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(ASSETS).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
    return;
  }

  // Pages: network first, cache as fallback, offline page as last resort.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(PAGES).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then((hit) => {
          if (hit) return hit;
          if (request.mode === 'navigate') return caches.match(OFFLINE_URL);
          return new Response('', { status: 504, statusText: 'Offline' });
        }),
      ),
  );
});

// Lets the page ask for an immediate takeover after it has told the user.
self.addEventListener('message', (event) => {
  if (event.data === 'skip-waiting') self.skipWaiting();
});
`;

export const GET: APIRoute = () =>
  new Response(source, {
    headers: {
      'content-type': 'text/javascript; charset=utf-8',
      // The worker script itself must never be served stale, or a deploy can
      // never replace it.
      'cache-control': 'no-cache, must-revalidate',
      'service-worker-allowed': '/',
    },
  });
