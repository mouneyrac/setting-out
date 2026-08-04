import { describe, expect, it } from 'vitest';
import { allSeasons, lightAt, perthSky, seasonFor } from './atmosphere';

describe('the Noongar six seasons', () => {
  it('covers every month and nothing else', () => {
    const months = Array.from({ length: 12 }, (_, i) => seasonFor(i + 1));
    expect(months.every(Boolean)).toBe(true);
    expect(new Set(months.map((s) => s.key)).size).toBe(6);
  });

  it('puts Makuru over the sprinkler switch-off', () => {
    // June to August is the winter switch-off. Makuru is June–July and Djilba
    // picks up August — so the site should never be showing summer light while
    // telling someone their sprinklers are banned.
    expect(seasonFor(6).key).toBe('makuru');
    expect(seasonFor(7).key).toBe('makuru');
    expect(seasonFor(8).key).toBe('djilba');
  });

  it('puts Kambarang over the jacarandas', () => {
    expect(seasonFor(11).key).toBe('kambarang');
  });

  it('gives every season a usable palette', () => {
    for (const s of allSeasons()) {
      for (const colour of [s.skyHigh, s.skyLow, s.bloom]) {
        expect(colour, `${s.key} ${colour}`).toMatch(/^#[0-9A-Fa-f]{6}$/);
      }
      expect(s.haze).toBeGreaterThanOrEqual(0);
      expect(s.haze).toBeLessThanOrEqual(1);
    }
  });
});

describe('light through the day', () => {
  // January: Perth sunrise ~05:10, sunset ~19:20.
  it('is night in the small hours and daylight at noon', () => {
    expect(lightAt(2, 1).part).toBe('night');
    expect(lightAt(23, 1).part).toBe('night');
    expect(lightAt(12, 1).part).not.toBe('night');
  });

  it('runs dawn → morning → afternoon → dusk in order across a summer day', () => {
    const seen = [6, 9, 15, 19].map((h) => lightAt(h, 1).part);
    expect(seen).toEqual(['dawn', 'morning', 'afternoon', 'dusk']);
  });

  it('peaks at solar noon and falls off either side', () => {
    const noon = lightAt(12.5, 1).elevation;
    expect(noon).toBeGreaterThan(lightAt(9, 1).elevation);
    expect(noon).toBeGreaterThan(lightAt(17, 1).elevation);
    expect(noon).toBeLessThanOrEqual(1);
  });

  it('makes winter days shorter than summer days', () => {
    // 17:30 is still afternoon in January and already dusk in July.
    expect(lightAt(17.5, 1).part).toBe('afternoon');
    expect(lightAt(17.5, 7).part).toBe('dusk');
  });

  it('keeps the tint gentle in the middle of the day', () => {
    // This is light on a garden, not an Instagram filter. A heavy tint at noon
    // would wash the body text, which has to stay readable above all else.
    expect(lightAt(12, 1).tint).toBeLessThan(0.25);
  });
});

describe('perthSky', () => {
  it('reads Perth time, not the machine clock', () => {
    // 2026-06-15T20:00Z is 04:00 on the 16th in Perth: night, in Makuru.
    const sky = perthSky(new Date('2026-06-15T20:00:00Z'));
    expect(sky.season.key).toBe('makuru');
    expect(sky.light.part).toBe('night');
  });

  it('reads midday Perth as daylight in the right season', () => {
    // 2026-11-04T06:00Z is 14:00 in Perth: Kambarang, sun still high.
    const sky = perthSky(new Date('2026-11-04T06:00:00Z'));
    expect(sky.season.key).toBe('kambarang');
    expect(sky.light.part).toBe('afternoon');
    expect(sky.light.elevation).toBeGreaterThan(0.9);
  });
});
