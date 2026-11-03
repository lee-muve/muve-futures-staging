'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { requireSuperAdmin } from '@/lib/auth/dal';
import { getMyNewTermSettings, saveMyNewTermSettings } from '@/lib/careers/mynewterm-settings';
import { resolveMyNewTermKey } from '@/lib/careers/mynewterm';
import { setSeeMeHiredEnabled } from '@/lib/careers/seemehired';

export interface JobFeedFormState {
  error?: string;
  success?: string;
}

const UUID = /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/;

/**
 * Takes what was pasted (the code, the "API Code" page link, or the Part C
 * script) and returns just the code, or null if there isn't one in it.
 */
function extractCode(pasted: string): string | null {
  const fromScript = /mntSchoolVacancies\(\s*['"]([0-9A-Fa-f-]{36})['"]/.exec(pasted)?.[1];
  if (fromScript) return fromScript;
  const fromLink = /schoolApiCode\/([0-9A-Fa-f-]{36})/.exec(pasted)?.[1];
  if (fromLink) return fromLink;
  const trimmed = pasted.trim();
  if (/^[A-Za-z0-9-]{8,100}$/.test(trimmed)) return trimmed;
  return UUID.exec(trimmed)?.[0] ?? null;
}

/** Settings → Job feeds → MyNewTerm. Super admins only. */
export async function saveMyNewTermAction(_prev: JobFeedFormState, formData: FormData): Promise<JobFeedFormState> {
  const me = await requireSuperAdmin();
  const pasted = String(formData.get('apiCode') ?? '').slice(0, 5000);
  const apiCode = pasted.trim() ? extractCode(pasted) : '';
  if (apiCode === null) return { error: 'That doesn’t look like a MyNewTerm code. Paste the API key, the “API Code” page link, or the whole Part C script.' };

  await saveMyNewTermSettings({ enabled: formData.get('enabled') === 'on', apiCode, removeCode: formData.get('removeCode') === 'on' }, me.id);
  revalidatePath('/admin/settings');
  // Show the change on the careers pages straight away.
  revalidatePath('/careers');
  revalidatePath('/contact');
  updateTag('mynewterm');
  return { success: 'MyNewTerm settings saved.' };
}

/** Settings → Job feeds → SeeMeHired: on or off. Super admins only. */
export async function saveSeeMeHiredAction(_prev: JobFeedFormState, formData: FormData): Promise<JobFeedFormState> {
  const me = await requireSuperAdmin();
  const enabled = formData.get('enabled') === 'on';
  await setSeeMeHiredEnabled(enabled, me.id);
  revalidatePath('/admin/settings');
  // Add or remove its jobs on the careers pages straight away.
  revalidatePath('/careers');
  revalidatePath('/contact');
  return { success: enabled ? 'SeeMeHired switched on. Its jobs now show on the careers pages.' : 'SeeMeHired switched off. Its jobs no longer show on the website.' };
}

export interface FeedCheck {
  checkedAt: string;
  outcome: 'key-found' | 'no-key' | 'unreachable';
  /** The end of the widget key, so it can be checked against Part C without showing it all. */
  keyEnding?: string;
  /** The key was read from the "API Code" page because the saved code was the school API code. */
  fromPage?: boolean;
  message?: string;
}

export type FeedCheckState = { result?: FeedCheck; error?: string };

/** "Test connection": finds the widget key for the saved code, the way the website will. */
export async function testMyNewTermAction(): Promise<FeedCheckState> {
  await requireSuperAdmin();
  const settings = await getMyNewTermSettings();
  if (settings.codeUnreadable) return { error: 'The saved code can’t be read (the site’s SESSION_SECRET changed). Enter it again and save.' };
  if (!settings.apiCode) return { error: 'Add and save the code first.' };

  const checkedAt = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London' });
  try {
    const lookup = await resolveMyNewTermKey(settings.apiCode);
    if (!lookup.ok) return { result: { checkedAt, outcome: 'no-key', message: lookup.error } };
    return { result: { checkedAt, outcome: 'key-found', keyEnding: lookup.apiKey.slice(-4), fromPage: lookup.fromPage } };
  } catch (error) {
    return { result: { checkedAt, outcome: 'unreachable', message: error instanceof Error ? error.message : String(error) } };
  }
}
