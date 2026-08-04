import { allLessons } from './curriculum';

/**
 * Which workbook keys a client is allowed to write.
 *
 * This is the fix for the worst hole in the API. `/api/workbook` and
 * `/api/upload` used to accept any string as a key, which meant one account
 * could invent unlimited keys — and since the upload cap was *per key*, twelve
 * files of ten megabytes each multiplied by unlimited keys. Around eighty-five
 * invented keys exhausted the 10 GB R2 free tier, after which it bills.
 *
 * The legal set is derived from the content itself, so it cannot drift: every
 * `<workbookKey>.<question.key>` a deliverable declares, plus one checklist key
 * per item per lesson. Adding a question to a lesson widens the set
 * automatically; nothing else ever does.
 */

/** `check:<lessonId>#<index>` — the shape of a checklist tick. */
export const CHECK_KEY = /^check:[\w-]+\/[\w-]+#\d{1,3}$/;

let cache: Set<string> | null = null;

/** Every key the content legitimately defines. Built once per worker instance. */
export async function legalKeys(): Promise<Set<string>> {
  if (cache) return cache;

  const keys = new Set<string>();
  for (const lesson of await allLessons()) {
    const d = lesson.data.deliverable;
    if (d) {
      for (const q of d.questions ?? []) keys.add(`${d.workbookKey}.${q.key}`);
      // The pre-questions shape, so anything already written still resolves.
      keys.add(d.workbookKey);
    }
    lesson.data.checklist.forEach((_, i) => keys.add(`check:${lesson.id}#${i}`));
  }

  cache = keys;
  return keys;
}

export type KeyKind = 'answer' | 'check';

export interface KeyCheck {
  ok: boolean;
  kind?: KeyKind;
  /** Safe to show a user — never echo their input back into the page. */
  error?: string;
}

/**
 * Is this key one the course actually defines?
 *
 * Deliberately strict and allow-list based. A key that is merely well-formed is
 * not enough: it has to correspond to a real question or checklist item.
 */
export async function checkKey(raw: unknown): Promise<KeyCheck> {
  if (typeof raw !== 'string') return { ok: false, error: 'workbookKey must be a string' };

  const key = raw.trim();
  if (!key) return { ok: false, error: 'workbookKey is required' };
  if (key.length > 200) return { ok: false, error: 'workbookKey is too long' };

  const keys = await legalKeys();
  if (!keys.has(key)) {
    return { ok: false, error: 'That is not a key this course defines' };
  }

  return { ok: true, kind: CHECK_KEY.test(key) ? 'check' : 'answer' };
}
