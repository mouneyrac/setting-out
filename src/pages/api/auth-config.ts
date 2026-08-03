import type { APIRoute } from 'astro';
import { bindings, json } from '../../lib/server';
import { canSendEmail } from '../../lib/email';

export const prerender = false;

/**
 * What the auth UI is allowed to offer.
 *
 * The sign-in and forgot-password pages are prerendered, so they cannot know at
 * build time whether a mail provider is configured. They ask here instead —
 * which means the reset link is only shown when a reset email can actually be
 * sent, rather than leading people into a dead end.
 */
export const GET: APIRoute = () => {
  const env = bindings();
  return json({
    passwordReset: canSendEmail(env),
    google: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
  });
};
