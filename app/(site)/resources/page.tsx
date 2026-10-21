import type { Metadata } from 'next';
import { ResourcesHero } from '@/components/resources/ResourcesHero';
import { ResourceLibrary } from '@/components/resources/ResourceLibrary';
import { ReferralButton } from '@/components/common/ActionButtons';
import { Lines } from '@/components/common/Lines';
import { Reveal } from '@/components/motion/Reveal';
import { getCollection, getSingle } from '@/lib/content/queries';
import { withPolicies } from '@/lib/content/policies';

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Practical guidance, downloadable resources and policies for schools, professionals and families exploring Alternative Provision and personalised education.',
};

export default async function ResourcesPage() {
  const [{ hero, intro, library: saved, closing }, policies] = await Promise.all([getSingle('resources'), getCollection('policy')]);
  const library = withPolicies(saved, policies);

  return (
    <div className="w-full overflow-hidden bg-brand-green pb-20 sm:pb-28">
      <ResourcesHero content={hero} />

      <section className="relative z-20 mx-auto w-[90%] max-w-5xl py-12 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-0">
          <Reveal from="left" className="sm:w-1/2 sm:pr-10 sm:text-right">
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              <Lines text={intro.title} />
            </h2>
          </Reveal>

          <Reveal from="right" className="border-l-[3px] border-brand-orange py-2 pl-5 sm:w-1/2 sm:pl-10">
            <p className="text-sm leading-relaxed text-white sm:text-lg">{intro.body}</p>
          </Reveal>
        </div>
      </section>

      <ResourceLibrary content={library} />

      <Reveal className="relative z-20 mx-auto mt-12 w-[90%] max-w-6xl rounded-tr-[3rem] bg-brand-pink px-6 py-12 text-center text-white sm:mt-14 sm:rounded-tr-[5rem] sm:px-16 sm:py-16">
        <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          <Lines text={closing.title} />
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed sm:text-lg">{closing.body}</p>
        <ReferralButton className="mt-8 text-base">{closing.cta}</ReferralButton>
      </Reveal>
    </div>
  );
}
