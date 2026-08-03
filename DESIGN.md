# Art direction — Ghibli × Perth garden

## The thesis

Kawaii and "a technical course about retaining wall permits" sounds like a
contradiction. It is not, if you pick the right Ghibli.

Ghibli's real subject is **work**: Kiki running a delivery business, Sophie
cleaning a castle, the bathhouse in *Spirited Away*, Shizuku writing her book.
Miyazaki draws labour with reverence and delight. And Ghibli's landscapes —
wind through grass, layered hills, cumulus, water — are why people love Ghibli
at all.

This is a course about learning a trade with your hands, outdoors, on your own
land, to make a garden. The subject and the aesthetic are the same thing.

So the direction is not "put cute stuff on a course site". It is:

> **This course is set inside a Ghibli film about learning to make a garden in
> Perth.**

## The specific thing nobody else has

Not generic anime. Not Japanese countryside green. **Ghibli technique, Perth
biome.**

Perth's light is whiter and harder than Japan's. The natives are silver-grey,
not lush green. The sky is a deeper blue. The flowers are wild and hot —
kangaroo paw red, banksia orange, everlasting daisy pink, jacaranda purple in
November. Limestone, not stone walls. Sand, not loam.

A sun-bleached Australian coastal Ghibli. That combination is the whole
identity, and it belongs to this project alone.

## Colour

Ghibli's rule: luminous sky, deep foliage shadow, one hot accent, everything
soft-saturated. Never neon. Never dead grey.

### Light — "Kambarang" (the Noongar wildflower season)

| Token | Hex | Role |
| --- | --- | --- |
| `--sky-high` | `#7FC4E8` | deep luminous Perth sky |
| `--sky-low` | `#CDEBF7` | horizon haze |
| `--cloud` | `#FFFDF7` | warm cumulus white — cards and surfaces |
| `--paper` | `#FBF3E4` | warm sand — the page ground |
| `--leaf` | `#6FA860` | sunlit foliage |
| `--leaf-deep` | `#2C5240` | shadow green — body text |
| `--ink` | `#1F3A2E` | darkest green-black — headings |
| `--paw` | `#E2542B` | kangaroo paw — primary accent, calls to action |
| `--jacaranda` | `#9A84C9` | secondary accent, links |
| `--banksia` | `#F4A63D` | warnings, safety, highlights |
| `--sand-shadow` | `#E6D6BB` | borders, soft dividers |

### Dark — "Makuru" (the cold, wet Noongar winter)

Ghibli night is deep blue-teal and moonlit, never black. Fireflies, not neon.
Ground drops to `#16232B`, surfaces to `#1E3039`, text to `#EAF2EC`, and the
accents brighten a step so they still glow.

## Type

The genius pick is authentic Japanese **maru gothic** (rounded gothic) — the
actual typographic tradition behind anime UI and kawaii design — rather than a
generic Western "cute font" that would read as clip art.

| Role | Face | Why |
| --- | --- | --- |
| Display | **Zen Maru Gothic** 700/900 | Rounded terminals, real warmth and character, proper Latin set. Authentically maru gothic. |
| Body | **M PLUS Rounded 1c** 400/500 | Rounded but genuinely built for screen reading at length. Survives 1,200-word lessons. |
| Field notes | **Klee One** | A Japanese pencil-handwriting face. Annotations look handwritten in a botanist's field journal. This is the detail that sells the whole thing. |

Three faces, one design culture, all free under the SIL Open Font Licence.

## Signature 1 — the garden that grows

Progress is **not** a bar. Completed lessons grow an illustrated Perth garden.

- **0 lessons** — bare sand, one seedling, a lot of sky
- **Each phase completed** adds a layer: the limestone wall appears, the path
  curves in, a jacaranda goes in, kangaroo paw clumps, a banksia, sprinkler mist
  catching a small rainbow, a bobtail lizard under a shrub, a willie wagtail on
  the fence
- **Phase 11** — a full, layered, hand-drawn garden

All inline SVG. No external assets, no image budget, works offline, scales
perfectly. Appears on the home page, on your progress page, and as a miniature
in the header.

It is the wow **and** it encodes real information. That is the difference
between design and decoration.

## Signature 2 — the winding path

The curriculum index becomes a garden path winding down the page with eleven
stepping stones, one per phase. Planting gets denser and more established as the
path progresses. It replaces the technical section drawing entirely.

## Motion, restrained

- Pollen and light motes drifting slowly, hero only
- Grass and leaves swaying on a very slow sine, CSS only
- Clouds drifting horizontally, almost imperceptibly
- Everything above disabled under `prefers-reduced-motion`

Deliberately cut: cursor-follow effects, a mascot companion, page-transition
flourishes. Spend the boldness on the growing garden and keep the rest quiet.

## Component language

| Element | Treatment |
| --- | --- |
| Cards | Paper cut-outs — soft 14–20 px corners, warm shadow, hairline that reads as a pencil edge |
| Lesson cards | **Seed packets / plant labels** |
| Deliverable box | A **field journal page**, set in Klee One handwriting |
| Checklist | Wooden plant markers with a tick |
| **Safety and legal callouts** | A **hand-painted warning sign** in banksia orange |

## Why this makes the course safer, not fluffier

The brief was: *"great knowledge to take all proper legal, safe and great result
outcomes."*

Cute does not mean unclear — it means **more legible**. A hand-painted orange
sign with an icon is far more visually arresting than a grey bordered box that
reads as boilerplate and gets skipped. Every point where WA law requires a
licensed trade, or where a mistake is expensive or dangerous, gets a sign you
physically cannot scroll past.

## The restraint rule

Long technical text has to stay readable, so the split is:

- **Chrome is charming** — hero, navigation, cards, progress, illustrations,
  headings, empty states
- **Body copy is calm** — generous line height, 68 ch measure, high contrast,
  nothing decorative behind the words

The wow lives in the frame. Never smeared across the text.
