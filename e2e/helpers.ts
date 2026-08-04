import type { Page } from '@playwright/test';

/**
 * A fresh account per test.
 *
 * Sign-up is rate limited to five per hour *per IP*, and every test here shares
 * localhost — so tests that need an account call `signUp` sparingly, and the
 * ones that only need a signed-out page do not call it at all.
 */
export function newAccount() {
  // No Math.random: a collision across a re-run would reuse an existing account
  // and the sign-up would fail as "already exists" rather than anything useful.
  const stamp = `${Date.now()}-${process.hrtime.bigint()}`;
  return {
    name: 'Test Gardener',
    email: `e2e-${stamp}@example.com`,
    password: 'a-long-enough-password',
  };
}

export async function signUp(page: Page, account = newAccount()) {
  await page.goto('/sign-in/');
  await page.getByRole('tab', { name: 'Create an account' }).click();
  await page.locator('#name').fill(account.name);
  await page.locator('#email').fill(account.email);
  await page.locator('#password').fill(account.password);
  await page.locator('#auth-submit').click();
  await page.waitForURL(/\/my\/|\/curriculum\//, { timeout: 20_000 });
  return account;
}
