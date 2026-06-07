/**
 * CMS API client for fetching data from the admin panel.
 *
 * When CMS_API_URL is set, data functions try the API first and fall back to
 * static data on failure.  When the env var is absent, static data is used
 * directly — no network requests are made.
 */

const CMS_API_URL = process.env.CMS_API_URL; // e.g. "http://localhost:3001"

interface FetchOptions {
  /** Cache strategy passed to Next.js `fetch`. Defaults to `"no-store"`. */
  cache?: RequestCache;
  /** Next.js revalidation interval in seconds. */
  revalidate?: number;
}

/**
 * Fetch JSON from the CMS public API.  Returns `null` if CMS_API_URL is unset
 * or the request fails, so callers can fall back to static data.
 */
export async function cmsGet<T>(
  path: string,
  opts: FetchOptions = {},
): Promise<T | null> {
  if (!CMS_API_URL) return null;

  try {
    const url = `${CMS_API_URL}/api/v1${path}`;
    const res = await fetch(url, {
      next: opts.revalidate != null ? { revalidate: opts.revalidate } : undefined,
      cache: opts.revalidate != null ? undefined : (opts.cache ?? "no-store"),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
