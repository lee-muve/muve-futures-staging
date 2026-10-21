import type { DetailPageContent } from './detail-page';
import { PHOTOS } from './photos';

/** A group we work with, shown on /who-we-support and detailed on /who-we-support/[slug]. */
export interface Audience {
  slug: string;
  title: string;
  eyebrow: string;
  paragraphs: string[];
  page: DetailPageContent;
  /** Colour of the large hero triangle on the detail page. */
  accent: 'pink' | 'cyan';
  /** Position in lists; set from the dashboard. Defaults to the order below. */
  order?: number;
}

// Card copy follows the audience carousel in the design; pages follow the
// Schools, Local Authorities, Commissioners, Virtual Schools and Parents frames.
export const AUDIENCES: Audience[] = [
  {
    slug: 'parents-and-families',
    title: 'Parents and Families',
    eyebrow: 'Helping you understand the way forward',
    paragraphs: [
      "Watching your child struggle with education can feel overwhelming, especially when you're unsure what support is available or where to begin. We take time to understand your child's strengths, interests, needs and aspirations.",
      "We'll explain how Alternative Provision works, how referrals are made and what you can expect throughout their journey.",
    ],
    accent: 'cyan',
    page: {
      hero: {
        badge: 'Parents',
        title: "When School Isn't Working, There Is Another Way Forward",
        intro:
          "Watching your child struggle with education can feel overwhelming. Whether they're experiencing anxiety, SEND, EBSNA, SEMH needs or another challenge, MUVE Futures provides personalised education pathways designed to rebuild confidence and create positive futures.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'split',
          left: {
            type: 'card',
            tone: 'lime',
            eyebrow: 'Introduction',
            title: 'Every Child Deserves To Be Understood',
            body: 'Before recommending any education pathway, we take time to understand the young person, their strengths, interests and aspirations. Every programme is designed around the individual rather than expecting them to fit a standard approach.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Support',
            title: 'Helping You Understand The Options',
            body: "We'll explain how Alternative Provision works, who can make referrals, how programmes are personalised and what happens throughout the learner's journey so you feel informed every step of the way.",
          },
        },
        {
          kind: 'text',
          accent: true,
          eyebrow: 'Promise',
          title: 'Supporting Families With Compassion',
          body: 'We believe in open communication, collaborative working and putting the learner first. Our team will support you throughout the education journey while focusing on long-term success.',
        },
        { kind: 'photo', photo: PHOTOS.teenFriends, corners: 'tl-br' },
      ],
      closing: {
        title: "Let's Talk About The Next Step",
        body: "If you're looking for guidance, we're here to help you understand the options available.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'schools',
    title: 'Schools & Institutions',
    eyebrow: 'Flexible support for learners who need a different approach',
    paragraphs: [
      'Schools are balancing attendance, wellbeing, academic progress and increasingly complex learner needs.',
      'MUVE Futures works alongside schools to provide personalised Alternative Provision that complements existing support.',
      'Programmes are built around agreed educational goals, regular communication and clear progress reviews.',
    ],
    accent: 'pink',
    page: {
      hero: {
        badge: 'Schools',
        title: 'Helping Schools Create Better Outcomes For Every Learner',
        // The design repeats the Alternative Provision intro here; this reuses the Schools card copy instead.
        intro:
          'Schools are balancing attendance, wellbeing, academic progress and increasingly complex learner needs. MUVE Futures works alongside schools to provide personalised Alternative Provision that complements existing support.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'split',
          left: {
            type: 'card',
            tone: 'pink',
            eyebrow: 'Introduction',
            title: 'A Trusted Education Partner',
            body: 'We work collaboratively with schools to create flexible education programmes that complement existing provision rather than replace it. Every programme is designed around agreed educational goals, regular communication and measurable progress.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Services',
            title: 'How We Support Schools',
            body: 'Our services include Alternative Provision, SEND Support, SEMH Support, EBSNA Support, Reintegration Programmes, Transition Support, One-to-One Education, Community Learning and EOTAS. Every pathway is designed to support schools while improving learner outcomes.',
          },
        },
        {
          kind: 'text',
          accent: true,
          ink: true,
          eyebrow: 'Benefits',
          title: 'Why Schools Choose MUVE Futures',
          body: 'Schools choose MUVE Futures because of our personalised approach, flexible delivery, collaborative communication, regular progress reviews and commitment to helping learners successfully transition into their next stage of education.',
        },
        {
          kind: 'card',
          tone: 'orange',
          corner: 'tl',
          eyebrow: 'Referral',
          title: 'A Simple Referral Process',
          body: "Referring a learner begins with a conversation. We work with schools to understand the learner's needs, agree educational outcomes and create the most appropriate pathway before provision begins.",
        },
      ],
      closing: {
        title: "Let's Support More Learners Together",
        body: 'Whether you need support for an individual learner or want to discuss longer-term provision, our team is here to help.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: 'local-authorities',
    title: 'Local Authorities',
    eyebrow: 'Responsive provision shaped around local need',
    paragraphs: [
      'We work with Local Authorities to create flexible education pathways for children and young people who need support beyond a standard school setting.',
      'Our approach allows provision to be shaped around individual need while maintaining a clear focus on accountability, educational progress and meaningful long-term outcomes.',
    ],
    accent: 'cyan',
    page: {
      hero: {
        badge: 'Local Authorities',
        title: 'Flexible Alternative Provision That Supports Better Outcomes',
        intro:
          'Local Authorities require trusted providers who can deliver personalised education while maintaining flexibility, accountability and quality. MUVE Futures works collaboratively with commissioning teams to create meaningful education pathways for children and young people.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'split',
          left: {
            type: 'card',
            tone: 'pink',
            eyebrow: 'Introduction',
            title: 'Meeting Growing Educational Needs',
            body: 'Every learner presents different challenges and opportunities. Our flexible education model allows programmes to be commissioned around individual need while remaining focused on measurable educational outcomes.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Services',
            title: 'Personalised Commissioning',
            body: 'We provide Alternative Provision, SEND support, SEMH programmes, EBSNA pathways, EOTAS, Reintegration, Transition Support and flexible learning models designed around each learner.',
          },
        },
        {
          kind: 'text',
          accent: true,
          eyebrow: 'Benefits',
          title: 'Why Work With MUVE Futures?',
          body: 'Our personalised approach, collaborative planning, flexible delivery and regular reporting provide Local Authorities with confidence that every learner is receiving education designed around their needs and agreed outcomes.',
        },
        { kind: 'photo', photo: PHOTOS.teenFriends, corners: 'tl-br' },
      ],
      closing: {
        title: "Let's Discuss Local Education Capacity",
        body: 'Speak with our team about referrals, commissioning opportunities or expanding local education provision.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'commissioners',
    title: 'Commissioners',
    eyebrow: 'Personalised education with clear outcomes',
    paragraphs: [
      'MUVE Futures helps commissioners respond to complex educational needs while increasing access to flexible local provision.',
      'We combine personalised planning, adaptable delivery, regular reporting and collaborative working to create pathways that support both the learner and wider commissioning objectives.',
    ],
    accent: 'cyan',
    page: {
      hero: {
        badge: 'Commissioners',
        title: 'Education Commissioned Around Individual Outcomes',
        // The design repeats the Local Authorities intro here; this reuses the Commissioners card copy instead.
        intro:
          'MUVE Futures helps commissioners respond to complex educational needs while increasing access to flexible local provision, with personalised planning, adaptable delivery and regular reporting built into every pathway.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'lime',
          corner: 'tl',
          eyebrow: 'Introduction',
          title: 'Flexible Education Designed Around The Learner',
          body: 'Every learner deserves an education programme that reflects their strengths, needs and aspirations. We create bespoke pathways that deliver meaningful educational progress while supporting commissioning objectives.',
          continuation: {
            photo: PHOTOS.childrenOutdoors,
            eyebrow: 'Benefits',
            title: 'Why Commissioners Partner With MUVE Futures',
            body: 'Flexible delivery, collaborative planning, personalised programmes, clear communication and measurable outcomes help commissioners deliver high-quality education provision within their communities.',
          },
        },
      ],
      closing: {
        title: "Let's Explore Partnership Opportunities",
        body: "We'll work with you to understand local demand and identify the most appropriate education solutions.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: 'virtual-schools',
    title: 'Virtual Schools',
    eyebrow: 'Supporting children and young people in care',
    paragraphs: [
      'Stability, trusted relationships and joined-up communication can make a significant difference to the educational experience of a child or young person in care.',
      'We work with Virtual Schools and the wider professional network to provide consistent, personalised education focused on engagement, confidence, independence and successful transitions.',
    ],
    accent: 'pink',
    page: {
      hero: {
        badge: 'Virtual Schools',
        title: 'Supporting Children In Care Through Personalised Education',
        intro:
          'Children and young people in care deserve education that understands their experiences while creating opportunities for future success. MUVE Futures partners with Virtual Schools to provide flexible education that builds confidence, engagement and long-term outcomes.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'split',
          left: {
            type: 'card',
            tone: 'ink',
            eyebrow: 'Introduction',
            title: 'Education Built Around Stability And Progress',
            body: 'Consistency, positive relationships and joined-up communication are essential when supporting children in care. Our programmes provide personalised education while maintaining close collaboration with everyone involved.',
          },
          right: { type: 'photo', photo: PHOTOS.girlOnlineLesson },
        },
        {
          kind: 'text',
          accent: true,
          eyebrow: 'Focus',
          title: 'Supporting Long-Term Success',
          body: 'We focus on educational engagement, confidence, independence, communication and successful transitions while helping every learner achieve their individual goals.',
        },
        { kind: 'photo', photo: PHOTOS.boyHeadphonesLaptop, corners: 'tl-br' },
      ],
      closing: {
        title: "Let's Support Every Learner Together",
        body: 'Speak with our team about personalised education pathways for children and young people in care.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
    },
  },
  {
    slug: 'care-providers',
    title: 'Care Providers',
    eyebrow: 'Bringing education and care together',
    paragraphs: [
      "Education is most effective when it reflects the young person's wider support needs and daily experiences.",
      'We partner with residential services, supported accommodation providers and care organisations to create consistent education pathways.',
      'Shared planning and regular communication help care and education teams work towards the same outcomes.',
    ],
    accent: 'pink',
    // No frame in the design for this page; assembled from the card copy.
    page: {
      hero: {
        badge: 'Care Providers',
        title: 'Bringing Education And Care Together',
        intro:
          "Education is most effective when it reflects the young person's wider support needs and daily experiences.",
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'split',
          left: {
            type: 'card',
            tone: 'pink',
            eyebrow: 'Partnership',
            title: 'Consistent Education Pathways',
            body: 'We partner with residential services, supported accommodation providers and care organisations to create consistent education pathways.',
          },
          right: {
            type: 'copy',
            eyebrow: 'Collaboration',
            title: 'Working Towards The Same Outcomes',
            body: 'Shared planning and regular communication help care and education teams work towards the same outcomes.',
          },
        },
        { kind: 'photo', photo: PHOTOS.teenFriends, corners: 'tl-br' },
      ],
      closing: {
        title: "Let's Find The Right Way Forward",
        body: 'Speak with our team about education pathways for the young people in your care.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
  {
    slug: 'send-professionals',
    title: 'SEND Professionals',
    eyebrow: 'Combining expertise around the learner',
    paragraphs: [
      'We work alongside SENCOs, Educational Psychologists, Occupational Therapists, Speech and Language Therapists, Behaviour Specialists and other SEND professionals.',
      "By sharing expertise and maintaining clear communication, we can create education programmes that reflect the learner's needs and support meaningful progress.",
    ],
    accent: 'cyan',
    // No frame in the design for this page; assembled from the card copy.
    page: {
      hero: {
        badge: 'SEND Professionals',
        title: 'Combining Expertise Around The Learner',
        intro:
          'We work alongside SENCOs, Educational Psychologists, Occupational Therapists, Speech and Language Therapists, Behaviour Specialists and other SEND professionals.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      blocks: [
        {
          kind: 'card',
          tone: 'cyan',
          corner: 'tl',
          eyebrow: 'Collaboration',
          title: 'Shared Expertise, Clear Communication',
          body: "By sharing expertise and maintaining clear communication, we can create education programmes that reflect the learner's needs and support meaningful progress.",
        },
        { kind: 'photo', photo: PHOTOS.boyHeadphonesLaptop, corners: 'tl-br' },
      ],
      closing: {
        title: "Let's Work Together",
        body: 'Speak with our team about a learner or about working in partnership.',
        cta: { label: 'Make a Referral', action: 'referral' },
      },
      placeholderCopy: true,
    },
  },
];

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find((audience) => audience.slug === slug);
}
