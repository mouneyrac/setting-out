import { expect, test } from '@playwright/test';

const PAGE = '/reference/sprinkler-roster/';

/**
 * The one calculation on the site where being wrong costs money: watering
 * outside your rostered days, or during the winter switch-off, is a $100
 * on-the-spot fine.
 *
 * `src/lib/roster.test.ts` covers the arithmetic. This covers the wiring — that
 * the widget actually asks the roster and renders what it says, on the real
 * page, with the clock set to a date that matters.
 */
test.describe('the watering widget', () => {
  test('answers "no" during the June–August switch-off, whatever the roster says', async ({
    page,
  }) => {
    // 15 July 2026, midday Perth. A Wednesday — a rostered day for a house
    // number ending in 1, which makes this the case that must not say yes.
    await page.clock.setFixedTime(new Date('2026-07-15T04:00:00Z'));
    await page.goto(PAGE);

    await page.locator('[data-digit="1"]').click();

    const answer = page.locator('#water-answer');
    await expect(answer).toBeVisible();
    await expect(page.locator('#water-headline')).toHaveText(/no/i);
    await expect(answer).toContainText(/switch-?off/i);
  });

  test('answers "yes" on a rostered day outside the switch-off', async ({ page }) => {
    // 4 November 2026 is a Wednesday: a rostered day for numbers ending in 1.
    await page.clock.setFixedTime(new Date('2026-11-04T04:00:00Z'));
    await page.goto(PAGE);

    await page.locator('[data-digit="1"]').click();
    await expect(page.locator('#water-headline')).toHaveText(/yes/i);
  });

  test('answers "no" on a day that is not yours', async ({ page }) => {
    // Same Wednesday, but a house number ending in 2 waters Thursday/Sunday.
    await page.clock.setFixedTime(new Date('2026-11-04T04:00:00Z'));
    await page.goto(PAGE);

    await page.locator('[data-digit="2"]').click();
    await expect(page.locator('#water-headline')).toHaveText(/no/i);
    await expect(page.locator('#water-days')).toContainText(/Thursday/);
  });
});
