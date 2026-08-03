import type { APIRoute } from 'astro';
import { getDb, getUser, json, newId, readJson, unauthorised } from '../../lib/server';
import { propertyProfile } from '../../db/schema';

export const prerender = false;

interface Body {
  suburb?: string;
  postcode?: string;
  blockSizeM2?: string | number;
  soilType?: string;
  aspect?: string;
  waterSource?: string;
  houseNumberLastDigit?: string;
  gardenState?: string;
  notes?: string;
}

const SOIL = ['bassendean', 'spearwood', 'karrakatta', 'quindalup', 'unknown'];
const WATER = ['scheme', 'bore', 'both', 'none'];
const STATE = ['bare', 'established', 'renovating'];

/** Trims, caps length, and returns undefined for empty strings. */
const text = (value: unknown, max = 200) => {
  const s = typeof value === 'string' ? value.trim().slice(0, max) : '';
  return s === '' ? null : s;
};

const oneOf = (value: unknown, allowed: string[]) =>
  typeof value === 'string' && allowed.includes(value) ? value : null;

export const POST: APIRoute = async ({ request }) => {
  const user = await getUser(request);
  if (!user) return unauthorised();

  const body = await readJson<Body>(request);
  if (!body) return json({ error: 'Expected a JSON body' }, 400);

  const size = Number(body.blockSizeM2);
  const now = new Date();

  const values = {
    suburb: text(body.suburb, 120),
    postcode: text(body.postcode, 8),
    blockSizeM2: Number.isFinite(size) && size > 0 ? Math.round(size) : null,
    soilType: oneOf(body.soilType, SOIL),
    aspect: text(body.aspect, 40),
    waterSource: oneOf(body.waterSource, WATER),
    houseNumberLastDigit: /^\d$/.test(String(body.houseNumberLastDigit ?? ''))
      ? String(body.houseNumberLastDigit)
      : null,
    gardenState: oneOf(body.gardenState, STATE),
    notes: text(body.notes, 4000),
    updatedAt: now,
  };

  await getDb()
    .insert(propertyProfile)
    .values({ id: newId(), userId: user.id, createdAt: now, ...values })
    .onConflictDoUpdate({ target: propertyProfile.userId, set: values });

  return json({ saved: true });
};
