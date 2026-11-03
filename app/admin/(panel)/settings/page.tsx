import type { Metadata } from 'next';
import { requireSuperAdmin } from '@/lib/auth/dal';
import { getEmailSettings, isConfigured } from '@/lib/email/settings';
import { getMyNewTermSettings } from '@/lib/careers/mynewterm-settings';
import { isSeeMeHiredEnabled } from '@/lib/careers/seemehired';
import { EmailSettingsForm } from '@/components/admin/EmailSettingsForm';
import { JobFeedSettingsForm, SeeMeHiredSettingsForm } from '@/components/admin/JobFeedSettingsForm';

export const metadata: Metadata = { title: 'Settings' };

/** Super admins only: the Microsoft email connection, where each form is sent, and job feed keys. */
export default async function SettingsPage() {
  await requireSuperAdmin();
  const [s, mnt, smhEnabled] = await Promise.all([getEmailSettings(), getMyNewTermSettings(), isSeeMeHiredEnabled()]);

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold sm:text-3xl">Email settings</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Forward website forms to Microsoft 365 mailboxes as branded emails. Everything still arrives in the dashboard Inbox too.
          </p>
        </header>
        <EmailSettingsForm
          settings={{
            enabled: s.enabled,
            // Values that come from environment variables aren't echoed back into the form.
            tenantId: s.fromEnv.tenantId ? '' : s.tenantId,
            clientId: s.fromEnv.clientId ? '' : s.clientId,
            senderId: s.fromEnv.senderId ? '' : s.senderId,
            siteUrl: s.siteUrl,
            hasSecret: Boolean(s.clientSecret) && !s.fromEnv.clientSecret,
            secretUnreadable: s.secretUnreadable,
            configured: isConfigured(s),
            fromEnv: s.fromEnv,
            routes: s.routes,
          }}
        />
      </div>

      <div id="job-feeds" className="scroll-mt-6 space-y-8 border-t border-neutral-200 pt-10">
        <header>
          <h2 className="text-2xl font-bold sm:text-3xl">Job feeds</h2>
          <p className="mt-1 text-sm text-neutral-500">Keys for pulling vacancies from recruitment platforms into the website’s careers list.</p>
        </header>
        <JobFeedSettingsForm
          settings={{
            enabled: mnt.enabled,
            // Only whether a code is saved; the code itself never leaves the server.
            hasCode: Boolean(mnt.apiCode) && !mnt.fromEnv,
            fromEnv: mnt.fromEnv,
            codeUnreadable: mnt.codeUnreadable,
          }}
        />
        <SeeMeHiredSettingsForm enabled={smhEnabled} />
      </div>
    </div>
  );
}
