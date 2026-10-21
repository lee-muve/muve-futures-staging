import 'server-only';
import { unstable_cache } from 'next/cache';
import { and, desc, eq, like, lte } from 'drizzle-orm';
import { db, hasDatabase, schema } from '@/lib/db';
import { withDefaults } from './fields';
import {
  COLLECTIONS,
  SINGLES,
  contentKey,
  contentTag,
  type CollectionName,
  type CollectionTypes,
  type SingleKey,
  type SingleTypes,
} from './registry';
import { DEFAULT_POSTS, type PublicPost } from './posts';

/*
 * Read side of the CMS. Everything is cached with a tag (see contentTag) and
 * refreshed when the dashboard saves. With no DATABASE_URL, or if the database
 * can't be reached, pages fall back to the built-in defaults so the site
 * always renders.
 */

async function safely<T>(what: string, run: () => Promise<T>, fallback: T): Promise<T> {
  if (!hasDatabase) return fallback;
  try {
    return await run();
  } catch (error) {
    console.error(`[content] Couldn't load ${what}; using built-in content.`, error);
    return fallback;
  }
}

/**
 * Part of the content cache keys (singles, collections and blog posts). Bump it when a content type changes shape
 * so cached copies in the old shape aren't served (they outlive deploys).
 */
const SHAPE_VERSION = '12';

/** A single page's content (e.g. `home`), merged over its defaults. */
export function getSingle<K extends SingleKey>(key: K): Promise<SingleTypes[K]> {
  const defaults = SINGLES[key].defaults;
  return unstable_cache(
    () =>
      safely(
        key,
        async () => {
          const [row] = await db().select({ data: schema.content.data }).from(schema.content).where(eq(schema.content.key, key));
          return withDefaults(row?.data, defaults);
        },
        defaults
      ),
    ['content', key, SHAPE_VERSION],
    { tags: [contentTag.single(key)] }
  )();
}

export type WithSlug<T> = T & { slug: string };

/**
 * All items in a collection, sorted by their `order`. Once any item has been
 * saved, the database is the source of truth for the whole collection.
 */
export function getCollection<C extends CollectionName>(name: C): Promise<WithSlug<CollectionTypes[C]>[]> {
  const def = COLLECTIONS[name];
  const fromDefaults = () =>
    Object.entries(def.defaults).map(([slug, data]) => ({ ...(data as CollectionTypes[C]), slug }));

  return unstable_cache(
    () =>
      safely(
        `${name} list`,
        async () => {
          const rows = await db()
            .select({ key: schema.content.key, data: schema.content.data })
            .from(schema.content)
            .where(like(schema.content.key, `${name}:%`));
          if (rows.length === 0) return fromDefaults();
          return rows.map((row) => {
            const slug = row.key.slice(name.length + 1);
            const fallback = (def.defaults[slug] ?? Object.values(def.defaults)[0] ?? def.blank?.()) as CollectionTypes[C];
            return { ...withDefaults(row.data, fallback), slug };
          });
        },
        fromDefaults()
      ).then((items) =>
        items.sort((a, b) => ((a as { order?: number }).order ?? 0) - ((b as { order?: number }).order ?? 0))
      ),
    ['content', 'collection', name, SHAPE_VERSION],
    { tags: [contentTag.collection(name)] }
  )();
}

export async function getCollectionItem<C extends CollectionName>(name: C, slug: string) {
  const items = await getCollection(name);
  return items.find((item) => item.slug === slug);
}

// ── Blog ───────────────────────────────────────────────────────────────────

const toPublic = (post: typeof schema.blogPosts.$inferSelect): PublicPost => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  body: post.body,
  category: post.category,
  tags: post.tags,
  coverImageUrl: post.coverImageUrl,
  coverImageAlt: post.coverImageAlt,
  gallery: post.gallery ?? [],
  authorName: post.authorName,
  publishedAt: (post.publishedAt ?? post.createdAt).toISOString(),
});

/** Published posts, newest first. Future-dated posts stay hidden until their date. */
export function getPublishedPosts(): Promise<PublicPost[]> {
  return unstable_cache(
    () =>
      safely(
        'blog posts',
        async () => {
          const rows = await db()
            .select()
            .from(schema.blogPosts)
            .where(and(eq(schema.blogPosts.status, 'published'), lte(schema.blogPosts.publishedAt, new Date())))
            .orderBy(desc(schema.blogPosts.publishedAt));
          return rows.map(toPublic);
        },
        DEFAULT_POSTS
      ),
    ['blog', 'published', SHAPE_VERSION],
    // Also revalidate hourly so scheduled posts appear without a save.
    { tags: [contentTag.blog], revalidate: 3600 }
  )().then((posts) =>
    // A copy cached before a field existed can outlive a deploy; fill the gaps.
    posts.map((post) => ({ ...post, gallery: Array.isArray(post.gallery) ? post.gallery : [] }))
  );
}

export async function getPublishedPost(slug: string): Promise<PublicPost | undefined> {
  const posts = await getPublishedPosts();
  return posts.find((post) => post.slug === slug);
}

export { contentKey };
