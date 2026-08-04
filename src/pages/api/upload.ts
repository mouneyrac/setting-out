import type { APIRoute } from 'astro';
import { and, eq } from 'drizzle-orm';
import { bindings, getDb, getUser, json, newId, unauthorised } from '../../lib/server';
import { checkKey } from '../../lib/workbook-keys';
import { QUOTA, hitRateLimit } from '../../lib/limits';
import { workbookEntry } from '../../db/schema';

export const prerender = false;

/**
 * Drawings and photos for a deliverable.
 *
 * Files live in R2 under `<userId>/<workbookKey>/<id>-<name>`, and the workbook
 * entry for that question holds a JSON array of their metadata. That keeps the
 * one key/value store as the single index of everything a reader has produced —
 * no second table, and the export can list files alongside written answers.
 *
 * The limits below exist because the free tier is 10 GB shared across everyone.
 */
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 12; // per question

const ALLOWED = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/heic', 'heic'],
  ['image/heif', 'heif'],
  ['application/pdf', 'pdf'],
]);

/** Strips anything that could confuse a path or a Content-Disposition header. */
const safeName = (name: string) =>
  name
    .replace(/[^\w.\- ]+/g, '')
    .replace(/\s+/g, '-')
    .slice(-80) || 'file';

export interface StoredFile {
  key: string;
  name: string;
  size: number;
  type: string;
  at: string;
}

export const POST: APIRoute = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return unauthorised();

  const env = bindings() as unknown as { FILES?: R2Bucket };
  if (!env.FILES) return json({ error: 'File storage is not configured' }, 503);

  const form = await request.formData().catch(() => null);
  if (!form) return json({ error: 'Expected multipart form data' }, 400);

  const db = getDb();

  const rate = await hitRateLimit(db, 'upload', user.id);
  if (!rate.ok) {
    return json(
      { error: 'Too many uploads in a short time. Try again later.', retryAfter: rate.retryAfter },
      429,
    );
  }

  const file = form.get('file');
  const workbookKey = String(form.get('workbookKey') ?? '').trim();
  const lessonId = String(form.get('lessonId') ?? '').trim();

  if (!(file instanceof File)) return json({ error: 'No file supplied' }, 400);

  // Without this the per-question cap meant nothing: keys were unbounded, so
  // twelve files per key multiplied without limit.
  const keyCheck = await checkKey(workbookKey);
  if (!keyCheck.ok) return json({ error: keyCheck.error }, 400);
  if (file.size === 0) return json({ error: 'That file is empty' }, 400);
  if (file.size > MAX_BYTES) {
    return json({ error: `Files are limited to ${MAX_BYTES / 1024 / 1024} MB` }, 413);
  }
  if (!ALLOWED.has(file.type)) {
    return json({ error: 'Images and PDFs only' }, 415);
  }

  // Read the existing list first — the cap is per question, not per upload.
  const existing = await db
    .select({ content: workbookEntry.content })
    .from(workbookEntry)
    .where(and(eq(workbookEntry.userId, user.id), eq(workbookEntry.workbookKey, workbookKey)))
    .limit(1);

  let files: StoredFile[] = [];
  try {
    const parsed = JSON.parse(existing[0]?.content ?? '[]');
    if (Array.isArray(parsed)) files = parsed;
  } catch {
    /* Not a file list yet. Start one. */
  }

  if (files.length >= MAX_FILES) {
    return json({ error: `That question already holds ${MAX_FILES} files` }, 409);
  }

  // And a ceiling across the whole account, because the free R2 tier is shared.
  const all = await db
    .select({ content: workbookEntry.content })
    .from(workbookEntry)
    .where(eq(workbookEntry.userId, user.id));

  let totalFiles = 0;
  let totalBytes = 0;
  for (const row of all) {
    if (!row.content.startsWith('[')) continue;
    try {
      for (const f of JSON.parse(row.content)) {
        if (f && typeof f.key === 'string' && typeof f.size === 'number') {
          totalFiles++;
          totalBytes += f.size;
        }
      }
    } catch {
      /* Not a file list. */
    }
  }

  if (totalFiles >= QUOTA.files) {
    return json({ error: 'You have reached the total file limit for an account.' }, 507);
  }
  if (totalBytes + file.size > QUOTA.fileBytes) {
    return json({ error: 'You have reached the total storage limit for an account.' }, 507);
  }

  const key = `${user.id}/${workbookKey}/${newId()}-${safeName(file.name)}`;
  await env.FILES.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
    // So a leaked key cannot be traced back to anything but this user's own id.
    customMetadata: { userId: user.id, workbookKey },
  });

  const record: StoredFile = {
    key,
    name: safeName(file.name),
    size: file.size,
    type: file.type,
    at: new Date().toISOString(),
  };
  files.push(record);

  const now = new Date();
  await db
    .insert(workbookEntry)
    .values({
      id: newId(),
      userId: user.id,
      workbookKey,
      lessonId,
      content: JSON.stringify(files),
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: [workbookEntry.userId, workbookEntry.workbookKey],
      set: { content: JSON.stringify(files), lessonId, updatedAt: now },
    });

  return json({ file: record, files });
};

/** Remove one file, by key. */
export const DELETE: APIRoute = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return unauthorised();

  const env = bindings() as unknown as { FILES?: R2Bucket };
  if (!env.FILES) return json({ error: 'File storage is not configured' }, 503);

  const body = (await request.json().catch(() => null)) as {
    key?: string;
    workbookKey?: string;
  } | null;
  const key = body?.key;
  const workbookKey = body?.workbookKey;
  if (!key || !workbookKey) return json({ error: 'key and workbookKey are required' }, 400);

  // Ownership is in the path, so this cannot delete someone else's file.
  if (!key.startsWith(`${user.id}/`)) return json({ error: 'Not yours' }, 403);

  await env.FILES.delete(key);

  const db = getDb();
  const existing = await db
    .select({ content: workbookEntry.content })
    .from(workbookEntry)
    .where(and(eq(workbookEntry.userId, user.id), eq(workbookEntry.workbookKey, workbookKey)))
    .limit(1);

  let files: StoredFile[];
  try {
    files = JSON.parse(existing[0]?.content ?? '[]');
  } catch {
    files = [];
  }
  files = files.filter((f) => f.key !== key);

  await db
    .update(workbookEntry)
    .set({ content: JSON.stringify(files), updatedAt: new Date() })
    .where(and(eq(workbookEntry.userId, user.id), eq(workbookEntry.workbookKey, workbookKey)));

  return json({ files });
};
