/* Content for the public site. Everything is static: pages render the
   design defaults and the entries bundled in @inovexia/content (seed),
   so every page — list and detail alike — is pre-rendered at build time
   and nothing is read from the API. To change content, edit
   packages/content and rebuild. */
import { cache } from 'react';
import { defaultsOf, fragments, pages, templates } from '@inovexia/content';
import { seedEntries } from '@inovexia/content/seed';
import { accessor } from './accessor';

const SITE = (process.env.SITE_URL || 'https://inovexiasoftware.com').replace(/\/$/, '');

/* Site-wide share defaults. A page's openGraph replaces its parent's
   wholesale in Next, so withSeo fills these in on every page. */
export const SITE_NAME = 'Inovexia Software';
export const SITE_TITLE = 'Inovexia Software — Providing Innovative Digital Solutions';
export const SITE_DESCRIPTION = 'We help businesses around the world grow online with scalable, extensible software — websites, apps and platforms built to last.';
export const OG_IMAGE = {
  url: `${SITE}/assets/img/og-image.jpg`,
  width: 1200,
  height: 630,
  alt: 'Inovexia Software — Providing innovative digital solutions.',
};

/* ------------------------------------------------------------- pages */

/* A page's content: the design defaults. */
export const getPageData = cache(async (name) => {
  const m = pages[name];
  if (!m) throw new Error(`Unknown page "${name}"`);
  return defaultsOf(m.fields);
});

export async function loadPage(name) {
  return accessor(await getPageData(name));
}

/* Page <head>: the design's metadata, with an edited title/description. */
export async function pageMetadata(name, META) {
  const seo = (await getPageData(name)).$seo || {};
  return withSeo(META, seo, null);
}

function withSeo(META, seo, path) {
  const title = seo.title || META.title;
  const description = seo.description || META.description;
  const md = { ...META, title, description };
  if (path) md.alternates = { canonical: `${SITE}${path}` };
  const og = META.openGraph || {};
  md.openGraph = {
    type: 'website',
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    ...og,
    title: seo.title || og.title || title,
    description: seo.description || og.description || description,
    ...(path && { url: `${SITE}${path}` }),
  };
  return md;
}

/* -------------------------------------------------------- collections */

const bySort = (a, b) => (a.sort ?? 0) - (b.sort ?? 0) || a.title.localeCompare(b.title);
const seedOf = (type) => seedEntries.filter((e) => e.type === type);

/* Published entries of a type, in sort order. */
export const getEntries = cache(async (type) => {
  return seedOf(type).filter((e) => e.published).sort(bySort);
});

/* One published entry, or null (→ 404). */
export const getEntry = cache(async (type, slug) => {
  return seedOf(type).find((e) => e.slug === slug && e.published) || null;
});

/* The accessor for an entry's own page (template defaults + its content). */
export function templateAccessor(entry) {
  const m = templates[entry.template];
  return accessor({ ...defaultsOf(m?.fields), ...(entry.page || {}) }, { slug: entry.slug });
}

/* The accessor for a per-entry page fragment (e.g. a product's section). */
export function fragmentAccessor(name, data, slug) {
  return accessor({ ...(fragments[name]?.default || {}), ...(data || {}) }, { slug });
}

export function entryMetadata(entry, META, path) {
  return withSeo(META, entry.seo || {}, path);
}

/* ------------------------------------------------------------- helpers */

export const pad2 = (n) => String(n).padStart(2, '0');

export function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}
