'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FrameworkStage } from '@/app/types';
import { Button } from '@/components/ui/button';
import { ReferralButton } from '@/components/common/ActionButtons';
import { homeButton, homeType } from '@/components/home/homeStyles';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Drift } from '@/components/motion/Drift';
import { Reveal } from '@/components/motion/Reveal';
import { Lines } from '@/components/common/Lines';
import type { HomeContent } from '@/lib/content/pages';

const inkOutline =
  'border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-white active:scale-100';

const arrowButton =
  'flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-orange text-white transition-transform hover:scale-105 lg:u-h-56 lg:u-w-56';

/*
 * Frame y 5153–7873: the framework card, the classroom photo, the notebook and
 * the referral block. Section coordinates = frame y − 5153.
 */
export function FourStageApproach({
  framework,
  partnerships,
  referral,
  onDiscoverMore,
}: {
  framework: HomeContent['framework'];
  partnerships: HomeContent['partnerships'];
  referral: HomeContent['referral'];
  onDiscoverMore: (stage: FrameworkStage) => void;
}) {
  const stages = framework.stages;
  const [index, setIndex] = useState(0);
  // Direction of the last step, so the headline slides the right way.
  const [direction, setDirection] = useState(1);
  const stage = stages[index % Math.max(stages.length, 1)];
  const step = (delta: number) => {
    setDirection(delta);
    setIndex((i) => (i + delta + stages.length) % Math.max(stages.length, 1));
  };

  return (
    <section id="framework" className="relative bg-brand-green pt-4 pb-16 lg:u-h-2720 lg:p-0">
      {/* Referral shapes, behind the notebook */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 2720" aria-hidden="true">
        <Drift depth={24} float={9} spin={0} interactive={false}>
          <circle cx="112" cy="2277" r="230" fill="#99D9E5" />
        </Drift>
      </svg>

      {/* White framework card, over the top of the photo */}
      <Reveal className="relative z-10 mx-6 rounded-tr-[2.5rem] bg-white px-6 py-8 text-brand-ink lg:absolute lg:u-left-200 lg:top-0 lg:u-h-600 lg:u-w-1520 lg:mx-0 lg:u-rounded-tr-80 lg:p-0">
        <div className="lg:absolute lg:u-left-79 lg:u-top-58">
          <p className={cn(homeType.eyebrow, 'text-brand-orange')}>{framework.eyebrow}</p>
          <h2 className={cn(homeType.heading, 'mt-2 lg:u-mt-14')}>
            <Lines text={framework.title} />
          </h2>
          <p className={cn(homeType.body, 'mt-3 lg:u-mt-30')}>{framework.intro}</p>
        </div>

        <div className="mt-5 lg:absolute lg:u-left-1053 lg:u-top-69 lg:mt-0">
          <Button
            id="btn-discover-approach"
            variant="outline"
            onClick={() => stage && onDiscoverMore(stage)}
            className={cn(homeButton.outlineSm, inkOutline, 'lg:u-w-375 lg:u-h-52')}
          >
            {framework.cta}
          </Button>
        </div>

        {/* Stage slider */}
        <div className="relative mt-6 flex items-center gap-3 rounded-[1.5rem] bg-brand-lime py-4 pr-3 pl-3 lg:absolute lg:u-left-78 lg:u-top-373 lg:u-h-157 lg:u-w-1370 lg:mt-0 lg:gap-0 lg:bg-transparent lg:p-0">
          <div aria-hidden="true" className="absolute inset-y-0 hidden rounded-[2rem] bg-brand-lime lg:block lg:u-left-28 lg:u-w-1314" />
          <button type="button" id="stage-slider-prev" onClick={() => step(-1)} aria-label="Previous stage" className={cn(arrowButton, 'relative')}>
            <ChevronLeft className="h-5 w-5 stroke-[3]" />
          </button>
          <div className="relative flex-1 overflow-hidden lg:u-pl-35">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.p
                key={index}
                aria-live="polite"
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="text-sm font-medium lg:u-text-36"
              >
                {stage?.headline}
              </motion.p>
            </AnimatePresence>
          </div>
          <button type="button" id="stage-slider-next" onClick={() => step(1)} aria-label="Next stage" className={cn(arrowButton, 'relative')}>
            <ChevronRight className="h-5 w-5 stroke-[3]" />
          </button>
        </div>
      </Reveal>

      {/* Classroom photo */}
      <div className="relative -mt-6 aspect-[1920/1046] w-full lg:absolute lg:u-top-424 lg:mt-0">
        <Image
          src="/images/home/framework-boy-desk.webp"
          alt="Boy working at a desk by a window, with books and crayons around him"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Notebook */}
      <Reveal from="pop" className="relative z-10 mx-auto -mt-10 aspect-[1275/941] w-[92%] lg:absolute lg:u-left-313 lg:u-top-1277 lg:u-h-941 lg:u-w-1275 lg:mt-0">
        <Image src="/images/home/notebook.webp" alt="" fill sizes="(min-width: 1024px) 66vw, 92vw" className="object-contain" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-[14%] text-center text-brand-ink lg:justify-start lg:u-pt-210 lg:px-0">
          <p className={homeType.eyebrow}>{partnerships.eyebrow}</p>
          <h3 className={cn('mt-1 text-lg font-bold leading-[1.22] tracking-[-0.02em] sm:text-3xl lg:u-mt-22 lg:u-text-72')}>
            <Lines text={partnerships.title} />
          </h3>
          <p className={cn('mt-2 hidden text-xs leading-[1.35] sm:block sm:text-sm lg:u-mt-60 lg:u-w-840 lg:u-text-24')}>
            {partnerships.body}
          </p>
          <ReferralButton
            id="btn-referral-partnerships"
            variant="outline"
            className={cn(homeButton.outlineSm, inkOutline, 'mt-3 h-8 text-xs lg:u-mt-50 lg:u-w-249')}
          >
            {partnerships.cta}
          </ReferralButton>
        </div>
      </Reveal>

      {/* Referral */}
      <Reveal id="referral" className="relative z-10 mt-12 px-6 text-center text-white lg:absolute lg:inset-x-0 lg:u-top-2265 lg:mt-0 lg:p-0">
        <p className={homeType.eyebrow}>{referral.eyebrow}</p>
        <h2 className={cn(homeType.heading, 'mt-2 lg:u-mt-10')}>
          <Lines text={referral.title} />
        </h2>
        <p className={cn(homeType.body, 'mx-auto mt-4 max-w-2xl lg:u-mt-29 lg:u-w-1260 lg:max-w-none')}>
          {referral.body}
        </p>
        <ReferralButton
          id="journey-btn-referral-bottom"
          variant="outline-white"
          className={cn(homeButton.outlineSm, 'mt-6 lg:u-mt-45 lg:u-w-311')}
        >
          {referral.cta}
        </ReferralButton>
      </Reveal>

      {/* Shapes in front: green triangle on the card, referral triangles */}
      <svg className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full overflow-visible lg:block" viewBox="0 0 1920 2720" aria-hidden="true">
        <Drift depth={26} spin={18} delay={0.3}>
          <polygon points="1475.1,297 1447.1,200.9 1544.4,224.7" fill="#A5CD39" />
        </Drift>
        <Drift depth={34} spin={-14}>
          <polygon points="36.8,2549.7 144.6,2470.6 154.8,2612.6" fill="#fff" />
        </Drift>
        <Drift depth={40} spin={10} delay={0.15}>
          <polygon points="1879.1,2275.4 1572,2371.5 1642.3,2057.5" fill="#EC83B5" />
        </Drift>
      </svg>
    </section>
  );
}
