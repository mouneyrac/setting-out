import { defineCollection, z } from 'astro:content';
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
    /** The "do this on your own block" task. Writes into the workbook. */
    deliverable: z
      .object({
        title: z.string(),
        prompt: z.string(),
        /** Stable key — this is what the workbook stores against. */
        workbookKey: z.string(),
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

/** Downloadable templates: brief, site analysis sheet, quote, calendar. */
const toolkit = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/toolkit' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    status: z.enum(['stub', 'draft', 'complete']).default('stub'),
    /** Phase this template belongs to, for cross-linking. */
    phase: z.number().int().min(1).max(11).optional(),
    /** Path under /public for the downloadable file, if there is one. */
    download: z.string().optional(),
    format: z.enum(['pdf', 'csv', 'markdown', 'spreadsheet', 'print']).optional(),
  }),
});

export const collections = { lessons, reference, toolkit };
