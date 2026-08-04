/**
 * Pagefind's bundle is produced by `npx pagefind` *after* `astro build`, so at
 * type-check time the file genuinely does not exist. This declares the slice of
 * its API that SiteSearch uses, which is enough to type the search results and
 * to stop the dynamic import reading as an unresolved module.
 *
 * Keep it minimal: anything declared here is asserted, not verified.
 */
declare module '*/pagefind.js' {
  export interface PagefindResultData {
    url: string;
    excerpt: string;
    meta?: { title?: string };
  }

  export interface PagefindResult {
    id: string;
    data(): Promise<PagefindResultData>;
  }

  export interface PagefindSearch {
    results: PagefindResult[];
  }

  export function init(): Promise<void>;
  export function search(query: string): Promise<PagefindSearch>;
}
