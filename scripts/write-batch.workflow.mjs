export const meta = {
  name: 'write-lessons',
  description: 'Research, write and independently verify a batch of Setting Out lessons',
  phases: [
    { title: 'Write', detail: 'one agent per lesson: research, verify every link, write the MDX' },
    { title: 'Verify', detail: 'independent agent refetches every URL and fixes what is broken' },
  ],
};

const EXEMPLARS = [
  'src/content/lessons/03-site-analysis/03-perth-soils.mdx',
  'src/content/lessons/03-site-analysis/08-auditing-an-existing-garden.mdx',
];

const SHARED = `
You are writing one lesson for **Setting Out** (settingout.mouneyrac.com) — a free, open-source
course teaching the full professional landscaping process, written 100% for Perth / Western
Australian conditions, in AUSTRALIAN ENGLISH. The reader applies every lesson to their own
suburban block. They have an EXISTING GARDEN THEY ARE RENOVATING, so where it matters, speak to
someone working with what is already there.

THE READER'S STATED GOAL, which outranks everything else:
"I am not an expert. What matters is that I get the knowledge to do this legally, safely, and
with a great result." So: prioritise correct sequence, legal obligations, safety, and the
mistakes that are expensive or dangerous. Depth for its own sake is not the goal — being able
to ACT CORRECTLY is. Prefer "do this, in this order, and here is what it costs you if you get
it wrong" over academic completeness.

VOICE: a senior WA landscaper explaining their actual method to a capable adult. Direct,
specific, unsentimental. No marketing language, no hype, no emoji in prose. Concrete numbers,
real WA place names, real materials, real failure modes. Australian spelling (metre, colour,
fertilise, organise, licence as noun). Metric only.

BEFORE WRITING:
1. Read these two finished lessons in full — they are the quality bar and the exact format:
   ${EXEMPLARS.map((e) => `   - ${e}`).join('\\n')}
2. Read your assigned stub file. Its frontmatter (title, phase, order, summary, timeEstimate,
   difficulty, checklist, series, licensedTrade, and deliverable if present) is FINAL. Preserve
   those fields EXACTLY, character for character. You only ADD: status, updated, resources,
   videos, regulations.

RESEARCH RULES — THIS IS THE WHOLE POINT OF THE PROJECT:
- WebSearch to find candidates, then WebFetch EVERY SINGLE URL before including it. If it 404s,
  redirects somewhere unrelated, or does not say what you were about to claim, DROP IT. Never
  guess a URL. Never include a link you have not personally fetched this session. Three verified
  resources beat eight plausible ones.
- Prefer authoritative WA sources over content marketing: Water Corporation, DWER, DPIRD,
  Building and Energy (dmirs/wa.gov.au), Consumer Protection WA, BGPA/Kings Park, Before You Dig
  Australia, Irrigation Australia, Greenlife Industry WA, LIAWA, TAFE WA, local councils,
  Standards Australia, Josh Byrne / Josh's House, Gardening Australia, WorkSafe WA. A Perth
  landscaper's SEO blog is a last resort — and if you use one, say so in waCaveat.
- CHECK FOR RECENT CHANGES. Today is 2 August 2026. WA rules move. If a threshold, exemption or
  scheme changed recently, say so explicitly with its start date. (Worked example from an earlier
  batch: from 1 July 2026, Class 10a buildings under $50,000 no longer require a registered
  building contractor in WA — that covers patios, pergolas, carports and sheds, and a lesson that
  omitted it left readers over-estimating when registration rules bite.)
- Paid resources are welcome when genuinely best. State the real price and name the best free
  alternative beside it.
- Overseas material is fine for universal technique (paving, decking, concrete, hydraulics). Set
  waRelevance: overseas-adapt and write a waCaveat saying exactly what to change for Perth.
- videos: [] unless you have VERIFIED a specific YouTube video exists AND its channel and title
  match. Fabricating a youtubeId is the single worst failure available to you. An empty array is
  honest and correct.
- EVERY regulatory claim, threshold, legal duty or price must either go in the "regulations"
  array with its primary source URL, or be stated in the body with an inline link to the primary
  source. If you cannot verify a number today, write "confirm the current figure with your
  council" instead of inventing one. Never state a WA threshold you did not read today.

SAFETY: where the work is dangerous or a licensed trade is legally required in WA, say so
plainly and early in the body. The page renders licensedTrade as a prominent warning sign, but
the prose must carry it too. Silica dust when cutting, trench collapse, working alone in heat,
electrical near water, tree work at height, asbestos in older structures — name the real hazard.

FRONTMATTER SCHEMA (Zod-validated — the build FAILS on a mistake):
  title, phase (int), order (number), summary, timeEstimate,
  difficulty (foundation|intermediate|advanced)   <- ALL copied unchanged from the stub
  status: complete
  updated: 2026-08-02
  series / licensedTrade / deliverable / checklist  <- copied unchanged from the stub if present
  resources: [{ title, url, provider,
      type: course|video|article|book|standard|tool|calculator|directory|government|podcast|supplier|app,
      cost: free|freemium|paid, price?, duration?,
      whyGood (REQUIRED — why THIS one over the alternatives, and what it actually contains; 2-4 sentences),
      waRelevance: wa-specific|australian|universal|overseas-adapt,
      waCaveat?, checkedOn: 2026-08-02 }]
  videos: [{ youtubeId, title, channel, duration?, whyGood, waRelevance, waCaveat?, checkedOn }]
  regulations: [{ claim, source, sourceUrl, checkedOn: 2026-08-02 }]

YAML: double-quote every string value, escape internal double quotes, keep summary on one line.

BODY: markdown (.mdx). Open with 1-3 short orienting paragraphs — no H1, the page renders the
title. Use ## and ###. Aim for 900-1400 words: enough to genuinely teach, not padded. Include a
section on what a PROFESSIONAL does at this stage and why — that framing is the premise of the
course. Tables are encouraged for comparisons. Cross-link with root-relative URLs of the form
/curriculum/<phase-slug>/<lesson-slug>/ where phase slugs are: trade-and-process, brief,
site-analysis, approvals, concept-design, documentation, costing, build, handover, maintenance,
review (lesson slug = stub filename minus leading digits and .mdx). End by pointing at what the
next lesson does with this output. Do NOT restate the checklist or deliverable — the page
already renders them.

Write the finished file to its exact original path with Write. Return a short report: path,
number of resources included, number of candidate URLs rejected for failing verification.
`;

const REFERENCE_SHARED = `
You are writing one **WA reference page** for Setting Out (settingout.mouneyrac.com), a free
open-source landscaping course written 100% for Perth / Western Australia in AUSTRALIAN ENGLISH.

Reference pages exist so that facts which DATE FAST — sprinkler rosters, rebates, permit
thresholds, council fees, plant availability — live in ONE place with a source and a check date,
instead of going stale scattered across ninety-one lessons. Treat that as the brief: this page is
the single source of truth for its topic, and it must be trivially updatable later.

Same research rules as the lessons, and they are the point of the project:
- WebFetch EVERY URL before including it. 404 or content mismatch means DROP IT. Never guess.
- Authoritative WA sources first: Water Corporation, DWER, DPIRD, Building and Energy,
  BGPA/Kings Park, Greenlife Industry WA, Before You Dig Australia, local councils, Landgate.
- Today is 2 August 2026. Check for recent changes and state their start dates.
- Every threshold, rule, fee or date goes in the "regulations" array with its primary source URL,
  or is stated inline with a link. Never invent a number. If unverifiable today, tell the reader
  to confirm with their council and say why it varies.

Create the file at the path you are given, with this frontmatter (Zod-validated):
---
title: "..."
summary: "one line"
order: <number>
status: complete
updated: 2026-08-02
resources: [ same shape as lessons: title, url, provider, type, cost, price?, duration?,
              whyGood, waRelevance, waCaveat?, checkedOn ]
regulations: [ { claim, source, sourceUrl, checkedOn: 2026-08-02 } ]
---

Body: markdown, 700-1400 words. Lead with the practical answer, then the detail. Tables are ideal
for this material. No H1. Where something genuinely varies by local government, say so and tell
the reader how to find their own answer rather than picking one council and implying it is
universal.

Return a short report: path, resources included, candidate URLs rejected.
`;

// ── The work ────────────────────────────────────────────────────────────────
const LESSONS = {
  'phase-1': [
    [
      '01-trade-and-process/01-what-the-trades-are',
      'Landscaper vs landscape designer vs landscape architect vs horticulturist. What each is paid to produce, what each charges in Perth, and crucially which WA trades legally require registration or a licence (builder registration, electrical, plumbing/gas, pool barriers). End with: at what point do you stop and hire someone.',
    ],
    [
      '01-trade-and-process/02-the-full-workflow',
      'The map of all eleven phases and why the order is what it is. Why site analysis precedes concept, why approvals precede design commitment, why irrigation goes in before soil and plants. Name the three phases where projects most often go wrong.',
    ],
    [
      '01-trade-and-process/03-being-your-own-client',
      'The discipline that replaces a paying client: scope creep, budget honesty, and not skipping the boring phases. This is a short, mostly non-technical lesson — few resources is correct, do not pad it.',
    ],
    [
      '01-trade-and-process/04-your-project-workbook',
      'What each phase deposits into the workbook and what the finished set is worth. Mention the site has an account that stores these, and that a notebook works just as well. Cover taking repeatable "before" photos from fixed positions.',
    ],
  ],
  'phase-4': [
    [
      '04-approvals/01-r-codes-and-your-council',
      'The Residential Design Codes (R-Codes) and local planning schemes. What they control in a garden: setbacks, site cover, deep soil / landscaping requirements, outbuildings. How to find your R-code and your local planning policies. VERIFY the current R-Codes volume and where it lives on wa.gov.au / planning.wa.gov.au.',
    ],
    [
      '04-approvals/02-retaining-walls-approval',
      'CRITICAL LEGAL LESSON. WA has the tightest retaining wall threshold in Australia. Verify the CURRENT thresholds against Building and Energy WA and at least two actual council pages — do not rely on retaining-wall vendor blogs for the numbers. Cover: retained height measurement, when a building permit is triggered, when a registered structural engineer must certify, AS 4678, boundary proximity and surcharge conditions tightening the rules, and that councils differ so the reader must confirm in writing.',
    ],
    [
      '04-approvals/03-structures-and-building-permits',
      'Patios, pergolas, decks, carports, sheds. What triggers a building permit vs development approval. MUST cover the Class 10a change effective 1 July 2026 (buildings under $50,000 no longer need a registered building contractor) and be precise about what that exemption does and does not remove — builder registration is a separate question from home indemnity insurance and from the building permit itself. Verify against Building and Energy WA.',
    ],
    [
      '04-approvals/04-pools-and-pool-fencing',
      'Pool and spa barriers as life-safety law: the non-climbable zone, gate hardware, what counts as climbable, mandatory council inspections and their frequency in WA. Emphasise designing the barrier FIRST and the garden around it, and that planting and structures must never breach it. Verify against Building and Energy WA / your council. AS 1926 — describe requirements, never reproduce the standard.',
    ],
    [
      '04-approvals/05-dividing-fences',
      'Dividing Fences Act 1961 (WA): who pays for what, what a "sufficient fence" is, giving notice, and what happens in a dispute. Practical framing: a landscaping project usually forces the issue. Verify against Building Commission / Consumer Protection / a Legal Aid or law-society WA page.',
    ],
    [
      '04-approvals/06-bores-roster-and-the-winter-ban',
      'The permanent two-day sprinkler roster by house number, the legal watering windows, the 1 June to 31 August total sprinkler ban, that it applies to bores as well as scheme water, penalties, new-garden and new-lawn exemptions and how to apply. Garden bore licensing with DWER and the Perth Groundwater Map. Verify everything against watercorporation.com.au and wa.gov.au. This is a design constraint, not a maintenance footnote.',
    ],
    [
      '04-approvals/07-bushfire-and-dieback',
      'Bushfire prone area mapping (DFES), what a BAL rating changes for materials, mulch and planting near the house, and the recent designation changes. Separately: Phytophthora dieback — how it spreads on boots, tools, soil and plants, hygiene practice, and asking suppliers about provenance. Verify against DFES, DWER/DBCA and the Dieback Working Group.',
    ],
  ],
  'phase-5': [
    [
      '05-concept-design/01-design-fundamentals',
      'Proportion, scale, unity, rhythm, repetition, focal points, balance. Teach them as testable against a drawing, not as vocabulary. Good free resources exist from landscape architecture schools and RHS-type bodies — verify them.',
    ],
    [
      '05-concept-design/02-functional-zoning',
      'Bubble diagrams and allocating every square metre by function, including the unglamorous ones: bins, clothesline, trailer, storage, side access. Fast, ugly, highest-value hour in the process.',
    ],
    [
      '05-concept-design/03-circulation-and-sightlines',
      'Real path widths by use, desire lines, views from internal rooms, overlooking from neighbours and upper storeys, and access for bins, trailers, mowers and future machinery. Give actual dimensions in mm.',
    ],
    [
      '05-concept-design/04-designing-for-a-perth-summer',
      'Forty-degree days and paving surface temperatures. Shade as the highest-value element in a Perth garden. Western wall heat, thermal mass, designing FOR the afternoon sea breeze rather than blocking it, and seating that has summer shade and winter sun. Use real Perth climate data from BOM.',
    ],
    [
      '05-concept-design/05-style-and-materials',
      'The WA palette: limestone, jarrah, granite, rammed earth, liquid limestone, corten, composite. How each weathers in Perth sun, salt and sand. Rough current Perth rates where verifiable. Building a material palette that constrains choices rather than just looking nice.',
    ],
    [
      '05-concept-design/06-hydrozoning',
      'Grouping planting by water requirement BEFORE drawing, so each zone can be watered correctly on two days a week. High / medium / low / unirrigated. Why mixing them guarantees you overwater the tough plants and kill the thirsty ones. Link forward to the irrigation mini-course.',
    ],
    [
      '05-concept-design/07-producing-the-concept-plan',
      'Actually drawing it. Free tools only: hand drawing on tracing paper over the base plan, SketchUp Free, QGIS, Inkscape, Excalidraw, graph paper. Verify each tool is still free and works. Scale, north point, title block, what to show and what to leave off.',
    ],
    [
      '05-concept-design/08-presenting-the-concept',
      'Presenting brief, then site analysis, then design — in that order. Taking feedback in writing before responding. Separating "this misses the brief" from "I would have chosen differently". Short lesson; do not pad.',
    ],
  ],
  'phase-6': [
    [
      '06-documentation/01-scaled-layout-plan',
      'Setting-out plan: dimensioning every element from at least two fixed reference points that will still exist when the site is a building site. Radii, offsets, checking the drawing closes.',
    ],
    [
      '06-documentation/02-levels-and-grading-plan',
      'Finished levels, fall direction and gradient for every surface, step riser consistency, and cut-and-fill volume calculation. Minimum falls for paving and lawn drainage in mm/m. Never directing water at the house or a boundary.',
    ],
    [
      '06-documentation/03-hardscape-details',
      'Sections through every built element: sub-base type and compacted depth, bedding, edge restraint, footing sizes, drainage behind walls, membranes, fixings. This is where quality is actually specified.',
    ],
    [
      '06-documentation/04-drainage-plan',
      'Soakwell sizing from impervious area — verify the actual calculation councils use in Perth and note that it varies, giving the common rule and telling readers to confirm. Soakwell setbacks from buildings and boundaries, connecting pipework falls, subsoil drains and outlets. AS 3500 referenced, not reproduced.',
    ],
    [
      '06-documentation/05-irrigation-plan',
      'Producing the irrigation drawing: hydrozones to stations, mainline route avoiding future excavation, accessible valve boxes, and checking total station run time fits the legal watering window. The engineering itself is the Phase 8 mini-course — link to it rather than duplicating.',
    ],
    [
      '06-documentation/06-planting-plan-and-schedule',
      'Drawing plants at MATURE spread, not nursery size. The schedule: botanical name, common name, quantity, pot size, spacing, mature dimensions, hydrozone, aspect. Checking availability at WA wholesale nurseries at the size specified. Totalling a real plant budget.',
    ],
    [
      '06-documentation/07-lighting-plan',
      'Lighting function first (steps, thresholds, paths) then features. Cable runs before surfaces. Warm colour temperature, shielding against glare and neighbour spill. Be precise about the WA line: extra-low-voltage 12V downstream of a plugged-in transformer is generally DIY; anything mains, including installing a fixed outdoor GPO or hard-wiring a transformer, requires a licensed electrical contractor.',
    ],
    [
      '06-documentation/08-specification-and-schedule-of-works',
      'The written half: materials to what standard, method, finish; then the task list in build order with dependencies, durations, approval lead times, and who does each task. The difference between "build a deck" and instructions a stranger could follow.',
    ],
  ],
  'phase-7': [
    [
      '07-costing/01-quantity-take-offs',
      'Systematic take-offs from your own drawings: m2, m3, linear metres, counts, with the wastage allowances the trade actually uses (paving cuts, compaction of sub-base, soil settlement). Units matching how Perth suppliers actually sell.',
    ],
    [
      '07-costing/02-perth-material-prices',
      'Retail garden centre vs landscape supply yard vs wholesale nursery. Where Perth landscapers actually buy paving, limestone, soil, mulch, turf, plants and retic. Bulk vs bagged break-even. Delivery and minimum orders. Name real Perth suppliers you can verify exist, and give price RANGES with the date, being explicit that they move.',
    ],
    [
      '07-costing/03-labour-hire-and-hidden-costs',
      'The costs beginners forget: machinery access width (measure the side of the house before booking a bobcat), tip fees by waste type in Perth, second deliveries, tools you had to buy, and costing your own hours honestly. Verify current Perth tip/transfer station fee structures where possible.',
    ],
    [
      '07-costing/04-building-the-quote',
      'How a professional assembles a price: materials, labour, plant, subcontractors, disposal, overhead, margin, contingency. Then applying the same structure to your own project. Realistic margin and contingency percentages, sourced.',
    ],
    [
      '07-costing/05-staging-the-project',
      'Staging so nothing is dug up twice and each stage leaves the garden usable. Services and drainage before surfaces, irrigation before soil and planting, planting landing in AUTUMN in Perth rather than spring. Approval lead times in front of the stages they gate.',
    ],
    [
      '07-costing/06-contracts-and-variations',
      "What must be in writing before work starts in WA, reasonable deposits and progress payments, the Home Building Contracts Act thresholds, home indemnity insurance, written variations before the work, and verifying a trade's registration and insurance. Verify against Consumer Protection WA and Building and Energy.",
    ],
    [
      '07-costing/07-diy-vs-subcontract',
      'A scoring framework: risk of getting it wrong, cost of fixing it, tools required, physical demand, and whether the law even permits it. Identify the tasks where a mistake is buried and expensive (drainage, base prep, retaining) versus where a keen amateur does fine.',
    ],
  ],
  'phase-8a': [
    [
      '08-build/01-site-establishment-and-safety',
      "Material drop zones, waste zones, machinery access, protecting retained trees and the neighbour's fence. PPE. HEAT: working alone in a Perth summer, hydration, the hours to avoid. Verify against WorkSafe WA guidance on working in heat.",
    ],
    [
      '08-build/02-demolition-and-clearing',
      'Separating waste streams so you are not paying mixed-waste rates. Killing perennial grasses (kikuyu, couch) properly BEFORE covering ground, and how long that actually takes. ASBESTOS in older WA structures — fibro sheeting, old fences — what to look for and the legal position on who may remove it. Verify against WorkSafe WA / DWER.',
    ],
    [
      '08-build/03-earthworks-and-setting-out',
      'Transferring the setting-out plan to the ground with profiles and string lines. Excavating to depth allowing for sub-base and surface thickness. Compacting fill in LAYERS. How sand behaves differently from clay. Trench safety and collapse risk.',
    ],
    [
      '08-build/04-machinery',
      'Bobcat vs mini excavator vs by hand. Access width and height. Dry hire vs wet hire including your own learning time. Perth hire rates where verifiable. Insurance and damage liability. Underground services — always link back to Before You Dig.',
    ],
    [
      '08-build/05-drainage-and-soakwells',
      'Installing soakwells and connecting downpipes, consistent falls with no bellies, geotextile against sand ingress, subsoil drainage for wet corners, and testing with water BEFORE backfilling. Do this before anything is built on top.',
    ],
    [
      '08-build/06-retaining-walls',
      'Building limestone block, core-filled block and sleeper walls. Footing on undisturbed ground, the first course being perfectly level, aggregate drainage and ag pipe behind the FULL height, geofabric separating drainage from backfill, compacting backfill in layers as you go. Why most failed walls failed. The honest point at which you stop and call an engineer — cross-link to the approvals lesson.',
    ],
    [
      '08-build/07-base-preparation',
      'Ninety per cent of paving failures are base failures. Sub-grade prep, correct sub-base material and depth for the loading, compaction in layers with the right compactor, and screeding bedding to consistent depth rather than using it to fix level errors.',
    ],
    [
      '08-build/08-paving',
      'Setting out the pattern so cuts fall where least visible, laying to string line, consistent joints, edge restraint on every free edge, jointing sand and compacting before use. SILICA DUST when cutting — this is a serious and under-appreciated hazard; cover wet cutting, P2/respirator requirements and the WA silica rules. Verify against WorkSafe WA.',
    ],
    [
      '08-build/09-concrete-and-liquid-limestone',
      'Formwork braced to design falls, reinforcement at correct cover not sitting on the ground, ordering the right mix and slump, enough hands for the pour, and curing — a Perth summer pour will crack if it dries too fast. Exposed aggregate, honed and liquid limestone finishes. Concrete burns as a real hazard.',
    ],
    [
      '08-build/10-decking',
      'Footings, bearer and joist spans against manufacturer span tables, ventilation and clearance beneath, jarrah vs composite in WA sun, correct fixings for coastal environments, and TERMITE management where the deck meets the house. Verify termite guidance for WA.',
    ],
    [
      '08-build/11-structures-pergolas-and-screens',
      'Post footings sized for WIND loading not just weight, span tables, and getting the building permit before starting. Services roughed in before cladding for outdoor kitchens. Plumbing and gas require licensed trades in WA.',
    ],
    [
      '08-build/12-irrigation-hydraulics',
      'IRRIGATION MINI-COURSE PART 1. Flow vs pressure, static vs dynamic pressure, friction loss through pipe and fittings, velocity limits and why oversized pipe is cheap insurance. Teach the actual calculation. Irrigation Australia and manufacturer design guides (Hunter, Rain Bird, Toro) publish good free material — verify it.',
    ],
  ],
  'phase-8b': [
    [
      '08-build/13-irrigation-water-source',
      'MINI-COURSE PART 2. Measuring what you actually have: static pressure with a gauge, flow by timed bucket test repeated, working pressure UNDER flow, service and meter size. Bores: pump specification, output, DWER licensing, and that the sprinkler roster applies to bores too.',
    ],
    [
      '08-build/14-irrigation-hydrozoning-and-stations',
      'MINI-COURSE PART 3. Turning hydrozones into stations. Never mixing lawn and beds, or sun and shade, on one station. Station flow within measured available flow. Total run time fitting inside the legal watering window — this constraint is what catches people out.',
    ],
    [
      '08-build/15-irrigation-emitters',
      'MINI-COURSE PART 4. Sprays, rotors, MP rotators, dripline. What each does well and wastes. Matched precipitation rate within a station. Pressure-compensating drip in beds. Required operating pressure vs what you measured. In Perth sand, low application rate is the difference between watering the plant and watering the aquifer.',
    ],
    [
      '08-build/16-irrigation-scheduling-and-uniformity',
      'MINI-COURSE PART 5. Calculating precipitation rate per station, running a catch-cup test, calculating distribution uniformity, converting a target water depth into run time, and cycle-and-soak. Water Corporation publishes application rates per sprinkler type and a target depth for Perth — verify and use them.',
    ],
    [
      '08-build/17-irrigation-mainline-valves-and-wiring',
      'MINI-COURSE PART 6. Pipe sizing and material, mainline route, accessible valve boxes not under future paving, solenoid wiring with direct-burial cable, waterproof joints and a spare core. BACKFLOW PREVENTION is a legal requirement in WA, not optional — verify the actual requirement with Water Corporation.',
    ],
    [
      '08-build/18-irrigation-controllers-and-compliance',
      'MINI-COURSE PART 7. Programming to rostered days only, start times so all stations finish inside the legal window, and a plan for the winter ban. Whether smart/weather-based controllers earn their money in Perth, rain sensors, and the Waterwise irrigation rebate if it still exists — verify.',
    ],
    [
      '08-build/19-irrigation-install-and-audit',
      'MINI-COURSE PART 8. Trench depths, laying and joining pipe, FLUSHING before fitting heads, setting arcs and radius, then the commissioning audit: pressure at the furthest head per station, catch-cup uniformity, final run times. Recording the as-built and photographing before backfilling.',
    ],
    [
      '08-build/20-garden-lighting',
      'Cable runs before surfaces and planting, transformer sizing with headroom, voltage drop over long runs, aiming and shielding after dark. Be precise and prominent about the WA legal line on mains work requiring a licensed electrical contractor and a certificate.',
    ],
    [
      '08-build/21-turning-perth-sand-into-soil',
      'Amendment depth matched to what will be planted, not a token top-dress. Clay type and actual application rates (bentonite vs kaolinite), incorporating rather than spreading, compost sources, wetting agents applied and watered in. Cross-link to the Phase 3 soil lessons rather than repeating them. Water Corporation and Green Life Soil Co have verified rates — reuse those sources.',
    ],
    [
      '08-build/22-planting',
      'Sourcing size that establishes well rather than biggest available, AUTUMN as the right season in Perth, hole preparation wider than deep, root ball height, teasing root-bound plants, staking only when needed and loosely, and the establishment watering that decides whether the plant budget survives its first February.',
    ],
    [
      '08-build/23-turf-for-perth',
      'Kikuyu, Couch, Buffalo (Sir Walter etc) and Zoysia: shade tolerance, wear, water use, thatch, invasiveness. Preparation and levelling BEFORE delivery, laying within a day, never leaving pallets in summer sun, rolling and immediate heavy watering. The new-lawn watering exemption — verify current terms with Water Corporation.',
    ],
    [
      '08-build/24-mulch-edging-and-finishing',
      'Mulch type and depth for Perth (coarse and chunky, not fine), keeping it off stems, physical edge restraint so beds hold their line, deliberate level transitions between materials, and levels correct so mulch does not wash onto paving in a winter storm.',
    ],
    [
      '08-build/25-final-clean-and-detail',
      'The last day: sweeping, topping up joints, adjusting every irrigation head with planting in place, aiming lighting after dark, and "after" photographs from the same fixed positions as the "before" set. Short lesson, do not pad.',
    ],
  ],
  'phase-9-11': [
    [
      '09-handover/01-the-defect-walkthrough',
      'A structured, unsentimental zone-by-zone walk listing everything not right, with a fix and a date for each. Testing all systems. Getting someone else to walk it too.',
    ],
    [
      '09-handover/02-as-built-drawings',
      'Marking up what was ACTUALLY built: real dimensions, actual irrigation and cable routes, valve and junction positions, soakwell locations and depths, plant substitutions. Photographing open trenches before backfill. Where to store it so you find it in five years.',
    ],
    [
      '09-handover/03-the-maintenance-manual',
      'What a professional hands over: seasonal task calendar, irrigation programme per season within the roster, plant-by-plant notes, fertiliser programme, pruning times, and the first twelve weeks establishment schedule. Written so a house-sitter could follow it.',
    ],
    [
      '09-handover/04-warranties-and-records',
      'What is warranted and what voids it. Electrical and plumbing compliance certificates — what you are entitled to receive in WA and why you need them when you sell. Filing receipts, permits and approvals with property records.',
    ],
    [
      '09-handover/05-photographing-your-project',
      'Early morning or late afternoon light, repeating the before positions, consistent natural eye height, wide establishing shots plus detail shots. Short and practical.',
    ],
    [
      '11-review/01-landscaping-and-property-value',
      'Separate evidence from marketing. What Perth agents and valuers actually respond to, what is personal indulgence, and an honest answer on what you get back. Look for real Australian research or REIWA/valuer commentary; if the evidence is thin, SAY SO rather than repeating a percentage from a landscaping company blog.',
    ],
    [
      '11-review/02-reviewing-against-the-brief',
      'Scoring the finished garden against the Phase 2 brief and Phase 1 charter. Final cost vs budget, actual duration vs estimate, identifying reasons for variance rather than excusing them.',
    ],
    [
      '11-review/03-portfolio-and-lessons-learnt',
      'Assembling the workbook into one document with a one-page summary. Short lesson.',
    ],
  ],
  'phase-10': [
    [
      '10-maintenance/01-the-first-twelve-weeks',
      'Establishment watering is different from ongoing watering, and getting it wrong wastes the whole plant budget. More Perth gardens die in their first summer than are ever killed by bad design. New-garden exemption, weekly stress checks, mulch off stems, replacing failures early and in season.',
    ],
    [
      '10-maintenance/02-the-perth-year',
      'A maintenance calendar on the Noongar six seasons — Birak, Bunuru, Djeran, Makuru, Djilba, Kambarang — because the European four seasons fit Perth badly. Treat the Noongar calendar RESPECTFULLY: it is Aboriginal knowledge, so attribute it, link to Noongar or BOM Indigenous Weather Knowledge sources, and do not present it as folklore or as your own framework. What to water, feed, prune, plant, mulch and check in each season, plus the fixed constraint of the winter sprinkler ban.',
    ],
    [
      '10-maintenance/03-watering-and-retic-audit',
      'Seasonal adjustment rather than set-and-forget. The annual pre-summer retic check. Station-by-station audit method to find the blocked nozzle quietly killing a corner. Water Corporation publishes the legal two-minute testing allowance and application rates — verify and use them. Controller backup battery.',
    ],
    [
      '10-maintenance/04-fertilising-perth-sand',
      'Sand holds nutrient like a colander holds soup, so heavy feeding ends up in groundwater and ultimately the Swan River. Slow and controlled release, lower rates more often, timed to growth, not before heavy winter rain. PHOSPHORUS-SENSITIVE WA natives (Proteaceae — banksia, grevillea, hakea) — which ones and what phosphorus does to them. Verify against Kings Park/BGPA or DPIRD.',
    ],
    [
      '10-maintenance/05-pruning',
      'The three reasons to prune, correct cut position (no stubs, no flush cuts), tool hygiene between plants where disease is a risk, and a Perth timing guide by plant type. Pruning at height and when to call an arborist instead.',
    ],
    [
      '10-maintenance/06-lawn-care-through-the-perth-year',
      'Mowing height by species and raising it into summer, wetting agent before the hot months, dethatching and coring annually where the species needs it, fertiliser timed to growth, and the spring renovation.',
    ],
    [
      '10-maintenance/07-wa-pests-and-diseases',
      'African black beetle, couch mite, Argentine ants, Portuguese millipedes, lawn grub/armyworm, and Phytophthora dieback. Identify before treating. Distinguish damage from cause. Least-toxic effective option first. Verify against DPIRD and the Dieback Working Group.',
    ],
    [
      '10-maintenance/08-wa-weeds',
      'The recurring invaders in Perth gardens, DECLARED PESTS the reader is legally obliged to control (check the DPIRD declared plants list for the Perth region), why kikuyu and couch escape into beds, and barrier/edging strategy. Dealing with weeds before they seed.',
    ],
    [
      '10-maintenance/09-renovate-replace-rethink',
      'Gardens have lifecycles. Annual review against the original brief, plants that have outgrown their position, distinguishing surface wear from base failure, planning replacements before things die.',
    ],
  ],
};

const REFERENCE = [
  [
    'src/content/reference/perth-soils.md',
    1,
    'Perth soils',
    'The Swan Coastal Plain dune systems — Bassendean, Spearwood/Karrakatta, Quindalup. How to identify which you are on, depth to limestone or coffee rock, pH, water repellency, and what each means for water, nutrient, excavation and plant choice. Include the Perth Groundwater Map for depth to watertable. This is the single reference the soil lessons point at.',
  ],
  [
    'src/content/reference/sprinkler-roster.md',
    2,
    'Sprinkler roster and water rules',
    'THE most-consulted page on the site. The permanent two-day roster mapped by house/lot number, exact legal watering windows, the 1 June to 31 August winter sprinkler ban, that it covers bores as well as scheme water, penalties, new garden and new lawn exemptions with their durations and how to apply, and garden bore licensing. Verify every figure against watercorporation.com.au and wa.gov.au today.',
  ],
  [
    'src/content/reference/permits-and-thresholds.md',
    3,
    'Permits and thresholds',
    'A single table of what triggers a building permit or development approval in WA for landscaping work: retaining wall retained heights, patios and pergolas, decks by floor height, sheds and carports, pools and barriers, fencing. Include the Class 10a change effective 1 July 2026. Be explicit that councils vary and that this table is a starting point for a phone call, not a substitute for one.',
  ],
  [
    'src/content/reference/plant-selection.md',
    4,
    'Plant selection for Perth',
    'Waterwise and WA native plants that actually perform here, grouped by hydrozone, aspect and purpose (screening, groundcover, feature, shade tree). Flag phosphorus-sensitive Proteaceae. Point at the Greenlife Industry WA Waterwise Plant Directory, Water Corporation waterwise plants, and Kings Park resources rather than duplicating a full plant database.',
  ],
  [
    'src/content/reference/suppliers.md',
    5,
    'Supplier directory',
    'Where the trade actually buys in Perth: landscape supply yards, wholesale and retail nurseries, turf farms, paving and limestone suppliers, reticulation suppliers, and tool/machinery hire. Only list businesses whose websites you have fetched and confirmed are trading. Explain what an account gets you and bulk vs bagged. Note this list dates and how to check.',
  ],
  [
    'src/content/reference/noongar-seasons.md',
    6,
    'The Noongar six seasons',
    "Birak, Bunuru, Djeran, Makuru, Djilba and Kambarang — the six seasons of the Noongar calendar and what each means for a Perth garden. TREAT THIS RESPECTFULLY: it is Aboriginal knowledge belonging to Noongar people. Attribute it clearly, link to Noongar-led or official sources (BOM Indigenous Weather Knowledge, Kaartdijin Noongar, South West Aboriginal Land and Sea Council), acknowledge Noongar people as the custodians, and do not present it as quaint folklore or as the course's own invention. Frame it as: this calendar describes what actually happens here far better than the European four seasons.",
  ],
];

// ── Run ─────────────────────────────────────────────────────────────────────
// `args` can arrive as a real array or as a JSON-encoded string depending on
// how the caller serialised it. Accept both, plus a plain comma-separated list.
function parseBatches(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed.startsWith('[')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        /* fall through to the comma split */
      }
    }
    return trimmed
      .split(',')
      .map((s) => s.trim().replace(/^["'[]+|["'\]]+$/g, ''))
      .filter(Boolean);
  }
  return value ? [value] : [];
}

// Flat lookup so a batch can be specified either by phase key or as an explicit
// list of lesson ids. The explicit form is what makes re-running safe after a
// crash: pass only the lessons still marked `status: stub` and nothing already
// written gets touched.
const NOTE_BY_ID = new Map();
for (const entries of Object.values(LESSONS)) {
  for (const [id, note] of entries) NOTE_BY_ID.set(id, note);
}

const batches = parseBatches(args);
const work = [];
const unknown = [];

for (const batch of batches) {
  if (batch === 'reference') {
    for (const [file, order, title, note] of REFERENCE) {
      work.push({ kind: 'reference', file, order, title, note });
    }
  } else if (LESSONS[batch]) {
    for (const [id, note] of LESSONS[batch]) {
      work.push({ kind: 'lesson', file: `src/content/lessons/${id}.mdx`, note });
    }
  } else if (batch.startsWith('verify:')) {
    // Audit an already-written file without rewriting it. Used to finish the
    // verification pass when a run is cut short after the writers land but
    // before their auditors do.
    const id = batch.slice('verify:'.length);
    const file = id.startsWith('src/') ? id : `src/content/lessons/${id}.mdx`;
    work.push({ kind: 'verify-only', file });
  } else if (NOTE_BY_ID.has(batch)) {
    work.push({
      kind: 'lesson',
      file: `src/content/lessons/${batch}.mdx`,
      note: NOTE_BY_ID.get(batch),
    });
  } else {
    unknown.push(batch);
  }
}

if (unknown.length) log(`ignored ${unknown.length} unrecognised item(s): ${unknown.join(', ')}`);

log(`${work.length} items in this batch`);

phase('Write');

const results = await pipeline(
  work,
  (item) =>
    item.kind === 'verify-only'
      ? Promise.resolve('already written — audit only')
      : item.kind === 'reference'
        ? agent(
            `${REFERENCE_SHARED}\n\nYOUR ASSIGNED PAGE\nCreate: ${item.file}\nTitle: "${item.title}"\norder: ${item.order}\nEditorial direction: ${item.note}`,
            { label: `write:${item.file.split('/').pop()}`, phase: 'Write' },
          )
        : agent(
            `${SHARED}\n\nYOUR ASSIGNED LESSON\nStub file: ${item.file}\nEditorial direction: ${item.note}`,
            { label: `write:${item.file.split('/').pop()}`, phase: 'Write' },
          ),
  (_report, item) =>
    agent(
      `Independently audit ${item.file}, which another writer just produced for the Setting Out
landscaping course (Perth, Western Australia).

Checks — report findings, and FIX the ones noted as fixable:
1. Read the file. Extract every URL in the frontmatter (resources, videos, regulations) AND every
   external URL in the body.
2. WebFetch each one. Report any that 404, redirect somewhere unrelated, or whose content does
   not support the "whyGood" claim made about it. FIX these: remove the resource entirely, or
   correct the URL if you can verify a working replacement. Never leave a broken link in place.
3. Any videos entry: verify the youtubeId resolves to a real video matching the stated title and
   channel. A fabricated video id is the worst possible failure — if you cannot confirm it,
   DELETE that entry.
4. Report any WA regulatory claim, threshold, legal duty, fee or price stated in the body WITHOUT
   a verifiable source link. Quote the sentence. If it is a specific number you cannot verify,
   soften it to point at the primary source instead of asserting it.
5. Report American spelling, imperial units, or generic non-WA filler. Fix spelling and units.
6. Confirm the frontmatter still carries the ORIGINAL title, summary, timeEstimate, difficulty,
   checklist and deliverable unchanged. (Reference pages have no stub, so skip this one for them.)
7. Confirm status is "complete" and updated is 2026-08-02, and that the YAML is valid — this is a
   Zod-validated content collection and a malformed file breaks the whole build.

Do NOT rewrite the prose for style. Only fix broken links, fabricated videos, unsourced numbers,
spelling, units and invalid YAML.

Return a concise findings list. If everything checks out, say so plainly.`,
      { label: `verify:${item.file.split('/').pop()}`, phase: 'Verify' },
    ),
);

return { items: work.length, verified: results.filter(Boolean).length };
