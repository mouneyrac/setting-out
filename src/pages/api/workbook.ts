import type { APIRoute } from 'astro';
import { getDb, getUser, json, newId, readJson, unauthorised } from '../../lib/server';
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

  const body = await readJson<Body>(request);
  const workbookKey = body?.workbookKey?.trim();
  const lessonId = body?.lessonId?.trim() ?? '';
  if (!workbookKey) return json({ error: 'workbookKey is required' }, 400);

  const content = (body?.content ?? '').slice(0, MAX_LENGTH);
  const now = new Date();

  await getDb()
    .insert(workbookEntry)
    .values({ id: newId(), userId: user.id, workbookKey, lessonId, content, updatedAt: now })
    .onConflictDoUpdate({
      target: [workbookEntry.userId, workbookEntry.workbookKey],
      set: { content, lessonId, updatedAt: now },
    });

  return json({ workbookKey, saved: true, updatedAt: now.toISOString() });
};
