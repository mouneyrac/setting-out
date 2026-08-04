import type { APIRoute } from 'astro';
import { allLessons, lessonUrl } from '../lib/curriculum';
import { getPhase } from '../data/phases';

/**
 * A tiny search index for lessons.
 *
 * Lesson pages render on demand now that they are behind an account, so they
 * are not in the Pagefind index, which is built from static HTML. Their titles
 * and summaries are public anyway — they are on the course map and in the
 * public repository — so they are published here and the search dialog merges
 * them with Pagefind's results.
 *
 * Titles and summaries only. Never lesson bodies: those are the part behind the
 * account, and shipping them here would quietly undo the gate.
 */
/** One entry, keys kept to a letter each because this ships on every search. */
export interface LessonIndexEntry {
  /** title */ t: string;
  /** summary */ s: string;
  /** url */ u: string;
  /** phase title */ p: string;
}

export const GET: APIRoute = async () => {
  const lessons = await allLessons();

  const index: LessonIndexEntry[] = lessons.map((lesson) => ({
    t: lesson.data.title,
    s: lesson.data.summary,
    u: lessonUrl(lesson),
    p: getPhase(lesson.data.phase).title,
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=3600',
    },
  });
};
