/**
 * Identifies this build.
 *
 * Evaluated once when Astro prerenders, so it is baked into both the service
 * worker and /version.json. The client compares the id it was served with
 * against a fresh fetch of /version.json to notice a deploy — see the update
 * check in Base.astro.
 */
export const BUILD_ID = process.env.CF_VERSION_METADATA_ID ?? String(Date.now());
