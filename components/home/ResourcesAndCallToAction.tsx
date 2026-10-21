import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReferralButton } from '@/components/common/ActionButtons';
import { homeButton, homeType } from '@/components/home/homeStyles';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { HomeContent } from '@/lib/content/pages';

/* Frame y 7873–8463 (resources band) and 8463–9075 (closing call to action). */
export function ResourcesAndCallToAction({
  resources,
  closing,
}: {
  resources: HomeContent['resources'];
  closing: HomeContent['closing'];
}) {
  return (
    <>
      {/* Dark text: white doesn't stand out against the light blue photo. */}
      <section id="resources-preview" className="relative overflow-hidden px-6 pt-12 pb-32 text-brand-ink lg:u-h-590 lg:p-0">
        <Image
          src="/images/home/books-blue.webp"
          alt="Colourful open books standing on their edges against a light blue background"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <Reveal from="left" className="relative lg:absolute lg:u-left-389 lg:u-top-88">
          <h2 className={homeType.heading}>
            <Lines text={resources.title} />
          </h2>
        </Reveal>

        <Reveal from="pop" delay={0.3} className="relative mt-6 lg:absolute lg:u-left-1218 lg:u-top-202 lg:mt-0">
          <Button
            asChild
            variant="outline-white"
            className={cn(homeButton.outlineSm, 'border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white lg:u-w-311')}
          >
            <Link id="btn-visit-resources" href="/resources">
              {resources.cta}
            </Link>
          </Button>
        </Reveal>
      </section>

      <section className="relative bg-brand-orange px-6 pb-14 text-white lg:u-h-612 lg:p-0">
        <Reveal from="left" className="relative mx-auto aspect-[879/608] w-3/4 max-w-sm lg:absolute lg:-u-left-48 lg:u-top-26 lg:u-h-608 lg:u-w-879 lg:max-w-none">
          <Image
            src="/images/home/lightbulb.webp"
            alt="Clear lightbulb lying on its side"
            fill
            sizes="(min-width: 1024px) 46vw, 75vw"
            className="object-contain"
          />
        </Reveal>

        <Reveal from="right" className="relative text-center lg:absolute lg:u-right-266 lg:u-top-84 lg:u-w-934 lg:text-right">
          <h2 className={homeType.heading}>
            <Lines text={closing.title} />
          </h2>
          <p className={cn(homeType.body, 'mt-4 lg:u-mt-22')}>
            {closing.body}
          </p>
          <ReferralButton
            id="cta-btn-referral-bottom"
            variant="outline-white"
            className={cn(homeButton.outlineSm, 'mt-6 lg:u-mt-43 lg:u-w-311')}
          >
            {closing.cta}
          </ReferralButton>
        </Reveal>
      </section>
    </>
  );
}
