import { defineConfig } from 'drizzle-kit';

// Migrations are generated locally and applied to D1 with
// `wrangler d1 migrations apply`, so no live credentials are needed here.
export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
});
