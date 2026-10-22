import { PageId } from '@/app/types';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavLinkConfig {
  id: PageId;
  label: string;
  href: string;
  dropdown?: NavItem[];
}

export const SITE_CONFIG = {
  name: 'Muve Futures',
  tagline: 'Alternative Provision & Specialist Education',
  description: 'Specialist, relationship-based alternative provision supporting learners aged 4–25 across Birmingham and the West Midlands.',
  contact: {
    phone: '0121 405 9284',
    phoneFormatted: '+44 121 405 9284',
    email: 'referrals@muvefutures.co.uk',
    enquiriesEmail: 'info@muvefutures.co.uk',
    address: 'Regional Hub: 102 Colmore Row, Birmingham, B3 3AG',
    operatingHours: 'Monday – Friday: 8:00 AM – 5:30 PM',
    emergencyResponse: 'Emergency assessments deployed within 48 hours',
  },
  socials: {
    linkedin: 'https://linkedin.com/company/muve-futures',
    // TODO: confirm the real Instagram handle.
    instagram: 'https://instagram.com/muvefutures',
    twitter: 'https://twitter.com/muvefutures',
    facebook: 'https://facebook.com/muvefutures',
  },
  compliance: {
    kcsie: 'KCSIE 2024/25 Compliant',
    dbs: '100% Enhanced DBS & Barred List Checked',
    ofsted: 'Operating under Section 19 Standards',
  },
};

/** Every form lives on its own page (no pop-up forms). */
export const CONTACT_ENQUIRY_HREF = '/contact#contact-form';
export const REFERRAL_HREF = '/referral';
export const BOOK_INTRO_HREF = '/book-an-intro';
/** The Policies group in the resource library (see components/resources/ResourceLibrary.tsx). */
export const POLICIES_HREF = '/resources?section=policies#resource-library';

/** Referral page link, optionally preselecting a service or need. */
export function referralHref(service?: string): string {
  return service ? `${REFERRAL_HREF}?service=${encodeURIComponent(service)}` : REFERRAL_HREF;
}

export const NAV_LINKS_CONFIG: NavLinkConfig[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About Us', href: '/about' },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Alternative Provision', href: '/services' },
      { label: 'SEND', href: '/services/send-support' },
      { label: 'One-To-One Education', href: '/services/one-to-one-education' },
      { label: 'Community Learning', href: '/services/community-learning' },
      { label: 'Online Learning', href: '/services/online-learning' },
      { label: 'Hybrid Learning', href: '/services/hybrid-learning' },
      { label: 'Reintegration Programmes', href: '/services/reintegration-programmes' },
      { label: 'Transition Support', href: '/services/transition-support' },
      { label: 'EOTAS', href: '/services/eotas' },
      { label: '52 Week Provision', href: '/services/52-week-provision' },
    ],
  },
  {
    id: 'who-we-support',
    label: 'Who We Support',
    href: '/who-we-support',
    dropdown: [
      { label: 'Schools', href: '/who-we-support/schools' },
      { label: 'Local Authorities', href: '/who-we-support/local-authorities' },
      { label: 'Commissioners', href: '/who-we-support/commissioners' },
      { label: 'Virtual Schools', href: '/who-we-support/virtual-schools' },
      { label: 'Parents & Families', href: '/who-we-support/parents-and-families' },
      { label: 'Care Providers', href: '/who-we-support/care-providers' },
      { label: 'SEND Professionals', href: '/who-we-support/send-professionals' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '/resources',
    dropdown: [
      // Topics is the blog.
      { label: 'Topics', href: '/blog' },
      { label: 'Downloads', href: '/resources#resource-library' },
      // Opens the resource library filtered to the Policies group.
      { label: 'Policies/Procedures', href: POLICIES_HREF },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    dropdown: [
      { label: 'Chat to Us', href: CONTACT_ENQUIRY_HREF },
      { label: 'Make a Referral', href: REFERRAL_HREF },
      { label: 'Partnerships', href: '/partnerships' },
      { label: 'Book Introduction', href: BOOK_INTRO_HREF },
      { label: 'Feedback', href: '/feedback' },
      { label: 'Careers', href: '/contact#careers' },
    ],
  },
];

