import manifests from './manifests.generated.js';

export { manifests };
export { pages, templates, fragments } from './manifests.generated.js';
export { collections, COLLECTION_TYPES, entryUrl, slugify } from './schemas.js';

/* Field defaults → a data object (what renders with nothing edited). */
export function defaultsOf(fields) {
  const out = {};
  for (const f of fields || []) if ('default' in f) out[f.key] = f.default;
  return out;
}

/* The manifest a piece of content is edited with. */
export function manifestFor({ page, template, fragment }) {
  if (page) return manifests.pages[page];
  if (template) return manifests.templates[template];
  if (fragment) return manifests.fragments[fragment];
  return null;
}

/* Page names that can be edited, in a sensible order for the admin. */
export const PAGE_ORDER = [
  'index', 'about', 'services', 'product', 'work', 'blog', 'portfolio',
  'contact', 'get-in-touch', 'privacy', 'terms', 'blog-article', 'global',
];
