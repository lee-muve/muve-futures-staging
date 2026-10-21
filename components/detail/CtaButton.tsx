import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReferralButton } from '@/components/common/ActionButtons';
import { CONTACT_ENQUIRY_HREF, type Cta } from '@/constants';

/** Renders a content-model CTA as the matching modal trigger or contact link. */
export function CtaButton({ cta, referralService }: { cta: Cta; referralService?: string }) {
  switch (cta.action) {
    // "Book an intro" buttons now go to the referral form too.
    case 'referral':
    case 'intro':
      return <ReferralButton serviceName={referralService}>{cta.label}</ReferralButton>;
    case 'contact':
      return (
        <Button asChild variant="orange" size="pill">
          <Link href={CONTACT_ENQUIRY_HREF}>{cta.label}</Link>
        </Button>
      );
  }
}
