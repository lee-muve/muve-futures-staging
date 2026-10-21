/**
 * Editor schemas for every editable document. Each schema mirrors a content
 * type (lib/content/pages.ts, constants/*) and is used both to build the
 * dashboard form and to validate saves.
 */
import { SERVICE_ICONS } from './icons';
import { bool, file, list, num, object, optional, photo, select, text, textarea, type Field } from './fields';

const heading = (label = 'Heading') => textarea(label, { rows: 2, help: 'A line break starts a new line on larger screens.' });
const body = (label = 'Text') => textarea(label, { rows: 4 });

// ── Detail pages (services & audiences) ────────────────────────────────────

const cta: Field = object(
  {
    label: text('Button label'),
    // "intro" is kept so older saved buttons still validate; it now opens the referral form too (components/detail/CtaButton.tsx).
    action: select('What the button does', { referral: 'Open the referral form', intro: 'Open the referral form (was “Book an intro”)', contact: 'Go to the contact page' }),
  },
  'Button'
);

const copyFields = { eyebrow: text('Eyebrow (small heading)'), title: text('Heading'), body: body() };

const tone = select('Colour', { pink: 'Pink', orange: 'Orange', cyan: 'Light blue', lime: 'Light green', ink: 'Dark green', outline: 'White outline' });

const splitSide: Field = {
  type: 'union',
  label: 'Column',
  tag: 'type',
  variants: {
    copy: { label: 'Text', fields: copyFields },
    card: { label: 'Colour card', fields: { tone, ...copyFields } },
    photo: { label: 'Photo', fields: { photo: photo('Photo') } },
  },
};

const pageBlock: Field = {
  type: 'union',
  label: 'Section',
  tag: 'kind',
  variants: {
    card: {
      label: 'Colour card',
      fields: {
        tone,
        align: select('Text alignment', { left: 'Left', center: 'Centre', right: 'Right' }),
        corner: select('Curved corner', { tr: 'Top right', tl: 'Top left' }),
        ...copyFields,
        cutout: optional(
          'Cut-out photo standing out of the card',
          object({ photo: photo('Photo', 'Use a photo with a transparent background.'), side: select('Side', { right: 'Right', left: 'Left' }) })
        ),
        continuation: optional('Photo band with more text below it', object({ photo: photo('Photo'), ...copyFields })),
      },
    },
    text: {
      label: 'Text on the page',
      fields: {
        align: select('Alignment', { left: 'Left', center: 'Centre' }),
        accent: bool('Orange line down the left'),
        ink: bool('Dark text instead of white'),
        ...copyFields,
      },
    },
    split: {
      label: 'Two columns',
      fields: { left: { ...splitSide, label: 'Left column' }, right: { ...splitSide, label: 'Right column' }, divider: bool('White line between columns') },
    },
    photo: {
      label: 'Photo',
      fields: {
        photo: photo('Photo'),
        fullBleed: bool('Edge to edge'),
        corners: select('Curved corners', { tr: 'Top right', 'tl-br': 'Top left & bottom right' }),
      },
    },
    cutout: {
      label: 'Cut-out photo',
      fields: {
        photo: photo('Photo', 'Use a photo with a transparent background; it stands on the next section.'),
        size: select('Size', { lg: 'Large', md: 'Medium' }),
      },
    },
  },
};

export const detailPageSchema: Field = object(
  {
    hero: object({ badge: text('Badge'), title: text('Page heading'), intro: body('Introduction'), cta }, 'Top of the page'),
    blocks: list('Sections', pageBlock, { itemTitle: 'title' }),
    closing: object({ title: text('Heading'), body: body(), cta }, 'Closing call to action'),
    placeholderCopy: bool('Copy still needs sign-off', 'For your reference only; not shown on the site.'),
  },
  'Page'
);

// ── Collections ────────────────────────────────────────────────────────────

export const serviceSchema: Field = object({
  order: num('Order', 'Lower numbers come first.'),
  listed: bool('Show in the services carousel and menu'),
  iconName: select('Card icon', Object.fromEntries(Object.keys(SERVICE_ICONS).map((name) => [name, name]))),
  eyebrow: text('Card eyebrow'),
  title: text('Service name'),
  description: textarea('Card description', { rows: 2 }),
  points: list('Card bullet points', text('Point')),
  linkLabel: text('Card button label'),
  page: detailPageSchema,
});

export const audienceSchema: Field = object({
  order: num('Order', 'Lower numbers come first.'),
  title: text('Name'),
  eyebrow: text('Card eyebrow'),
  paragraphs: list('Card text', textarea('Paragraph', { rows: 3 })),
  accent: select('Hero triangle colour', { pink: 'Pink', cyan: 'Light blue' }),
  page: detailPageSchema,
});

export const legalSchema: Field = object({
  label: text('Footer link text'),
  title: text('Page heading'),
  intro: body('Introduction'),
  contactEmail: text('Contact email for questions'),
  sections: list(
    'Sections',
    object({ heading: text('Heading'), paragraphs: list('Paragraphs', textarea('Paragraph', { rows: 3 })), list: list('Bullet points', text('Point')) }),
    { itemTitle: 'heading' }
  ),
});

export const policySchema: Field = object({
  title: text('Policy title'),
  summary: textarea('Summary', { rows: 2, help: 'One or two sentences, shown under the policy in the Resources library.' }),
  reviewedBy: text('Reviewed by', { placeholder: 'Name - Role' }),
  date: text('Date reviewed', { placeholder: 'dd-mm-yyyy' }),
  approvedBy: text('Approved by', { placeholder: 'Name - Role' }),
  approvedDate: text('Date approved', { placeholder: 'dd-mm-yyyy' }),
  reviewDate: text('Next review', { placeholder: 'August 2027' }),
  version: text('Version'),
  body: textarea('Policy text', {
    rows: 30,
    help: 'Markdown: ## Section heading, ### Sub-heading, - bullet point, a blank line between paragraphs. Tables: | Stage | Timescale | rows.',
  }),
  order: num('Order', 'Lower numbers are listed first.'),
});

// ── Single pages ───────────────────────────────────────────────────────────

export const settingsSchema: Field = object({
  siteName: text('Site name'),
  tagline: text('Tagline', { help: 'Shown in browser tabs after the site name.' }),
  description: textarea('Search engine description', { rows: 2 }),
  contact: object(
    {
      phone: text('Phone (as displayed)'),
      phoneInternational: text('Phone (international, for tap-to-call)', { placeholder: '+44 121 405 9284' }),
      referralsEmail: text('Referrals email'),
      enquiriesEmail: text('Enquiries email'),
    },
    'Contact details'
  ),
  address: object({ heading: text('Heading'), lines: list('Address lines', text('Line')) }, 'Office address'),
  socials: object({ linkedin: text('LinkedIn URL'), instagram: text('Instagram URL'), facebook: text('Facebook URL') }, 'Social links'),
  footerCredit: text('Footer credit line'),
  comingSoon: object({ heading: text('Heading') }, 'Coming-soon page'),
});

export const homeSchema: Field = object({
  hero: object({ title: heading(), intro: body('Introduction'), primaryCta: text('First button'), secondaryCta: text('Second button') }, 'Hero'),
  quote: object({ text: body('Quote'), cta: text('Button') }, 'Quote'),
  pillars: list(
    'Pillar cards',
    object({
      tag: text('Tag on the card'),
      title: text('Title (back of card)'),
      subtitle: textarea('Summary (back of card)', { rows: 2 }),
      points: list('Points (back of card)', text('Point')),
      image: { type: 'imageUrl', label: 'Photo', help: 'Portrait photo; the design uses a 354 × 592 crop.' },
    }),
    { itemTitle: 'tag', min: 4, max: 4, help: 'The layout has exactly four cards.' }
  ),
  journey: object({ title: heading(), body: body(), cta: text('Button') }, '“Every journey” section'),
  whoWeSupport: object({ eyebrow: text('Eyebrow'), title: heading(), body: body(), cta: text('Button') }, '“Who we support” card'),
  services: object(
    {
      eyebrow: text('Eyebrow'),
      title: heading(),
      intro: text('Line above the pills'),
      pills: list('Service pills', object({ label: text('Label'), slug: text('Service page slug', { help: 'e.g. eotas opens /services/eotas' }) }), {
        itemTitle: 'label',
        help: 'Laid out in rows of 2 and 3.',
      }),
      closing: text('Line below the pills'),
    },
    'Services circle'
  ),
  framework: object(
    {
      eyebrow: text('Eyebrow'),
      title: heading(),
      intro: text('Line below the heading'),
      cta: text('Button'),
      stages: list(
        'Stages',
        object({
          step: num('Step number'),
          title: text('Title'),
          headline: text('Headline in the slider'),
          description: textarea('Description (in the pop-up)', { rows: 3 }),
          activities: list('Activities (in the pop-up)', text('Activity')),
        }),
        { itemTitle: 'title' }
      ),
    },
    'Four stage approach'
  ),
  partnerships: object({ eyebrow: text('Eyebrow'), title: heading(), body: body(), cta: text('Button') }, 'Notebook (partnerships)'),
  referral: object({ eyebrow: text('Eyebrow'), title: heading(), body: body(), cta: text('Button') }, 'Referral'),
  resources: object({ title: heading(), cta: text('Button') }, 'Resources banner'),
  closing: object({ title: heading(), body: body(), cta: text('Button') }, 'Closing call to action'),
});

export const aboutSchema: Field = object({
  hero: object({ title: heading(), intro: body('Introduction'), cta: text('Button') }, 'Hero'),
  intro: object({ title: heading(), body: body() }, 'Introduction'),
  whyWeExist: object(
    {
      title: text('Heading'),
      body: body(),
      items: list('Mission, vision & values', object({ label: text('Label'), copy: textarea('Text', { rows: 3 }) }), {
        itemTitle: 'label',
        min: 3,
        max: 3,
      }),
    },
    'Why we exist'
  ),
  whyChooseUs: object({ eyebrow: text('Eyebrow'), title: heading(), body: body(), cta: text('Button') }, 'Why choose us'),
  closing: object({ title: heading(), body: body(), cta: text('Button') }, 'Closing call to action'),
});

export const servicesPageSchema: Field = object({
  hero: object(
    {
      badge: text('Badge'),
      title: heading('Page heading'),
      introLead: text('Introduction – opening words'),
      introHighlight: textarea('Introduction – bold part', { rows: 2 }),
      introTail: textarea('Introduction – closing words', { rows: 2 }),
      cta: text('Button'),
    },
    'Top of the page'
  ),
  whyChooseUs: object({ eyebrow: text('Eyebrow'), title: heading(), body: body(), cta: text('Button') }, 'Why choose us'),
  closing: object({ title: heading(), body: body(), cta: text('Button') }, 'Closing call to action'),
});

export const whoWeSupportPageSchema: Field = object({
  hero: object({ badge: text('Badge'), title: heading('Page heading'), intro: body('Introduction'), cta: text('Button') }, 'Top of the page'),
  workingTogether: object({ title: heading(), paragraphs: list('Paragraphs', textarea('Paragraph', { rows: 3 })), cta: text('Button') }, 'Working together'),
  closing: object({ title: heading(), body: body(), cta: text('Button') }, 'Closing call to action'),
});

const formHero = (label: string, help?: string) =>
  object({ badge: text('Badge'), title: heading(), intro: body('Introduction') }, label, help);

export const formsSchema: Field = object({
  contact: formHero('Contact page'),
  referral: formHero('Make a referral page', 'The introduction is optional and appears above the form.'),
  bookIntro: formHero('Book an intro page'),
  partnership: formHero('Partnerships page', 'The introduction appears in bold above the form.'),
  feedback: formHero('Feedback page', 'The introduction is optional and appears above the form.'),
  feedbackClosing: object({ title: heading(), body: body(), cta: text('Button') }, 'Feedback page: call to action under the form'),
});

const titledCta = (label: string) => object({ title: text('Heading'), body: body(), cta: text('Button') }, label);

export const contactPageSchema: Field = object({
  subtitle: text('Subtitle under the page heading', { help: 'The heading and introduction are under Form pages → Contact page.' }),
  form: object({ title: text('Heading'), intro: body('Introduction'), submit: text('Button') }, '“Chat to us” form'),
  getInTouch: object({ title: text('Heading') }, 'Orange contact card', 'Email, phone and address come from Site settings.'),
  refer: titledCta('Ready to refer'),
  talk: titledCta('Pink “prefer to talk first” card'),
  where: object(
    { eyebrow: text('Eyebrow'), title: text('Heading'), body: body(), areas: list('Areas', text('Area')) },
    'Where we work'
  ),
  careers: object(
    {
      title: text('Heading'),
      emptyMessage: textarea('Shown when there are no open vacancies', { rows: 2 }),
    },
    'Careers',
    'The vacancies themselves are under Careers in the dashboard menu.'
  ),
});

export const vacancySchema: Field = object({
  title: text('Job title'),
  open: bool('Open for applications', 'Switch off to stop applications. The advert stays listed as closed until you delete it.'),
  hours: text('Hours', { placeholder: 'Full Time' }),
  location: text('Location', { placeholder: 'Birmingham' }),
  salary: text('Salary (optional)', { placeholder: '£26,000 – £30,000 per year' }),
  listedOn: text('Date listed', { placeholder: 'yyyy-mm-dd', help: 'Shown as “Listed 2 weeks ago”.' }),
  closingDate: text('Closing date (optional)', { placeholder: 'yyyy-mm-dd', help: 'Applications close at the end of this day.' }),
  summary: textarea('Summary', { rows: 2, help: 'One or two sentences, shown at the top of the job page and in search results.' }),
  description: textarea('Full advert', {
    rows: 16,
    help: 'Markdown: ## Heading, **bold**, - bullet point. A blank line starts a new paragraph.',
  }),
  order: num('Order', 'Lower numbers are listed first.'),
});

export const resourcesSchema: Field = object({
  hero: object({ title: heading('Page heading'), intro: body('Introduction'), cta: text('Button') }, 'Top of the page'),
  intro: object({ title: heading(), body: body() }, 'Introduction beside the orange line'),
  library: object(
    {
      title: text('Heading'),
      allLabel: text('“Show everything” filter label'),
      groups: list(
        'Groups',
        object({
          name: text('Group name', { help: 'Also the label of its filter button.' }),
          comingSoon: bool('Coming soon', 'Shows a “Coming soon” label instead of the resources below.'),
          items: list(
            'Resources',
            object({
              title: text('Title'),
              body: textarea('Text shown when opened', { rows: 4, help: 'Leave a blank line to start a new paragraph.' }),
              fileUrl: file('File', 'Upload a file to add a Download button.'),
              linkLabel: text('Link button label (optional)'),
              linkUrl: text('Link button address', { placeholder: '/contact' }),
            }),
            { itemTitle: 'title' }
          ),
        }),
        { itemTitle: 'name' }
      ),
    },
    'Resource library'
  ),
  closing: object({ title: heading(), body: body(), cta: text('Button') }, 'Pink call to action'),
});

export const blogPageSchema: Field = object({
  hero: object({ title: heading('Page heading') }, 'Top of the page'),
  topics: object(
    {
      allLabel: text('“Show everything” filter label'),
      items: list(
        'Topics',
        object({
          label: text('Label'),
          keywords: list('Matching words', text('Word'), {
            help: 'A post appears under this topic when its category or one of its tags contains one of these words.',
          }),
        }),
        { itemTitle: 'label' }
      ),
    },
    'Topic filters'
  ),
  readMore: text('Card button label'),
  showAll: text('“Show all posts” button label'),
});
