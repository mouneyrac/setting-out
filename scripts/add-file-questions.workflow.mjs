export const meta = {
  name: 'add-file-questions',
  description: 'Add a file upload question to deliverables that ask for a drawing or photo',
  phases: [{ title: 'Add', detail: 'one agent per deliverable that produces a drawing' }],
};

const SHARED = `
You are adding ONE file-upload question to a deliverable in the Setting Out landscaping course.

BACKGROUND. Deliverables are small forms in the lesson's YAML frontmatter. Ten of them ask the
reader to PRODUCE A DRAWING, A PLAN or PHOTOGRAPHS. Until now the questions could only ask
about the drawing — its scale, its date, what it revealed — because there was nowhere to put
the file. There is now: a "file" question type that uploads images and PDFs.

READ FIRST, for the exact frontmatter format:
  src/content/lessons/01-trade-and-process/03-being-your-own-client.mdx

THE CHANGE. Add ONE question of type "file" to the deliverable's questions array, positioned
where it belongs in the sequence — usually FIRST, because the drawing is the thing and the
other questions describe it.

  - key: "drawing"                 <- or "photos", "plan", "sheet" — whatever fits
    label: "Upload the plan"        <- an instruction, short
    hint: "..."                     <- what should be visible in it, in one line
    type: "file"

RULES:
- Add exactly ONE file question. Do not add two.
- Do NOT remove or reword any existing question. They describe the drawing and stay useful —
  someone may photograph a hand-drawn sheet and still want to record its scale.
- Choose a key that does not collide with an existing key in that deliverable.
- The label is an instruction: "Upload the plan", "Add your before photos", "Upload the survey".
- The hint says what the file should show, drawn from what the lesson already asks for. Keep it
  to one line. Australian English. Direct, specific, no marketing.
- If the deliverable is about PHOTOGRAPHS rather than a drawing, say photos in the label.

YAML: double-quote every string value. Escape internal double quotes as \\". Keep each label and
hint on one line. The frontmatter is Zod-validated and a malformed file FAILS THE BUILD.

Change ONLY the deliverable's questions array. Touch nothing else in the file.

Return one line: the path and the key you added.
`;

const targets = Array.isArray(args)
  ? args
  : String(args)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

log(`${targets.length} deliverables need a file field`);

phase('Add');

const results = await pipeline(targets, (file) =>
  agent(`${SHARED}\n\nYOUR ASSIGNED LESSON: ${file}`, {
    label: file.split('/').pop(),
    phase: 'Add',
  }),
);

return { updated: results.filter(Boolean).length };
