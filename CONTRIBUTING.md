# Working on Setting Out

Short, because the rules that matter are few. They are written down mainly so
the next AI-assisted session lands in the same style instead of inventing a new
one.

## Run it

```bash
npm install
npm run dev          # http://localhost:4321

npm run lint         # eslint — must be clean
npm run test         # vitest — unit
npm run test:e2e     # playwright — five journeys, against a local Worker
npm run typecheck    # astro check + tsc on the server code
npm run build        # static build + Pagefind + verify-build
npm run deploy       # build, then wrangler deploy
```

`npm run verify` runs lint, tests and build together, and `build` runs the type
check first — so a type error fails the build the way bad frontmatter does.
Run it before shipping anything.

End-to-end tests need a local database once: `npm run db:migrate:local`, and a
`.dev.vars` copied from `.dev.vars.example`. They build the site and run it
under `wrangler dev` against local D1 — nothing in `e2e/` can reach production.
`e2e/global-setup.ts` clears the local rate-limit table first, because sign-up
allows five per hour per IP and every test shares localhost.

**A test that cannot fail is not a test.** Both suites were checked by breaking
`inSwitchOff` in `src/lib/roster.ts` and confirming three unit tests and one
journey went red. Do the same for anything new that guards something expensive.

## The rules

**One key/value store.** Everything a reader produces — deliverable answers,
checklist ticks, uploaded file lists — lives in `workbook_entry` keyed by
`<workbookKey>.<questionKey>` or `check:<lessonId>#<n>`. Adding a question needs
no migration. Do not add a table for a new kind of answer.

**Never trust a key from a client.** `/api/workbook` and `/api/upload` validate
against `legalKeys()` in `src/lib/workbook-keys.ts`, which is derived from the
content. This is not defensive padding: before it existed, unbounded keys made
the per-question upload cap meaningless and ~85 forged keys would have exhausted
the R2 free tier.

**Course content lives in frontmatter, not in components.** Lesson bodies,
questions, checklists, resources and regulatory claims are all in
`src/content/lessons/**`. Zod validates them, so a malformed lesson fails the
build. If you find yourself hard-coding course text in an `.astro` file, it
belongs in the content instead.

**Every external link is fetched before it ships**, then re-checked by a second
pass. A plausible URL is not good enough — that verification is the thing this
project claims to be worth. Regulatory claims carry `sourceUrl` and `checkedOn`.

**Australian English, metric, Perth.** Metre, colour, fertilise, licence as a
noun. No imperial units. Advice is for the Swan Coastal Plain, not "gardens" in
general.

**Comments explain why, never what.** The code says what. A comment earns its
place by recording a decision, a constraint or a trap — the reason a limit is
that number, the bug a guard exists to prevent.

**Never put personal or scheduling notes in the repository.** Anything about how
or when the project is worked on stays outside it.

## Things that will bite you

**Deploys briefly 404 new assets.** For a minute or so after `wrangler deploy`,
some Cloudflare edge locations answer 404 for files added in that build. It is
propagation, not a bug. Re-probe before diagnosing.

**Astro splits the build.** Output goes to `dist/client` (static assets) and
`dist/server` (the Worker). `wrangler.jsonc` points at `dist/client`. Getting
this wrong silently ships stale HTML — it happened once.

**`run_worker_first` is load-bearing.** With `not_found_handling: 404-page`, a
request matching no static asset can be answered with the 404 page _before_ the
Worker runs. `/my/*`, `/api/*` and `/curriculum/*` are listed there for that
reason.

**Astro blocks cross-origin form POSTs.** Testing an upload with `curl` fails
unless you send an `Origin` header. That is CSRF protection working, not a bug.

**Lesson pages render on demand.** They are behind an account, so Pagefind
cannot index them; search merges `/lessons-index.json` (titles and summaries
only — never bodies) with the Pagefind results.

## Two tsconfigs, and why `append` is banned in client scripts

`@astrojs/cloudflare` pulls the Workers runtime types in globally, and there is
no setting that stops it. Their `Element` — HTMLRewriter's, not the DOM's —
merges with the DOM `Element` and **overrides `append`**, so in a client script
`el.append(node)` is checked against `append(string | Response | ReadableStream)`
and fails. Use `appendChild` instead. It is plain DOM and it is not shadowed.

That collision is also why there are two configs:

- `tsconfig.json` — everything, used by `astro check`. Components are read with
  a partly Workers-flavoured global scope, so treat its verdict on browser APIs
  with some suspicion.
- `tsconfig.server.json` — `src/lib`, `src/db`, `src/pages/api`. Workers _is_ the
  right lens here, so this one is trustworthy. It is where the security-relevant
  code lives.

Both run in `npm run typecheck` and both must stay at zero.

**Never exclude `.astro/` in a tsconfig.** It holds the generated `types.d.ts`
that gives `astro:content` its real types. Excluding the directory silently
filters it back out of `include`, `getCollection()` quietly degrades to the
`(...args: any[]) => any` stub in `astro/types/content.d.ts`, and you get a pile
of phantom implicit-`any` errors pointing at innocent code. That cost an
afternoon once.
