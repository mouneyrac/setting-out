#!/usr/bin/env node
/**
 * Writes an MDX stub for every lesson in curriculum.seed.mjs that does not
 * already have a file. Never overwrites — once a lesson has real prose, this
 * script leaves it alone.
 *
 *   node scripts/scaffold-curriculum.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { flatLessons } from './curriculum.seed.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lessonsDir = join(root, 'src', 'content', 'lessons');

const exists = async (p) =>
  access(p).then(
    () => true,
    () => false,
  );

/** YAML-quote a string safely. */
const q = (s) => `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

function frontmatter(lesson) {
  const lines = [
    '---',
    `title: ${q(lesson.title)}`,
    `phase: ${lesson.phase}`,
    `order: ${lesson.order}`,
    `summary: ${q(lesson.summary)}`,
    `timeEstimate: ${q(lesson.time)}`,
    `difficulty: ${lesson.difficulty}`,
    'status: stub',
  ];

  if (lesson.series) lines.push(`series: ${q(lesson.series)}`);
  if (lesson.licensedTrade) lines.push(`licensedTrade: ${q(lesson.licensedTrade)}`);

  if (lesson.deliverable) {
    lines.push('deliverable:');
    lines.push(`  title: ${q(lesson.deliverable.title)}`);
    lines.push(`  prompt: ${q(lesson.deliverable.prompt)}`);
    lines.push(`  workbookKey: ${q(lesson.deliverable.workbookKey)}`);
  }

  if (lesson.checklist?.length) {
    lines.push('checklist:');
    for (const item of lesson.checklist) lines.push(`  - ${q(item)}`);
  }

  lines.push('resources: []');
  lines.push('videos: []');
  lines.push('---');
  return lines.join('\n');
}

const body = `
This lesson has not been written yet.

The outline, the practical task and the checklist below are final — they are
what the lesson will teach. What is still missing is the written explanation
and the curated links, videos and courses that go with it.
`;

let created = 0;
let skipped = 0;

for (const lesson of flatLessons()) {
  const file = join(lessonsDir, lesson.dir, `${String(lesson.order).padStart(2, '0')}-${lesson.slug}.mdx`);
  if (await exists(file)) {
    skipped++;
    continue;
  }
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `${frontmatter(lesson)}\n${body}`, 'utf8');
  created++;
}

console.log(`Curriculum scaffold: ${created} created, ${skipped} already existed.`);
