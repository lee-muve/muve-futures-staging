import Image from 'next/image';
import Link from 'next/link';
import { count, eq, isNull } from 'drizzle-orm';
import { requireAdmin } from '@/lib/auth/dal';
import { AREA_KEYS, canAccess, isSuperAdmin, type AdminArea } from '@/lib/auth/permissions';
import { db, schema } from '@/lib/db';
import { AdminNav } from '@/components/admin/AdminNav';

/** Badge counts for the menu, only for areas the admin can open; a database hiccup just hides them. */
async function menuCounts(areas: AdminArea[]) {
  try {
    const [[inbox], [careers]] = await Promise.all([
      areas.includes('inbox') ? db().select({ n: count() }).from(schema.formSubmissions).where(isNull(schema.formSubmissions.readAt)) : [{ n: 0 }],
      areas.includes('careers') ? db().select({ n: count() }).from(schema.jobApplications).where(eq(schema.jobApplications.status, 'new')) : [{ n: 0 }],
    ]);
    return { inbox: inbox.n, careers: careers.n };
  } catch {
    return { inbox: 0, careers: 0 };
  }
}

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const areas = AREA_KEYS.filter((area) => canAccess(admin, area));
  const counts = await menuCounts(areas);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="shrink-0 bg-brand-ink md:sticky md:top-0 md:flex md:h-screen md:w-60 md:flex-col">
        <Link href="/admin" className="block px-5 pt-5" aria-label="Dashboard home">
          <Image src="/logo.svg" width={281} height={135} alt="Muve Futures" className="h-auto w-32" />
        </Link>
        <AdminNav name={admin.name} counts={counts} areas={areas} superAdmin={isSuperAdmin(admin)} />
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
