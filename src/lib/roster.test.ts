import { describe, expect, it } from 'vitest';
import { ROSTER, inSwitchOff, perthToday, rosterAnswer, type Weekday } from './roster';

/**
 * These assert against the sources cited on /reference/sprinkler-roster/, not
 * against the implementation. Getting this wrong costs a reader $100.
 */
describe('the roster table', () => {
  it('covers every digit', () => {
    for (let d = 0; d <= 9; d++) expect(ROSTER[d]).toHaveLength(2);
  });

  it('matches the DWER mapping exactly', () => {
    // 1 and 8 Wed/Sat; 2 and 9 Thu/Sun; 3 and 0 Fri/Mon; 4 Sat/Tue;
    // 5 Sun/Wed; 6 Mon/Thu; 7 Tue/Fri.
    expect(ROSTER[1]).toEqual(['Wednesday', 'Saturday']);
    expect(ROSTER[8]).toEqual(['Wednesday', 'Saturday']);
    expect(ROSTER[2]).toEqual(['Thursday', 'Sunday']);
    expect(ROSTER[9]).toEqual(['Thursday', 'Sunday']);
    expect(ROSTER[3]).toEqual(['Friday', 'Monday']);
    expect(ROSTER[0]).toEqual(['Friday', 'Monday']);
    expect(ROSTER[4]).toEqual(['Saturday', 'Tuesday']);
    expect(ROSTER[5]).toEqual(['Sunday', 'Wednesday']);
    expect(ROSTER[6]).toEqual(['Monday', 'Thursday']);
    expect(ROSTER[7]).toEqual(['Tuesday', 'Friday']);
  });

  it('gives everyone exactly two different days', () => {
    for (let d = 0; d <= 9; d++) {
      const [a, b] = ROSTER[d];
      expect(a).not.toBe(b);
    }
  });
});

describe('the winter switch-off', () => {
  it('runs June to August inclusive', () => {
    expect([6, 7, 8].every(inSwitchOff)).toBe(true);
  });

  it('does not run in any other month', () => {
    expect([1, 2, 3, 4, 5, 9, 10, 11, 12].some(inSwitchOff)).toBe(false);
  });

  it('starts on 1 June and ends after 31 August, not a day either side', () => {
    expect(inSwitchOff(5)).toBe(false); // May
    expect(inSwitchOff(9)).toBe(false); // September
  });
});

describe('rosterAnswer', () => {
  it('says yes on a rostered day outside the ban', () => {
    // Digit 7 waters Tuesday and Friday. November is outside the switch-off.
    expect(rosterAnswer(7, 'Tuesday', 11).verdict).toBe('rostered-today');
    expect(rosterAnswer(7, 'Friday', 11).verdict).toBe('rostered-today');
  });

  it('says no on a day that is not yours', () => {
    expect(rosterAnswer(7, 'Wednesday', 11).verdict).toBe('not-today');
  });

  it('lets the switch-off override a rostered day', () => {
    // This is the case that matters. Tuesday IS digit 7's day, but in July
    // sprinklers are banned regardless, and answering "yes" would be a fine.
    expect(rosterAnswer(7, 'Tuesday', 7).verdict).toBe('switch-off');
  });

  it('reports the switch-off for every digit and every weekday in the ban', () => {
    const days: Weekday[] = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
    for (let d = 0; d <= 9; d++) {
      for (const day of days) {
        for (const month of [6, 7, 8]) {
          expect(rosterAnswer(d, day, month).verdict).toBe('switch-off');
        }
      }
    }
  });

  it('always returns the two rostered days, even during the ban', () => {
    expect(rosterAnswer(4, 'Monday', 7).days).toEqual(['Saturday', 'Tuesday']);
  });

  it('rejects a digit that is not a digit', () => {
    expect(() => rosterAnswer(10, 'Monday', 11)).toThrow(RangeError);
    expect(() => rosterAnswer(-1, 'Monday', 11)).toThrow(RangeError);
  });
});

describe('perthToday', () => {
  it('uses Perth time, not the machine timezone', () => {
    // 31 December 2026, 20:00 UTC is already 1 January in Perth (UTC+8).
    const { month } = perthToday(new Date('2026-12-31T20:00:00Z'));
    expect(month).toBe(1);
  });

  it('does not roll the day early for a Perth morning', () => {
    // 1 August 2026, 02:00 UTC is 10:00 on 1 August in Perth.
    const { month, weekday } = perthToday(new Date('2026-08-01T02:00:00Z'));
    expect(month).toBe(8);
    expect(weekday).toBe('Saturday');
  });
});
