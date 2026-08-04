/**
 * The signed-in reader's state, fetched once per page.
 *
 * Five components used to call `/api/me` independently — a lesson page with a
 * deliverable made three identical requests on load. They all share this now,
 * and the shape is typed rather than `unknown`, which is what `response.json()`
 * returns and what the type checker was rightly complaining about.
 */

export interface PropertyProfile {
  suburb: string | null;
  postcode: string | null;
  blockSizeM2: number | null;
  soilType: string | null;
  aspect: string | null;
  waterSource: string | null;
  houseNumberLastDigit: string | null;
  gardenState: string | null;
  notes: string | null;
}

export interface Session {
  signedIn: boolean;
  user?: { id: string; name: string; email: string };
  /** lessonId → 'done' */
  progress: Record<string, string>;
  /** workbookKey → stored value (JSON for lists, tables and files) */
  workbook: Record<string, string>;
  property: PropertyProfile | null;
}

const SIGNED_OUT: Session = { signedIn: false, progress: {}, workbook: {}, property: null };

let pending: Promise<Session> | null = null;

/**
 * Resolves the current session, sharing one request across every caller on the
 * page. Never rejects: signed out and offline both resolve to a signed-out
 * session, because no caller has anything useful to do with an exception.
 */
export function useSession(): Promise<Session> {
  if (pending) return pending;

  pending = fetch('/api/me')
    .then((response) => (response.ok ? response.json() : SIGNED_OUT))
    .then((data): Session => {
      const raw = data as Partial<Session> | null;
      if (!raw?.signedIn) return SIGNED_OUT;
      return {
        signedIn: true,
        user: raw.user,
        progress: raw.progress ?? {},
        workbook: raw.workbook ?? {},
        property: raw.property ?? null,
      };
    })
    .catch(() => SIGNED_OUT);

  return pending;
}

/** After signing in or out, so the next read is not the stale one. */
export function forgetSession(): void {
  pending = null;
}

/** Parses a stored workbook value. Lists, tables and files are JSON. */
export function parseStored(raw: string | undefined): string | string[] | string[][] | unknown[] {
  if (!raw) return '';
  if (raw.startsWith('[')) {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
}
