import { getCollection, type CollectionEntry } from 'astro:content';
import { phases, getPhase, type Phase } from '../data/phases';

export type Lesson = CollectionEntry<'lessons'>;

/**
 * Content ids look like "03-site-analysis/04-soil-testing" — the numeric
 * prefixes keep the files in build order on disk. URLs drop them.
 */
export function lessonSlug(lesson: Lesson): string {
  const file = lesson.id.split('/').pop() ?? lesson.id;
  return file.replace(/^\d+-/, '');
}

export function lessonUrl(lesson: Lesson): string {
  return `/curriculum/${getPhase(lesson.data.phase).slug}/${lessonSlug(lesson)}/`;
}

export function phaseUrl(phase: Phase): string {
  return `/curriculum/${phase.slug}/`;
}

/** All lessons, sorted by phase then position within the phase. */
export async function allLessons(): Promise<Lesson[]> {
  const lessons = await getCollection('lessons');
  return lessons.sort((a, b) => a.data.phase - b.data.phase || a.data.order - b.data.order);
}

export interface PhaseGroup {
  phase: Phase;
  lessons: Lesson[];
}

export async function lessonsByPhase(): Promise<PhaseGroup[]> {
  const lessons = await allLessons();
  return phases.map((phase) => ({
    phase,
    lessons: lessons.filter((l) => l.data.phase === phase.number),
  }));
}

/** Previous and next across the whole course, so the sequence never breaks. */
export function neighbours(lessons: Lesson[], current: Lesson) {
  const i = lessons.findIndex((l) => l.id === current.id);
  return {
    prev: i > 0 ? lessons[i - 1] : undefined,
    next: i >= 0 && i < lessons.length - 1 ? lessons[i + 1] : undefined,
  };
}

/**
 * Rough total time for a phase. Estimates are strings like "90 min", "2 h" or
 * "3–6 h"; this parses the low end into hours and is deliberately approximate.
 */
export function estimateHours(lessons: Lesson[]): number {
  let hours = 0;
  for (const lesson of lessons) {
    const raw = lesson.data.timeEstimate;
    const num = Number.parseFloat(raw.replace(',', '.'));
    if (Number.isNaN(num)) continue;
    hours += /min/i.test(raw) ? num / 60 : num;
  }
  return Math.round(hours);
}

export const difficultyLabel: Record<Lesson['data']['difficulty'], string> = {
  foundation: 'Foundation',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const statusLabel: Record<Lesson['data']['status'], string> = {
  stub: 'Not yet written',
  draft: 'Draft',
  complete: 'Written',
};
