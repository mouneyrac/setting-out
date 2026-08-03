/**
 * Printable templates for the course deliverables.
 *
 * Deliberately not PDFs. These are HTML pages you can fill in on screen, print
 * to A4, or save as a PDF from the browser — which is strictly more useful than
 * a static PDF, needs no dependencies, and works on a phone in the garden.
 */

export type Section =
  | { title: string; hint?: string; kind: 'fields'; fields: { label: string; hint?: string; lines?: number }[] }
  | { title: string; hint?: string; kind: 'table'; columns: string[]; rows: number }
  | { title: string; hint?: string; kind: 'checklist'; items: string[] }
  | { title: string; hint?: string; kind: 'notes'; lines: number };

export interface Template {
  slug: string;
  title: string;
  summary: string;
  phase: number;
  /** The lesson this template belongs to, for the "back to the lesson" link. */
  lessonPath?: string;
  intro: string;
  sections: Section[];
}

export const templates: Template[] = [
  {
    slug: 'design-brief',
    title: 'Design brief',
    summary:
      'The document every later decision gets measured against — including the review in Phase 11.',
    phase: 2,
    lessonPath: '/curriculum/brief/writing-the-design-brief/',
    intro:
      'Fill this in before you draw anything. A brief that says what you are NOT doing is worth more than one that lists everything you might like.',
    sections: [
      {
        title: 'Who and what',
        kind: 'fields',
        fields: [
          { label: 'Property address' },
          { label: 'Who uses the garden, and how', lines: 3 },
          { label: 'What the garden has to do in five years', hint: 'Kids, dogs, ageing, resale', lines: 3 },
        ],
      },
      {
        title: 'Must have',
        hint: 'If it is not here, it does not get built.',
        kind: 'table',
        columns: ['Requirement', 'Why', 'Deal-breaker?'],
        rows: 8,
      },
      {
        title: 'Deliberately not doing',
        hint: 'The most useful section. Write down what you are ruling out and why.',
        kind: 'table',
        columns: ['Excluded', 'Reason'],
        rows: 5,
      },
      {
        title: 'Money and time',
        kind: 'fields',
        fields: [
          { label: 'Total budget' },
          { label: 'Contingency %' },
          { label: 'How long you are willing to wait' },
          { label: 'Hours per week you can actually work on it' },
        ],
      },
      {
        title: 'Maintenance you will realistically sustain',
        hint: 'Be honest. A garden designed for effort you will not spend is a garden that fails.',
        kind: 'fields',
        fields: [{ label: 'Hours per month', hint: 'Including mowing' }, { label: 'What you will happily do, and what you will not', lines: 3 }],
      },
      {
        title: 'Three things that would make this a failure',
        kind: 'notes',
        lines: 5,
      },
    ],
  },

  {
    slug: 'site-analysis',
    title: 'Site analysis record',
    summary: 'Everything you measure and observe on site, on one sheet you take outside.',
    phase: 3,
    lessonPath: '/curriculum/site-analysis/constraints-and-opportunities-plan/',
    intro:
      'Take this outside with a tape, a spade and your phone. Filling it in is Phase 3. Everything on it gets referenced repeatedly afterwards.',
    sections: [
      {
        title: 'Soil',
        kind: 'table',
        columns: ['Test area', 'Colour / type', 'Depth to hard layer', 'pH', 'Water drop test (sec)', 'Drainage'],
        rows: 4,
      },
      {
        title: 'Levels',
        kind: 'fields',
        fields: [
          { label: 'Datum point — where is it, and can you find it again?' },
          { label: 'Highest point (relative to datum)' },
          { label: 'Lowest point' },
          { label: 'Fall across the site (mm, and as %)' },
        ],
      },
      {
        title: 'Sun, shade and wind',
        kind: 'table',
        columns: ['Area', 'Sun 9am', 'Sun noon', 'Sun 3pm', 'Exposed to sea breeze?'],
        rows: 5,
      },
      {
        title: 'Water',
        kind: 'fields',
        fields: [
          { label: 'Roof area (m²)' },
          { label: 'Existing paved / impervious area (m²)' },
          { label: 'Existing soakwells — where, how many, what size' },
          { label: 'Where water ponds after heavy rain', lines: 2 },
          { label: 'Depth to watertable (Perth Groundwater Map)' },
        ],
      },
      {
        title: 'Services located',
        hint: 'Lodge a free Before You Dig Australia enquiry first — it is a legal obligation before excavating.',
        kind: 'checklist',
        items: [
          'Before You Dig Australia enquiry lodged, plans received',
          'Sewer line and access chamber marked',
          'Water meter and isolating valve marked',
          'Power — overhead and underground — marked',
          'Gas marked',
          'Comms marked',
          'Existing reticulation traced and marked',
        ],
      },
      {
        title: 'Constraints',
        kind: 'notes',
        lines: 6,
      },
      {
        title: 'Opportunities',
        hint: 'Not just the problems. Good views, sheltered corners, mature planting worth keeping, winter sun.',
        kind: 'notes',
        lines: 5,
      },
    ],
  },

  {
    slug: 'existing-garden-audit',
    title: 'Existing garden audit',
    summary: 'Every existing element with a verdict and a reason. The core of a renovation.',
    phase: 3,
    lessonPath: '/curriculum/site-analysis/auditing-an-existing-garden/',
    intro:
      'Renovating is harder than starting from bare sand because you have to judge what is worth keeping. Give every element a verdict — KEEP, RELOCATE, REPLACE or REMOVE — and a one-line reason. No blanks.',
    sections: [
      {
        title: 'Plants',
        hint: 'Everything over knee height.',
        kind: 'table',
        columns: ['What / where', 'Condition', 'Years left', 'Verdict', 'Reason'],
        rows: 14,
      },
      {
        title: 'Hard surfaces',
        hint: 'Judge the base, not the surface. A clean-looking paver over a failed base is a replacement, not a wash.',
        kind: 'table',
        columns: ['Surface / where', 'Area m²', 'Base sound?', 'Verdict', 'Reason'],
        rows: 6,
      },
      {
        title: 'Structures',
        kind: 'table',
        columns: ['Structure', 'Condition', 'Approved / compliant?', 'Verdict', 'Reason'],
        rows: 5,
      },
      {
        title: 'Reticulation — station by station',
        kind: 'table',
        columns: ['Station', 'What it covers', 'Faults found', 'Pressure OK?', 'Verdict'],
        rows: 10,
      },
      {
        title: 'Hazards and legal problems',
        hint: 'Asbestos in older structures, unapproved retaining, pool barrier breaches, dead trees.',
        kind: 'notes',
        lines: 5,
      },
    ],
  },

  {
    slug: 'plant-schedule',
    title: 'Plant schedule',
    summary: 'What you take to the wholesale nursery, and what stops you buying forty of something.',
    phase: 6,
    lessonPath: '/curriculum/documentation/planting-plan-and-schedule/',
    intro:
      'Draw plants at MATURE spread on the plan, then list them here. Check availability at the size you specified before you commit — WA nurseries do not always have what a plan assumes.',
    sections: [
      {
        title: 'Schedule',
        kind: 'table',
        columns: ['Code', 'Botanical name', 'Common name', 'Qty', 'Pot size', 'Spacing', 'Mature H × W', 'Hydrozone', 'Aspect', 'Unit $', 'Total $'],
        rows: 20,
      },
      {
        title: 'Phosphorus-sensitive species on this list',
        hint: 'Proteaceae — banksia, grevillea, hakea — will be damaged by standard fertiliser. Flag them now so the maintenance manual gets it right.',
        kind: 'notes',
        lines: 3,
      },
      {
        title: 'Substitutions agreed with the supplier',
        kind: 'table',
        columns: ['Specified', 'Substituted', 'Why', 'Approved by'],
        rows: 4,
      },
    ],
  },

  {
    slug: 'cost-plan',
    title: 'Cost plan',
    summary: 'The real number, built the way a professional builds a quote.',
    phase: 7,
    lessonPath: '/curriculum/costing/building-the-quote/',
    intro:
      'Take quantities off your own drawings, price them, then add the things beginners forget. Compare the total against the budget you committed to in Phase 1 — and if there is a gap, decide how to close it before you start, not halfway through.',
    sections: [
      {
        title: 'Materials',
        kind: 'table',
        columns: ['Item', 'Qty', 'Unit', 'Rate $', 'Wastage %', 'Total $'],
        rows: 14,
      },
      {
        title: 'Plant hire and machinery',
        hint: 'Check your narrowest access point before assuming a bobcat fits.',
        kind: 'table',
        columns: ['Machine / tool', 'Days', 'Rate $', 'Delivery $', 'Total $'],
        rows: 5,
      },
      {
        title: 'Subcontractors',
        hint: 'Real quotes, not estimates. Check registration and insurance.',
        kind: 'table',
        columns: ['Trade', 'Scope', 'Quoted $', 'Licence checked?'],
        rows: 5,
      },
      {
        title: 'The costs beginners forget',
        kind: 'table',
        columns: ['Item', 'Total $'],
        rows: 7,
      },
      {
        title: 'Your own labour',
        kind: 'fields',
        fields: [
          { label: 'Estimated hours' },
          { label: 'Value per hour (even if you do not pay it)' },
          { label: 'Notional total' },
        ],
      },
      {
        title: 'Totals',
        kind: 'fields',
        fields: [
          { label: 'Subtotal' },
          { label: 'Contingency % and $', hint: 'Not optional.' },
          { label: 'TOTAL' },
          { label: 'Phase 1 budget' },
          { label: 'Gap, and how you will close it', lines: 3 },
        ],
      },
    ],
  },

  {
    slug: 'retic-audit',
    title: 'Reticulation audit',
    summary: 'The annual pre-summer check that finds the blocked nozzle killing a corner.',
    phase: 10,
    lessonPath: '/curriculum/maintenance/watering-and-retic-audit/',
    intro:
      'Run this before summer, every year. In Perth you may run each station briefly for testing on your rostered days within the legal windows — check the current rules on the WA reference page before you start.',
    sections: [
      {
        title: 'System',
        kind: 'fields',
        fields: [
          { label: 'Date of audit' },
          { label: 'Water source', hint: 'Scheme, bore, or both' },
          { label: 'Rostered watering days' },
          { label: 'Controller make / model, battery OK?' },
        ],
      },
      {
        title: 'Station by station',
        kind: 'table',
        columns: ['Stn', 'Covers', 'Emitter type', 'Heads blocked / broken / sunken', 'Arc & radius OK?', 'Pressure at furthest head', 'Run time set'],
        rows: 12,
      },
      {
        title: 'Catch-cup test',
        hint: 'On the stations that matter most — usually lawn.',
        kind: 'table',
        columns: ['Station', 'Cups placed', 'Lowest mm', 'Highest mm', 'Average mm', 'Uniformity'],
        rows: 4,
      },
      {
        title: 'Fixed today',
        kind: 'notes',
        lines: 5,
      },
      {
        title: 'Still to fix',
        kind: 'table',
        columns: ['Problem', 'Fix', 'By when'],
        rows: 5,
      },
    ],
  },

  {
    slug: 'maintenance-calendar',
    title: 'Maintenance calendar',
    summary: 'The Perth year on the Noongar six seasons, which fit this place far better than four.',
    phase: 10,
    lessonPath: '/curriculum/maintenance/the-perth-year/',
    intro:
      'The Noongar six-season calendar is Aboriginal knowledge belonging to Noongar people, and it describes what actually happens in this part of the world far better than the imported European four. Fill in what YOUR garden needs in each season.',
    sections: [
      {
        title: 'Birak — December and January',
        hint: 'Hot and dry. First summer heat.',
        kind: 'table',
        columns: ['Watering', 'Feeding', 'Pruning', 'Checks and repairs'],
        rows: 2,
      },
      {
        title: 'Bunuru — February and March',
        hint: 'The hottest part of the year. Little to no rain.',
        kind: 'table',
        columns: ['Watering', 'Feeding', 'Pruning', 'Checks and repairs'],
        rows: 2,
      },
      {
        title: 'Djeran — April and May',
        hint: 'The break in the heat. Cool nights, dewy mornings. The best planting window in Perth.',
        kind: 'table',
        columns: ['Watering', 'Feeding', 'Planting', 'Checks and repairs'],
        rows: 2,
      },
      {
        title: 'Makuru — June and July',
        hint: 'The first heavy rains and the coldest part of the year. Sprinklers are banned.',
        kind: 'table',
        columns: ['Watering', 'Feeding', 'Pruning', 'Checks and repairs'],
        rows: 2,
      },
      {
        title: 'Djilba — August and September',
        hint: 'Mixed wet days and clear cold nights. Growth starting.',
        kind: 'table',
        columns: ['Watering', 'Feeding', 'Pruning', 'Checks and repairs'],
        rows: 2,
      },
      {
        title: 'Kambarang — October and November',
        hint: 'Rains decreasing, wildflowers at their height. Get ready for summer.',
        kind: 'table',
        columns: ['Watering', 'Feeding', 'Pruning', 'Checks and repairs'],
        rows: 2,
      },
      {
        title: 'Fixed dates that constrain you',
        kind: 'checklist',
        items: [
          'Winter sprinkler ban — confirm current dates on the WA reference page',
          'Retic audit before summer',
          'Wetting agent before the hot months',
          'Lawn renovation window',
        ],
      },
    ],
  },
];

export const templateBySlug = new Map(templates.map((t) => [t.slug, t]));
