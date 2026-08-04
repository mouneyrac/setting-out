import { describe, expect, it } from 'vitest';
import { checklistKey } from './checklist';
import { CHECK_KEY, checkKey } from '../workbook-keys';

/**
 * The client builds checklist keys; the server decides which keys it will
 * accept. Nothing in the type system connects the two, so if the format drifts
 * on one side every tick silently stops saving. These tests are that link.
 */
describe('checklistKey', () => {
  it('produces the shape the API recognises as a tick', () => {
    expect(checklistKey('02-brief/01-the-enquiry-call', 0)).toMatch(CHECK_KEY);
    expect(checklistKey('08-build/17-irrigation-mainline-valves-and-wiring', 42)).toMatch(
      CHECK_KEY,
    );
  });

  it('is positional and stable', () => {
    expect(checklistKey('02-brief/01-the-enquiry-call', 3)).toBe(
      'check:02-brief/01-the-enquiry-call#3',
    );
  });
});

describe('checkKey', () => {
  /**
   * The allow-list is derived from the lesson content, which is not loaded in a
   * unit-test process — so here it is empty. That is exactly the condition
   * worth asserting: with no allow-list, every key must be refused. A
   * validator that fails open when its data is missing is worse than none.
   */
  it('refuses a key it cannot find in the allow-list', async () => {
    const result = await checkKey('check:02-brief/01-the-enquiry-call#0');
    expect(result.ok).toBe(false);
  });

  it('refuses non-strings, blanks and oversized keys before looking anything up', async () => {
    for (const bad of [null, 42, {}, '', '   ', 'a'.repeat(201)]) {
      expect((await checkKey(bad)).ok, JSON.stringify(bad)).toBe(false);
    }
  });

  it('never echoes the supplied key back in the error', async () => {
    const nasty = '<img src=x onerror=alert(1)>';
    const result = await checkKey(nasty);
    expect(result.ok).toBe(false);
    expect(result.error ?? '').not.toContain(nasty);
  });
});
