'use client';

import { useActionState } from 'react';
import { CheckCircle2, CircleAlert, RefreshCw, XCircle } from 'lucide-react';
import { saveMyNewTermAction, saveSeeMeHiredAction, testMyNewTermAction, type FeedCheckState, type JobFeedFormState } from '@/lib/admin/jobfeed-actions';
import { inputClass } from './MediaInputs';

/** What the page passes in. Never includes the API code itself. */
export interface MyNewTermSettingsView {
  enabled: boolean;
  hasCode: boolean;
  fromEnv: boolean;
  codeUnreadable: boolean;
}

const card = 'space-y-4 rounded-xl border border-neutral-200 bg-white p-5';
const label = 'block text-sm font-semibold';
const help = 'mt-1 block text-xs font-normal text-neutral-500';
const submit = 'inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand-orange px-5 py-2 text-sm font-bold text-white hover:brightness-95 disabled:opacity-60';

function CheckResult({ state }: { state: FeedCheckState }) {
  if (state.error) return <p role="alert" className="text-sm font-semibold text-red-600">{state.error}</p>;
  const r = state.result;
  if (!r) return null;
  const ok = r.outcome === 'key-found';
  return (
    <div role="status" className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
      <p className="text-xs text-neutral-500">Checked at {r.checkedAt}</p>
      <p className="flex gap-2">
        {ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />}
        <span>
          {r.outcome === 'key-found' && (
            <>
              <strong>Ready.</strong> {r.fromPage ? 'Found your API key from the school API code' : 'Using the API key you entered'} (ending <code>…{r.keyEnding}</code>, matching Part C on your
              MyNewTerm page). With “Use this feed” on, the MyNewTerm vacancies widget shows on the careers page and the contact page.
            </>
          )}
          {r.outcome === 'no-key' && (
            <>
              <strong>No API key found for this code.</strong> Paste the key from Part C on your MyNewTerm “API Code” page (the part inside <code>mntSchoolVacancies(&apos;…&apos;)</code>).
            </>
          )}
          {r.outcome === 'unreachable' && <>MyNewTerm couldn’t be reached ({r.message}). Try again in a minute.</>}
        </span>
      </p>
    </div>
  );
}

/** Settings → Job feeds: the MyNewTerm API code. */
export function JobFeedSettingsForm({ settings }: { settings: MyNewTermSettingsView }) {
  const [state, action, pending] = useActionState<JobFeedFormState, FormData>(saveMyNewTermAction, {});
  const [checkState, checkAction, checking] = useActionState<FeedCheckState, FormData>(testMyNewTermAction, {});
  const configured = settings.hasCode || settings.fromEnv;

  return (
    <div className="space-y-6">
      <div className={`flex gap-3 rounded-xl border p-4 text-sm ${configured && settings.enabled ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'}`}>
        {configured && settings.enabled ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-700" aria-hidden="true" />
        ) : (
          <CircleAlert className="h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        )}
        <p>
          {!configured ? (
            <>
              <strong>Not set up yet.</strong> Add your MyNewTerm API key, then use Test connection to check it.
            </>
          ) : settings.enabled ? (
            <>
              <strong>MyNewTerm is switched on.</strong> Use Test connection to check the feed.
            </>
          ) : (
            <>
              <strong>A code is saved, but the feed is switched off.</strong>
            </>
          )}
          {settings.codeUnreadable && (
            <span className="mt-1 block font-semibold text-red-600">The saved API code can’t be read any more (SESSION_SECRET was changed). Please enter it again.</span>
          )}
        </p>
      </div>

      <form action={action} className={card}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">MyNewTerm</h2>
            <p className="text-sm text-neutral-500">Shows your live MyNewTerm vacancies on the careers page and the contact page, using MyNewTerm’s widget in your brand colours. People apply on MyNewTerm.</p>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" name="enabled" defaultChecked={settings.enabled} /> Use this feed
          </label>
        </div>
        <label className={label}>
          API key or school API code
          <input
            name="apiCode"
            type="password"
            autoComplete="new-password"
            spellCheck={false}
            placeholder={settings.hasCode ? 'Saved. Leave blank to keep it' : '00000000-0000-0000-0000-000000000000'}
            className={`${inputClass} mt-1 font-mono`}
          />
          <span className={help}>
            Any of these works: the API key from Part C (in <code>mntSchoolVacancies(&apos;…&apos;)</code>), the whole Part C script, or the link to your MyNewTerm “API
            Code” page. Stored encrypted and never shown again.
          </span>
          {settings.fromEnv && <span className={help}>Currently using the MYNEWTERM_API_CODE environment variable. Fill this in to override it.</span>}
        </label>
        {settings.hasCode && (
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="removeCode" /> Remove the saved API code
          </label>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={pending} className={submit}>
            {pending ? 'Saving…' : 'Save MyNewTerm settings'}
          </button>
          {state.error && <p role="alert" className="text-sm font-semibold text-red-600">{state.error}</p>}
          {state.success && <p role="status" className="text-sm font-semibold text-green-700">{state.success}</p>}
        </div>
      </form>

      <form action={checkAction} className={card}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Test connection</h2>
            <p className="text-sm text-neutral-500">Checks the saved code and finds the API key the website will use.</p>
          </div>
          <button type="submit" disabled={checking} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-bold hover:border-brand-ink disabled:opacity-60">
            <RefreshCw className={`h-4 w-4 ${checking ? 'animate-spin' : ''}`} aria-hidden="true" /> {checking ? 'Testing…' : 'Test connection'}
          </button>
        </div>
        <CheckResult state={checkState} />
      </form>
    </div>
  );
}

/** Settings → Job feeds: SeeMeHired on or off. */
export function SeeMeHiredSettingsForm({ enabled }: { enabled: boolean }) {
  const [state, action, pending] = useActionState<JobFeedFormState, FormData>(saveSeeMeHiredAction, {});

  return (
    <form action={action} className={card}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold">SeeMeHired</h2>
          <p className="text-sm text-neutral-500">
            Jobs from the group’s SeeMeHired account, listed with your own vacancies on the careers page and the contact page. People apply on
            SeeMeHired.
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${enabled ? 'bg-green-100 text-green-800' : 'bg-neutral-100 text-neutral-600'}`}>
          {enabled ? 'On' : 'Off'}
        </span>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" name="enabled" defaultChecked={enabled} /> Show SeeMeHired jobs on the website
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={submit}>
          {pending ? 'Saving…' : 'Save SeeMeHired setting'}
        </button>
        {state.error && <p role="alert" className="text-sm font-semibold text-red-600">{state.error}</p>}
        {state.success && <p role="status" className="text-sm font-semibold text-green-700">{state.success}</p>}
      </div>
    </form>
  );
}
