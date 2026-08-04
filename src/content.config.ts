import { defineCollection } from 'astro:content';
// Imported from zod directly — re-exporting it from astro:content is deprecated.
import { z } from 'zod';
import { glob } from 'astro/loaders';

/**
 * How WA-relevant an external resource is.
 *
 * A US paving tutorial is still worth watching; a US plant list will get you
 * killed by a Perth February. This field is what lets the resource library be
 * honest about the difference.
 */
const waRelevance = z.enum([
  'wa-specific', // written for Western Australia
  'australian', // national, applies here
  'universal', // physics, technique, design principle — travels anywhere
  'overseas-adapt', // good, but you must translate it to Perth conditions
]);

const resourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  provider: z.string(),
  type: z.enum([
    'course',
    'video',
    'article',
    'book',
    'standard',
    'tool',
    'calculator',
    'directory',
    'government',
    'podcast',
    'supplier',
    'app',
  ]),
  cost: z.enum(['free', 'freemium', 'paid']),
  /** Human-readable price, e.g. "$49" or "$1,200 (subsidised: $340)". */
  price: z.string().optional(),
  /** How long it takes to get through, e.g. "12 min" or "6 weeks part-time". */
  duration: z.string().optional(),
  /** Why this one and not the twenty others. Required — no unexplained links. */
  whyGood: z.string(),
  waRelevance,
  /** What to change for Perth conditions, if anything. */
  waCaveat: z.string().optional(),
  /** Date the link was last fetched and confirmed to say what we claim. */
  checkedOn: z.coerce.date(),
});

const videoSchema = z.object({
  youtubeId: z.string(),
  title: z.string(),
  channel: z.string(),
  duration: z.string().optional(),
  whyGood: z.string(),
  waRelevance,
  waCaveat: z.string().optional(),
  checkedOn: z.coerce.date(),
});

/**
 * One field of a deliverable.
 *
 * Six types, deliberately — they are what the thirty deliverables actually
 * need, and a small vocabulary is what stops the form component growing every
 * time a lesson is written.
 */
const questionSchema = z.object({
  /** Stable within its deliverable. Stored as `<workbookKey>.<key>`. */
  key: z.string().regex(/^[a-z0-9-]+$/, 'question keys are lower-case, digits and hyphens only'),
  label: z.string(),
  /** Shown under the label — an example, a unit, a warning. */
  hint: z.string().optional(),
  type: z.enum(['prose', 'text', 'number', 'list', 'table', 'file']),
  /** prose: rows of the textarea. list: how many blank lines to offer. */
  rows: z.number().int().min(1).max(40).optional(),
  /** number/text: rendered inside the field, e.g. "$" or "m²". */
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  /** table: the column headings. Rows are added by the reader. */
  columns: z.array(z.string()).optional(),
});

/** A regulatory claim, with its source and the date we verified it. */
const regulationSchema = z.object({
  claim: z.string(),
  source: z.string(),
  sourceUrl: z.string().url(),
  checkedOn: z.coerce.date(),
});

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    /** Phase number, 1–11. */
    phase: z.number().int().min(1).max(11),
    /** Position within the phase. */
    order: z.number(),
    summary: z.string(),
    timeEstimate: z.string(),
    difficulty: z.enum(['foundation', 'intermediate', 'advanced']),
    /**
     * Honest state of the WRITING. Stubs render with a visible notice rather
     * than pretending to be finished.
     */
    status: z.enum(['stub', 'draft', 'complete']).default('stub'),
    /**
     * Honest state of the DOING, which is a completely different question.
     *
     * `researched` means the lesson is written and its sources verified, but
     * nobody has carried it out on a real block yet. That is the default,
     * because it is the truth for almost everything here. Only `field-tested`
     * means someone has actually done it and come back.
     *
     * The public tracker is built from this field.
     */
    fieldStatus: z.enum(['researched', 'in-progress', 'field-tested']).default('researched'),
    /** What actually happened when it was done — surprises, costs, mistakes. */
    fieldNotes: z.string().optional(),
    /** When it was carried out, for the tracker. */
    fieldTestedOn: z.coerce.date().optional(),
    /** Groups a run of lessons into a named mini-course. */
    series: z.string().optional(),
    /** Lesson ids that should be done first. */
    prerequisites: z.array(z.string()).default([]),
    /**
     * The "do this on your own block" task.
     *
     * `questions` is the real shape: a deliverable is a small form, answered
     * where it is asked, and each answer is stored under
     * `<workbookKey>.<question.key>`. Adding a question is a content edit — it
     * needs no migration, because the store is key/value.
     *
     * `prompt` is the older single-paragraph form, kept optional so the thirty
     * deliverables can be converted without breaking the build in between.
     */
    deliverable: z
      .object({
        title: z.string(),
        /** Stable key — this is what the workbook stores against. */
        workbookKey: z.string(),
        /** One or two lines of framing above the fields. */
        intro: z.string().optional(),
        prompt: z.string().optional(),
        questions: z.array(questionSchema).optional(),
      })
      .refine((d) => d.questions?.length || d.prompt, {
        message: 'A deliverable needs either questions[] or a prompt',
      })
      .optional(),
    checklist: z.array(z.string()).default([]),
    resources: z.array(resourceSchema).default([]),
    videos: z.array(videoSchema).default([]),
    regulations: z.array(regulationSchema).default([]),
    /**
     * Set when WA law requires a licensed trade for part of this work.
     * Renders as a hard warning, not a footnote.
     */
    licensedTrade: z.string().optional(),
    updated: z.coerce.date().optional(),
  }),
});

/** Standalone WA reference pages — the single place regulatory facts live. */
const reference = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reference' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    status: z.enum(['stub', 'draft', 'complete']).default('stub'),
    resources: z.array(resourceSchema).default([]),
    regulations: z.array(regulationSchema).default([]),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { lessons, reference };
