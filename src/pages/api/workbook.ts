import type { APIRoute } from 'astro';
import { and, eq } from 'drizzle-orm';
import { getDb, getUser, json, newId, readJson, unauthorised } from '../../lib/server';
import { checkKey } from '../../lib/workbook-keys';
import { QUOTA, RATE, hitRateLimit, usageFor } from '../../lib/limits';
import { workbookEntry } from '../../db/schema';

export const prerender = false;

interface Body {
  workbookKey?: string;
  lessonId?: string;
  content?: string;
}

/** Generous, but stops a runaway client filling D1 with one entry. */
const MAX_LENGTH = 40_000;

export const POST: APIRoute = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return unauthorised();

  const db = getDb();

  // Loose enough that ordinary typing is never throttled — autosave fires about
  // once per 700 ms — but tight enough to stop a script.
  const rate = await hitRateLimit(db, 'write', user.id);
  if (!rate.ok) {
    return json(
      { error: 'Too many writes in a short time. Try again shortly.', retryAfter: rate.retryAfter },
      429,
    );
  }

  const body = await readJson<Body>(request);

  // Allow-list, not just a shape check: the key has to be one the course
  // actually defines, or one account could invent unlimited keys and — because
  // upload limits were per key — unlimited storage with them.
  const key = await checkKey(body?.workbookKey);
  if (!key.ok) return json({ error: key.error }, 400);

  const workbookKey = body!.workbookKey!.trim();
  const lessonId = body?.lessonId?.trim() ?? '';
  const content = (body?.content ?? '').slice(0, MAX_LENGTH);

  // Only bill against the quota when adding something. Clearing an answer, or
  // editing one that already exists, must always be possible.
  const existing = await db
    .select({ id: workbookEntry.id })
    .from(workbookEntry)
    .where(and(eq(workbookEntry.userId, user.id), eq(workbookEntry.workbookKey, workbookKey)))
    .limit(1);

  if (!existing.length && content) {
    const usage = await usageFor(db, user.id);
    if (usage.entries >= QUOTA.entries) {
      return json({ error: 'Your workbook has reached its entry limit.' }, 507);
    }
    if (usage.bytes + content.length > QUOTA.bytes) {
      return json({ error: 'Your workbook has reached its size limit.' }, 507);
    }
  }

  const now = new Date();
  await db
    .insert(workbookEntry)
    .values({ id: newId(), userId: user.id, workbookKey, lessonId, content, updatedAt: now })
    .onConflictDoUpdate({
      target: [workbookEntry.userId, workbookEntry.workbookKey],
      set: { content, lessonId, updatedAt: now },
    });

  return json({ workbookKey, saved: true, updatedAt: now.toISOString() });
};

export const limits = { MAX_LENGTH, RATE };
