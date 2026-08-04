import { expect, test } from '@playwright/test';
import { signUp } from './helpers';

const LESSON = '/curriculum/brief/the-enquiry-call/';

/**
 * Checklist ticks go through the same key/value store as deliverable answers,
 * under a different key shape. That shape is built on the client and validated
 * on the server by an allow-list derived from the content — three places that
 * have to agree. A unit test checks the format; this checks it actually saves.
 */
test('a checklist tick survives a reload', async ({ page }) => {
  await signUp(page);
  await page.goto(LESSON);

  const boxes = page.locator('[data-checklist] input[data-check]');
  await expect(boxes.first()).toBeVisible();

  const count = page.locator('[data-checklist-count]');
  await expect(count).toHaveText(/things|done/);

  await boxes.first().check();
  await expect(count).toHaveText(/1 of \d+ done/);

  // The write is fire-and-forget, so give it a moment before reloading.
  await expect
    .poll(
      async () => (await page.request.get('/api/me').then((r) => r.text())).includes('check:'),
      {
        timeout: 10_000,
      },
    )
    .toBe(true);

  await page.reload();
  await expect(page.locator('[data-checklist] input[data-check]').first()).toBeChecked({
    timeout: 10_000,
  });
  await expect(page.locator('[data-checklist-count]')).toHaveText(/1 of \d+ done/);
});
