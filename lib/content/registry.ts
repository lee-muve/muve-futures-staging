/**
 * Every editable document on the site: the single pages and the collections
 * (services, audiences, legal pages). The dashboard lists these, the editor
 * uses their schemas, and the site reads them through lib/content/queries.ts.
 */
import { AUDIENCES, LEGAL_PAGES, POLICIES, SERVICE_OFFERINGS, type Audience, type LegalPage, type Policy, type ServiceOffering } from '@/constants';
import type { Field } from './fields';
import {
  DEFAULT_ABOUT,
  DEFAULT_BLOG_PAGE,
  DEFAULT_CONTACT_PAGE,
  DEFAULT_FORMS,
  DEFAULT_HOME,
  DEFAULT_RESOURCES,
  DEFAULT_SERVICES_PAGE,
  DEFAULT_SETTINGS,
  DEFAULT_WHO_WE_SUPPORT_PAGE,
  type AboutContent,
  type BlogPageContent,
  type ContactPageContent,
  type Vacancy,
  blankVacancy,
  type FormsContent,
  type HomeContent,
  type ResourcesContent,
  type ServicesPageContent,
  type SettingsContent,
  type WhoWeSupportPageContent,
} from './pages';
import {
  aboutSchema,
  audienceSchema,
  blogPageSchema,
  contactPageSchema,
  vacancySchema,
  formsSchema,
  homeSchema,
  legalSchema,
  policySchema,
  resourcesSchema,
  serviceSchema,
  servicesPageSchema,
  settingsSchema,
  whoWeSupportPageSchema,
} from './schemas';

interface SingleDef<T> {
  label: string;
  description: string;
  schema: Field;
  defaults: T;
  /** Public page to preview after saving. */
  path: string;
}

export interface SingleTypes {
  settings: SettingsContent;
  home: HomeContent;
  about: AboutContent;
  'services-page': ServicesPageContent;
  'who-we-support-page': WhoWeSupportPageContent;
  forms: FormsContent;
  resources: ResourcesContent;
  'blog-page': BlogPageContent;
  'contact-page': ContactPageContent;
}

export type SingleKey = keyof SingleTypes;

export const SINGLES: { [K in SingleKey]: SingleDef<SingleTypes[K]> } = {
  settings: {
    label: 'Site settings',
    description: 'Contact details, office address, social links and search engine text.',
    schema: settingsSchema,
    defaults: DEFAULT_SETTINGS,
    path: '/',
  },
  home: { label: 'Home page', description: 'Every section of the home page.', schema: homeSchema, defaults: DEFAULT_HOME, path: '/' },
  about: { label: 'About page', description: 'Hero, why we exist, why choose us.', schema: aboutSchema, defaults: DEFAULT_ABOUT, path: '/about' },
  'services-page': {
    label: 'Services overview',
    description: 'The /services page intro and closing. Each service has its own entry below.',
    schema: servicesPageSchema,
    defaults: DEFAULT_SERVICES_PAGE,
    path: '/services',
  },
  'who-we-support-page': {
    label: 'Who we support overview',
    description: 'The /who-we-support page intro and closing. Each audience has its own entry below.',
    schema: whoWeSupportPageSchema,
    defaults: DEFAULT_WHO_WE_SUPPORT_PAGE,
    path: '/who-we-support',
  },
  forms: {
    label: 'Form pages',
    description: 'Headings and introductions on the contact, referral and book-an-intro pages.',
    schema: formsSchema,
    defaults: DEFAULT_FORMS,
    path: '/contact',
  },
  resources: {
    label: 'Resources page',
    description: 'Intro, the resource library (families, professionals, referrals, policies…) and the closing call to action.',
    schema: resourcesSchema,
    defaults: DEFAULT_RESOURCES,
    path: '/resources',
  },
  'blog-page': {
    label: 'Topics page (blog)',
    description: 'The /blog heading and topic filters. Posts themselves are written under Blog.',
    schema: blogPageSchema,
    defaults: DEFAULT_BLOG_PAGE,
    path: '/blog',
  },
  'contact-page': {
    label: 'Contact page & careers',
    description: 'The contact form, side cards, where we work and the careers vacancies.',
    schema: contactPageSchema,
    defaults: DEFAULT_CONTACT_PAGE,
    path: '/contact',
  },
};

// ── Collections ────────────────────────────────────────────────────────────

/** A collection item as stored: everything except the slug, which lives in the key. */
export type ServiceItem = Omit<ServiceOffering, 'slug'> & { order: number; listed: boolean };
export type AudienceItem = Omit<Audience, 'slug'> & { order: number };
export type LegalItem = Omit<LegalPage, 'slug'>;
export type PolicyItem = Omit<Policy, 'slug'>;

export interface CollectionTypes {
  service: ServiceItem;
  audience: AudienceItem;
  legal: LegalItem;
  policy: PolicyItem;
  vacancy: Vacancy;
}

export type CollectionName = keyof CollectionTypes;

interface CollectionDef<T> {
  label: string;
  itemNoun: string;
  description: string;
  schema: Field;
  /** Built-in items, keyed by slug. */
  defaults: Record<string, T>;
  /** Editors can add and delete items. */
  allowCreate: boolean;
  /** Public page for an item. */
  path: (slug: string) => string;
  /** Template for a new item. */
  blank?: () => T;
}

/** Keys items by slug, passing each one on without its slug (the slug lives in the content key). */
const bySlug = <T extends { slug: string }, R>(items: T[], map: (item: Omit<T, 'slug'>, index: number) => R) =>
  Object.fromEntries(
    items.map((item, i) => {
      const rest: Partial<T> = { ...item };
      delete rest.slug;
      return [item.slug, map(rest as Omit<T, 'slug'>, i)];
    })
  );

export const COLLECTIONS: { [K in CollectionName]: CollectionDef<CollectionTypes[K]> } = {
  service: {
    label: 'Services',
    itemNoun: 'service',
    description: 'Each service card and its page at /services/…',
    schema: serviceSchema,
    defaults: bySlug(SERVICE_OFFERINGS, (service, i) => ({
      ...service,
      order: service.order ?? i + 1,
      listed: service.listed !== false,
    })),
    allowCreate: true,
    path: (slug) => `/services/${slug}`,
    blank: () => ({
      ...structuredClone({ ...SERVICE_OFFERINGS[0], slug: undefined }),
      order: 100,
      listed: true,
      title: 'New service',
    }),
  },
  audience: {
    label: 'Who we support',
    itemNoun: 'audience',
    description: 'Each audience card and its page at /who-we-support/…',
    schema: audienceSchema,
    defaults: bySlug(AUDIENCES, (audience, i) => ({ ...audience, order: audience.order ?? i + 1 })),
    allowCreate: true,
    path: (slug) => `/who-we-support/${slug}`,
    blank: () => ({ ...structuredClone({ ...AUDIENCES[0], slug: undefined }), order: 100, title: 'New audience' }),
  },
  legal: {
    label: 'Legal & governance pages',
    itemNoun: 'page',
    description: 'The four pages linked from the footer.',
    schema: legalSchema,
    defaults: bySlug(LEGAL_PAGES, (page) => page),
    allowCreate: false,
    path: (slug) => `/${slug}`,
  },
  policy: {
    label: 'Policies & procedures',
    itemNoun: 'policy',
    description: 'Each policy and its page at /policies/…, listed under Policies in the Resources library.',
    schema: policySchema,
    defaults: bySlug(POLICIES, (policy) => policy),
    allowCreate: true,
    path: (slug) => `/policies/${slug}`,
    blank: () => ({
      title: 'New policy',
      summary: '',
      reviewedBy: '',
      date: '',
      approvedBy: '',
      approvedDate: '',
      reviewDate: '',
      version: '1',
      body: '## Introduction\n\n',
      order: 100,
    }),
  },
  vacancy: {
    label: 'Careers: vacancies',
    itemNoun: 'vacancy',
    description: 'Each job advert and its page at /careers/…, where people apply. Applications are under Careers in the menu.',
    schema: vacancySchema,
    // None built in, so no example jobs ever go live.
    defaults: {},
    allowCreate: true,
    path: (slug) => `/careers/${slug}`,
    blank: blankVacancy,
  },
};

export const contentKey = (collection: CollectionName, slug: string) => `${collection}:${slug}`;

/** Parses a stored key back into its collection and slug, or returns the single key. */
export function parseKey(key: string): { kind: 'single'; key: SingleKey } | { kind: 'collection'; collection: CollectionName; slug: string } | null {
  // Own-property checks, so names like "constructor" aren't mistaken for content.
  if (Object.hasOwn(SINGLES, key)) return { kind: 'single', key: key as SingleKey };
  const [collection, slug, extra] = key.split(':');
  if (extra === undefined && Object.hasOwn(COLLECTIONS, collection) && slug && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { kind: 'collection', collection: collection as CollectionName, slug };
  }
  return null;
}

/** Cache tags: saving a document refreshes every page that reads it. */
export const contentTag = {
  single: (key: SingleKey) => `content:${key}`,
  collection: (name: CollectionName) => `content:collection:${name}`,
  blog: 'blog',
};
