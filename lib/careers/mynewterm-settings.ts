import 'server-only';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db, hasDatabase, schema } from '@/lib/db';

/*
 * MyNewTerm job feed settings. Super admins enter the school's API code in
 * the dashboard (Settings → Job feeds); if it's left blank there, the
 * MYNEWTERM_API_CODE environment variable is used instead.
 *
 * The code is stored encrypted (AES-256-GCM) with a key derived from
 * SESSION_SECRET, like the Microsoft client secret (lib/email/settings.ts),
 * so changing SESSION_SECRET means entering it again.
 */

const KEY = 'mynewterm';

/** What's stored in app_settings (the code only ever encrypted). */
interface StoredMyNewTermSettings {
  enabled: boolean;
  /** iv.tag.ciphertext, base64url. */
  apiCodeEnc: string;
}

/** Ready to use: env fallback applied and the code decrypted. Server-only. */
export interface MyNewTermSettings {
  enabled: boolean;
  apiCode: string;
  /** The code comes from MYNEWTERM_API_CODE rather than the dashboard. */
  fromEnv: boolean;
  /** A code is saved but can't be decrypted (SESSION_SECRET changed). */
  codeUnreadable: boolean;
}

function key() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set.');
  return createHash('sha256').update(`${secret}:app-settings:mynewterm`).digest();
}

function encrypt(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  return [iv, cipher.getAuthTag(), data].map((b) => b.toString('base64url')).join('.');
}

function decrypt(enc: string): string | null {
  try {
    const [iv, tag, data] = enc.split('.').map((part) => Buffer.from(part, 'base64url'));
    const decipher = createDecipheriv('aes-256-gcm', key(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
  } catch {
    return null;
  }
}

async function readStored(): Promise<Partial<StoredMyNewTermSettings>> {
  if (!hasDatabase) return {};
  const [row] = await db().select({ value: schema.appSettings.value }).from(schema.appSettings).where(eq(schema.appSettings.key, KEY));
  return (row?.value ?? {}) as Partial<StoredMyNewTermSettings>;
}

export async function getMyNewTermSettings(): Promise<MyNewTermSettings> {
  const stored = await readStored();
  const decrypted = stored.apiCodeEnc ? decrypt(stored.apiCodeEnc) : null;
  const envCode = (process.env.MYNEWTERM_API_CODE ?? '').trim();
  return {
    enabled: stored.enabled ?? false,
    apiCode: decrypted?.trim() || envCode,
    fromEnv: !decrypted && Boolean(envCode),
    codeUnreadable: Boolean(stored.apiCodeEnc) && decrypted === null,
  };
}

export interface MyNewTermSettingsInput {
  enabled: boolean;
  /** Blank keeps the saved code. */
  apiCode: string;
  removeCode: boolean;
}

export async function saveMyNewTermSettings(input: MyNewTermSettingsInput, adminId: string) {
  const stored = await readStored();
  const apiCodeEnc = input.removeCode ? '' : input.apiCode ? encrypt(input.apiCode) : (stored.apiCodeEnc ?? '');
  const value: StoredMyNewTermSettings = { enabled: input.enabled, apiCodeEnc };
  const now = new Date();
  await db()
    .insert(schema.appSettings)
    .values({ key: KEY, value, updatedAt: now, updatedBy: adminId })
    .onConflictDoUpdate({ target: schema.appSettings.key, set: { value, updatedAt: now, updatedBy: adminId } });
}

/** The address MyNewTerm serves a school's feed from. */
export const feedUrl = (apiCode: string) => `https://mynewterm.com/schoolApiCode/${encodeURIComponent(apiCode)}`;
