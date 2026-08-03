/**
 * The curriculum, as data.
 *
 * `scripts/scaffold-curriculum.mjs` reads this and writes any MDX file that
 * does not already exist under src/content/lessons/. It never overwrites a
 * file, so once a lesson has real prose in it this seed is only a record of
 * the original skeleton.
 *
 * Adding a lesson: add it here, re-run `node scripts/scaffold-curriculum.mjs`.
 */

/** @typedef {{ title: string, prompt: string, workbookKey: string }} Deliverable */

export const curriculum = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 1,
    dir: '01-trade-and-process',
    lessons: [
      {
        slug: 'what-the-trades-are',
        title: 'What a landscaper, designer and landscape architect each actually do',
        summary:
          'Three different jobs share the word "landscaping", and they charge, think and are regulated differently. Knowing which hat you are wearing at any moment is what stops you making a beginner mistake with a professional\'s confidence.',
        time: '20 min',
        difficulty: 'foundation',
        checklist: [
          'Name the three roles and what each is paid to produce',
          'List the WA trades that legally require a licence or registration',
          'Identify which role each phase of this course puts you in',
          'Write down the point at which you will stop and hire someone',
        ],
      },
      {
        slug: 'the-full-workflow',
        title: 'The full professional workflow, end to end',
        summary:
          'The map of the entire course: eleven phases from the first phone call to the tenth year of maintenance. Learn the sequence now and every later lesson has somewhere to sit.',
        time: '25 min',
        difficulty: 'foundation',
        checklist: [
          'Recite the eleven phases in order without looking',
          'Explain why site analysis comes before concept design',
          'Explain why irrigation goes in before soil and plants',
          'Identify the three phases where projects most often go wrong',
        ],
      },
      {
        slug: 'being-your-own-client',
        title: 'Being your own client without kidding yourself',
        summary:
          'The whole method here is that you play both roles. That is an advantage — infinite site access, no communication loss — and a trap, because nobody is holding you to a brief or a budget. This lesson sets up the discipline that replaces the client.',
        time: '20 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Your project charter',
          prompt:
            'In one paragraph: what does "finished" look like for your garden? Then three numbers — the budget you are willing to spend, the months you are willing to wait, and the hours per week you can actually work on it. Be honest; you will be measured against this in Phase 11.',
          workbookKey: 'project-charter',
        },
        checklist: [
          'Write a one-paragraph definition of "done"',
          'Commit to a budget figure, a timeframe and a weekly hour count',
          'Name the person who will tell you the truth about the result',
        ],
      },
      {
        slug: 'your-project-workbook',
        title: 'Your project workbook — what you will have produced by the end',
        summary:
          'Every phase produces a real document. Stacked together they are a professional landscape design package for your own property, and the reason this course is worth more than watching videos.',
        time: '10 min',
        difficulty: 'foundation',
        checklist: [
          'Understand what each phase deposits into the workbook',
          'Set up somewhere to keep photos, receipts and measurements',
          'Take your "before" photos from fixed positions you can repeat',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 2,
    dir: '02-brief',
    lessons: [
      {
        slug: 'the-enquiry-call',
        title: 'The enquiry call: the questions a pro asks before quoting anything',
        summary:
          'A good landscaper qualifies on the phone in ten minutes: what, where, when, how much, and who decides. Half of enquiries are politely declined at this stage. Learn the questions and you will ask them of yourself.',
        time: '25 min',
        difficulty: 'foundation',
        checklist: [
          'List the ten qualifying questions and why each one matters',
          'Recognise the warning signs that make a pro walk away',
          'Answer all ten questions about your own project',
        ],
      },
      {
        slug: 'the-consultation-visit',
        title: 'The consultation visit: how a pro runs the first meeting',
        summary:
          'Ninety minutes on site, a structured walk-through, and a specific set of things they photograph and measure before leaving. There is a method to it, and it is repeatable.',
        time: '30 min',
        difficulty: 'foundation',
        checklist: [
          'Follow the standard walk-through sequence around your own block',
          'Photograph every boundary, level change, downpipe and service point',
          'Note what the neighbours can see and what sees you',
          'Record what the client (you) says they want, verbatim, before analysing it',
        ],
      },
      {
        slug: 'the-money-conversation',
        title: 'The money conversation: Perth budget bands and what they actually buy',
        summary:
          'The single most useful thing a professional knows is what a number buys. Realistic Perth ranges for a courtyard, a full backyard, retic, paving, decking and a retaining wall — so you can size ambition to wallet before you fall in love with a drawing.',
        time: '35 min',
        difficulty: 'foundation',
        checklist: [
          'Know the rough Perth range for each major element',
          'Understand why the same paving job varies by a factor of three',
          'Set a total budget and a contingency percentage',
        ],
      },
      {
        slug: 'needs-wants-and-the-five-year-view',
        title: 'Needs, wants, and the five-year view',
        summary:
          'Clients ask for what they can picture, not what they need. The professional skill is separating the two, and asking what the property has to do in five years — kids, dogs, ageing, resale — before committing concrete to the ground.',
        time: '25 min',
        difficulty: 'foundation',
        checklist: [
          'Split your wish list into must-have, should-have and nice-to-have',
          'Write what the garden must support in five years',
          'Identify the decisions that are expensive to reverse',
        ],
      },
      {
        slug: 'writing-the-design-brief',
        title: 'Writing the design brief',
        summary:
          'The brief is the contract between the site and the design. Everything from here gets tested against it, and in Phase 11 you will score the finished garden against this document.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Your design brief',
          prompt:
            'Write the full brief for your property: who uses the garden and how; the must-haves; the explicit exclusions; the budget and staging; the maintenance level you will realistically sustain; the style direction; and the three things that would make you call the project a failure.',
          workbookKey: 'design-brief',
        },
        checklist: [
          'Cover users, uses, must-haves, exclusions, budget, maintenance and style',
          'State what you are deliberately NOT doing',
          'Have someone else read it and tell you what is missing',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 3,
    dir: '03-site-analysis',
    lessons: [
      {
        slug: 'measuring-up',
        title: 'Measuring up: a base plan without paying a surveyor',
        summary:
          'Triangulation, running dimensions and a long tape will get you a base plan accurate enough to build from. Learn the method, and learn when the block is complicated enough that a feature survey is cheaper than the mistakes.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Measured base plan',
          prompt:
            'Produce a scaled base plan of your property showing boundaries, house footprint, doors and windows, paths, existing structures, downpipes, taps, meter, and every tree over two metres. Note the scale and the date.',
          workbookKey: 'base-plan',
        },
        checklist: [
          'Obtain your Certificate of Title / site plan for boundary dimensions',
          'Measure the house footprint and check it closes',
          'Locate every fixed object by triangulation from two known points',
          'Draw it to scale and check two diagonals against the site',
        ],
      },
      {
        slug: 'levels-falls-and-datum',
        title: 'Levels, falls and datum: shooting levels cheaply and accurately',
        summary:
          'Every drainage decision, every step, every retaining wall and every paved surface depends on levels. Water hose level, string line, laser level and dumpy — what each costs, what each is good for, and how to set a datum you can return to.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Levels survey',
          prompt:
            'Set a permanent datum point on your block and record spot levels on a grid across the site, plus at every door threshold, boundary corner, and existing drain. Mark them on your base plan.',
          workbookKey: 'levels-survey',
        },
        checklist: [
          'Establish and physically mark a permanent datum',
          'Record spot levels on a grid and at all critical points',
          'Calculate the fall across the site in mm and as a percentage',
          'Identify where water currently goes in heavy rain',
        ],
      },
      {
        slug: 'perth-soils',
        title: 'Perth soils: identifying Bassendean, Spearwood and Karrakatta on your block',
        summary:
          'The Swan Coastal Plain is a set of ancient dune systems, and which one you are on changes your plant list, your irrigation design and your soil budget. Grey sand, yellow sand, or brown sand over limestone — find out which you have and what it means.',
        time: '45 min',
        difficulty: 'foundation',
        checklist: [
          'Dig a test hole and identify your soil profile by colour and depth',
          'Determine whether you hit limestone, clay or coffee rock, and at what depth',
          'Locate your suburb on the Perth dune system map',
          'Note the drainage rate from a filled test hole',
        ],
      },
      {
        slug: 'soil-testing',
        title: 'Soil testing: pH, water repellency, depth and nutrition',
        summary:
          'Perth sand is hydrophobic, nutrient-poor and often alkaline near limestone. Four cheap tests tell you what you are dealing with, and they determine thousands of dollars of decisions later in the project.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Soil report',
          prompt:
            'Record results for each test area on your block: soil type, pH, water repellency (the water-drop test), depth to any hard layer, and drainage rate. Note which areas will need the most amendment.',
          workbookKey: 'soil-report',
        },
        checklist: [
          'Run the water-drop test for hydrophobicity in at least three spots',
          'Test pH in each planting zone',
          'Record depth to limestone, clay or compacted layer',
          'Time a drainage test in each major zone',
        ],
      },
      {
        slug: 'sun-shade-and-aspect',
        title: 'Sun, shade and the Fremantle Doctor: aspect analysis south of the equator',
        summary:
          'North-facing gets the sun here, west-facing walls will cook you and your plants, and the afternoon sea breeze is a design element you can plan for. Map the sun through the year and the wind through the day.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Sun and wind analysis',
          prompt:
            'Overlay onto your base plan: summer and winter sun paths, the areas in shade at 9am / noon / 3pm, the hottest surfaces on site, the prevailing summer sea breeze direction, and the winter storm direction.',
          workbookKey: 'sun-wind-analysis',
        },
        checklist: [
          'Map shade at three times of day in the current season',
          'Work out which areas get afternoon western sun in February',
          'Note where the afternoon sea breeze enters and where it is blocked',
          'Identify frost pockets or heat traps',
        ],
      },
      {
        slug: 'water-on-site',
        title: 'Water on site: drainage, soakwells, low spots and roof runoff',
        summary:
          'Find out where every litre goes before you change a single level. Roof areas, downpipes, existing soakwells, surface falls, the puddle that never dries, and whether your neighbour\'s stormwater is your problem.',
        time: '60 min',
        difficulty: 'intermediate',
        checklist: [
          'Locate and probe every existing soakwell',
          'Calculate your total roof and paved (impervious) area',
          'Map where surface water flows and ponds after heavy rain',
          'Check no runoff discharges onto a neighbouring property',
        ],
      },
      {
        slug: 'locating-services',
        title: 'Locating services: Before You Dig, sewer, water, power, gas and existing retic',
        summary:
          'In WA you have a legal obligation under the Work Health and Safety Act 2020 to identify underground services before excavating, and you can be held liable for the damage. The free lodgement takes a day; hitting a gas main takes considerably longer.',
        time: '45 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Services plan',
          prompt:
            'Lodge a Before You Dig Australia enquiry for your address, then mark every located service on your base plan: sewer line and access chambers, water main and meter, power (overhead and underground), gas, comms, and every existing retic line and valve you can find.',
          workbookKey: 'services-plan',
        },
        checklist: [
          'Lodge a free Before You Dig Australia enquiry at least one business day ahead',
          'Locate the sewer line and any access chamber — you cannot build over it',
          'Find the water meter, the isolating valve and any bore',
          'Trace and mark existing reticulation before you dig anything',
        ],
      },
      {
        slug: 'auditing-an-existing-garden',
        title: 'Auditing an existing garden: keep, kill, or salvage',
        summary:
          'Renovating is harder than starting from bare sand, because you must judge what is worth keeping. A structured audit of every plant, surface, structure and system — with a verdict and a reason for each.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Existing garden audit',
          prompt:
            'List every existing element on your block — each significant plant, paved area, structure, edge, and the retic system. For each: condition, remaining life, cost to keep versus cost to replace, and a verdict of KEEP, RELOCATE, REPLACE or REMOVE, with the reason.',
          workbookKey: 'existing-garden-audit',
        },
        checklist: [
          'Inventory every plant over knee height with a condition rating',
          'Assess each hard surface for base failure, not just surface appearance',
          'Test the existing retic station by station and record the faults',
          'Give every element a verdict and a one-line justification',
          'Identify anything that is a hazard or a legal problem',
        ],
      },
      {
        slug: 'tree-assessment',
        title: 'Tree assessment, retention and when you need an arborist',
        summary:
          'Mature trees are the most valuable thing on most blocks and the easiest to kill accidentally. Root zones, structural roots, council tree protection, and the works that quietly finish off a tree two years later.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'Measure trunk diameter and calculate the structural root zone for each retained tree',
          'Check whether your council protects any tree on or near your block',
          'Identify works planned inside a root zone and find alternatives',
          'Decide which trees need an arborist report before you touch them',
        ],
      },
      {
        slug: 'constraints-and-opportunities-plan',
        title: 'The constraints and opportunities plan',
        summary:
          'Everything from this phase, on one drawing. This is the document a designer works from, and it is the reason a professional design fits its site while an amateur one fights it.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Constraints and opportunities plan',
          prompt:
            'Produce a single annotated overlay on your base plan marking every constraint (services, easements, setbacks, shade, root zones, poor drainage, hot walls, overlooking, access limits) and every opportunity (good views, sheltered corners, existing mature planting, level areas, sun in winter).',
          workbookKey: 'constraints-opportunities',
        },
        checklist: [
          'Every constraint from this phase appears on the drawing',
          'Every opportunity is marked, not just the problems',
          'Access routes for machinery and materials are shown',
          'You can explain the plan to someone else in five minutes',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 4,
    dir: '04-approvals',
    lessons: [
      {
        slug: 'r-codes-and-your-council',
        title: 'R-Codes and your local council: setbacks, site cover and landscaping requirements',
        summary:
          'The Residential Design Codes set the planning rules for residential WA, and your local council adds its own local planning scheme on top. What they control in a garden, and how to find out what applies to your lot.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'Identify your R-Code density and your local government',
          'Find your council\'s local planning scheme and any local planning policies',
          'Note setback requirements that affect structures you are planning',
          'Check whether your council mandates deep soil area or tree canopy',
        ],
      },
      {
        slug: 'retaining-walls-approval',
        title: 'Retaining walls: the 500 mm rule, AS 4678 and when an engineer is mandatory',
        summary:
          'WA applies the tightest retaining wall threshold in Australia. Below a certain retained height you are generally exempt; above it you need a building permit; above that you need certified structural engineering. Get this wrong and the council can order it removed.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'Measure the retained height of every wall you are considering',
          'Confirm the current thresholds with YOUR council, in writing',
          'Check boundary proximity and surcharge conditions, which tighten the rules',
          'Budget for engineering certification where required',
        ],
      },
      {
        slug: 'structures-and-building-permits',
        title: 'Patios, pergolas, decks and sheds: when a building permit is triggered',
        summary:
          'Floor height, roof, area, proximity to boundaries and whether it is attached to the house all change the answer. Work out what your project needs before you buy materials for something you cannot legally build.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'List every structure in your concept and its dimensions',
          'Check each against the exemptions in the Building Regulations and your council',
          'Confirm bushfire (BAL) requirements if your block is in a designated area',
          'Allow realistic time in your programme for approvals',
        ],
      },
      {
        slug: 'pools-and-pool-fencing',
        title: 'Pools, spas and the barrier rules',
        summary:
          'Pool barriers are life safety law, inspected by your council, and they shape your entire garden layout — gates, levels, climbable objects, planting near the fence. Design the barrier first, then the garden around it.',
        time: '45 min',
        difficulty: 'intermediate',
        licensedTrade:
          'Pool barrier compliance is inspected by your local government. Electrical and plumbing work associated with pools must be done by licensed trades.',
        checklist: [
          'Understand the non-climbable zone and what counts as climbable',
          'Check gate hardware, self-closing and self-latching requirements',
          'Position planting and structures so they never breach the barrier',
          'Book the council inspection before filling',
        ],
      },
      {
        slug: 'dividing-fences',
        title: 'Dividing fences and the neighbour conversation',
        summary:
          'The Dividing Fences Act governs who pays for what on a shared boundary, and a landscaping project usually forces the issue. How to have the conversation before you start, and what happens if it goes badly.',
        time: '30 min',
        difficulty: 'foundation',
        checklist: [
          'Establish the true boundary line before assuming the fence is on it',
          'Know the cost-sharing principle for a "sufficient fence"',
          'Give neighbours written notice before work that affects them',
          'Agree in writing on anything above standard fencing',
        ],
      },
      {
        slug: 'bores-roster-and-the-winter-ban',
        title: 'Bores, the sprinkler roster and the winter ban',
        summary:
          'Perth has a permanent two-day sprinkler roster set by house number, a total sprinkler ban from 1 June to 31 August, and rules that apply whether you are on scheme water or your own bore. This is a design constraint, not a maintenance detail.',
        time: '45 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Your water rules',
          prompt:
            'Record your rostered watering days (from your house number), your legal watering windows, the winter ban dates, your water source (scheme, bore, or both), and any new-garden exemption you may be entitled to. This governs your entire irrigation design.',
          workbookKey: 'water-rules',
        },
        checklist: [
          'Determine your rostered days from your house or lot number',
          'Confirm the legal watering windows and penalties',
          'If you have a bore, check its licensing and any local restrictions',
          'Check whether a new-garden exemption applies to your planting date',
        ],
      },
      {
        slug: 'bushfire-and-dieback',
        title: 'Bushfire (BAL) and dieback obligations',
        summary:
          'On bushfire-prone land your plant choices, mulch and structures are constrained by law. And across the south-west, Phytophthora dieback is spread on boots, tools and imported soil — including into your own garden.',
        time: '40 min',
        difficulty: 'intermediate',
        checklist: [
          'Check whether your lot is mapped as bushfire prone',
          'Understand how a BAL rating changes materials and planting near the house',
          'Learn the hygiene practice that stops you importing dieback',
          'Ask suppliers about the provenance of soil, mulch and plants',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 5,
    dir: '05-concept-design',
    lessons: [
      {
        slug: 'design-fundamentals',
        title: 'Design fundamentals: proportion, scale, unity, rhythm and focal points',
        summary:
          'The principles that make a garden feel resolved rather than assembled. They are learnable, they are testable against a drawing, and they are why professional gardens look calm and amateur ones look busy.',
        time: '60 min',
        difficulty: 'foundation',
        checklist: [
          'Define each principle and find an example of it in a garden you like',
          'Identify what is visually wrong with three gardens near you',
          'Test your favourite reference images against the principles',
        ],
      },
      {
        slug: 'functional-zoning',
        title: 'Functional zoning and bubble diagrams',
        summary:
          'Before any shape is drawn, allocate the space by what happens in it: arrive, sit, eat, play, dry washing, hide bins, grow food, store the trailer. Bubble diagrams are ugly, fast, and the single highest-value hour in the design process.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Zoning diagram',
          prompt:
            'Produce at least three different bubble diagrams for your block, allocating every square metre to a function drawn from your brief. Then pick one and say why it beat the others.',
          workbookKey: 'zoning-diagram',
        },
        checklist: [
          'Every function in your brief has a zone',
          'The unglamorous zones — bins, storage, clothesline — are allocated',
          'Zones respect the constraints plan from Phase 3',
          'You produced at least three alternatives before choosing',
        ],
      },
      {
        slug: 'circulation-and-sightlines',
        title: 'Circulation, sightlines and thresholds',
        summary:
          'How people actually move, not how you wish they would. Path widths that work, the desire lines that will be worn into your lawn anyway, what you see from the kitchen window, and what the neighbours see of you.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'Set path widths by use, not by what looks nice on paper',
          'Check the view from every internal room that faces the garden',
          'Identify overlooking from neighbouring windows and upper storeys',
          'Confirm access for bins, trailers, mowers and future machinery',
        ],
      },
      {
        slug: 'designing-for-a-perth-summer',
        title: 'Designing for a Perth summer: shade, thermal mass and the western wall',
        summary:
          'Forty-degree days, relentless afternoon sun and paving that reaches surface temperatures you cannot walk on. Shade is the highest-value element in a Perth garden, and where you put it decides whether the space gets used from December to March.',
        time: '50 min',
        difficulty: 'intermediate',
        checklist: [
          'Locate seating where it has afternoon shade in summer and sun in winter',
          'Plan shade over west-facing walls and windows',
          'Choose paving colour and material with surface temperature in mind',
          'Design for the sea breeze rather than blocking it',
        ],
      },
      {
        slug: 'style-and-materials',
        title: 'Style, mood boards and material palettes that belong in WA',
        summary:
          'Limestone, jarrah, granite, rammed earth, liquid limestone, corten — the WA palette, what each costs, how each ages in this climate, and how to build a mood board that constrains your choices instead of just being pretty.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Material palette',
          prompt:
            'Assemble a mood board and a written material palette: paving, walling, decking, edging, mulch, screening and furniture. For each, note the material, an approximate Perth rate, how it weathers here, and why it belongs with the others.',
          workbookKey: 'material-palette',
        },
        checklist: [
          'Limit yourself to a small number of materials and repeat them',
          'Check how each material performs in Perth sun, salt and sand',
          'Price each material roughly before committing',
          'Check the palette works with the house, not against it',
        ],
      },
      {
        slug: 'hydrozoning',
        title: 'Hydrozoning: water-led design before you draw anything',
        summary:
          'Group plants by water requirement and you can water each group correctly on two days a week. Mix them and you will overwater the tough ones and kill the thirsty ones. In Perth this decision precedes the planting plan and shapes the layout.',
        time: '45 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Hydrozone plan',
          prompt:
            'Divide your garden into hydrozones — typically high (lawn, vegetables), medium (feature and exotic planting), low (established natives and waterwise planting) and none (dry, unirrigated). Draw the boundaries and estimate the area of each.',
          workbookKey: 'hydrozone-plan',
        },
        checklist: [
          'Every planted area belongs to exactly one hydrozone',
          'High-water zones are small, deliberate and near the house',
          'Zone boundaries follow something physical, not an arbitrary line',
          'Areas are measured, ready for the irrigation design',
        ],
      },
      {
        slug: 'producing-the-concept-plan',
        title: 'Producing the concept plan with free tools',
        summary:
          'Hand drawing, SketchUp Free, QGIS, Inkscape or plain graph paper — the professional output is the same: a scaled, labelled plan that shows the layout and reads at a glance. What to draw, at what scale, and what to leave off.',
        time: '3–6 h',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Concept plan',
          prompt:
            'Produce a scaled concept plan of your property showing all zones, surfaces, structures, planting masses, levels changes and circulation, with a title block, scale, north point and date. It should answer the brief and respect the constraints plan.',
          workbookKey: 'concept-plan',
        },
        checklist: [
          'Drawn to a stated scale with a north point and date',
          'Every zone from the zoning diagram is resolved into real shapes',
          'Level changes and steps are shown',
          'It can be understood without you standing there explaining it',
        ],
      },
      {
        slug: 'presenting-the-concept',
        title: 'Presenting a concept and taking feedback without wrecking it',
        summary:
          'Professionals present a concept in a structured way and handle feedback without either caving or digging in. Do this with your household and you will find the problems now, when changing them costs nothing.',
        time: '40 min',
        difficulty: 'foundation',
        checklist: [
          'Present the brief first, then the site analysis, then the design',
          'Explain each decision by reference to the brief or the site',
          'Collect feedback in writing before responding to it',
          'Separate "this misses the brief" from "I would have chosen differently"',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 6,
    dir: '06-documentation',
    lessons: [
      {
        slug: 'scaled-layout-plan',
        title: 'From concept to a setting-out plan you can build from',
        summary:
          'The concept says "paving here". The setting-out plan says exactly where, dimensioned from fixed points that will still exist when the garden is a building site. This is the drawing you take outside with a tape.',
        time: '3 h',
        difficulty: 'intermediate',
        checklist: [
          'Dimension every element from at least two fixed reference points',
          'Use the house wall and boundaries as datums, not removable objects',
          'Include radii for curves and offsets for edges',
          'Check the drawing closes — dimensions must add up',
        ],
      },
      {
        slug: 'levels-and-grading-plan',
        title: 'Levels and grading plan: falls, steps and cut-and-fill balance',
        summary:
          'Where every finished surface sits relative to your datum, which way each falls, and whether the earth you cut out matches the earth you need to fill. Moving sand you did not need to move is the most common waste in a build.',
        time: '3 h',
        difficulty: 'advanced',
        deliverable: {
          title: 'Levels and grading plan',
          prompt:
            'Mark the finished level of every surface, the fall direction and gradient of each, all step locations and riser heights, and calculate your cut-and-fill volumes. Confirm every surface drains somewhere legal.',
          workbookKey: 'grading-plan',
        },
        checklist: [
          'Every paved surface has a stated fall and direction',
          'No water is directed at the house or a boundary',
          'Steps have consistent riser heights',
          'Cut and fill volumes are calculated and roughly balanced',
        ],
      },
      {
        slug: 'hardscape-details',
        title: 'Hardscape details and sections',
        summary:
          'A section through each built element showing what is under it: sub-base depth, bedding, edge restraint, footing size, drainage behind a wall, membrane, fixings. This is where quality is actually specified.',
        time: '4 h',
        difficulty: 'advanced',
        checklist: [
          'Draw a section through every different built element',
          'Specify sub-base type and compacted depth for each surface',
          'Show edge restraint on every paved area',
          'Show drainage and backfill behind every retaining wall',
        ],
      },
      {
        slug: 'drainage-plan',
        title: 'Drainage plan: soakwells, subsoil drains and surface falls',
        summary:
          'On the Swan Coastal Plain stormwater is disposed of on site by infiltration. Size the soakwells for your impervious area, place them legally, and plan the subsoil drainage for any area that will hold water.',
        time: '2.5 h',
        difficulty: 'advanced',
        deliverable: {
          title: 'Drainage plan',
          prompt:
            'Calculate the required soakwell volume for all new impervious area, mark soakwell positions with their distances from buildings and boundaries, show all connecting pipework with falls, and mark subsoil drains and their outlets.',
          workbookKey: 'drainage-plan',
        },
        checklist: [
          'Impervious area measured and soakwell volume calculated to your council\'s rule',
          'Soakwell locations respect setbacks from buildings and boundaries',
          'All pipework has a stated fall',
          'No stormwater discharges onto a neighbour or the street illegally',
        ],
      },
      {
        slug: 'irrigation-plan',
        title: 'Irrigation plan: stations, mainline and controller schedule',
        summary:
          'The drawing that turns your hydrozones into stations, valves and pipe runs. The engineering behind it is the mini-course in Phase 8; this lesson is about producing the document and coordinating it with everything else.',
        time: '2 h',
        difficulty: 'advanced',
        checklist: [
          'Every hydrozone maps to one or more stations, never mixed',
          'Mainline route avoids future excavation and structures',
          'Valve box positions are accessible and marked',
          'Station run times fit inside your legal watering window',
        ],
      },
      {
        slug: 'planting-plan-and-schedule',
        title: 'Planting plan and plant schedule',
        summary:
          'Species, quantity, pot size, spacing and mature dimensions, drawn to scale at mature size — not at nursery size. The schedule is what you take to the wholesaler and what stops you buying forty of something you needed twelve of.',
        time: '5 h',
        difficulty: 'advanced',
        deliverable: {
          title: 'Planting plan and schedule',
          prompt:
            'Draw every plant at its mature spread, and produce a schedule listing botanical name, common name, quantity, pot size, spacing, mature height and width, hydrozone, and sun requirement. Total the plant cost.',
          workbookKey: 'planting-plan',
        },
        checklist: [
          'Plants are drawn at mature size, not planting size',
          'Every species suits its hydrozone and aspect',
          'Species are available from WA nurseries at the size you specified',
          'Schedule totals give you a real plant budget',
        ],
      },
      {
        slug: 'lighting-plan',
        title: 'Lighting plan',
        summary:
          'What to light, what to leave dark, and the difference between a garden that looks good at night and a car park. Plus the WA line between low-voltage work you may do and mains work you may not.',
        time: '1.5 h',
        difficulty: 'intermediate',
        licensedTrade:
          'Mains-voltage electrical work in WA must be carried out by a licensed electrical contractor. Extra-low-voltage (12V) garden lighting downstream of a plugged-in transformer is generally DIY territory — the transformer\'s supply is not.',
        checklist: [
          'Light functions first — steps, thresholds, paths — then features',
          'Plan cable runs before surfaces go down',
          'Choose warm colour temperature and shield fixtures against glare',
          'Identify which parts need a licensed electrician',
        ],
      },
      {
        slug: 'specification-and-schedule-of-works',
        title: 'The specification and schedule of works',
        summary:
          'The written half of the documentation: what materials, to what standard, in what order, by whom. It is the difference between "build a deck" and a set of instructions you could hand to a stranger.',
        time: '4 h',
        difficulty: 'advanced',
        deliverable: {
          title: 'Specification and schedule of works',
          prompt:
            'Write the specification for every element (material, standard, method, finish) and the schedule of works listing each task in build order with its dependencies, durations, and who does it — you or a subcontractor.',
          workbookKey: 'specification',
        },
        checklist: [
          'Every material is specified with enough precision to order it',
          'Tasks are in a build order that does not require undoing anything',
          'Dependencies and approval lead times are shown',
          'Each task is assigned to you or to a trade',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 7,
    dir: '07-costing',
    lessons: [
      {
        slug: 'quantity-take-offs',
        title: 'Quantity take-offs from your own drawings',
        summary:
          'Areas, volumes, linear metres and counts, calculated systematically off the plan, with the wastage allowances the trade actually uses. Do it properly once and everything downstream gets easier.',
        time: '3 h',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Quantity take-off',
          prompt:
            'Produce a full take-off from your drawings: m² of each surface, m³ of excavation, fill, sub-base, sand and soil, linear metres of edging, pipe and cable, and counts of every plant, fitting and unit — each with its wastage allowance.',
          workbookKey: 'take-off',
        },
        checklist: [
          'Every element on the drawings appears in the take-off',
          'Volumes account for compaction and wastage',
          'Units match how suppliers actually sell the material',
          'A second pass found the things the first pass missed',
        ],
      },
      {
        slug: 'perth-material-prices',
        title: 'Perth material prices and where the trade actually buys',
        summary:
          'Retail garden centre versus landscape supply yard versus wholesale nursery — the same material at very different prices. Where Perth landscapers buy paving, limestone, soil, mulch, turf, plants and retic, and what an account gets you.',
        time: '60 min',
        difficulty: 'intermediate',
        checklist: [
          'Price your top five materials at three different supplier types',
          'Understand bulk versus bagged pricing and the break-even point',
          'Factor in delivery and minimum order quantities',
          'Find out what is available now versus on order',
        ],
      },
      {
        slug: 'labour-hire-and-hidden-costs',
        title: 'Labour, plant hire, tipping fees and the costs beginners forget',
        summary:
          'The bobcat that cannot fit down the side, the tip fees on mixed waste, the second delivery because the first was short, the tool you had to buy. The line items that turn a well-estimated job into an over-budget one.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'Check machinery access width and height before assuming you can hire',
          'Price waste disposal by type and volume, not by guess',
          'Cost your own time honestly, even if you do not pay it',
          'Add a line for tools you do not yet own',
        ],
      },
      {
        slug: 'building-the-quote',
        title: 'Building the quote: overheads, margin and contingency',
        summary:
          'How a professional assembles a price from materials, labour, plant, subcontractors, overhead and margin — and why the contingency is not optional. Then apply the same structure to your own project so you know the true number.',
        time: '60 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Project cost plan',
          prompt:
            'Build a full cost plan: materials, plant hire, subcontractors, disposal, your own labour hours, and a contingency percentage. Compare the total against the budget you committed to in Phase 1 and state how you will close any gap.',
          workbookKey: 'cost-plan',
        },
        checklist: [
          'Every take-off line has a price against it',
          'Subcontractor quotes are real quotes, not estimates',
          'A contingency percentage is included and justified',
          'The total is compared against your Phase 1 budget',
        ],
      },
      {
        slug: 'staging-the-project',
        title: 'Staging a project across seasons and budgets',
        summary:
          'Very few gardens get built in one go. Stage it so each phase is usable, nothing gets dug up twice, and the planting lands in the right season — which in Perth means autumn, not spring.',
        time: '45 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Staging plan',
          prompt:
            'Break your project into stages with a budget and target season for each. Ensure services and drainage precede surfaces, irrigation precedes soil and planting, and each stage leaves the garden in a usable state.',
          workbookKey: 'staging-plan',
        },
        checklist: [
          'No stage requires undoing a previous stage',
          'Planting stages land in autumn where possible',
          'Each stage has its own budget and leaves the site usable',
          'Approval lead times sit in front of the stages they gate',
        ],
      },
      {
        slug: 'contracts-and-variations',
        title: 'Contracts, deposits, variations and payment schedules in WA',
        summary:
          'What a landscaping contract should contain, what deposit is reasonable, how variations are supposed to work, and the WA consumer protections that apply when you engage a trade. Read this before you sign anything.',
        time: '50 min',
        difficulty: 'intermediate',
        checklist: [
          'Know what must be in writing before work starts',
          'Understand reasonable deposit and progress payment structures',
          'Insist on written variations with a price, before the work',
          'Verify licences, registrations and insurance of any trade you engage',
        ],
      },
      {
        slug: 'diy-vs-subcontract',
        title: 'DIY versus subcontract: what is genuinely worth paying for',
        summary:
          'An honest framework: risk of getting it wrong, cost of fixing it, tools required, physical demand, and whether the law even allows you. Some jobs are a good weekend; some will cost you triple to undo.',
        time: '40 min',
        difficulty: 'intermediate',
        checklist: [
          'Score every task on risk, tooling, physical demand and legality',
          'Identify the tasks where a mistake is buried and expensive',
          'Decide where you will pay for the first one and learn by watching',
          'Lock the decisions into your cost plan and schedule',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 8,
    dir: '08-build',
    lessons: [
      {
        slug: 'site-establishment-and-safety',
        title: 'Site establishment, safety, access and protecting what stays',
        summary:
          'Before the first cut: where materials land, where waste goes, how machinery gets in, what gets protected, and the safety basics that matter when you are working alone with a plate compactor and a hot day.',
        time: '60 min',
        difficulty: 'foundation',
        checklist: [
          'Plan material drop zones and waste zones that do not block access',
          'Protect retained trees, existing surfaces and the neighbour\'s fence',
          'Set up water, power and shade for yourself',
          'Have the right PPE and know the heat-related limits of working in a Perth summer',
        ],
      },
      {
        slug: 'demolition-and-clearing',
        title: 'Demolition, clearing and killing weeds properly',
        summary:
          'Getting rid of what the audit condemned, sorting waste so you are not paying mixed-waste tip rates, and dealing with perennial weeds like couch and kikuyu before you build over them — because they will come back through.',
        time: '90 min',
        difficulty: 'intermediate',
        checklist: [
          'Separate waste streams — clean fill, green waste, brick and concrete, general',
          'Kill perennial grasses and weeds well before covering the ground',
          'Retain and stockpile anything worth reusing',
          'Check for asbestos in older structures before disturbing anything',
        ],
      },
      {
        slug: 'earthworks-and-setting-out',
        title: 'Earthworks: setting out, excavation, cut and fill, compaction',
        summary:
          'Transferring the setting-out plan onto the ground with profiles and string lines, excavating to the right depth, and compacting fill in layers. Sand does not behave like clay, and uncompacted fill will find you out later.',
        time: '2 h',
        difficulty: 'advanced',
        checklist: [
          'Set profiles and string lines from your fixed reference points',
          'Excavate to design depth allowing for sub-base and surface thickness',
          'Compact fill in layers, not all at once',
          'Check levels as you go, not at the end',
        ],
      },
      {
        slug: 'machinery',
        title: 'Machinery: bobcat, excavator, and hire versus hire-with-operator',
        summary:
          'What each machine is for, what it costs in Perth, what access it needs, and the honest calculation of whether to learn to drive one or pay someone who already can.',
        time: '60 min',
        difficulty: 'intermediate',
        checklist: [
          'Measure your narrowest access point before booking anything',
          'Match machine size to the job and the access',
          'Compare dry hire against wet hire including your own learning time',
          'Confirm insurance and what damage you are liable for',
        ],
      },
      {
        slug: 'drainage-and-soakwells',
        title: 'Installing drainage and soakwells',
        summary:
          'Digging in soakwells, connecting downpipes and surface drains, getting falls right, and the subsoil drainage that stops a low corner staying wet all winter. Do this before anything gets built on top of it.',
        time: '2 h',
        difficulty: 'advanced',
        checklist: [
          'Soakwells sized and positioned per your drainage plan',
          'All pipework laid to a consistent fall with no bellies',
          'Geotextile used where required to stop sand ingress',
          'System tested with water before backfilling',
        ],
      },
      {
        slug: 'retaining-walls',
        title: 'Building retaining walls: limestone, block and sleeper',
        summary:
          'Footings, the first course, drainage behind the wall, backfill material, geofabric and the reason most failed walls failed. Plus the honest point at which you stop and call an engineer.',
        time: '3 h',
        difficulty: 'advanced',
        licensedTrade:
          'Above the WA permit threshold a retaining wall needs a building permit, and above the higher threshold it needs design certification by a registered structural engineer. Confirm the current thresholds with your council.',
        checklist: [
          'Footing dug to design depth on undisturbed ground',
          'First course perfectly level — everything above depends on it',
          'Aggregate drainage and agricultural pipe behind the full height',
          'Geofabric separating drainage aggregate from backfill sand',
          'Backfill compacted in layers as the wall goes up',
        ],
      },
      {
        slug: 'base-preparation',
        title: 'Base preparation for hard surfaces',
        summary:
          'Ninety per cent of paving failures are base failures. Sub-grade, sub-base material, depth for the loading, compaction in layers, and screeding the bedding layer to a consistent thickness.',
        time: '90 min',
        difficulty: 'advanced',
        checklist: [
          'Sub-grade excavated to design depth and compacted',
          'Correct sub-base material for the loading, laid in layers',
          'Each layer compacted with an appropriate compactor',
          'Bedding layer screeded to a consistent depth, not used to fix level errors',
        ],
      },
      {
        slug: 'paving',
        title: 'Paving: laying, cutting, edge restraint and jointing',
        summary:
          'Setting out the pattern so the cuts fall where they are least visible, laying to line and level, cutting safely, restraining the edges so it does not creep, and jointing so sand does not wash out on the first winter storm.',
        time: '3 h',
        difficulty: 'advanced',
        checklist: [
          'Pattern set out so full pavers land in the most visible positions',
          'Laid to a string line with consistent joint width',
          'Edge restraint installed on every free edge',
          'Cutting done with the right blade and full respirator — silica dust is serious',
          'Joints filled and the surface compacted before use',
        ],
      },
      {
        slug: 'concrete-and-liquid-limestone',
        title: 'Concrete: formwork, reinforcement, pouring and finishes',
        summary:
          'Formwork and falls, mesh and cover, ordering the right mix, and the finishes common in Perth — exposed aggregate, honed, and liquid limestone. Plus the reality that a concrete pour has no undo button.',
        time: '2.5 h',
        difficulty: 'advanced',
        checklist: [
          'Formwork braced and set to the design falls',
          'Reinforcement supported at the correct cover, not sitting on the ground',
          'Mix, slump and volume ordered correctly with a bit spare',
          'Enough hands booked for the pour — this is not a solo job',
          'Curing planned; a Perth summer pour will crack if it dries too fast',
        ],
      },
      {
        slug: 'decking',
        title: 'Decking: substructure, footings, timber choice and termites',
        summary:
          'Footings and bearer spans, joist spacing for your board, ventilation under the deck, jarrah versus composite in WA conditions, and the termite management that stops your deck becoming a bridge into the house.',
        time: '3 h',
        difficulty: 'advanced',
        checklist: [
          'Footings sized and dug to design depth',
          'Joist spacing matches the board manufacturer\'s span table',
          'Adequate ventilation and clearance beneath the deck',
          'Correct fixings for the timber and the coastal environment',
          'Termite management addressed where the deck meets the house',
        ],
      },
      {
        slug: 'structures-pergolas-and-screens',
        title: 'Structures: pergolas, screens, gates and outdoor kitchens',
        summary:
          'Posts and footings that survive a Perth storm, span tables, screening that gives privacy without becoming a wall, and the services planning that has to happen before an outdoor kitchen is built.',
        time: '2.5 h',
        difficulty: 'advanced',
        licensedTrade:
          'Plumbing and gas work must be done by licensed tradespeople in WA. Fixed electrical work to an outdoor kitchen requires a licensed electrical contractor.',
        checklist: [
          'Post footings sized for wind loading, not just weight',
          'Spans checked against a span table for the timber or steel used',
          'Any required building permit obtained before starting',
          'Services roughed in before surfaces and cladding go on',
        ],
      },

      // ── Irrigation mini-course ──────────────────────────────────────────
      {
        slug: 'irrigation-hydraulics',
        title: 'Irrigation 1 — Hydraulics: flow, pressure and friction loss',
        summary:
          'The physics that decides how many sprinklers you can run at once. Flow rate, static and dynamic pressure, friction loss through pipe and fittings, and why the last sprinkler on a long run barely turns.',
        time: '90 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        checklist: [
          'Explain the difference between pressure and flow',
          'Calculate friction loss for a given pipe size, length and flow',
          'Understand velocity limits and why oversized pipe is cheap insurance',
        ],
      },
      {
        slug: 'irrigation-water-source',
        title: 'Irrigation 2 — Measuring your water: scheme supply versus bore',
        summary:
          'Everything downstream depends on how much water you actually have. Measure your available flow and pressure properly, and understand what a bore changes — including that the roster still applies.',
        time: '60 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        deliverable: {
          title: 'Available water measurement',
          prompt:
            'Measure and record your static pressure, your flow rate at the tap (bucket test), your service and meter size, and your working pressure with the flow running. If you have a bore, record its pump specification, output and any licensing.',
          workbookKey: 'water-measurement',
        },
        checklist: [
          'Static pressure measured with a gauge',
          'Flow measured by timed bucket test, repeated',
          'Working pressure measured under flow, not at rest',
          'Design flow set below the measured maximum with a safety margin',
        ],
      },
      {
        slug: 'irrigation-hydrozoning-and-stations',
        title: 'Irrigation 3 — Turning hydrozones into stations',
        summary:
          'Never mix lawn and garden beds, or sun and shade, on one station. Divide the garden by water need, plant type and aspect, then check each station fits inside your available flow and your legal watering window.',
        time: '90 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        checklist: [
          'Every station contains one hydrozone and one emitter type',
          'Station flow totals stay within your measured available flow',
          'Total run time for all stations fits the legal watering window',
          'Sun and shade areas are on separate stations',
        ],
      },
      {
        slug: 'irrigation-emitters',
        title: 'Irrigation 4 — Choosing emitters: sprays, rotors, MP rotators and drip',
        summary:
          'What each type does well, what it wastes, and where drip beats everything. In Perth sand, matched precipitation and low application rates are not a refinement — they are the difference between watering the plant and watering the aquifer.',
        time: '90 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        checklist: [
          'Match emitter type to hydrozone and area shape',
          'Use matched precipitation rate nozzles within a station',
          'Specify pressure-compensating drip for beds where appropriate',
          'Check the required operating pressure of each emitter against what you have',
        ],
      },
      {
        slug: 'irrigation-scheduling-and-uniformity',
        title: 'Irrigation 5 — Precipitation rate, distribution uniformity and run times',
        summary:
          'How to calculate how long a station must run to deliver a given depth of water, how to measure whether it lands evenly, and how to set run times that suit sand — which holds almost nothing and drains almost instantly.',
        time: '90 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        checklist: [
          'Calculate precipitation rate for each station',
          'Run a catch-cup test and calculate distribution uniformity',
          'Convert a target water depth into a run time per station',
          'Understand cycle-and-soak and why sand still needs it on slopes',
        ],
      },
      {
        slug: 'irrigation-mainline-valves-and-wiring',
        title: 'Irrigation 6 — Mainline, valves, solenoids and wiring',
        summary:
          'Pipe sizing and material, the mainline route, valve boxes you can actually get to, solenoid wiring and the common wire, and backflow prevention — which is a legal requirement, not an optional extra.',
        time: '90 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        checklist: [
          'Mainline sized for the largest station flow with margin',
          'Backflow prevention appropriate to the connection',
          'Valve boxes accessible and not under future paving',
          'Wiring rated for direct burial, with waterproof joints and a spare core',
        ],
      },
      {
        slug: 'irrigation-controllers-and-compliance',
        title: 'Irrigation 7 — Controllers, smart controllers and roster compliance',
        summary:
          'Programming a controller to water on your rostered days, inside the legal windows, and shutting down for the winter ban. Whether a smart or weather-based controller earns its money in Perth, and what a rain sensor is worth.',
        time: '60 min',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        checklist: [
          'Controller programmed to your rostered days only',
          'Start times set so all stations finish inside the legal window',
          'A plan for the winter sprinkler ban period',
          'Rain sensor or soil moisture sensor considered and justified',
        ],
      },
      {
        slug: 'irrigation-install-and-audit',
        title: 'Irrigation 8 — Installing, commissioning and auditing the system',
        summary:
          'Trenching depths, laying and joining pipe, flushing before you fit heads, setting arcs, and the audit that tells you whether the system you just built does what you designed. Then how to re-audit it every year.',
        time: '2 h',
        difficulty: 'advanced',
        series: 'Irrigation mini-course',
        deliverable: {
          title: 'Irrigation as-built and audit',
          prompt:
            'Record the as-built layout — mainline route, valve positions, station numbers and what each covers — and the results of your commissioning audit: pressure at the furthest head on each station, catch-cup uniformity, and final run times.',
          workbookKey: 'irrigation-as-built',
        },
        checklist: [
          'Pipe flushed thoroughly before heads were fitted',
          'Every head set to the correct arc and adjusted for radius',
          'Pressure checked at the furthest head on each station',
          'As-built recorded and photographed before backfilling',
          'Run times set from the audit, not from a guess',
        ],
      },
      // ── end irrigation mini-course ──────────────────────────────────────

      {
        slug: 'garden-lighting',
        title: 'Garden lighting installation',
        summary:
          'Running low-voltage cable, positioning fixtures, transformer sizing and voltage drop over long runs — and the clear line in WA between what you may wire yourself and what requires a licensed electrical contractor.',
        time: '90 min',
        difficulty: 'intermediate',
        licensedTrade:
          'Mains-voltage electrical work in WA must be carried out by a licensed electrical contractor. This includes installing a fixed outdoor power point or hard-wiring a transformer.',
        checklist: [
          'Cable runs installed before surfaces and planting',
          'Transformer sized with headroom, and voltage drop calculated over long runs',
          'Fixtures aimed and shielded to avoid glare into windows',
          'All mains work done by a licensed electrician with a certificate',
        ],
      },
      {
        slug: 'turning-perth-sand-into-soil',
        title: 'Turning Perth sand into soil: clay, compost and wetting agents',
        summary:
          'Bassendean and Spearwood sands hold almost no water and almost no nutrient, and turn hydrophobic in summer. Clay for water and nutrient holding, organic matter for structure and biology, wetting agents to get water in at all — how much, how deep, and in what order.',
        time: '90 min',
        difficulty: 'intermediate',
        checklist: [
          'Amendment depth matched to what will be planted, not a token top-dress',
          'Clay applied at an effective rate and incorporated, not just spread',
          'Compost sourced from a supplier you have checked',
          'Wetting agent applied and watered in before planting',
          'Soil rewetted and settled before anything goes in the ground',
        ],
      },
      {
        slug: 'planting',
        title: 'Planting: sourcing, technique, spacing and establishment',
        summary:
          'Where to buy at what size, planting technique that actually works in sand, why autumn is the right season in Perth, staking only when necessary, and the establishment watering that decides whether your plant budget survives its first February.',
        time: '2 h',
        difficulty: 'intermediate',
        checklist: [
          'Plants sourced at a size that establishes well, not the biggest available',
          'Planted in autumn where the schedule allows',
          'Holes prepared wider than deep, with the root ball at the right height',
          'Root-bound plants teased out before planting',
          'Staked only where genuinely needed, and loosely',
          'Establishment watering plan in place from day one',
        ],
      },
      {
        slug: 'turf-for-perth',
        title: 'Turf for Perth: choosing and laying Kikuyu, Couch, Buffalo or Zoysia',
        summary:
          'The four species that dominate Perth lawns, what each is genuinely good and bad at — shade, wear, water, thatch, invasiveness — and how to prepare, lay and establish turf on sand.',
        time: '2 h',
        difficulty: 'intermediate',
        checklist: [
          'Species chosen for the shade, wear and water reality of the site',
          'Area prepared, levelled and amended before delivery, not after',
          'Turf laid within a day of delivery and never left on the pallet in summer',
          'Rolled or firmed, then watered heavily and immediately',
          'A new-lawn watering exemption applied for if available and needed',
        ],
      },
      {
        slug: 'mulch-edging-and-finishing',
        title: 'Mulch, edging and the finishing details that separate pro from DIY',
        summary:
          'Mulch type and depth for Perth conditions, crisp edges that hold their line, clean transitions between materials, and the small details that make a garden read as finished rather than merely planted.',
        time: '90 min',
        difficulty: 'intermediate',
        checklist: [
          'Mulch type chosen for the situation, not just the cheapest bulk load',
          'Applied at a depth that suppresses weeds without smothering stems',
          'Every bed edge physically restrained so it stays where you put it',
          'Transitions between materials are deliberate and level',
          'Levels correct so mulch does not wash onto paving in a storm',
        ],
      },
      {
        slug: 'final-clean-and-detail',
        title: 'Final clean and detail',
        summary:
          'The last day of a professional job: everything swept, adjusted, tested, straightened and photographed. It is the cheapest quality improvement available and the one amateurs skip because they are tired.',
        time: '60 min',
        difficulty: 'foundation',
        checklist: [
          'Every surface cleaned and every joint topped up',
          'All irrigation heads adjusted with the planting in place',
          'Lighting aimed after dark, not in daylight',
          'Waste removed and tools off site',
          '"After" photographs taken from the same fixed positions as the "before" set',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 9,
    dir: '09-handover',
    lessons: [
      {
        slug: 'the-defect-walkthrough',
        title: 'The defect walkthrough and snag list',
        summary:
          'A structured, unsentimental walk of the finished job, listing everything that is not right. Professionals do this before the client does. Doing it to your own work is uncomfortable and extremely valuable.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Defect list',
          prompt:
            'Walk the finished project and list every defect, unfinished item and thing that is not quite right, with a fix and a date. Include the ones you are tempted to pretend you cannot see.',
          workbookKey: 'defect-list',
        },
        checklist: [
          'Walked systematically, zone by zone, not wandering',
          'Every item has a fix and a date',
          'Tested all systems — irrigation, lighting, drainage, gates',
          'Someone else walked it too and added items you missed',
        ],
      },
      {
        slug: 'as-built-drawings',
        title: 'As-built drawings and why they save you in three years',
        summary:
          'What actually got built is never exactly what was drawn. Mark up the changes now, while you still remember where the mainline runs and which cable goes where, and future-you will not dig through a new lawn to find out.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'As-built drawings',
          prompt:
            'Mark up your documentation with what was actually built: real dimensions, actual irrigation and cable routes, valve and junction positions, soakwell locations and depths, and any substituted material or plant.',
          workbookKey: 'as-built',
        },
        checklist: [
          'Every buried service marked with dimensions from two fixed points',
          'Photographs of open trenches filed with the drawings',
          'Plant substitutions recorded against the original schedule',
          'Drawings stored somewhere you will find them in five years',
        ],
      },
      {
        slug: 'the-maintenance-manual',
        title: 'Writing the maintenance manual and watering schedule',
        summary:
          'What a professional hands over: what to do, when, to which plant, and how to run the irrigation through the year. Write it for someone who was not there — including yourself next winter.',
        time: '2 h',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Maintenance manual',
          prompt:
            'Write the manual for your garden: seasonal task calendar, irrigation programmes for each season, plant-by-plant care notes, fertiliser programme, pruning times, and the establishment schedule for the first twelve weeks.',
          workbookKey: 'maintenance-manual',
        },
        checklist: [
          'Seasonal calendar covers all twelve months',
          'Irrigation programme stated for each season, within the roster',
          'Plant-specific notes for anything that needs particular care',
          'Written so a house-sitter could follow it',
        ],
      },
      {
        slug: 'warranties-and-records',
        title: 'Warranties, plant guarantees and record-keeping',
        summary:
          'What is warranted, for how long, and what voids it. Where to keep receipts, certificates, licences and compliance paperwork so they exist when you sell the house or something fails.',
        time: '40 min',
        difficulty: 'foundation',
        checklist: [
          'All receipts and invoices filed and backed up',
          'Electrical and plumbing compliance certificates obtained and stored',
          'Plant and product warranty periods recorded with purchase dates',
          'Building permits and approvals filed with the property records',
        ],
      },
      {
        slug: 'photographing-your-project',
        title: 'Photographing your project properly',
        summary:
          'Light, position, height and timing. Good photographs are how you evaluate your own work honestly, how you build a portfolio, and what an agent will want when the house eventually sells.',
        time: '60 min',
        difficulty: 'foundation',
        checklist: [
          'Shot in early morning or late afternoon light, not midday',
          'Repeated the exact positions from your "before" set',
          'Camera at a consistent, natural eye height',
          'Wide establishing shots plus detail shots of the good joinery and edges',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 10,
    dir: '10-maintenance',
    lessons: [
      {
        slug: 'the-first-twelve-weeks',
        title: 'The first twelve weeks: establishment care',
        summary:
          'More Perth gardens are lost in their first summer than are ever killed by bad design. Establishment watering is different from ongoing watering, and getting it wrong wastes the entire plant budget.',
        time: '60 min',
        difficulty: 'intermediate',
        checklist: [
          'Establishment watering schedule set and actually followed',
          'New-garden exemption used if you planted outside the ideal window',
          'Plants checked weekly for stress in the first month',
          'Mulch kept off stems and trunks',
          'Failures replaced early, in season, not left as gaps',
        ],
      },
      {
        slug: 'the-perth-year',
        title: 'The Perth year: a maintenance calendar on the Noongar six seasons',
        summary:
          'The European four-season calendar fits Perth badly. The Noongar six seasons — Birak, Bunuru, Djeran, Makuru, Djilba, Kambarang — describe what actually happens here, and they make a far better maintenance calendar.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Your seasonal calendar',
          prompt:
            'Build a maintenance calendar for your garden across the six seasons: what you water, feed, prune, plant, mulch, check and repair in each. Note the fixed dates that constrain you, including the winter sprinkler ban.',
          workbookKey: 'seasonal-calendar',
        },
        checklist: [
          'Every season has watering, feeding, pruning and checking tasks',
          'Planting tasks fall in the right season for Perth',
          'The winter sprinkler ban period is planned for',
          'Calendar is somewhere you will actually look at it',
        ],
      },
      {
        slug: 'watering-and-retic-audit',
        title: 'Watering through the year and auditing your reticulation',
        summary:
          'Seasonal adjustment rather than set-and-forget, the annual pre-summer retic check every Perth garden needs, and the audit method that finds the blocked nozzle quietly killing a corner of the garden.',
        time: '90 min',
        difficulty: 'intermediate',
        deliverable: {
          title: 'Retic audit record',
          prompt:
            'Run a full station-by-station audit: every head checked for arc, radius, blockage and damage; pressure checked; catch-cup uniformity re-tested on the important stations; run times adjusted for the season. Record what you found and fixed.',
          workbookKey: 'retic-audit',
        },
        checklist: [
          'Every station run and watched, head by head',
          'Blocked, broken, sunken and misaimed heads fixed',
          'Run times adjusted for the season, not left at last summer\'s setting',
          'Controller backup battery and programme checked',
          'Audit repeated before summer every year',
        ],
      },
      {
        slug: 'fertilising-perth-sand',
        title: 'Fertilising Perth sand: little and often, and the phosphorus trap',
        summary:
          'Sand holds nutrient about as well as a colander holds soup, so heavy feeding mostly ends up in the groundwater. Slow release, low rates, more often — and the WA natives that phosphorus will kill outright.',
        time: '60 min',
        difficulty: 'intermediate',
        checklist: [
          'Know which of your plants are phosphorus-sensitive',
          'Use slow-release or controlled-release products on sand',
          'Feed at lower rates more frequently, timed to growth',
          'Avoid feeding immediately before heavy winter rain',
        ],
      },
      {
        slug: 'pruning',
        title: 'Pruning: what, when and why',
        summary:
          'The three reasons to prune, the cuts that work and the cuts that create problems, and a Perth timing guide — because pruning at the wrong time costs you a season of flowers or invites disease.',
        time: '90 min',
        difficulty: 'intermediate',
        checklist: [
          'Know why you are cutting before you cut',
          'Correct cut position — no stubs, no flush cuts',
          'Tools sharp and cleaned between plants where disease is a risk',
          'Timing matched to each species\' flowering and growth habit',
        ],
      },
      {
        slug: 'lawn-care-through-the-perth-year',
        title: 'Lawn care through the Perth year',
        summary:
          'Mowing height by species and season, dethatching, coring, wetting agents, fertiliser timing and the annual spring renovation — the routine that keeps a Perth lawn alive through summer without breaking the roster.',
        time: '90 min',
        difficulty: 'intermediate',
        checklist: [
          'Mowing height correct for your species and raised into summer',
          'Wetting agent applied before the hot months',
          'Dethatch or core annually if your species needs it',
          'Fertiliser timed to growth, not to the calendar',
        ],
      },
      {
        slug: 'wa-pests-and-diseases',
        title: 'WA pests and diseases: black beetle, couch mite, millipedes and dieback',
        summary:
          'The problems you will actually meet in a Perth garden, how to identify each one correctly before you spray anything, and the least-damaging effective response.',
        time: '90 min',
        difficulty: 'intermediate',
        checklist: [
          'Identify the pest or disease before treating anything',
          'Know the difference between damage and the cause of damage',
          'Choose the least-toxic effective option first',
          'Understand dieback hygiene and how not to spread it',
        ],
      },
      {
        slug: 'wa-weeds',
        title: 'Weeds in WA gardens',
        summary:
          'The common invaders, the declared pests you are legally obliged to control, why kikuyu and couch escape into beds, and the non-chemical methods that work when you stay ahead of them.',
        time: '60 min',
        difficulty: 'foundation',
        checklist: [
          'Identify the recurring weeds on your block',
          'Check whether any are declared pests requiring control',
          'Have a barrier or edge strategy against running grasses',
          'Deal with weeds before they seed, every time',
        ],
      },
      {
        slug: 'renovate-replace-rethink',
        title: 'When to renovate, replace and rethink',
        summary:
          'Gardens have lifecycles. Knowing when a plant has finished, when a surface needs relaying rather than cleaning, and when a whole area needs redesigning is what keeps a garden getting better instead of slowly declining.',
        time: '45 min',
        difficulty: 'intermediate',
        checklist: [
          'Review the garden annually against the original brief',
          'Identify plants that have outgrown their position',
          'Distinguish surface wear from base failure',
          'Plan replacements before things die, not after',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    phase: 11,
    dir: '11-review',
    lessons: [
      {
        slug: 'landscaping-and-property-value',
        title: 'What landscaping actually does to a Perth property value',
        summary:
          'Separating the evidence from the marketing. Which elements agents and valuers actually respond to in this market, which are personal indulgences, and the honest answer about what you get back.',
        time: '45 min',
        difficulty: 'foundation',
        checklist: [
          'Distinguish resale value from amenity value and be honest about which you bought',
          'Identify which of your elements a buyer will pay for',
          'Note which choices might narrow your buyer pool',
          'Keep the documentation that proves quality to a future buyer',
        ],
      },
      {
        slug: 'reviewing-against-the-brief',
        title: 'Reviewing the finished project against your brief',
        summary:
          'Go back to the brief you wrote in Phase 2 and the charter from Phase 1, and score the result honestly. This is the lesson that turns one project into a repeatable skill.',
        time: '60 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Project review',
          prompt:
            'Score the finished garden against every point of your original brief. Record the final cost against the budget, the actual duration against the estimate, what you would do differently, and the three things you got genuinely right.',
          workbookKey: 'project-review',
        },
        checklist: [
          'Every brief requirement scored honestly',
          'Final cost and duration compared against the original estimates',
          'Reasons for the variances identified, not excused',
          'Lessons written down while they are still fresh',
        ],
      },
      {
        slug: 'portfolio-and-lessons-learnt',
        title: 'Your portfolio and what you learnt',
        summary:
          'Assemble the whole workbook into a document: brief, analysis, design, documentation, costs, build record and review. It is a professional portfolio piece, a house record, and the proof that you can now do this again.',
        time: '90 min',
        difficulty: 'foundation',
        deliverable: {
          title: 'Project portfolio',
          prompt:
            'Assemble every workbook entry, drawing and photograph into a single project document. Write a one-page summary at the front: the brief, the approach, the result, the cost, and what you learnt.',
          workbookKey: 'portfolio',
        },
        checklist: [
          'All drawings, documents and photographs collected in one place',
          'Before and after photographs paired from identical positions',
          'One-page summary written at the front',
          'A copy stored with your property records',
        ],
      },
    ],
  },
];

/** Flat list with computed order and ids. */
export function flatLessons() {
  const out = [];
  for (const phase of curriculum) {
    phase.lessons.forEach((lesson, i) => {
      out.push({
        ...lesson,
        phase: phase.phase,
        dir: phase.dir,
        order: i + 1,
        id: `${phase.dir}/${lesson.slug}`,
      });
    });
  }
  return out;
}
