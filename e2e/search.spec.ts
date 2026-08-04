import { expect, test } from '@playwright/test';

/**
 * Search merges two sources: Pagefind, which indexes the public static pages,
 * and `/lessons-index.json`, which carries lesson titles and summaries because
 * lesson pages are gated and therefore unindexable.
 *
 * The lesson half is the fragile one — it only exists because of the gate, and
 * nothing else would notice if the endpoint stopped being generated.
 */
test.describe('search', () => {
  test('finds a lesson by a word in its title', async ({ page }) => {
    await page.goto('/');
    await page.locator('#search-open').click();

    const input = page.locator('#search-input');
    await expect(input).toBeFocused();
    await input.fill('retaining');

    const results = page.locator('#search-results');
    await expect(results.getByRole('option').first()).toBeVisible({ timeout: 10_000 });
    await expect(results).toContainText(/retaining/i);
  });

  test('says so plainly when nothing matches', async ({ page }) => {
    await page.goto('/');
    await page.locator('#search-open').click();
    await page.locator('#search-input').fill('zzzqqqxxnothing');
    await expect(page.locator('#search-results')).toContainText(/nothing matches/i, {
      timeout: 10_000,
    });
  });

  test('the lesson index ships titles but never bodies', async ({ request }) => {
    const response = await request.get('/lessons-index.json');
    expect(response.ok()).toBe(true);

    const index = (await response.json()) as { t: string; s: string; u: string; p: string }[];
    expect(index.length).toBeGreaterThan(50);

    // Gated content leaking through the search index would quietly undo the
    // gate. Summaries are public by design; bodies are not, and a body would
    // show up here as a wildly oversized summary.
    for (const entry of index) {
      expect(Object.keys(entry).sort()).toEqual(['p', 's', 't', 'u']);
      expect(entry.s.length, entry.u).toBeLessThan(400);
    }
  });
});
