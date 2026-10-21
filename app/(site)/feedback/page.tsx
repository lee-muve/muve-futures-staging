import type { Metadata } from 'next';
import { ReferralButton } from '@/components/common/ActionButtons';
import { Lines } from '@/components/common/Lines';
import { DesignFormPage } from '@/components/forms/DesignFormPage';
import { FeedbackForm } from '@/components/forms/FeedbackForm';
import { FeedbackClosingShapes, FeedbackShapes } from '@/components/forms/FormShapes';
import { Reveal } from '@/components/motion/Reveal';
import { getSingle } from '@/lib/content/queries';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share a compliment, complaint or suggestion with MUVE Futures. We love hearing from you.',
};

export default async function FeedbackPage() {
  const { feedback, feedbackClosing: closing } = await getSingle('forms');
  return (
    <DesignFormPage
      badge={feedback.badge}
      title={feedback.title}
      intro={feedback.intro}
      shapes={<FeedbackShapes />}
      heroClassName="lg:u-pb-148"
      after={
        <section className="relative">
          <FeedbackClosingShapes />
          <div className="relative z-10 mx-auto w-[90%] pt-8 pb-16 text-center text-white sm:pb-24 lg:u-pt-34 lg:u-pb-49">
            <Reveal>
              <h2 className="text-3xl font-bold leading-[1.19] tracking-tight sm:text-5xl lg:u-text-73">
                <Lines text={closing.title} />
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-sm leading-[1.3] sm:text-lg lg:max-w-none lg:u-mt-48 lg:u-w-740 lg:u-text-24">{closing.body}</p>
            </Reveal>
            <Reveal from="pop" delay={0.2} className="mt-8 lg:u-mt-49">
              <ReferralButton className="text-base lg:py-0 lg:u-h-48 lg:u-w-268 lg:u-text-25">{closing.cta}</ReferralButton>
            </Reveal>
          </div>
        </section>
      }
    >
      <FeedbackForm />
    </DesignFormPage>
  );
}
