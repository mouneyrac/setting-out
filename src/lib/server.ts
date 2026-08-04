import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import { schema } from '../db/schema';
import { createAuth } from './auth';
import type { MailEnv } from './email';

/**
 * Cloudflare bindings. `env` is only populated inside a request, which is why
 * everything here is a function rather than a module-level constant.
 */
type Bindings = MailEnv & {
  DB: D1Database;
  BETTER_AUTH_SECRET?: string;
  BETTER_AUTH_URL?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
};

export const bindings = () => env as unknown as Bindings;

export const getDb = () => drizzle(bindings().DB, { schema });

export const getAuth = (request: Request) => createAuth(bindings(), new URL(request.url));

/** The signed-in user, or null. Never throws. */
export async function getUser(request: Request) {
  try {
    const auth = getAuth(request);
    const result = await auth.api.getSession({ headers: request.headers });
    return result?.user ?? null;
  } catch {
    return null;
  }
}

export const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

export const unauthorised = () => json({ error: 'Not signed in' }, 401);

/** Reads and validates a JSON body, returning null when it is not usable. */
export async function readJson<T>(request: Request): Promise<T | null> {
  try {
    const body = await request.json();
    return (body ?? null) as T | null;
  } catch {
    return null;
  }
}

export const newId = () => crypto.randomUUID();
