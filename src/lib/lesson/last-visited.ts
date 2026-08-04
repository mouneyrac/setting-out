/**
 * Where the reader got to.
 *
 * Kept in localStorage rather than the account, so the home page can offer
 * "carry on from here" to someone who has not signed in yet — which is most
 * people on their second visit.
 */

const KEY = 'last-lesson';

export interface LastLesson {
  href: string;
  title: string;
  id: string;
}

export function rememberLesson(lesson: LastLesson): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(lesson));
  } catch {
    /* Storage blocked or full. Nothing here depends on it. */
  }
}

export function lastLesson(): LastLesson | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LastLesson>;
    // Stored by an older version, or hand-edited: treat anything without a
    // usable href as absent rather than rendering a broken link.
    if (typeof parsed?.href !== 'string' || !parsed.href.startsWith('/')) return null;
    return { href: parsed.href, title: parsed.title ?? '', id: parsed.id ?? '' };
  } catch {
    return null;
  }
}
