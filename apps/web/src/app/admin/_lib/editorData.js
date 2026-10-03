import { entryUrl, pages, templates } from '@inovexia/content';
import { seedEntries } from '@inovexia/content/seed';

/* Every icon drawing used in the design — the icon picker's palette. */
function collectIcons() {
  const set = new Set();
  const visit = (fields, values) => {
    for (const f of fields || []) {
      if (f.kind === 'icon') for (const v of values) if (v?.[f.key]) set.add(v[f.key]);
      if (f.kind === 'list') {
        const items = values.flatMap((v) => (Array.isArray(v?.[f.key]) ? v[f.key] : []));
        visit(f.item, items);
      }
    }
  };
  for (const m of [...Object.values(pages), ...Object.values(templates)]) {
    visit(m.fields, [Object.fromEntries(m.fields.filter((f) => 'default' in f).map((f) => [f.key, f.default]))]);
  }
  for (const e of seedEntries) {
    if (e.fields?.icon) set.add(e.fields.icon);
    if (e.fields?.homeIcon) set.add(e.fields.homeIcon);
  }
  return [...set];
}

/* Addresses offered when typing a link. */
function collectLinks() {
  const routes = Object.values(pages).map((p) => p.route).filter(Boolean);
  return [...new Set([...routes, '/discuss-your-project', ...seedEntries.map(entryUrl).filter(Boolean)])].sort();
}

export const ICONS = collectIcons();
export const LINKS = collectLinks();
