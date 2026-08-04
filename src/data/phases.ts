export interface Phase {
  number: number;
  slug: string;
  title: string;
  /** One line, shown under the title in navigation. */
  tagline: string;
  /** What this phase is for, in the voice of the course. */
  description: string;
  /** What you walk away holding. */
  outcome: string;
}

export const phases: Phase[] = [
  {
    number: 1,
    slug: 'trade-and-process',
    title: 'The trade and the process',
    tagline: 'What the job actually is, before you touch a shovel',
    description:
      'Landscaping is three different jobs wearing the same word. Before anything else, work out which one you are doing at any given moment, what the whole professional sequence looks like, and how to run it honestly on a block you own.',
    outcome:
      'A clear map of the eleven phases, and a written definition of what "finished" means for your garden.',
  },
  {
    number: 2,
    slug: 'brief',
    title: 'First contact and the brief',
    tagline: 'The conversation that decides whether the project works',
    description:
      'A professional does not start designing when a client rings. They qualify, they visit, they have the uncomfortable money conversation, and they write it all down. The brief is the document every later decision gets measured against — including yours.',
    outcome:
      'A written design brief for your own property: goals, constraints, budget, and what you are not doing.',
  },
  {
    number: 3,
    slug: 'site-analysis',
    title: 'Site analysis',
    tagline: 'Reading a Perth block properly',
    description:
      'Everything expensive that goes wrong in a garden was visible on site before the work started. This is the phase where a professional finds it: levels, soil, sun, wind, water, services, and an honest audit of what is already there.',
    outcome: 'A measured base plan and a constraints-and-opportunities plan for your block.',
  },
  {
    number: 4,
    slug: 'approvals',
    title: 'Rules, permits and approvals',
    tagline: 'What Western Australia will and will not let you build',
    description:
      'WA has the strictest retaining wall threshold in the country, a permanent sprinkler roster, a winter sprinkler ban, and a council that will make you take it out if you get it wrong. Find out what applies to your block before you design around something you cannot have.',
    outcome:
      'A written list of every approval your project needs, with the relevant thresholds and who to ask.',
  },
  {
    number: 5,
    slug: 'concept-design',
    title: 'Concept design',
    tagline: 'Turning a brief and a site into a plan',
    description:
      'The creative phase, and the one amateurs skip straight to. Done properly it is systematic: zone the space by function, resolve circulation, design for a 40-degree February, group plants by water need, then draw it.',
    outcome:
      'A concept plan for your property that answers the brief and respects the site analysis.',
  },
  {
    number: 6,
    slug: 'documentation',
    title: 'Detailed design and documentation',
    tagline: 'Drawings you can actually build from',
    description:
      'A concept is a picture. Documentation is instructions: setting-out dimensions, levels, sections through every built element, drainage falls, irrigation stations, a plant schedule with counts and pot sizes. This is what separates a design from a wish.',
    outcome:
      'A full document set for your project — layout, levels, details, drainage, irrigation, planting, lighting, specification.',
  },
  {
    number: 7,
    slug: 'costing',
    title: 'Costing, quoting and contract',
    tagline: 'What it costs, and what it really costs',
    description:
      'Take quantities off your own drawings, price them at Perth rates, add the costs beginners forget — tipping fees, plant hire, the bobcat that cannot get down the side — then decide what you build yourself and what you pay someone to do.',
    outcome:
      'A costed, staged project plan you can actually afford, with a DIY-versus-subcontract decision on every element.',
  },
  {
    number: 8,
    slug: 'build',
    title: 'Build',
    tagline: 'Doing the work, in the right order',
    description:
      'The longest phase and the one with the most ways to waste money. Sequence matters: services, then levels, then drainage, then structure, then hard surfaces, then irrigation, then soil, then plants. Get it backwards and you dig it up twice.',
    outcome: 'A built garden, and the skills to build the next one faster.',
  },
  {
    number: 9,
    slug: 'handover',
    title: 'Handover and records',
    tagline: 'Closing out like a professional, even to yourself',
    description:
      'A pro walks the job, lists the defects, hands over as-built drawings, a maintenance manual and warranties. Do the same for yourself and future-you will know where the mainline runs and what that shrub was called.',
    outcome: 'As-built drawings, a maintenance manual and a watering schedule for your own garden.',
  },
  {
    number: 10,
    slug: 'maintenance',
    title: 'Maintenance and establishment',
    tagline: 'The phase that decides whether any of it survives',
    description:
      'More Perth gardens die in the first summer than are ever killed by bad design. Establishment care, seasonal watering within the roster, feeding sand that holds nothing, and knowing the local pests — this is where the value is kept.',
    outcome:
      'A year-round maintenance calendar built on the Noongar six seasons, and a retic system you can audit.',
  },
  {
    number: 11,
    slug: 'review',
    title: 'Value and review',
    tagline: 'What it was worth, and what you learnt',
    description:
      'Measure the result against the brief you wrote in phase 2, understand what landscaping actually does to a Perth property valuation, and write down what you would do differently. Then do the next one better.',
    outcome:
      'An honest project review, a documented portfolio, and a shortlist of what to change next time.',
  },
];

export const phaseBySlug = new Map(phases.map((p) => [p.slug, p]));
export const phaseByNumber = new Map(phases.map((p) => [p.number, p]));

export function getPhase(n: number): Phase {
  const phase = phaseByNumber.get(n);
  if (!phase) throw new Error(`Unknown phase number: ${n}`);
  return phase;
}
