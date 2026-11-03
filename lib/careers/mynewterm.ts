import 'server-only';
import { createHash } from 'node:crypto';
import { unstable_cache } from 'next/cache';
import { feedUrl, getMyNewTermSettings } from '@/lib/careers/mynewterm-settings';

/*
 * MyNewTerm vacancies. MyNewTerm only supports its website widget: the
 * visitor's browser loads their script, which fetches the jobs itself (their
 * API checks the website it's called from, so it can't be called from our
 * server). We embed that widget (components/careers/MyNewTermJobs.tsx) with
 * the school's API key, the one in Part C of the "API Code" page:
 *
 *   mntSchoolVacancies('THE-API-KEY', 1);
 *
 * That key is meant to be on public web pages. The dashboard accepts either
 * the key itself or the school API code from the "API Code" page link; for
 * the latter, the key is read from that page.
 */

const KEY_IN_PAGE = /mntSchoolVacancies\(\s*['"]([0-9A-Fa-f-]{36})['"]/;

export type KeyLookup = { ok: true; apiKey: string; fromPage: boolean } | { ok: false; error: string };

/** Finds the widget key for a saved code: from its "API Code" page, or the code itself if it is the key. */
export async function resolveMyNewTermKey(code: string): Promise<KeyLookup> {
  const res = await fetch(feedUrl(code), { cache: 'no-store', signal: AbortSignal.timeout(15000) });
  const page = await res.text();
  const fromPage = KEY_IN_PAGE.exec(page)?.[1];
  if (fromPage) return { ok: true, apiKey: fromPage, fromPage: true };
  // Not a school API code; if it has the shape of a key, it's presumably the key itself.
  if (/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/.test(code)) return { ok: true, apiKey: code, fromPage: false };
  return { ok: false, error: 'No API key was found for this code.' };
}

/** Remembered for a day per code (the cache key is a hash, never the code). Saving the settings clears it. */
const cachedKey = (code: string) =>
  unstable_cache(
    async () => {
      const lookup = await resolveMyNewTermKey(code);
      if (!lookup.ok) throw new Error(lookup.error);
      return lookup.apiKey;
    },
    ['mynewterm-key', createHash('sha256').update(code).digest('hex').slice(0, 16)],
    { revalidate: 86400, tags: ['mynewterm'] }
  )();

/** The key for the MyNewTerm widget when the feed is switched on in Settings, otherwise null. */
export async function getMyNewTermWidgetKey(): Promise<string | null> {
  try {
    const settings = await getMyNewTermSettings();
    if (!settings.enabled || !settings.apiCode) return null;
    return await cachedKey(settings.apiCode);
  } catch (error) {
    // MyNewTerm being unreachable shouldn't take the careers page down with it.
    console.error('MyNewTerm widget key:', error);
    return null;
  }
}
