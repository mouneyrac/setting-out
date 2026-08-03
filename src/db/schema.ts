import { sqliteTable, text, integer, index, unique } from 'drizzle-orm/sqlite-core';

/* ─────────────────────────────────────────────────────────────────────────
   Better Auth core tables.

   Shapes are dictated by Better Auth — do not rename columns.
   ───────────────────────────────────────────────────────────────────────── */

export const user = sqliteTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'boolean' }).notNull().default(false),
  image: text('image'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const session = sqliteTable('session', {
  id: text('id').primaryKey(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  token: text('token').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
});

export const account = sqliteTable('account', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
  refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
  scope: text('scope'),
  password: text('password'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const verification = sqliteTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }),
  updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

/* ─────────────────────────────────────────────────────────────────────────
   Course tables.
   ───────────────────────────────────────────────────────────────────────── */

/**
 * The reader's own block. Phase 3 asks for most of this on site; capturing it
 * once means later lessons can address the reader's actual conditions rather
 * than a generic Perth garden.
 */
export const propertyProfile = sqliteTable('property_profile', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: 'cascade' }),
  suburb: text('suburb'),
  postcode: text('postcode'),
  blockSizeM2: integer('block_size_m2'),
  /** bassendean | spearwood | karrakatta | quindalup | unknown */
  soilType: text('soil_type'),
  /** Which way the back garden faces — drives everything about sun and shade. */
  aspect: text('aspect'),
  /** scheme | bore | both | none */
  waterSource: text('water_source'),
  /** Last digit of the house number — determines the rostered watering days. */
  houseNumberLastDigit: text('house_number_last_digit'),
  /** bare | established | renovating */
  gardenState: text('garden_state'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const lessonProgress = sqliteTable(
  'lesson_progress',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    /** Content id, e.g. "03-site-analysis/03-perth-soils". */
    lessonId: text('lesson_id').notNull(),
    /** started | done */
    status: text('status').notNull().default('done'),
    completedAt: integer('completed_at', { mode: 'timestamp' }),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (t) => [
    unique('lesson_progress_user_lesson').on(t.userId, t.lessonId),
    index('lesson_progress_user').on(t.userId),
  ],
);

/**
 * The project workbook. Each lesson deliverable writes to a stable
 * `workbookKey`, so the entries assemble into one document in Phase 11
 * regardless of the order they were filled in.
 */
export const workbookEntry = sqliteTable(
  'workbook_entry',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    workbookKey: text('workbook_key').notNull(),
    lessonId: text('lesson_id').notNull(),
    content: text('content').notNull().default(''),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (t) => [
    unique('workbook_entry_user_key').on(t.userId, t.workbookKey),
    index('workbook_entry_user').on(t.userId),
  ],
);

/** Free-text notes against any lesson — "the retic valve is behind the shed". */
export const lessonNote = sqliteTable(
  'lesson_note',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    lessonId: text('lesson_id').notNull(),
    body: text('body').notNull().default(''),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (t) => [
    unique('lesson_note_user_lesson').on(t.userId, t.lessonId),
    index('lesson_note_user').on(t.userId),
  ],
);

export const schema = {
  user,
  session,
  account,
  verification,
  propertyProfile,
  lessonProgress,
  workbookEntry,
  lessonNote,
};
