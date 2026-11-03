import type { Metadata } from 'next';
import { Careers } from '@/components/contact/Careers';
import { ChatForm } from '@/components/contact/ChatForm';
import { ContactCards, WhereWeWork } from '@/components/contact/ContactCards';
import { Lines } from '@/components/common/Lines';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/Reveal';
import { MyNewTermJobs } from '@/components/careers/MyNewTermJobs';
import { getMyNewTermWidgetKey } from '@/lib/careers/mynewterm';
import { getSeeMeHiredVacancies } from '@/lib/careers/seemehired';
import { renderTime } from '@/lib/careers/shared';
import { getCollection, getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with MUVE Futures, make a learner referral, book an introduction or see our current vacancies.',
};

// Re-render regularly so vacancies past their closing date show as closed.
export const revalidate = 600;

/** Contact and careers, from public/design. From lg up, sizes are design pixels (u-* units). */
export default async function ContactPage() {
  const [{ contact: hero }, content, settings, vacancies, seemehired, mntKey] = await Promise.all([
    getSingle('forms'),
    getSingle('contact-page'),
    getSingle('settings'),
    getCollection('vacancy'),
    getSeeMeHiredVacancies(),
    getMyNewTermWidgetKey(),
  ]);

  return (
    <div className="w-full overflow-hidden bg-brand-green pb-20 sm:pb-28 lg:u-pb-150">
      <Stagger onLoad stagger={0.15} delay={0.1} className="relative z-10 mx-auto w-[90%] pt-10 text-center text-white sm:pt-14 lg:u-pt-200">
        <StaggerItem>
          <h1 className="text-3xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:u-text-94">
            <Lines text={hero.title} />
          </h1>
        </StaggerItem>
        {content.subtitle && (
          <StaggerItem>
            <p className="mt-2 text-xl font-bold sm:text-3xl lg:u-mt-4 lg:u-text-50">{content.subtitle}</p>
          </StaggerItem>
        )}
        <StaggerItem>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-[1.35] sm:text-base lg:u-mt-30 lg:u-max-w-1160 lg:u-text-24">{hero.intro}</p>
        </StaggerItem>
      </Stagger>

      <div
        id="contact-form"
        className="relative z-10 mx-auto mt-10 grid w-[90%] scroll-mt-36 gap-8 lg:u-mt-100 lg:u-w-1540 lg:grid-cols-[calc(var(--u)*1010)_1fr] lg:u-gap-x-54"
      >
        <Reveal onLoad delay={0.4} className="rounded-tr-[3rem] bg-brand-lime px-6 py-10 sm:rounded-tr-[5rem] sm:px-12 lg:u-rounded-tr-110 lg:u-pt-80 lg:u-pr-64 lg:u-pb-60 lg:u-pl-83">
          <ChatForm content={content.form} />
        </Reveal>
        <Reveal onLoad from="right" delay={0.55}>
          <ContactCards content={content} settings={settings} />
        </Reveal>
      </div>

      <Reveal>
        <WhereWeWork content={content.where} />
      </Reveal>

      {/* With MyNewTerm on and nothing else live, its widget is the list (no "no open roles" message above it). */}
      {(vacancies.length > 0 || seemehired.length > 0 || !mntKey) && (
        <Careers content={content.careers} vacancies={[...vacancies, ...seemehired]} renderedAt={renderTime()} />
      )}
      {mntKey && (
        <MyNewTermJobs
          apiKey={mntKey}
          title={vacancies.length > 0 || seemehired.length > 0 ? 'More Vacancies' : content.careers.title}
          intro="Live roles advertised on MyNewTerm. Choose a role to read the full details and apply."
        />
      )}
    </div>
  );
}
