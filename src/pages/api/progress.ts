import type { APIRoute } from 'astro';
import { and, eq } from 'drizzle-orm';
import { getDb, getUser, json, newId, readJson, unauthorised } from '../../lib/server';
import { lessonProgress } from '../../db/schema';

export const prerender = false;

interface Body {
  lessonId?: string;
  done?: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return unauthorised();

  const body = await readJson<Body>(request);
  const lessonId = body?.lessonId?.trim();
  if (!lessonId) return json({ error: 'lessonId is required' }, 400);

  const db = getDb();
  const now = new Date();

  if (body?.done === false) {
    await db
      .delete(lessonProgress)
      .where(and(eq(lessonProgress.userId, user.id), eq(lessonProgress.lessonId, lessonId)));
    return json({ lessonId, done: false });
  }

  await db
    .insert(lessonProgress)
    .values({
      id: newId(),
      userId: user.id,
      lessonId,
      status: 'done',
      completedAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [lessonProgress.userId, lessonProgress.lessonId],
      set: { status: 'done', completedAt: now, updatedAt: now },
    });

  return json({ lessonId, done: true });
};
