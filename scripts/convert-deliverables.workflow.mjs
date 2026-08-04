export const meta = {
  name: 'convert-deliverables',
  description: 'Turn single-paragraph deliverable prompts into structured question fields',
  phases: [{ title: 'Convert', detail: 'one agent per lesson with a deliverable' }],
};

const SHARED = `
You are converting ONE deliverable in the Setting Out landscaping course from a single
paragraph prompt into structured form fields, so the reader can answer each thing where it is
asked instead of composing a wall of prose into one textarea.

READ FIRST, it is the worked example and the exact format to match:
  src/content/lessons/01-trade-and-process/03-being-your-own-client.mdx

THE CHANGE. In the lesson's YAML frontmatter, replace:

  deliverable:
    title: "..."
    prompt: "one long paragraph"
    workbookKey: "..."

with:

  deliverable:
    title: "..."            <- UNCHANGED, character for character
    workbookKey: "..."      <- UNCHANGED, character for character
    intro: "..."            <- optional, one or two lines of framing
    questions:
      - key: "lower-case-hyphens"
        label: "The question, as a question or an instruction"
        hint: "optional — an example, a unit, a warning"
        type: "prose" | "text" | "number" | "list" | "table"
        rows: 5             <- prose only, optional
        prefix: "$"         <- text/number only, optional
        suffix: "m²"        <- text/number only, optional
        columns: ["A","B"]  <- table only, REQUIRED for tables

RULES:
- **Do not invent new requirements.** Every question must come from something the original
  prompt already asked for. If the prompt asked for four things, produce four questions. Do not
  helpfully add a fifth.
- **Do not change title or workbookKey.** They are storage keys and cross-referenced elsewhere.
- Move any "why" or "be honest" framing from the prompt into \`intro\`, not into a question.
- Choose the type from what the answer actually is:
  * \`prose\` — a paragraph or an explanation
  * \`text\` — one short line
  * \`number\` — a quantity, a price, a count, a measurement (use prefix/suffix for units)
  * \`list\` — several short items of the same kind (must-haves, exclusions, faults found)
  * \`table\` — repeating records with the same fields (an inventory, a schedule, a take-off).
    Give real column headings drawn from the prompt.
- Where the prompt asks the reader to **produce a drawing or a plan**, do NOT try to make a
  form field for the drawing itself. Instead ask for what can be written down about it — for
  example the scale, the date, what it shows, where the file lives, and what it revealed.
  File upload arrives later; the question should still be useful without it.
- Keep the reader's language. This course is written in AUSTRALIAN ENGLISH by a WA landscaper
  voice — direct, specific, unsentimental. Labels are short. Hints carry the detail.
- Aim for 3 to 8 questions. If a prompt genuinely only asks one thing, one \`prose\` question is
  the right answer — do not pad it.

YAML: double-quote every string. Escape internal double quotes as \\". Keep each label and hint
on one line. The frontmatter is Zod-validated and a malformed file FAILS THE BUILD.

Change ONLY the deliverable block. Do not touch the lesson body, the checklist, the resources,
the regulations or any other field.

Return one line: the path, and how many questions you produced.
`;

const targets = Array.isArray(args)
  ? args
  : String(args)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

log(`${targets.length} deliverables to convert`);

phase('Convert');

const results = await pipeline(targets, (file) =>
  agent(`${SHARED}\n\nYOUR ASSIGNED LESSON: ${file}`, {
    label: file.split('/').pop(),
    phase: 'Convert',
  }),
);

return { converted: results.filter(Boolean).length };
