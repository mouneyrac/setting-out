// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// The course itself is prerendered — fast, cheap to serve, indexable by
// Pagefind. Only the account routes (/api/*, /my/*) opt into on-demand
// rendering with `export const prerender = false`.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://settingout.mouneyrac.com',
  adapter: cloudflare({
    platformProxy: { enabled: true },
    imageService: 'compile',
  }),
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
