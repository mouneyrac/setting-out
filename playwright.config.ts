import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end tests run against `wrangler dev`, not `astro dev`.
 *
 * The parts worth testing — the account gate, the workbook API, uploads — only
 * exist inside the Worker, with a real local D1 behind them. `astro dev` fakes
 * that binding, so a green run there would prove less than it appears to.
 *
 * The trade is a full build before the first test. Worth it: the same build is
 * what ships.
 *
 * Local D1 only. `npm run db:migrate:local` must have been run once; nothing
 * here can reach production data.
 */
// Not 8788: another project on this machine uses it, and its service worker
// will happily serve *its* cached pages at that origin. A distinct port keeps
// the two from ever being confused for one another.
const PORT = 8793;

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: false, // one local D1 file, shared by every test
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 30_000,

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: `npm run build && npx wrangler dev --port ${PORT} --local`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
