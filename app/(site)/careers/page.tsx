import type { Metadata } from 'next';
import { MyNewTermJobs } from '@/components/careers/MyNewTermJobs';
import { Careers } from '@/components/contact/Careers';
import { getMyNewTermWidgetKey } from '@/lib/careers/mynewterm';
import { getSeeMeHiredVacancies } from '@/lib/careers/seemehired';
import { renderTime } from '@/lib/careers/shared';
import { getCollection, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Current vacancies at MUVE Futures. Help children and young people across the West Midlands move forward in education.',
};

// Re-render regularly so roles past their closing date show as closed.
export const revalidate = 600;

export default async function CareersPage() {
  const [{ careers }, vacancies, seemehired, mntKey] = await Promise.all([
    getSingle('contact-page'),
    getCollection('vacancy'),
    getSeeMeHiredVacancies(),
    getMyNewTermWidgetKey(),
  ]);
  const listed = [...vacancies, ...seemehired];
  // With MyNewTerm on and nothing else live, its widget is the list (no "no open roles" message above it).
  const showList = listed.length > 0 || !mntKey;

  return (
    <div className="w-full overflow-hidden bg-brand-green pt-4 pb-20 sm:pb-28 lg:u-pb-200">
      {showList && <Careers content={careers} vacancies={listed} renderedAt={renderTime()} headingLevel="h1" />}
      {mntKey && (
        <MyNewTermJobs
          apiKey={mntKey}
          headingLevel={showList ? 'h2' : 'h1'}
          title={showList ? 'More Vacancies' : careers.title}
          intro="Live roles advertised on MyNewTerm. Choose a role to read the full details and apply."
        />
      )}
    </div>
  );
}
