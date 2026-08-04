import type { MiddlewareHandler } from 'astro';
import { getDb, json } from './lib/server';
import { clientIp, hitRateLimit, pruneRateLimits } from './lib/limits';

/**
 * Rate limiting for the routes that have no user yet.
 *
 * Everything else is throttled per account inside its own endpoint, but sign-up
 * is the one that has to be limited per IP — an unlimited supply of free,
 * unverified accounts is what turns every per-account quota into no quota at
 * all. Password reset is included for the same reason: it sends email.
 *
 * Deliberately narrow. Middleware runs on every on-demand request, so anything
 * done here is paid for on every lesson view.
 */
const GUARDED = [/^\/api\/auth\/sign-up\b/, /^\/api\/auth\/forget-password\b/];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const { pathname } = context.url;

  if (context.request.method !== 'POST' || !GUARDED.some((r) => r.test(pathname))) {
    return next();
  }

  let db: ReturnType<typeof getDb>;
  try {
    db = getDb();
  } catch {
    // No database binding at all — nothing to limit against. Fail open rather
    // than locking everyone out, and rely on the per-account quotas behind this.
    return next();
  }

  let rate;
  try {
    rate = await hitRateLimit(db, 'signup', clientIp(context.request));
  } catch {
    return next();
  }

  if (!rate.ok) {
    return json(
      {
        error: 'Too many attempts from this address. Try again later.',
        retryAfter: rate.retryAfter,
      },
      429,
    );
  }

  // Opportunistic cleanup, in its own guard.
  //
  // This used to sit inside the same try as the limit check, and it threw —
  // `context.locals` is not always populated in middleware — which fell into
  // the shared catch and silently let a request through *after* it had already
  // been rate limited. A cleanup failure must never decide an access question.
  try {
    if (Math.floor(Date.now() / 1000) % 50 === 0) {
      await pruneRateLimits(db);
    }
  } catch {
    /* Housekeeping only. */
  }

  return next();
};
