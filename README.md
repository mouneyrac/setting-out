# Setting Out

**[settingout.mouneyrac.com](https://settingout.mouneyrac.com)**

A free, open-source course that teaches the professional landscaping process —
the actual sequence a Western Australian landscaper runs from the moment a
client rings — and has you apply every step to your own Perth block.

You play both parts, client and contractor. Eleven phases later you have
professional skills, a real design package for your property, and a garden
worth more than you spent on it.

_Setting out_ is the trade term for transferring a design onto the ground with
pegs and string lines, before anyone digs. It is also what this course is for.

---

## What makes it different

**Written for Perth, not translated to it.** Bassendean and Spearwood sands hold
almost no water and almost no nutrient. The sprinkler roster is permanent and
there is a total ban every winter. Retaining walls hit a permit threshold lower
than any other Australian state. Advice written for Melbourne or Michigan will
cost you a garden.

**The whole process, in the order professionals run it.** Amateurs start at the
concept drawing. Professionals spend the first three phases finding out what the
site and the law actually allow, because that is where the expensive surprises
live.

**Every external link is verified before it ships.** Each resource is fetched
and checked, then annotated with what it costs, how long it takes, why it beat
the alternatives, and what to change for Perth conditions. Paid resources appear
only when genuinely best — always with the best free option named beside them.
Regulatory claims carry their primary source and the date they were checked.

**Safety and legality are unmissable.** Where WA law requires a licensed trade,
or where a mistake is dangerous or expensive, the lesson carries a hand-painted
warning sign you cannot scroll past.

## The curriculum

Eleven phases, 91 lessons, 30 documents you produce yourself.

| #   | Phase                                               | Lessons |
| --- | --------------------------------------------------- | ------- |
| 01  | The trade and the process                           | 4       |
| 02  | First contact and the brief                         | 5       |
| 03  | Site analysis                                       | 10      |
| 04  | Rules, permits and approvals                        | 7       |
| 05  | Concept design                                      | 8       |
| 06  | Detailed design and documentation                   | 8       |
| 07  | Costing, quoting and contract                       | 7       |
| 08  | Build _(includes an 8-part irrigation mini-course)_ | 25      |
| 09  | Handover and records                                | 5       |
| 10  | Maintenance and establishment                       | 9       |
| 11  | Value and review                                    | 3       |

Phases 2 and 3 are written. The rest have final titles, practical tasks and
checklists — the checklists are usable on their own — with the prose and
verified resources being added phase by phase.

## Stack

Everything runs on free tiers.

- **[Astro](https://astro.build)** — course content prerendered; only `/my/*`
  and `/api/*` render on demand
- **Cloudflare Workers** — hosting, with static assets
- **Cloudflare D1 + [Drizzle](https://orm.drizzle.team)** — accounts, progress,
  project workbook
- **[Better Auth](https://better-auth.com)** — self-hosted email/password auth
- **[Pagefind](https://pagefind.app)** — static full-text search
- **Tailwind CSS v4**

## Running it locally

```bash
npm install
npm run dev                  # http://localhost:4321

npm run db:generate          # regenerate migrations after a schema change
npm run db:migrate:local     # apply them to the local D1

npm run build                # static build + Pagefind index
npm run deploy               # build and push to Cloudflare
```

Auth needs a signing secret. Locally, put one in `.dev.vars`:

```
BETTER_AUTH_SECRET="<any long random string>"
```

In production it is a Worker secret (`wrangler secret put BETTER_AUTH_SECRET`).
Google sign-in switches itself on if `GOOGLE_CLIENT_ID` and
`GOOGLE_CLIENT_SECRET` are set, and stays off otherwise.

## Repository layout

```
src/
  content/lessons/{phase}/{nn-slug}.mdx   the course
  content.config.ts                       Zod schema — the build fails if a
                                          lesson ships half-built
  data/phases.ts                          the eleven phases
  components/                             GrowingGarden, GardenPath, cards
  db/schema.ts                            Drizzle schema
  lib/                                    auth, server helpers, curriculum
  pages/                                  routes, including /api and /my
scripts/
  curriculum.seed.mjs                     the curriculum as data
  scaffold-curriculum.mjs                 writes stubs for new lessons only
DESIGN.md                                 the art direction and why
```

To add a lesson: add it to `scripts/curriculum.seed.mjs`, then run
`node scripts/scaffold-curriculum.mjs`. It never overwrites an existing file.

## Licence

- **Code** — [MIT](LICENSE)
- **Course content** (everything under `src/content/`) —
  [CC BY-SA 4.0](LICENSE-CONTENT.md)

Third-party resources the course links to remain the property of their owners.
Australian Standards are copyright Standards Australia and must be purchased;
this course explains what they require and when they apply, and does not
reproduce them.

## Disclaimer

Educational material, not professional advice. Western Australian regulation
changes. Always confirm with your local council, the Water Corporation, DWER or
a licensed trade before you build, dig or spend.
