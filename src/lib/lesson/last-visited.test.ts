import { beforeEach, describe, expect, it, vi } from 'vitest';
import { lastLesson, rememberLesson } from './last-visited';

/** A minimal localStorage, so these tests do not need a DOM environment. */
const store = new Map<string, string>();
const fake = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
  clear: () => store.clear(),
};

beforeEach(() => {
  store.clear();
  vi.stubGlobal('localStorage', fake);
});

describe('rememberLesson / lastLesson', () => {
  const lesson = {
    href: '/curriculum/brief/the-enquiry-call/',
    title: 'The enquiry call',
    id: 'x',
  };

  it('reads back what was written', () => {
    rememberLesson(lesson);
    expect(lastLesson()).toEqual(lesson);
  });

  it('returns null when nothing has been stored', () => {
    expect(lastLesson()).toBeNull();
  });

  /**
   * These three are the reason this is a module rather than four lines inline:
   * the home page turns the result straight into an href, so a bad stored value
   * must not become a broken or hostile link.
   */
  it('rejects a stored value that is not JSON', () => {
    fake.setItem('last-lesson', 'not json at all');
    expect(lastLesson()).toBeNull();
  });

  it('rejects an entry with no href', () => {
    fake.setItem('last-lesson', JSON.stringify({ title: 'Orphan' }));
    expect(lastLesson()).toBeNull();
  });

  it('rejects an off-site href', () => {
    fake.setItem('last-lesson', JSON.stringify({ href: 'https://evil.test/', title: 'Nope' }));
    expect(lastLesson()).toBeNull();
  });

  it('survives storage being unavailable', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    });
    expect(() => rememberLesson(lesson)).not.toThrow();
    expect(lastLesson()).toBeNull();
  });
});
