import Link from 'next/link';
import { REFERRAL_HREF } from '@/constants';
import type { ContactPageContent, SettingsContent } from '@/lib/content/pages';
import { cn } from '@/lib/utils';

const cardTitle = 'text-xl font-bold lg:u-text-35';
const small = 'text-sm leading-snug lg:u-text-20';
const button =
  'inline-flex h-9 items-center justify-center rounded-full px-6 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-lg lg:u-h-47 lg:u-px-32 lg:u-text-22';

/** The column beside the "Chat to Us" card: contact details, referral and intro. */
export function ContactCards({ content, settings }: { content: ContactPageContent; settings: SettingsContent }) {
  const { contact, address } = settings;

  return (
    <div className="flex flex-col gap-5 lg:gap-0">
      <div className="rounded-tr-[3rem] bg-brand-orange px-7 py-8 text-white lg:u-rounded-tr-90 lg:u-px-45 lg:u-pt-40 lg:u-pb-36">
        <h2 className={cardTitle}>{content.getInTouch.title}</h2>
        <dl className="mt-4 grid grid-cols-[1fr_auto] gap-x-6 gap-y-4 text-sm leading-snug lg:u-mt-16 lg:u-gap-x-20 lg:u-gap-y-22 lg:u-text-18">
          <div className="min-w-0">
            <dt className="font-bold">Email</dt>
            <dd>
              <a href={`mailto:${contact.enquiriesEmail}`} className="break-all hover:underline lg:break-normal lg:whitespace-nowrap">
                {contact.enquiriesEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-bold">Phone No.</dt>
            <dd>
              <a href={`tel:${contact.phoneInternational.replace(/\s/g, '')}`} className="whitespace-nowrap hover:underline">
                {contact.phone}
              </a>
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="font-bold">Address</dt>
            <dd>
              <address className="not-italic">{address.lines.join(' | ')}</address>
            </dd>
          </div>
        </dl>
      </div>

      <div className="px-2 text-brand-ink lg:u-px-45 lg:u-py-30">
        <h2 className={cardTitle}>{content.refer.title}</h2>
        <p className={cn('mt-2 lg:u-mt-14', small)}>{content.refer.body}</p>
        <p className={cn('mt-3 lg:u-mt-18', small)}>
          <span className="block font-bold">Email</span>
          <a href={`mailto:${contact.referralsEmail}`} className="break-all hover:underline">
            {contact.referralsEmail}
          </a>
        </p>
        <Link href={REFERRAL_HREF} className={cn(button, 'mt-4 bg-brand-ink text-white hover:bg-brand-ink/90 lg:u-mt-16')}>
          {content.refer.cta}
        </Link>
      </div>

      <div className="rounded-tr-[3rem] bg-brand-pink px-7 py-8 text-white lg:u-rounded-tr-90 lg:u-px-45 lg:u-pt-45 lg:u-pb-40">
        <h2 className={cardTitle}>{content.talk.title}</h2>
        <p className={cn('mt-2 lg:u-mt-14', small)}>{content.talk.body}</p>
        <Link href={REFERRAL_HREF} className={cn(button, 'mt-5 bg-white text-brand-ink hover:bg-neutral-100 lg:u-mt-24')}>
          {content.talk.cta}
        </Link>
      </div>
    </div>
  );
}

/** The light blue "Where we work" card with the areas we cover. */
export function WhereWeWork({ content }: { content: ContactPageContent['where'] }) {
  return (
    <section
      id="where-we-work"
      className="relative z-20 mx-auto mt-12 w-[90%] scroll-mt-36 rounded-tl-[3rem] bg-brand-cyan px-7 py-12 text-brand-ink sm:rounded-tl-[5rem] sm:px-14 lg:u-mt-84 lg:u-w-1540 lg:u-rounded-tl-110 lg:u-pt-72 lg:u-pr-98 lg:u-pb-75 lg:u-pl-98"
    >
      <p className="text-xs font-bold uppercase tracking-wide sm:text-sm lg:u-text-22">{content.eyebrow}</p>
      <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-4xl lg:u-mt-16 lg:u-text-52">{content.title}</h2>
      <p className="mt-3 max-w-4xl text-sm leading-[1.3] sm:text-lg lg:u-mt-16 lg:u-max-w-1200 lg:u-text-24">{content.body}</p>
      <ul className="mt-6 flex flex-wrap gap-2 lg:u-mt-30 lg:u-gap-14">
        {content.areas.map((area) => (
          <li
            key={area}
            className="flex h-9 min-w-32 items-center justify-center rounded-full bg-white px-5 text-sm font-bold lg:u-h-40 lg:u-min-w-226 lg:u-px-20 lg:u-text-20"
          >
            {area}
          </li>
        ))}
      </ul>
    </section>
  );
}
