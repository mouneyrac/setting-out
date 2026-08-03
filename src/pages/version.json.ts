import type { APIRoute } from 'astro';
import { BUILD_ID } from '../lib/build';

/**
 * Prerendered, so this file's contents are fixed at build time. The client
 * fetches it with `cache: 'no-store'` when the tab becomes visible again; a
 * different build id means a deploy happened while the app was backgrounded.
 */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ build: BUILD_ID }), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store, must-revalidate',
    },
  });
