/**
 * The Perth sprinkler roster, extracted so it can be tested.
 *
 * This used to live inline in WateringToday.astro. It is the one calculation on
 * the site where being wrong has a price: watering outside your rostered days
 * carries a $100 on-the-spot fine, and the winter switch-off carries the same.
 * That makes it the first thing that deserved a test.
 *
 * Sources, both on /reference/sprinkler-roster/:
 * - DWER, "Check garden bore water restrictions" — the roster by last digit
 * - Water Agencies (Water Use) By-laws 2010 — the windows and the switch-off
 */

export type Weekday =
  'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

/** Perth and Mandurah (Area 3), by the last digit of the house or lot number. */
export const ROSTER: Record<number, [Weekday, Weekday]> = {
  0: ['Friday', 'Monday'],
  1: ['Wednesday', 'Saturday'],
  2: ['Thursday', 'Sunday'],
  3: ['Friday', 'Monday'],
  4: ['Saturday', 'Tuesday'],
  5: ['Sunday', 'Wednesday'],
  6: ['Monday', 'Thursday'],
  7: ['Tuesday', 'Friday'],
  8: ['Wednesday', 'Saturday'],
  9: ['Thursday', 'Sunday'],
};

/** The Sprinkler Switch-off: 1 June to 31 August inclusive, every year. */
export const inSwitchOff = (month: number): boolean => month >= 6 && month <= 8;

export type Verdict = 'switch-off' | 'rostered-today' | 'not-today';

export interface RosterAnswer {
  verdict: Verdict;
  days: [Weekday, Weekday];
}

/**
 * What the roster says for a given digit on a given day.
 *
 * Note the precedence: the switch-off beats the roster. During June to August
 * it does not matter whether today is one of your days — sprinklers are banned
 * either way, and answering "yes" then would be the expensive kind of wrong.
 */
export function rosterAnswer(digit: number, weekday: Weekday, month: number): RosterAnswer {
  const days = ROSTER[digit];
  if (!days) throw new RangeError(`Not a house-number digit: ${digit}`);

  if (inSwitchOff(month)) return { verdict: 'switch-off', days };
  return {
    verdict: days.includes(weekday) ? 'rostered-today' : 'not-today',
    days,
  };
}

/** Today in Perth, regardless of where the device thinks it is. */
export function perthToday(now: Date = new Date()): { weekday: Weekday; month: number } {
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Perth',
    weekday: 'long',
    month: 'numeric',
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { weekday: get('weekday') as Weekday, month: Number(get('month')) };
}
