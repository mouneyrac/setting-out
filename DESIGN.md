# Art direction — Ghibli × Perth garden

> **What is built and what is not.** An earlier version of this document
> described seed-packet cards and a winding garden path as though they existed.
> They did not, and the gap between the writing and the site was the single most
> misleading thing in the repository. Every section below now ends with a state:
> **built**, **partly built** or **planned**. Do not describe anything here as
> done until it is on the page.

## The thesis

Kawaii and "a technical course about retaining wall permits" sounds like a
contradiction. It is not, if you pick the right Ghibli.

Ghibli's real subject is **work**: Kiki running a delivery business, Sophie
cleaning a castle, the bathhouse in _Spirited Away_, Shizuku writing her book.
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

| Token           | Hex       | Role                                           |
| --------------- | --------- | ---------------------------------------------- |
| `--sky-high`    | `#7FC4E8` | deep luminous Perth sky                        |
| `--sky-low`     | `#CDEBF7` | horizon haze                                   |
| `--cloud`       | `#FFFDF7` | warm cumulus white — cards and surfaces        |
| `--paper`       | `#FBF3E4` | warm sand — the page ground                    |
| `--leaf`        | `#6FA860` | sunlit foliage                                 |
| `--leaf-deep`   | `#2C5240` | shadow green — body text                       |
| `--ink`         | `#1F3A2E` | darkest green-black — headings                 |
| `--paw`         | `#E2542B` | kangaroo paw — primary accent, calls to action |
| `--jacaranda`   | `#9A84C9` | secondary accent, links                        |
| `--banksia`     | `#F4A63D` | warnings, safety, highlights                   |
| `--sand-shadow` | `#E6D6BB` | borders, soft dividers                         |

### Dark — "Makuru" (the cold, wet Noongar winter)

Ghibli night is deep blue-teal and moonlit, never black. Fireflies, not neon.
Ground drops to `#16232B`, surfaces to `#1E3039`, text to `#EAF2EC`, and the
accents brighten a step so they still glow.

## Type

The genius pick is authentic Japanese **maru gothic** (rounded gothic) — the
actual typographic tradition behind anime UI and kawaii design — rather than a
generic Western "cute font" that would read as clip art.

| Role        | Face                          | Why                                                                                                                                            |
| ----------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Display     | **Zen Maru Gothic** 700/900   | Rounded terminals, real warmth and character, proper Latin set. Authentically maru gothic.                                                     |
| Body        | **M PLUS Rounded 1c** 400/500 | Rounded but genuinely built for screen reading at length. Survives 1,200-word lessons.                                                         |
| Field notes | **Klee One**                  | A Japanese pencil-handwriting face. Annotations look handwritten in a botanist's field journal. This is the detail that sells the whole thing. |

Three faces, one design culture, all free under the SIL Open Font Licence.

## Signature 1 — the garden that grows — _partly built_

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

## Signature 2 — the winding path — _planned_

The curriculum index becomes a garden path winding down the page with eleven
stepping stones, one per phase. Planting gets denser and more established as the
path progresses. It replaces the technical section drawing entirely.

## Wind — built

One clock, not one animation per plant.

`--wind-t` is a registered custom property animated by CSS from 0 to 1 forever.
Every plant reads it with its own phase offset and derives its own rotation:

```
rotate(sin((var(--wind-t) + var(--wind-phase)) * 1turn) * amplitude * var(--wind-force))
```

Because the phase increases across the page, a gust _travels_ rather than every
leaf moving in lockstep — which is the actual difference between a picture with
an animation on it and a picture with weather in it. `--gust-t` runs on a much
longer period and swells the force, so some gusts are stronger than others and
the pattern does not visibly repeat.

No JavaScript. `prefers-reduced-motion` stops it by pausing two animations.

## Paper and paint — built

Three techniques, all generated in the browser, because a gouache texture heavy
enough to look real would outweigh the entire rest of the site and this has to
work offline:

- **Grain.** One fixed `feTurbulence` overlay in `soft-light` across the whole
  document. Fixed, not per element — paper does not slide when you scroll.
- **Torn edges.** `#deckle-edge` displaces a card's _background_ with turbulence
  so its outline wobbles like cut paper. The filter never touches text, which
  stays crisp, and a second variant lets the sheet settle very slowly.
- **Painterly silhouettes.** `src/lib/painterly.ts` — nothing draws an ellipse.
  A canopy is a scatter of overlapping clumps with interior edges, a hill is a
  ridge line with a wobble, grass is leaning tapered strokes. All deterministic
  from a seed, so the build is reproducible.

## Light and season — built

The palette follows the real time in Perth and the **Noongar six-season
calendar**, which describes this place far better than four European seasons.
`src/lib/atmosphere.ts` computes both and writes them to custom properties.

| Season    | Months  | What the page does                           |
| --------- | ------- | -------------------------------------------- |
| Birak     | Dec–Jan | hot, high sun, orange bloom                  |
| Bunuru    | Feb–Mar | white light, heavy horizon haze              |
| Djeran    | Apr–May | cooling, cleaner air                         |
| Makuru    | Jun–Jul | grey-blue and wet — the sprinkler switch-off |
| Djilba    | Aug–Sep | cold mornings, yellow and cream              |
| Kambarang | Oct–Nov | wildflowers, jacaranda purple                |

Time of day drives one warm light source over the whole page, and the sunrise
and sunset times swing with the month. It is checked by tests, including that
the tint stays gentle at noon so body copy never washes out.

Season drives the _wildflower_, never the species: the jacaranda is purple in
flower and green otherwise, because a yellow jacaranda in August is exactly the
detail a Perth reader would catch.

## Motion, restrained

- Pollen and light motes drifting slowly, hero only
- Grass and leaves swaying on a very slow sine, CSS only
- Clouds drifting horizontally, almost imperceptibly
- Everything above disabled under `prefers-reduced-motion`

Deliberately cut: cursor-follow effects, a mascot companion, page-transition
flourishes. Spend the boldness on the growing garden and keep the rest quiet.

## Component language — _cards built, seed packets planned_

| Element                       | Treatment                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| Cards                         | Paper cut-outs — soft 14–20 px corners, warm shadow, hairline that reads as a pencil edge |
| Lesson cards                  | **Seed packets / plant labels**                                                           |
| Deliverable box               | A **field journal page**, set in Klee One handwriting                                     |
| Checklist                     | Wooden plant markers with a tick                                                          |
| **Safety and legal callouts** | A **hand-painted warning sign** in banksia orange                                         |

## Why this makes the course safer, not fluffier

The brief was: _"great knowledge to take all proper legal, safe and great result
outcomes."_

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
