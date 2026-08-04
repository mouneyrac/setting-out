/**
 * Painterly SVG primitives.
 *
 * The tell that an illustration was assembled rather than drawn is the perfect
 * shape: a tree canopy made of five overlapping ellipses, a bush that is a
 * circle, a rainbow that is concentric arcs. The eye reads the geometry before
 * it reads the picture.
 *
 * So nothing here draws an ellipse. A canopy is one closed curve whose radius
 * wanders; a hill is a ridge line with a wobble in it; a blade of grass is a
 * tapering stroke that leans. All of it is deterministic — same seed, same
 * path — because a build that produced a different garden each time would blow
 * up every cached page and make a screenshot impossible to reproduce.
 */

/** mulberry32 — small, fast, and good enough for shapes. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 10) / 10;

export interface BlobOptions {
  cx: number;
  cy: number;
  /** Mean horizontal radius. */
  rx: number;
  /** Mean vertical radius. */
  ry: number;
  /** How many lobes the outline has. Fewer reads as a shrub, more as a canopy. */
  lobes?: number;
  /** 0 = a plain ellipse, 0.5 = wildly ragged. Foliage sits around 0.22. */
  jitter?: number;
  seed: number;
}

/**
 * A closed organic outline.
 *
 * Points are placed around an ellipse with their radius perturbed, then joined
 * with a Catmull-Rom spline converted to cubic Béziers — which is what gives a
 * continuous, brush-drawn edge instead of a polygon with rounded corners.
 */
export function blob({ cx, cy, rx, ry, lobes = 9, jitter = 0.22, seed }: BlobOptions): string {
  const random = rng(seed);
  const points: [number, number][] = [];

  for (let i = 0; i < lobes; i++) {
    const angle = (i / lobes) * Math.PI * 2;
    // Two scales of noise: a broad lean plus a finer ruffle, so the silhouette
    // has both mass and detail rather than one uniform wobble.
    const broad = 1 + (random() - 0.5) * jitter * 2;
    const fine = 1 + (random() - 0.5) * jitter * 0.6;
    points.push([
      cx + Math.cos(angle) * rx * broad * fine,
      cy + Math.sin(angle) * ry * broad * fine,
    ]);
  }

  return catmullRom(points);
}

/** Closed Catmull-Rom through every point, emitted as cubic Béziers. */
function catmullRom(points: [number, number][]): string {
  const n = points.length;
  if (n < 3) return '';

  const at = (i: number) => points[((i % n) + n) % n]!;
  let d = `M${round(at(0)[0])} ${round(at(0)[1])}`;

  for (let i = 0; i < n; i++) {
    const [x0, y0] = at(i - 1);
    const [x1, y1] = at(i);
    const [x2, y2] = at(i + 1);
    const [x3, y3] = at(i + 2);

    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;

    d += `C${round(c1x)} ${round(c1y)},${round(c2x)} ${round(c2y)},${round(x2)} ${round(y2)}`;
  }

  return `${d}Z`;
}

export interface RidgeOptions {
  /** Left and right edges of the drawing. */
  from: number;
  to: number;
  /** Mean height of the ridge line, in user units from the top. */
  y: number;
  /** How far the ridge rises and falls. Distant hills want very little. */
  amplitude: number;
  /** Number of crests across the width. */
  crests?: number;
  /** Where to close the shape — the bottom of the picture. */
  baseline: number;
  seed: number;
}

/**
 * A hill line, closed to the baseline so it can be filled.
 *
 * Perth's scarp reads as long, low and layered rather than as peaks, so the
 * default crest count is small and the amplitude is meant to be used with
 * atmospheric perspective: the further the ridge, the flatter and paler.
 */
export function ridge({
  from,
  to,
  y,
  amplitude,
  crests = 3,
  baseline,
  seed,
}: RidgeOptions): string {
  const random = rng(seed);
  const span = to - from;
  const step = span / crests;

  let d = `M${round(from)} ${round(baseline)}L${round(from)} ${round(y)}`;

  for (let i = 0; i < crests; i++) {
    const x1 = from + step * i;
    const x2 = x1 + step;
    // Crests alternate high and low, with enough noise that no two repeat.
    const lift = (i % 2 === 0 ? -1 : 0.45) * amplitude * (0.6 + random() * 0.8);
    const cx1 = x1 + step * (0.25 + random() * 0.15);
    const cx2 = x1 + step * (0.6 + random() * 0.2);
    d += `C${round(cx1)} ${round(y + lift)},${round(cx2)} ${round(y + lift)},${round(x2)} ${round(
      y + (random() - 0.5) * amplitude * 0.4,
    )}`;
  }

  return `${d}L${round(to)} ${round(baseline)}Z`;
}

export interface Clump {
  d: string;
  /** 0 = deepest shade, 1 = full sun. Pick the tone from this. */
  light: number;
}

export interface CanopyOptions {
  cx: number;
  /** The base of the canopy, where it meets the trunk. */
  cy: number;
  rx: number;
  ry: number;
  /** How many clumps of foliage. Eight or so reads as a tree; three as a shrub. */
  clumps?: number;
  seed: number;
}

/**
 * Foliage as a cluster of clumps, not one silhouette.
 *
 * A single outline — however ragged — still reads as a cut-out, because real
 * foliage has interior edges: you can see where one mass of leaves ends and the
 * one behind it begins. So a canopy is several overlapping blobs arranged in a
 * rough dome, each carrying a light value from how high and how sunward it sits.
 *
 * Returned back-to-front, so painting them in order gives depth for free.
 */
export function canopy({ cx, cy, rx, ry, clumps = 8, seed }: CanopyOptions): Clump[] {
  const random = rng(seed);
  const out: Clump[] = [];

  for (let i = 0; i < clumps; i++) {
    // Scattered through the dome, not around its rim. The first version placed
    // every clump on the perimeter and drew a green ring with a hole in it —
    // sqrt() on the radius is what spreads them evenly by *area* instead.
    const angle = Math.PI + random() * Math.PI;
    const radius = Math.sqrt(random()) * 0.72;
    const px = cx + Math.cos(angle) * rx * radius;
    const py = cy + Math.sin(angle) * ry * radius;

    // Big clumps in the middle, smaller ones at the edges, so the mass holds
    // together and only the silhouette is broken up.
    const size = (0.5 - radius * 0.22) * (0.85 + random() * 0.3);

    // One sun, above and to the right, as everywhere else on the page.
    const light = Math.min(1, Math.max(0, 0.45 - (py - cy) / (ry * 1.6) + (px - cx) / (rx * 3.5)));

    out.push({
      d: blob({
        cx: px,
        cy: py,
        rx: rx * size,
        ry: ry * size * 1.25,
        lobes: 8,
        jitter: 0.28,
        seed: seed + i * 13,
      }),
      light: Math.round(light * 100) / 100,
    });
  }

  // Back to front: the low, shaded clumps are painted first.
  return out.sort((a, b) => a.light - b.light);
}

export interface Blade {
  d: string;
  /** 0–1 across the width — the phase the wind reaches this blade at. */
  phase: number;
  /** How far it bends, in degrees. */
  amp: number;
}

/**
 * A row of grass, ready to be blown.
 *
 * Each blade carries its own wind phase derived from its x position, so when
 * the CSS wind clock ticks the gust travels left to right across the row
 * instead of every blade moving together. That travelling wave is the whole
 * difference between "animated" and "windy".
 */
export function grassRow(
  from: number,
  to: number,
  baseY: number,
  count: number,
  seed: number,
): Blade[] {
  const random = rng(seed);
  const blades: Blade[] = [];

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const x = from + (to - from) * t + (random() - 0.5) * 6;
    const height = 14 + random() * 22;
    const lean = (random() - 0.5) * 14;
    const tipX = x + lean;
    const tipY = baseY - height;
    const ctrlX = x + lean * 0.3;
    const ctrlY = baseY - height * 0.55;

    // A closed taper, not a constant-width stroke: a blade of grass is wide at
    // the base and comes to a point, and a row of even strokes reads as pencil
    // hatching rather than as a lawn.
    const halfBase = 1.3 + random() * 1.1;

    blades.push({
      d:
        `M${round(x - halfBase)} ${round(baseY)}` +
        `Q${round(ctrlX - halfBase * 0.5)} ${round(ctrlY)},${round(tipX)} ${round(tipY)}` +
        `Q${round(ctrlX + halfBase * 0.7)} ${round(ctrlY)},${round(x + halfBase)} ${round(baseY)}Z`,
      // A quarter-turn of phase across the row: the gust crosses it visibly,
      // but no blade is ever a full cycle away from its neighbour.
      phase: round(t * 0.25 + random() * 0.03),
      amp: round(2.2 + random() * 2.2),
    });
  }

  return blades;
}
