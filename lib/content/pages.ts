/**
 * Content types for the single pages (Home, About, overviews, forms,
 * Resources, site settings) and their built-in defaults. Defaults are the copy
 * the site shipped with; they're used until a document is saved in the
 * dashboard, and seeded into the database by `npm run db:seed`.
 *
 * In headings, a line break ("\n") becomes a line break on larger screens.
 */
import { FRAMEWORK_STAGES, PILLARS_DATA, SITE_CONFIG, FAQ_ITEMS } from '@/constants';
import type { FrameworkStage } from '@/app/types';

export interface CtaLabel {
  label: string;
}

// ── Site settings ──────────────────────────────────────────────────────────

export interface SettingsContent {
  siteName: string;
  tagline: string;
  /** Default meta description for search engines. */
  description: string;
  contact: {
    phone: string;
    /** International format used for tap-to-call links. */
    phoneInternational: string;
    referralsEmail: string;
    enquiriesEmail: string;
  };
  address: { heading: string; lines: string[] };
  socials: { linkedin: string; instagram: string; facebook: string };
  footerCredit: string;
  comingSoon: { heading: string };
}

export const DEFAULT_SETTINGS: SettingsContent = {
  siteName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  contact: {
    phone: SITE_CONFIG.contact.phone,
    phoneInternational: SITE_CONFIG.contact.phoneFormatted,
    referralsEmail: SITE_CONFIG.contact.email,
    enquiriesEmail: SITE_CONFIG.contact.enquiriesEmail,
  },
  address: { heading: 'UK Office', lines: ['Suite 1', 'Aqueous II', 'Rocky Lane', 'Birmingham', 'B6 5RQ'] },
  socials: {
    linkedin: SITE_CONFIG.socials.linkedin,
    instagram: SITE_CONFIG.socials.instagram,
    facebook: SITE_CONFIG.socials.facebook,
  },
  footerCredit: 'All Rights Reserved. Site by Marva Group.',
  comingSoon: { heading: 'Website Launching Soon' },
};

// ── Home ───────────────────────────────────────────────────────────────────

export interface HomePillar {
  tag: string;
  title: string;
  subtitle: string;
  points: string[];
  image: string;
}

export interface HomeContent {
  hero: { title: string; intro: string; primaryCta: string; secondaryCta: string };
  quote: { text: string; cta: string };
  pillars: HomePillar[];
  journey: { title: string; body: string; cta: string };
  whoWeSupport: { eyebrow: string; title: string; body: string; cta: string };
  services: { eyebrow: string; title: string; intro: string; pills: { label: string; slug: string }[]; closing: string };
  framework: { eyebrow: string; title: string; intro: string; cta: string; stages: FrameworkStage[] };
  partnerships: { eyebrow: string; title: string; body: string; cta: string };
  referral: { eyebrow: string; title: string; body: string; cta: string };
  resources: { title: string; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_HOME: HomeContent = {
  hero: {
    title: 'Education That Starts With Understanding',
    intro:
      'Personalised Alternative Provision for young people aged 4–25 with SEND, SEMH, EBSNA or other barriers to learning. We create flexible programmes that rebuild confidence, reconnect learners with education and prepare them for what comes next.',
    primaryCta: 'Learn More',
    secondaryCta: 'Make a Referral',
  },
  quote: {
    text: '“Every programme is designed around the individual learner rather than expecting every learner to fit a standard model. We adapt education to meet each young person’s needs, goals and preferred way of learning.”',
    cta: 'Learn More',
  },
  pillars: PILLARS_DATA.map(({ tag, title, subtitle, points, image }) => ({ tag, title, subtitle, points: points ?? [], image })),
  journey: {
    title: 'Every Journey Starts\nSomewhere Different',
    body: 'Every learner’s journey is unique. Some have lost confidence in education, some are struggling with attendance and others simply need learning to look different. We begin by understanding the learner before designing the education pathway, ensuring every programme is built around their strengths, aspirations and individual needs.',
    cta: 'Make a Referral',
  },
  whoWeSupport: {
    eyebrow: 'Who We Support',
    title: 'Supporting Learners\nWith Diverse Needs',
    body: 'We support children and young people with SEND, SEMH, Emotionally Based School Non-Attendance (EBSNA), medical needs, disrupted education, risk of exclusion and those transitioning between educational settings.',
    cta: 'Explore Our Services',
  },
  services: {
    eyebrow: 'Our Services',
    title: 'Education That Adapts\nAround The Learner',
    intro: 'Our services include',
    pills: [
      { label: 'EOTAS', slug: 'eotas' },
      { label: '52 Week Provision', slug: '52-week-provision' },
      { label: 'Alternative Provision', slug: 'alternative-provision' },
      { label: 'SEND Support', slug: 'send-support' },
      { label: 'SEMH Support', slug: 'semh-support' },
      { label: 'EBSNA Support', slug: 'ebsna-support' },
      { label: 'One-to-One Education', slug: 'one-to-one-education' },
      { label: 'Community Learning', slug: 'community-learning' },
      { label: 'Online Learning', slug: 'online-learning' },
      { label: 'Hybrid Learning', slug: 'hybrid-learning' },
      { label: 'Reintegration', slug: 'reintegration-programmes' },
      { label: 'Transition Support', slug: 'transition-support' },
    ],
    closing: 'Every pathway is personalised around the learner.',
  },
  framework: {
    eyebrow: 'Our Framework',
    title: 'The Four\nStage Approach',
    intro: 'Every programme follows a structured approach',
    cta: 'Discover Our Approach',
    stages: FRAMEWORK_STAGES,
  },
  partnerships: {
    eyebrow: 'Partnerships',
    title: 'Working Together\nAround Every Learner',
    body: 'Positive outcomes are achieved through collaboration. We work closely with schools, Local Authorities, commissioners, families and professionals to create joined-up education pathways that place the learner at the centre of every decision.',
    cta: 'Make a Referral',
  },
  referral: {
    eyebrow: 'Referral',
    title: 'A Simple Referral Journey',
    body: 'Making a referral is straightforward. We begin with a conversation, understand the learner’s needs and desired outcomes, recommend the most appropriate pathway and provide regular communication throughout the programme.',
    cta: 'Make a Referral',
  },
  resources: { title: 'Resources For Schools, Families\nand Professionals', cta: 'Visit Our Resources' },
  closing: {
    title: 'Every Young Person\nDeserves The Opportunity\nTo Move Forward',
    body: 'Whether you’re ready to make a referral or simply want to discuss a learner’s needs, our team is here to help you find the right education pathway.',
    cta: 'Make a Referral',
  },
};

// ── About ──────────────────────────────────────────────────────────────────

export interface AboutContent {
  hero: { title: string; intro: string; cta: string };
  intro: { title: string; body: string };
  whyWeExist: { title: string; body: string; items: { label: string; copy: string }[] };
  whyChooseUs: { eyebrow: string; title: string; body: string; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_ABOUT: AboutContent = {
  hero: {
    title: 'More Than\nAlternative Provision',
    intro:
      'MUVE Futures provides personalised education that helps children and young people reconnect with learning, build confidence and prepare for positive futures. We believe education should adapt to the learner, not the learner to education.',
    cta: 'Make a Referral',
  },
  intro: {
    title: 'Education Built Around\nThe Individual',
    body: 'Every child deserves an education that recognises their strengths, understands their challenges and provides the support they need to succeed.\nOur personalised approach focuses on the whole learner, not simply the barriers they face.',
  },
  whyWeExist: {
    title: 'Why We Exist',
    body: "MUVE Futures was created to provide meaningful education opportunities for children and young people who require a different pathway through learning. We believe Alternative Provision should create opportunities, not limitations, and every programme should be designed with the learner's future in mind.",
    items: [
      {
        label: 'Our Mission',
        copy: 'To create personalised education pathways that help every learner engage, progress and prepare for a positive future through flexible, relationship-based education.',
      },
      {
        label: 'Our Vision',
        copy: "To become one of the UK's most trusted Alternative Provision partners by delivering personalised education that improves outcomes for learners, schools, families and communities.",
      },
      {
        label: 'Our Values',
        copy: 'We are Personalised in our approach, Relationship Based in our practice, Flexible in our delivery and Outcome Focused in everything we do. These principles guide every decision we make.',
      },
    ],
  },
  whyChooseUs: {
    eyebrow: 'The Difference',
    title: 'Why Choose Us?',
    body: 'We look beyond labels and diagnoses to understand every learner as an individual. By working collaboratively with schools, families and professionals, we create education pathways that are meaningful, flexible and focused on long-term success.',
    cta: 'Discover Our Approach',
  },
  closing: {
    title: "Let's Build Better Futures Together",
    body: "Whether you're looking for Alternative Provision, exploring partnership opportunities or seeking advice about a learner, we'd love to hear from you.",
    cta: 'Make a Referral',
  },
};

// ── Services overview (/services) ──────────────────────────────────────────

export interface ServicesPageContent {
  hero: { badge: string; title: string; introLead: string; introHighlight: string; introTail: string; cta: string };
  whyChooseUs: { eyebrow: string; title: string; body: string; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_SERVICES_PAGE: ServicesPageContent = {
  hero: {
    badge: 'Accredited & Therapeutic Pathways',
    title: 'Education That Adapts Around The Learner',
    introLead: 'Our services include',
    introHighlight:
      'Alternative Provision, SEND Support, SEMH Support, EBSNA Support, One-to-One Education, Community Learning, Online Learning, Hybrid Learning, Reintegration Programmes, Transition Support, EOTAS & 52 Week Provision.',
    introTail: "Every service can be personalised around the learner's individual circumstances.",
    cta: 'Explore Our Services',
  },
  whyChooseUs: {
    eyebrow: 'Why Choose Us',
    title: 'Structured For Impact, Built With Care',
    body: "We don't simply deliver education. We build confidence, create positive relationships, support independence and prepare learners for successful futures through structured, personalised programmes.",
    cta: 'Explore Our Services',
  },
  closing: {
    title: 'Finding The Right Pathway Starts With A Conversation',
    body: "Every referral begins by understanding the learner. We'll help you identify the most appropriate education pathway and work collaboratively to achieve positive outcomes.",
    cta: 'Make a Referral',
  },
};

// ── Who We Support overview ────────────────────────────────────────────────

export interface WhoWeSupportPageContent {
  hero: { badge: string; title: string; intro: string; cta: string };
  workingTogether: { title: string; paragraphs: string[]; cta: string };
  closing: { title: string; body: string; cta: string };
}

export const DEFAULT_WHO_WE_SUPPORT_PAGE: WhoWeSupportPageContent = {
  hero: {
    badge: 'Who We Support',
    title: 'Education Built Around the Learner',
    intro:
      'Every child and young person deserves an education that recognises their strengths, responds to their needs and gives them a meaningful way forward. MUVE Futures supports learners aged 4 to 25 who may be struggling to access or remain in education. We also work closely with the families, schools, professionals and organisations involved in their journey.',
    cta: 'Talk to Our Team',
  },
  workingTogether: {
    title: 'Working together around\nevery learner',
    paragraphs: [
      'The best outcomes happen when the people supporting a learner share information, understand their responsibilities and work towards the same goals.',
      "We create personalised education pathways with clear outcomes, regular communication and joined-up planning. This helps everyone involved understand the programme, follow progress and contribute to the learner's next steps.",
    ],
    cta: 'Explore Our Services',
  },
  closing: {
    title: "Let's find the right way forward",
    body: "Whether you're a parent looking for guidance, a school seeking support or a professional exploring provision for a learner, our team is here to listen.",
    cta: 'Speak with our team',
  },
};

// ── Form pages ─────────────────────────────────────────────────────────────

export interface FormHero {
  badge: string;
  title: string;
  intro: string;
}

export interface FormsContent {
  contact: FormHero;
  referral: FormHero;
  bookIntro: FormHero;
  partnership: FormHero;
  feedback: FormHero;
  feedbackClosing: { title: string; body: string; cta: string };
}

export const DEFAULT_FORMS: FormsContent = {
  contact: {
    badge: 'Contact',
    title: "We're Here To Help",
    intro:
      'We work with schools, local authorities, professionals and community organisations to create better education pathways for children and young people.',
  },
  // Referral, partnership and feedback follow public/design; their intros sit above the form.
  referral: {
    badge: 'Make a Referral',
    title: 'Let’s Discuss How We\nMay Be Able To Help',
    intro: '',
  },
  bookIntro: {
    badge: 'Book an Intro',
    title: "Let's Start With A Conversation",
    intro: 'Book a short introduction with our team to talk about a learner, our services or working in partnership.',
  },
  partnership: {
    badge: 'Partnerships',
    title: 'Create Better Education\nPathways Through Partnership',
    intro: 'Complete the form below and a member of our team will get in touch.',
  },
  feedback: {
    badge: 'Feedback',
    title: 'We Love Hearing\nFrom You',
    intro: '',
  },
  feedbackClosing: {
    title: 'Let’s Support More\nLearners Together',
    body: 'Whether you need support for an individual learner or want to discuss longer-term provision, our team is here to help.',
    cta: 'Make a Referral',
  },
};

// ── Contact page & careers ─────────────────────────────────────────────────

/**
 * A job advert. Vacancies are a dashboard collection (`vacancy:<slug>`), each
 * with its own page at /careers/<slug> where people apply.
 */
export interface Vacancy {
  title: string;
  /** e.g. Full Time, Part Time. */
  hours: string;
  location: string;
  /** Optional, e.g. "£26,000 – £30,000 per year". */
  salary: string;
  /** yyyy-mm-dd; shown as "Listed 2 weeks ago". */
  listedOn: string;
  /** yyyy-mm-dd, optional. Applications close at the end of this day. */
  closingDate: string;
  /** Switch off to stop applications without deleting the advert. */
  open: boolean;
  /** One or two sentences for the listing and search engines. */
  summary: string;
  /** The full advert, in Markdown. */
  description: string;
  /** Lower numbers are listed first. */
  order: number;
}

/** A blank vacancy for "New vacancy" in the dashboard: closed until it's ready. */
export const blankVacancy = (): Vacancy => ({
  title: 'New vacancy',
  hours: 'Full Time',
  location: 'Birmingham',
  salary: '',
  listedOn: new Date().toISOString().slice(0, 10),
  closingDate: '',
  open: false,
  summary: '',
  description: '## About the role\n\n\n## What you’ll do\n\n- \n\n## About you\n\n- \n\n## What we offer\n\n- ',
  order: 100,
});

/** The parts of /contact beyond the heading (which lives in Form pages → Contact page). */
export interface ContactPageContent {
  subtitle: string;
  form: { title: string; intro: string; submit: string };
  getInTouch: { title: string };
  refer: { title: string; body: string; cta: string };
  talk: { title: string; body: string; cta: string };
  where: { eyebrow: string; title: string; body: string; areas: string[] };
  /** The vacancies themselves are the dashboard's Careers collection. */
  careers: { title: string; emptyMessage: string };
}

export const DEFAULT_CONTACT_PAGE: ContactPageContent = {
  subtitle: 'Let’s start a conversation',
  form: {
    title: 'Chat to Us',
    intro: 'Questions about our services, capacity, careers or partnerships? We’d love to hear from you.',
    submit: 'Send Message',
  },
  getInTouch: { title: 'Get In Touch' },
  refer: { title: 'Ready to Refer?', body: 'Tell us about the learner and we’ll help find the right education pathway.', cta: 'Make a Referral' },
  talk: { title: 'Prefer to talk first?', body: 'Book a short introduction with our team to talk things through.', cta: 'Make a Referral' },
  where: {
    eyebrow: 'Where We Work',
    title: 'Supporting Learners Across The West Midlands',
    body: 'Our teachers and mentors work with learners at home, in the community and in local learning spaces across the region.',
    areas: ['Birmingham', 'Sandwell + Dudley', 'Worcestershire', 'Wolverhampton & Walsall', 'Solihull'],
  },
  careers: {
    title: 'Careers',
    emptyMessage: 'There are no open roles right now. Check back soon, or get in touch to register your interest.',
  },
};

// ── Resources ──────────────────────────────────────────────────────────────

export interface ResourceItem {
  title: string;
  /** Shown when the item is opened. A blank line starts a new paragraph. */
  body: string;
  /** Uploaded file; adds a Download button. */
  fileUrl: string;
  /** Optional link button, e.g. to a form or page. */
  linkLabel: string;
  linkUrl: string;
}

export interface ResourceGroup {
  /** Also the label of the group's filter pill. */
  name: string;
  /** Shows a "Coming soon" label in place of the resources. */
  comingSoon: boolean;
  items: ResourceItem[];
}

export interface ResourcesContent {
  hero: { title: string; intro: string; cta: string };
  intro: { title: string; body: string };
  library: { title: string; allLabel: string; groups: ResourceGroup[] };
  closing: { title: string; body: string; cta: string };
}

const resource = (title: string, body: string, extra: Partial<ResourceItem> = {}): ResourceItem => ({
  title,
  body,
  fileUrl: '',
  linkLabel: '',
  linkUrl: '',
  ...extra,
});

export const DEFAULT_RESOURCES: ResourcesContent = {
  hero: {
    title: 'Practical Resources For\nBetter Educational Outcomes',
    intro:
      'Our Resource Centre provides practical guidance, downloadable resources and useful information to help schools, professionals and families better understand Alternative Provision and personalised education.',
    cta: 'Browse Resources',
  },
  intro: {
    title: 'Information That\nSupports Better Decisions',
    body: 'Explore resources covering Alternative Provision, SEND, SEMH, EBSNA, Reintegration, Transition Support and practical guidance for education professionals and families.',
  },
  library: {
    title: 'Resources',
    allLabel: 'All Resources',
    groups: [
      {
        name: 'Families',
        comingSoon: false,
        items: [
          resource(
            'Parent and carer guide to MUVE Futures',
            'Who we are, how we work with families and what support from MUVE Futures can look like for your child, from the first conversation through to their next step in education.'
          ),
          resource(
            'Understanding Alternative Provision',
            'Alternative Provision is education arranged for children who are not able to access mainstream school full time. It can be short or longer term, and is always planned around the individual learner.'
          ),
          resource(
            'Understanding EOTAS',
            'Education Otherwise Than At School (EOTAS) is a package of education arranged by the local authority, usually through an EHCP, when school is not the right setting for a child. We can explain how it works and how our provision fits within it.'
          ),
          resource(
            'Questions to ask when choosing a provider',
            'How will you get to know my child? How do you keep children safe? How will I hear about progress? What does a typical session look like? How do you plan for the next step back into education?'
          ),
          resource(
            'Preparing your child for their first session',
            'Talk through who they will meet and where. Share anything that helps them feel safe, such as interests, routines and triggers, with our team beforehand. Keep the first session short and low-pressure; confidence builds from there.'
          ),
          resource(
            'What to expect from the referral process',
            'Once a referral is received we arrange an introductory conversation, gather information from school and professionals, and agree a personalised plan together before sessions begin.'
          ),
          resource(
            'Supporting a child experiencing EBSNA',
            'Emotionally Based School Non-Attendance (EBSNA) describes difficulty attending school because of emotional distress. It may be linked to anxiety, sensory overwhelm, unmet SEND needs, bullying, trauma or difficulties within the school environment.'
          ),
          resource(
            'How can I support a child experiencing EBSNA?',
            'Emotionally Based School Non-Attendance is often linked to anxiety, overwhelm or unmet needs. It isn’t simply a child refusing to attend school.\n\nStart by listening without judgement and trying to understand what’s making education feel difficult. Avoid pressure, punishment or comparisons, as these can increase anxiety.\n\nWork with school on small, achievable steps, keep routines predictable and celebrate every bit of progress. If you would like to talk it through, our team is here to help.'
          ),
          resource('Parent feedback form', 'Tell us how we are doing. Your feedback helps us keep improving the support we offer children and families.', {
            linkLabel: 'Give Feedback',
            linkUrl: '/feedback',
          }),
        ],
      },
      {
        name: 'Professionals',
        comingSoon: false,
        items: [
          resource(
            'A guide to commissioning Alternative Provision',
            'How schools and local authorities can commission a placement with us, what information we need and how we agree outcomes, reporting and review points.'
          ),
          resource(
            'Attendance and progress reporting',
            'Commissioners and schools receive session attendance, weekly progress summaries and termly outcome reports, so everyone involved can see how the learner is doing.'
          ),
          resource(
            'Working in partnership with MUVE Futures',
            'We work alongside SENCOs, virtual schools, social care and health professionals, sharing information and planning together around each learner.'
          ),
        ],
      },
      {
        name: 'Referrals',
        comingSoon: false,
        items: FAQ_ITEMS.map(({ question, answer }) => resource(question, answer)),
      },
      {
        name: 'Services',
        comingSoon: false,
        items: [
          resource(
            'An overview of our services',
            'One-to-one tuition, small group learning, online and hybrid provision, SEND and SEMH support, reintegration and transition programmes, each planned around the learner.',
            { linkLabel: 'View Services', linkUrl: '/services' }
          ),
        ],
      },
      {
        name: 'Policies',
        comingSoon: false,
        // Left empty so it lists every policy (see lib/content/policies.ts).
        items: [],
      },
      {
        name: 'Easy Read',
        comingSoon: true,
        items: [
          resource(
            'What is MUVE Futures? (Easy Read)',
            'We help young people learn.\n\nWe learn in ways that suit you.\n\nWe listen to you and help you feel safe and ready to learn.'
          ),
        ],
      },
    ],
  },
  closing: {
    title: 'Let’s Build Better Futures Together',
    body: 'Whether you’re looking for Alternative Provision, exploring partnership opportunities or seeking advice about a learner, we’d love to hear from you.',
    cta: 'Make a Referral',
  },
};

// ── Blog (Topics page) ─────────────────────────────────────────────────────

export interface BlogTopic {
  label: string;
  /** A post is in the topic when its category or one of its tags contains one of these words. */
  keywords: string[];
}

export interface BlogPageContent {
  hero: { title: string };
  topics: { allLabel: string; items: BlogTopic[] };
  readMore: string;
  showAll: string;
}

export const DEFAULT_BLOG_PAGE: BlogPageContent = {
  hero: { title: 'Helpful guidance for every\nstage of the journey' },
  topics: {
    allLabel: 'All Topics',
    items: [
      { label: 'EBSNA', keywords: ['EBSNA', 'Attendance'] },
      { label: 'ADHD + Autism', keywords: ['ADHD', 'Autism', 'Neurodivergence'] },
      { label: 'SEMH', keywords: ['SEMH', 'Anxiety', 'Mental health'] },
      { label: 'SEND + EHCP', keywords: ['SEND', 'EHCP', 'Section 19'] },
      { label: 'Trauma Informed', keywords: ['Trauma'] },
      { label: 'Outcomes', keywords: ['Outcomes', 'Reintegration', 'Transition'] },
      { label: 'Families', keywords: ['Families', 'Parents', 'Parent Guides'] },
      { label: 'Professionals', keywords: ['Professionals', 'SENCO', 'Local Authority', 'Commissioning'] },
    ],
  },
  readMore: 'Read More',
  showAll: 'Show All Posts',
};
