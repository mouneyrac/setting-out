#!/usr/bin/env node
/**
 * Fails the build if something that must be in the deploy is missing.
 *
 * This exists because a missing Pagefind bundle shipped to production once and
 * nothing complained — the site simply had a search box that could never return
 * a result. Silent absence is the failure mode worth guarding against.
 */
import { access, readdir, readFile } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const client = join(root, 'dist', 'client');

const REQUIRED_FILES = [
  'index.html',
  'sw.js',
  'version.json',
  'manifest.webmanifest',
  'icon-192.png',
  'icon-512.png',
  'apple-touch-icon.png',
  'offline/index.html',
  'curriculum/index.html',
  'pagefind/pagefind.js',
];

const REQUIRED_DIRS = ['pagefind', 'curriculum', '_astro'];

const problems = [];

for (const file of REQUIRED_FILES) {
  try {
    await access(join(client, file));
  } catch {
    problems.push(`missing file: dist/client/${file}`);
  }
}

for (const dir of REQUIRED_DIRS) {
  try {
    const entries = await readdir(join(client, dir));
    if (entries.length === 0) problems.push(`empty directory: dist/client/${dir}`);
  } catch {
    problems.push(`missing directory: dist/client/${dir}`);
  }
}

// Pagefind now only covers the public pages — lesson bodies are behind an
// account and render on demand, so they cannot be indexed from static HTML.
// Lessons are searchable through /lessons-index.json instead, and both halves
// have to be present or search silently half-works.
try {
  const fragments = await readdir(join(client, 'pagefind', 'fragment'));
  if (fragments.length < 3) {
    problems.push(
      `pagefind indexed only ${fragments.length} fragments — expected the public pages`,
    );
  }
} catch {
  problems.push('missing dist/client/pagefind/fragment — the search index did not build');
}

try {
  const raw = await readFile(join(client, 'lessons-index.json'), 'utf8');
  const index = JSON.parse(raw);
  if (!Array.isArray(index) || index.length < 80) {
    problems.push(`lessons-index.json holds ${index?.length ?? 0} lessons — expected all 91`);
  }
  if (index.some((l) => 'body' in l || 'content' in l)) {
    problems.push('lessons-index.json contains lesson bodies — that would undo the account gate');
  }
} catch {
  problems.push('missing dist/client/lessons-index.json — lessons would be unsearchable');
}

if (problems.length) {
  console.error('\nBuild verification FAILED:');
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error('');
  process.exit(1);
}

console.log('Build verification passed.');
