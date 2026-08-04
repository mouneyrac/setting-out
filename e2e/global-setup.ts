import { execFileSync } from 'node:child_process';

/**
 * Reset the **local** D1 before a run.
 *
 * Sign-up is rate limited to five per hour per IP, and every test shares
 * localhost — so without this the suite passes once and then fails for an hour.
 * Test accounts go too, or a re-run trips "already exists"; every child table
 * cascades from `user`, so deleting the account is enough.
 *
 * `--local` is not optional and not configurable. There is no code path here
 * that can reach the production database, and there should never be one.
 */
const STATEMENTS = [
  // The whole table: these are local counters with no value beyond the run.
  'DELETE FROM rate_limit',
  "DELETE FROM user WHERE email LIKE 'e2e-%@example.com'",
];

export default function globalSetup() {
  for (const sql of STATEMENTS) {
    try {
      execFileSync(
        'npx',
        ['wrangler', 'd1', 'execute', 'learnlandscaping', '--local', '--command', sql],
        { stdio: 'ignore' },
      );
    } catch {
      // Not migrated yet, most likely. The tests themselves will fail with a
      // far clearer message than anything this could print.
    }
  }
}
