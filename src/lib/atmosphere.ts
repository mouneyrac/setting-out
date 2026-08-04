/**
 * Light and season, for Perth.
 *
 * Ghibli backgrounds are not "a nice palette" — they are a *time of day*. The
 * same hillside is a different painting at dawn and at four in the afternoon,
 * and what unifies every element in the frame is one light source. So the site
 * has one too, and everything tints from it.
 *
 * The second axis is the Noongar six-season calendar, which is how this part of
 * the world is actually described by the people who have described it longest,
 * and which matches Perth far better than four European seasons do. Kambarang
 * really is when the wildflowers and the jacaranda go off; Makuru really is grey
 * and wet; Birak really is that flat white heat.
 *
 * Nothing here is decoration for its own sake: the season also drives the
 * sprinkler roster, the planting advice and the winter switch-off, so a reader
 * arriving in Makuru sees a site that already agrees with the ban it is about
 * to tell them about.
 */

export type SeasonKey = 'birak' | 'bunuru' | 'djeran' | 'makuru' | 'djilba' | 'kambarang';

export interface Season {
  key: SeasonKey;
  /** Noongar name. */
  name: string;
  /** The plain-English months, for a tooltip that does not assume knowledge. */
  months: string;
  /** One line a Perth gardener would recognise as true. */
  note: string;
  /** Sky, top of the gradient. */
  skyHigh: string;
  /** Sky, at the horizon. */
  skyLow: string;
  /** The season's flower — used for accents and the drifting petals. */
  bloom: string;
  /** How much haze sits on the horizon, 0–1. Bunuru is thick with it. */
  haze: number;
}

/**
 * Ordered by month so a lookup is an index, not a search.
 * Sources for the season boundaries and their character are on
 * /reference/noongar-seasons/.
 */
const SEASONS: Record<SeasonKey, Season> = {
  birak: {
    key: 'birak',
    name: 'Birak',
    months: 'December – January',
    note: 'Hot and dry. The easterlies in the morning, the sea breeze by two.',
    skyHigh: '#6DBEE8',
    skyLow: '#EAF6FB',
    bloom: '#F4A63D',
    haze: 0.5,
  },
  bunuru: {
    key: 'bunuru',
    name: 'Bunuru',
    months: 'February – March',
    note: 'The hottest stretch. White light, no rain, everything holding on.',
    skyHigh: '#7CC3E2',
    skyLow: '#FBF2DE',
    bloom: '#E2542B',
    haze: 0.85,
  },
  djeran: {
    key: 'djeran',
    name: 'Djeran',
    months: 'April – May',
    note: 'It cools. The first real rain. The best month to plant anything.',
    skyHigh: '#7FB8D6',
    skyLow: '#DCEBEF',
    bloom: '#C4603F',
    haze: 0.3,
  },
  makuru: {
    key: 'makuru',
    name: 'Makuru',
    months: 'June – July',
    note: 'Cold, wet, and the sprinklers are switched off by law.',
    skyHigh: '#6E96AF',
    skyLow: '#C8D8DE',
    bloom: '#7C64AD',
    haze: 0.15,
  },
  djilba: {
    key: 'djilba',
    name: 'Djilba',
    months: 'August – September',
    note: 'Cold mornings, warm afternoons. Yellow and cream come out first.',
    skyHigh: '#79B4D8',
    skyLow: '#DCEDF3',
    bloom: '#E8C64A',
    haze: 0.2,
  },
  kambarang: {
    key: 'kambarang',
    name: 'Kambarang',
    months: 'October – November',
    note: 'Wildflowers everywhere, and the jacarandas go purple.',
    skyHigh: '#7FC4E8',
    skyLow: '#CDEBF7',
    bloom: '#9A84C9',
    haze: 0.25,
  },
};

/** Month (1–12) → season. */
const BY_MONTH: SeasonKey[] = [
  'birak', // January
  'bunuru', // February
  'bunuru', // March
  'djeran', // April
  'djeran', // May
  'makuru', // June
  'makuru', // July
  'djilba', // August
  'djilba', // September
  'kambarang', // October
  'kambarang', // November
  'birak', // December
];

export const seasonFor = (month: number): Season => SEASONS[BY_MONTH[month - 1] ?? 'kambarang']!;

export const allSeasons = (): Season[] => Object.values(SEASONS);

/* ── Time of day ──────────────────────────────────────────────────────── */

export type Daypart = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'night';

export interface Light {
  part: Daypart;
  /** How high the sun sits, 0 at the horizon, 1 at noon. Drives contrast. */
  elevation: number;
  /** The colour everything is lit by. Warm at the ends of the day. */
  warmth: string;
  /** Strength of that tint, 0–1. Deliberately small: this is light, not a filter. */
  tint: number;
}

/**
 * Perth's sunrise and sunset swing by about ninety minutes across the year.
 * Rather than pull in an ephemeris library for a background gradient, this
 * approximates the day length from the month — accurate to a quarter of an hour,
 * which is far past what anyone can perceive in a sky gradient.
 */
function daylight(month: number): { sunrise: number; sunset: number } {
  // Perth: earliest sunrise ~05:00 (Dec), latest ~07:15 (Jul).
  const midwinterOffset = Math.cos(((month - 6.5) / 12) * 2 * Math.PI);
  return {
    // The offset is +1 at midwinter and -1 at midsummer, so summer pulls
    // sunrise earlier and pushes sunset later.
    sunrise: 6.1 + midwinterOffset * 1.1,
    sunset: 18.4 - midwinterOffset * 1.4,
  };
}

export function lightAt(hour: number, month: number): Light {
  const { sunrise, sunset } = daylight(month);
  const noon = (sunrise + sunset) / 2;
  const halfDay = (sunset - sunrise) / 2;

  if (hour < sunrise - 0.8 || hour > sunset + 0.8) {
    return { part: 'night', elevation: 0, warmth: '#7fa8d8', tint: 0.34 };
  }

  // A raised cosine: zero at the horizons, one at solar noon.
  const elevation = Math.max(0, Math.cos(((hour - noon) / halfDay) * (Math.PI / 2)));

  if (hour < sunrise + 1.2) {
    return { part: 'dawn', elevation, warmth: '#ffb27a', tint: 0.4 };
  }
  if (hour > sunset - 1.4) {
    return { part: 'dusk', elevation, warmth: '#ff9d5c', tint: 0.45 };
  }
  if (hour < noon) {
    return { part: 'morning', elevation, warmth: '#fff0cf', tint: 0.16 };
  }
  return { part: 'afternoon', elevation, warmth: '#ffe6b8', tint: 0.2 };
}

/* ── Now, in Perth ────────────────────────────────────────────────────── */

export interface Sky {
  season: Season;
  light: Light;
}

/**
 * The current sky, in Perth time regardless of where the device is.
 *
 * A reader in Paris looking at a Perth gardening course should see the Perth
 * sky. The whole premise is that this is one specific place.
 */
export function perthSky(now: Date = new Date()): Sky {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Perth',
    month: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const num = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  const month = num('month') || 1;
  // Intl renders midnight as hour 24 in some locales.
  const hour = (num('hour') % 24) + num('minute') / 60;

  return { season: seasonFor(month), light: lightAt(hour, month) };
}
