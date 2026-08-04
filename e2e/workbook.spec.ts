import { expect, test } from '@playwright/test';
import { signUp } from './helpers';

const BRIEF_LESSON = '/curriculum/brief/writing-the-design-brief/';

/**
 * The journey the whole site exists for: create an account, open a lesson,
 * answer the question it asks, and find the answer again in the workbook.
 *
 * Every piece of it has broken at least once — the gate, the autosave, the key
 * allow-list, the workbook read. Nothing else in the suite covers the chain
 * end to end.
 */
test.describe('answering a deliverable', () => {
  test('an answer survives a reload and appears in the workbook', async ({ page }) => {
    await signUp(page);

    await page.goto(BRIEF_LESSON);
    await expect(page).toHaveURL(BRIEF_LESSON);

    // The budget question is a plain number — the least fiddly field to drive,
    // and it exercises the same save path as every other type.
    const budget = page.locator('[data-field="budget"] input');
    await expect(budget).toBeVisible();
    await budget.fill('48500');

    // Autosave is debounced; wait for the status line rather than a fixed sleep.
    await expect(page.locator('[data-save-status]')).toHaveText(/saved/i, { timeout: 10_000 });

    await page.reload();
    await expect(page.locator('[data-field="budget"] input')).toHaveValue('48500', {
      timeout: 10_000,
    });

    await page.goto('/my/workbook/');
    await expect(page.getByText('48500')).toBeVisible({ timeout: 10_000 });
  });

  test('refuses a workbook key the course does not define', async ({ page, request }) => {
    await signUp(page);
    const cookies = await page.context().cookies();
    const cookie = cookies.map((c) => `${c.name}=${c.value}`).join('; ');

    // The hole this closed: unbounded keys made the per-question upload cap
    // meaningless. A forged key must be a 400, not a silent write.
    const response = await request.post('/api/workbook', {
      headers: { cookie, origin: new URL(page.url()).origin },
      data: { workbookKey: 'not-a-real-key-' + Date.now(), lessonId: 'x', content: 'junk' },
    });
    expect(response.status()).toBe(400);
  });
});
