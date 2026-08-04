import { describe, expect, it } from 'vitest';
import { blob, canopy, grassRow, ridge } from './painterly';

/** Pull every coordinate pair out of a path so its geometry can be measured. */
const points = (d: string): [number, number][] => {
  const nums = d.match(/-?\d+(\.\d+)?/g)?.map(Number) ?? [];
  const out: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) out.push([nums[i]!, nums[i + 1]!]);
  return out;
};

describe('blob', () => {
  const opts = { cx: 100, cy: 100, rx: 40, ry: 30, seed: 7 };

  it('is deterministic — the same seed draws the same shape', () => {
    expect(blob(opts)).toBe(blob(opts));
  });

  it('draws a different shape for a different seed', () => {
    expect(blob(opts)).not.toBe(blob({ ...opts, seed: 8 }));
  });

  it('closes, and is made of curves rather than straight lines', () => {
    const d = blob(opts);
    expect(d.endsWith('Z')).toBe(true);
    expect(d).toContain('C');
    expect(d).not.toContain('L');
  });

  /**
   * The point of the whole module: an outline that is *not* an ellipse. If the
   * radius ever stopped varying, every canopy would silently go back to being a
   * lollipop and nobody would notice from the code.
   */
  it('has a radius that actually varies', () => {
    const radii = points(blob(opts)).map(([x, y]) => Math.hypot(x - 100, y - 100));
    const min = Math.min(...radii);
    const max = Math.max(...radii);
    expect(max - min).toBeGreaterThan(6);
  });

  it('stays near the requested size', () => {
    // Ragged, but not so ragged that it escapes the frame it was placed in.
    for (const [x, y] of points(blob(opts))) {
      expect(Math.abs(x - 100)).toBeLessThan(40 * 1.9);
      expect(Math.abs(y - 100)).toBeLessThan(30 * 1.9);
    }
  });

  it('respects jitter: zero jitter is a smooth, near-regular outline', () => {
    const radii = points(blob({ ...opts, jitter: 0 })).map(([x, y]) =>
      Math.hypot(x - 100, y - 100),
    );
    expect(Math.max(...radii) - Math.min(...radii)).toBeLessThan(
      // rx and ry differ, so even a perfect ellipse spans 10 units here.
      12,
    );
  });
});

describe('ridge', () => {
  const opts = { from: 0, to: 800, y: 200, amplitude: 30, baseline: 420, seed: 3 };

  it('is deterministic', () => {
    expect(ridge(opts)).toBe(ridge(opts));
  });

  it('spans the full width and closes to the baseline', () => {
    const d = ridge(opts);
    expect(d.startsWith('M0 420')).toBe(true);
    expect(d.endsWith('L800 420Z')).toBe(true);
  });

  it('keeps the ridge line near its nominal height', () => {
    // A hill that wanders off the top of the picture is a bug, not a hill.
    const ys = points(ridge(opts))
      .map(([, y]) => y)
      .filter((y) => y !== 420);
    expect(Math.min(...ys)).toBeGreaterThan(200 - 30 * 2);
    expect(Math.max(...ys)).toBeLessThan(200 + 30 * 2);
  });
});

describe('grassRow', () => {
  const blades = grassRow(0, 400, 300, 24, 11);

  it('makes the requested number of blades', () => {
    expect(blades).toHaveLength(24);
  });

  it('gives the wind a phase that increases across the row', () => {
    // This is what makes a gust travel instead of every blade twitching at
    // once. If phases stopped increasing, the row would move in lockstep.
    expect(blades[0]!.phase).toBeLessThan(blades[23]!.phase);
    expect(Math.max(...blades.map((b) => b.phase))).toBeLessThan(0.35);
  });

  it('gives every blade a positive bend', () => {
    for (const b of blades) expect(b.amp).toBeGreaterThan(0);
  });

  it('grows upward from the baseline', () => {
    for (const b of blades) {
      const ys = points(b.d).map(([, y]) => y);
      expect(Math.max(...ys)).toBeLessThanOrEqual(300);
    }
  });

  it('is deterministic', () => {
    expect(grassRow(0, 400, 300, 24, 11)).toEqual(blades);
  });
});

describe('canopy', () => {
  const opts = { cx: 200, cy: 150, rx: 70, ry: 48, seed: 5 };

  it('is deterministic', () => {
    expect(canopy(opts)).toEqual(canopy(opts));
  });

  it('makes the requested number of clumps', () => {
    expect(canopy({ ...opts, clumps: 6 })).toHaveLength(6);
  });

  /**
   * Interior edges are the whole point. One blob is a cut-out; several
   * overlapping ones read as leaves in front of other leaves.
   */
  it('spreads the clumps rather than stacking them on one another', () => {
    const centres = canopy(opts).map((c) => {
      const nums = c.d.match(/-?\d+(\.\d+)?/g)!.map(Number);
      const xs = nums.filter((_, i) => i % 2 === 0);
      return xs.reduce((a, b) => a + b, 0) / xs.length;
    });
    expect(Math.max(...centres) - Math.min(...centres)).toBeGreaterThan(40);
  });

  it('returns them back to front, so painting in order gives depth', () => {
    const light = canopy(opts).map((c) => c.light);
    expect([...light].sort((a, b) => a - b)).toEqual(light);
  });

  it('keeps every light value usable as a 0–1 mix', () => {
    for (const c of canopy(opts)) {
      expect(c.light).toBeGreaterThanOrEqual(0);
      expect(c.light).toBeLessThanOrEqual(1);
    }
  });
});
