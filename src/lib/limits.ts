import { and, eq, gte, sql } from 'drizzle-orm';
import { workbookEntry, rateLimit } from '../db/schema';
import type { getDb } from './server';

type Db = ReturnType<typeof getDb>;

/**
 * Quotas and rate limits.
 *
 * Set generously on purpose. One person doing one garden produces about 170
 * answers and a few dozen photographs; these ceilings are an order of magnitude
 * above that. They exist to stop a script, not to police a reader — so when
 * someone hits one, the answer is a clear error rather than a silent truncation.
 */
export const QUOTA = {
  /** Rows in workbook_entry. ~170 answers + ~370 checklist ticks ≈ 540. */
  entries: 3_000,
  /** Total characters stored across all answers. */
  bytes: 2_000_000,
  /** Uploaded files, across every question. */
  files: 400,
  /** Total uploaded bytes. 10 GB is the whole free tier, shared by everyone. */
  fileBytes: 500 * 1024 * 1024,
} as const;

export interface Usage {
  entries: number;
  bytes: number;
}

export async function usageFor(db: Db, userId: string): Promise<Usage> {
  const [row] = await db
    .select({
      entries: sql<number>`count(*)`,
      bytes: sql<number>`coalesce(sum(length(${workbookEntry.content})), 0)`,
    })
    .from(workbookEntry)
    .where(eq(workbookEntry.userId, userId));

  return { entries: Number(row?.entries ?? 0), bytes: Number(row?.bytes ?? 0) };
}

/**
 * Rate limiting on Workers is awkward: there is no shared memory, so the
 * counter lives in D1. A coarse fixed window is used rather than a sliding one —
 * correctness of the *limit* matters here, precision of the window does not, and
 * a fixed window is one row and one statement.
 */
export const RATE = {
  /** Account creation, per IP. The expensive one to leave open. */
  signup: { limit: 5, windowSeconds: 3600 },
  /** Uploads, per user. */
  upload: { limit: 60, windowSeconds: 3600 },
  /**
   * Workbook writes, per user. Autosave fires roughly once per 700 ms of
   * typing, so this has to be loose enough that real writing is never blocked.
   */
  write: { limit: 600, windowSeconds: 600 },
} as const;

export interface RateResult {
  ok: boolean;
  remaining: number;
  retryAfter: number;
}

/**
 * Count one request against a bucket.
 *
 * `subject` is a user id where we have one and an IP address where we do not —
 * sign-up has no user yet, which is exactly the case that needs protecting.
 */
export async function hitRateLimit(
  db: Db,
  bucket: keyof typeof RATE,
  subject: string,
): Promise<RateResult> {
  const { limit, windowSeconds } = RATE[bucket];
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % windowSeconds);
  const key = `${bucket}:${subject}`;

  await db
    .insert(rateLimit)
    .values({ key, windowStart, count: 1 })
    .onConflictDoUpdate({
      target: [rateLimit.key, rateLimit.windowStart],
      set: { count: sql`${rateLimit.count} + 1` },
    });

  const [row] = await db
    .select({ count: rateLimit.count })
    .from(rateLimit)
    .where(and(eq(rateLimit.key, key), eq(rateLimit.windowStart, windowStart)))
    .limit(1);

  const count = Number(row?.count ?? 1);
  return {
    ok: count <= limit,
    remaining: Math.max(0, limit - count),
    retryAfter: windowStart + windowSeconds - now,
  };
}

/** Old windows are dead weight; drop them opportunistically. */
export async function pruneRateLimits(db: Db): Promise<void> {
  const cutoff = Math.floor(Date.now() / 1000) - 24 * 3600;
  await db.delete(rateLimit).where(gte(sql`${cutoff}`, rateLimit.windowStart));
}

/** The client's IP, as Cloudflare reports it. */
export const clientIp = (request: Request) =>
  request.headers.get('cf-connecting-ip') ?? request.headers.get('x-forwarded-for') ?? 'unknown';
