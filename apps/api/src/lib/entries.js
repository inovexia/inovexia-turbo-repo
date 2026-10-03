import { collections, defaultsOf, fragments, slugify, templates } from '@inovexia/content';
import { prisma } from '@inovexia/database';
import { cleanObject, cleanSeo } from './clean';

export const TYPES = Object.keys(collections);

/* What a brand-new entry starts with. Pages and sections start from the
   design's own content (a copy of the template), so an editor changes a
   filled-in page rather than facing a blank one. */
export function starterFor(type, { title, template }) {
  const name = title || `New ${collections[type].singular.toLowerCase()}`;
  const tpl = template && collections[type].templates.includes(template) ? template : null;
  const base = {
    blog: {
      titleLine1: name, titleLine2: '', category: 'News', readTime: '3 min', date: new Date().toISOString().slice(0, 10),
      excerpt: '', homeSummary: '', cardImage: null, homeImage: null, articleImage: null, recentAlt: '', ctaTitle: '',
      featured: false, showOnHome: false,
      blocks: [{ type: 'text', heading: 'Introduction', html: '' }],
    },
    service: { name, indexLabel: '', icon: '', description: '', features: [], anchor: `svc-${slugify(name)}`, showOnHome: false, homeOrder: null, homeTitle: name, homeText: '', homeIcon: '', showInFooter: false, footerLabel: name, footerOrder: null },
    product: { name },
    case: { title: name, image: null, coverStyle: 1, tags: [], categories: [], comingSoonText: 'Case study coming soon', linkLabel: '', showOnHome: false, homeOrder: null, homeImage: null, homeCoverStyle: 1, homeCategories: [] },
  }[type];
  return {
    fields: base,
    template: tpl,
    page: tpl ? defaultsOf(templates[tpl].fields) : null,
    section: collections[type].fragment ? { ...(fragments[collections[type].fragment]?.default || {}) } : null,
  };
}

/* Clean an entry update from the admin, by its collection's fields and its
   template's / fragment's manifest. */
export function cleanEntryInput(type, input, current) {
  const col = collections[type];
  const out = {};
  if ('title' in input) out.title = String(input.title || '').trim().slice(0, 255);
  if ('published' in input) out.published = Boolean(input.published);
  if ('slug' in input) out.slug = slugify(input.slug);
  if ('template' in input) {
    out.template = input.template && col.templates.includes(input.template) ? input.template : null;
  }
  if ('fields' in input) out.fields = { ...(current?.fields || {}), ...cleanObject(col.fields, input.fields) };
  const template = 'template' in out ? out.template : current?.template;
  if ('page' in input) {
    out.page = template ? cleanObject(templates[template].fields, input.page) : null;
  } else if ('template' in out && out.template && out.template !== current?.template && !current?.page) {
    // a page switched on for the first time starts from the template's design content
    out.page = defaultsOf(templates[out.template].fields);
  }
  if ('section' in input && col.fragment) out.section = cleanObject(fragments[col.fragment].fields, input.section);
  if ('seo' in input) out.seo = cleanSeo(input.seo);
  // the list title follows the collection's own name field
  if (out.fields && !out.title) out.title = (col.titleFrom(out.fields) || current?.title || '').slice(0, 255);
  return out;
}

/* A slug no other entry of the type uses (adds -2, -3…). */
export async function uniqueSlug(type, wanted, exceptId = null) {
  const base = slugify(wanted) || 'item';
  let slug = base;
  for (let n = 2; ; n++) {
    const clash = await prisma.entry.findFirst({ where: { type, slug, ...(exceptId && { NOT: { id: exceptId } }) }, select: { id: true } });
    if (!clash) return slug;
    slug = `${base}-${n}`;
  }
}

/* Entry → JSON for the public site / admin. */
export const publicEntry = (e) => ({
  id: e.id, type: e.type, slug: e.slug, title: e.title, template: e.template, published: e.published, sort: e.sort,
  fields: e.fields || {}, page: e.page || null, section: e.section || null, seo: e.seo || {},
  createdAt: e.createdAt, updatedAt: e.updatedAt,
});
