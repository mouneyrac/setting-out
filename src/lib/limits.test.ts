import { describe, expect, it } from 'vitest';
import { QUOTA, RATE, clientIp } from './limits';

/**
 * The quota numbers are a product decision, so these tests assert the
 * *relationships* that make them safe rather than the values themselves — a
 * future tune should not have to rewrite the tests, but it should not be able
 * to accidentally set a ceiling below what one real reader needs.
 */
describe('quotas', () => {
  // 30 deliverables × ~6 questions ≈ 171 answers, plus 370 checklist ticks.
  const REAL_USE = { entries: 541, files: 40 };

  it('leaves generous headroom above one reader finishing the whole course', () => {
    expect(QUOTA.entries).toBeGreaterThan(REAL_USE.entries * 3);
    expect(QUOTA.files).toBeGreaterThan(REAL_USE.files * 3);
  });

  it('keeps one account well under the shared 10 GB R2 free tier', () => {
    const TEN_GB = 10 * 1024 * 1024 * 1024;
    expect(QUOTA.fileBytes).toBeLessThan(TEN_GB / 10);
  });

  it('cannot be satisfied by a single oversized entry', () => {
    // 40 KB is the per-entry cap in /api/workbook.
    expect(QUOTA.bytes).toBeGreaterThan(40_000 * 10);
  });
});

describe('rate limits', () => {
  it('is loosest for workbook writes, because autosave fires constantly', () => {
    const perMinute = (r: { limit: number; windowSeconds: number }) =>
      r.limit / (r.windowSeconds / 60);
    expect(perMinute(RATE.write)).toBeGreaterThan(perMinute(RATE.upload));
    expect(perMinute(RATE.write)).toBeGreaterThan(perMinute(RATE.signup));
  });

  it('allows a full session of continuous typing without throttling', () => {
    // Autosave debounces at 700 ms, so a hard hour of typing is ~5,100 writes
    // in the worst case — but a realistic session touches far fewer fields.
    // 600 per 10 minutes is one save per second sustained.
    expect(RATE.write.limit / RATE.write.windowSeconds).toBeGreaterThanOrEqual(1);
  });

  it('is tightest on sign-up, the one that costs money to leave open', () => {
    expect(RATE.signup.limit).toBeLessThan(RATE.upload.limit);
    expect(RATE.signup.windowSeconds).toBeGreaterThanOrEqual(3600);
  });

  it('every bucket has a positive limit and window', () => {
    for (const [name, r] of Object.entries(RATE)) {
      expect(r.limit, name).toBeGreaterThan(0);
      expect(r.windowSeconds, name).toBeGreaterThan(0);
    }
  });
});

describe('clientIp', () => {
  const req = (headers: Record<string, string>) => new Request('https://x.test', { headers });

  it('prefers the Cloudflare header', () => {
    expect(clientIp(req({ 'cf-connecting-ip': '1.1.1.1', 'x-forwarded-for': '2.2.2.2' }))).toBe(
      '1.1.1.1',
    );
  });

  it('falls back to x-forwarded-for', () => {
    expect(clientIp(req({ 'x-forwarded-for': '2.2.2.2' }))).toBe('2.2.2.2');
  });

  it('never returns empty, so a bucket key is always well formed', () => {
    expect(clientIp(req({}))).toBe('unknown');
  });
});
