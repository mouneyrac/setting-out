import { expect, test } from '@playwright/test';

const LESSON = '/curriculum/brief/the-enquiry-call/';

/**
 * The account gate.
 *
 * The course sits behind sign-in on purpose. If this ever silently stops
 * redirecting, the gate is gone and nobody would notice from the outside — the
 * lesson would simply render. Hence a test rather than a manual check.
 */
test.describe('the gate', () => {
  test('sends a signed-out reader to sign-in, and remembers where they were going', async ({
    page,
  }) => {
    await page.goto(LESSON);
    await expect(page).toHaveURL(/\/sign-in\//);
    expect(new URL(page.url()).searchParams.get('next')).toBe(LESSON);
  });

  test('leaves the public pages public', async ({ page }) => {
    for (const path of ['/', '/library/', '/curriculum/']) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBeLessThan(400);
      expect(new URL(page.url()).pathname, path).toBe(path);
    }
  });

  test('does not leak the lesson body to an unauthenticated fetch', async ({ request }) => {
    // The redirect above is a browser behaviour. This checks the server itself
    // never serves the content, which is the part that actually matters.
    const response = await request.get(LESSON, { maxRedirects: 0 });
    expect(response.status()).toBeGreaterThanOrEqual(300);
    expect(response.status()).toBeLessThan(400);
  });
});
