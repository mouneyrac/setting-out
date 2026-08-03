#!/usr/bin/env node
/**
 * Fails the build if something that must be in the deploy is missing.
 *
 * This exists because a missing Pagefind bundle shipped to production once and
 * nothing complained — the site simply had a search box that could never return
 * a result. Silent absence is the failure mode worth guarding against.
 */
import { access, readdir } from 'node:fs/promises';
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

// The search index is useless if it indexed nothing.
try {
  const fragments = await readdir(join(client, 'pagefind', 'fragment'));
  if (fragments.length < 10) {
    problems.push(`pagefind indexed only ${fragments.length} fragments — expected the whole course`);
  }
} catch {
  problems.push('missing dist/client/pagefind/fragment — the search index did not build');
}

if (problems.length) {
  console.error('\nBuild verification FAILED:');
  for (const problem of problems) console.error(`  ✗ ${problem}`);
  console.error('');
  process.exit(1);
}

console.log('Build verification passed.');
