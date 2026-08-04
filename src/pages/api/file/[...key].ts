import type { APIRoute } from 'astro';
import { bindings, getUser } from '../../../lib/server';

export const prerender = false;

/**
 * Serves an uploaded drawing or photo.
 *
 * R2 keys are prefixed with the owner's user id, so authorisation is a string
 * comparison rather than a database lookup — and there is no way to construct a
 * key for someone else's file that this check will accept.
 */
export const GET: APIRoute = async ({ request, params }) => {
  const user = await getUser(request);
  if (!user) return new Response('Not signed in', { status: 401 });

  const key = params.key ?? '';
  if (!key.startsWith(`${user.id}/`)) return new Response('Not found', { status: 404 });

  const env = bindings() as unknown as { FILES?: R2Bucket };
  const object = await env.FILES?.get(key);
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  // Private to this reader, and never cached by a shared cache.
  headers.set('cache-control', 'private, max-age=3600');
  headers.set('x-content-type-options', 'nosniff');
  // A PDF or image should display, but never execute in the page's origin.
  headers.set('content-security-policy', "default-src 'none'; sandbox");

  return new Response(object.body, { headers });
};
