import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { getDb, getUser, json } from '../../lib/server';
import { lessonProgress, propertyProfile, workbookEntry } from '../../db/schema';

export const prerender = false;

/**
 * Everything a static page needs to personalise itself after load: who you are,
 * which lessons you have ticked off, and which workbook entries exist.
 *
 * Lesson pages are prerendered for speed, so they fetch this once on load and
 * fill in the interactive bits client-side.
 */
export const GET: APIRoute = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return json({ signedIn: false });

  const db = getDb();

  const [progress, entries, profile] = await Promise.all([
    db
      .select({ lessonId: lessonProgress.lessonId, status: lessonProgress.status })
      .from(lessonProgress)
      .where(eq(lessonProgress.userId, user.id)),
    db
      .select({ workbookKey: workbookEntry.workbookKey, content: workbookEntry.content })
      .from(workbookEntry)
      .where(eq(workbookEntry.userId, user.id)),
    db.select().from(propertyProfile).where(eq(propertyProfile.userId, user.id)).limit(1),
  ]);

  return json({
    signedIn: true,
    user: { id: user.id, name: user.name, email: user.email },
    progress: Object.fromEntries(progress.map((p) => [p.lessonId, p.status])),
    workbook: Object.fromEntries(entries.map((e) => [e.workbookKey, e.content])),
    property: profile[0] ?? null,
  });
};
