/* Choice lists for the Discuss Your Project brief. The API validates against
   the same lists (apps/api/src/lib/validation.js) — change both together. */

// Same services as the Get in Touch form.
export const SERVICES = [
  'E-commerce Development',
  'Website Development',
  'App Development',
  'Plugin Development',
  'SEO Services',
  'Website Design',
  'Shopify Theme Development',
  'Plasmic Development',
  'Event Microsites',
  'Something else',
];

export const PROJECT_STAGES = ['Idea', 'Planning', 'Design', 'Ready for Development', 'Existing Product', 'Improvement / Enhancement'];

export const TIMELINES = ['As Soon As Possible', 'Within 1 Month', '1–3 Months', '3–6 Months', 'Not Sure Yet'];

const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/* ?service= → a SERVICES entry. Service pages link here with their own slug
   (/service/web-design → ?service=web-design), which does not always match
   the service's name, so known page slugs are listed; anything else is
   matched against the service names. */
const PAGE_SERVICE = {
  'web-design': 'Website Design',
  'website-design': 'Website Design',
  'web-development': 'Website Development',
  ecommerce: 'E-commerce Development',
  'e-commerce': 'E-commerce Development',
  app: 'App Development',
  'mobile-app': 'App Development',
  plugin: 'Plugin Development',
  seo: 'SEO Services',
  shopify: 'Shopify Theme Development',
  'customise-shopify-theme-development': 'Shopify Theme Development',
  plasmic: 'Plasmic Development',
  microsites: 'Event Microsites',
};

export function serviceFromParam(param) {
  if (!param) return '';
  const key = slug(param);
  return PAGE_SERVICE[key] || SERVICES.find((s) => slug(s) === key) || '';
}
