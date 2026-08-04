/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

/**
 * Astro's own Vite config, not a bare one.
 *
 * Tests that touch `src/lib/workbook-keys.ts` read the real lesson content
 * through `astro:content`, which only exists inside Astro's module graph — a
 * plain vitest config fails to resolve it. Going through `getViteConfig` is
 * what lets a test assert against the actual course rather than a fixture, and
 * the allow-list test is only worth anything if it does.
 */
export default getViteConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
