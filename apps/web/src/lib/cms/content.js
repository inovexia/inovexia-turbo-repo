/* Content for the public site, read from the API (apps/api) and cached by
   Next. The admin's saves expire the 'content' cache tag through
   /revalidate, so edits appear on the next request; the 5-minute
   revalidate is only a safety net.

   If the API cannot be reached, pages render the design defaults and the
   seed entries instead of failing — the site never goes blank. */
import { cache } from 'react';
import { defaultsOf, fragments, pages, templates } from '@inovexia/content';
import { seedEntries } from '@inovexia/content/seed';
import { accessor } from './accessor';

const API = (process.env.API_URL || 'http://localhost:4000').replace(/\/$/, '');
const SITE = (process.env.SITE_URL || 'https://inovexiasoftware.com').replace(/\/$/, '');
export const REVALIDATE = 300;

async function fetchJson(path) {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: REVALIDATE, tags: ['content'] } });
    if (res.status === 404) return { notFound: true };
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null; // API down: callers fall back to defaults / seed
  }
}

/* ------------------------------------------------------------- pages */

/* A page's content: design defaults with the saved edits on top. */
export const getPageData = cache(async (name) => {
  const m = pages[name];
  if (!m) throw new Error(`Unknown page "${name}"`);
  const res = await fetchJson(`/api/content/pages/${encodeURIComponent(name)}`);
  return { ...defaultsOf(m.fields), ...(res?.data || {}) };
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
  if (META.openGraph) {
    md.openGraph = {
      ...META.openGraph,
      title: seo.title || META.openGraph.title || title,
      description: seo.description || META.openGraph.description || description,
      ...(path && { url: `${SITE}${path}` }),
    };
  }
  return md;
}

/* -------------------------------------------------------- collections */

const bySort = (a, b) => (a.sort ?? 0) - (b.sort ?? 0) || a.title.localeCompare(b.title);
const seedOf = (type) => seedEntries.filter((e) => e.type === type);

/* Published entries of a type, in admin order. */
export const getEntries = cache(async (type) => {
  const res = await fetchJson(`/api/content/entries?type=${type}`);
  const list = res?.items ?? seedOf(type);
  return list.filter((e) => e.published).sort(bySort);
});

/* One published entry, or null (→ 404). */
export const getEntry = cache(async (type, slug) => {
  const res = await fetchJson(`/api/content/entries/${type}/${encodeURIComponent(slug)}`);
  if (res?.notFound) return null;
  if (res?.item) return res.item.published ? res.item : null;
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
