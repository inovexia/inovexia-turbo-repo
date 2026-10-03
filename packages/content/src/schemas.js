/* Collections: what an editor fills in for each blog, service, product and
   case study. Field kinds (shared with the page manifests):

     text, textarea, rich (inline HTML: bold, italic, links), date,
     number, boolean, select (options), icon (SVG drawing),
     image ({ src, alt, width, height }), strings (list of short texts),
     list (repeatable group: item = fields), blocks (typed, reorderable)

   Every entry also has: slug, title, published, sort, seo { title,
   description } and — when it has its own page — a template whose content
   lives in entry.page (fields from that template's manifest). */

const IMAGE_HELP = 'Upload an image or pick one from the media library.';

export const collections = {
  blog: {
    label: 'Blogs',
    singular: 'Blog post',
    routeBase: '/blog',
    templates: [],
    titleFrom: (f) => [f.titleLine1, f.titleLine2].filter(Boolean).join(' '),
    fields: [
      { key: 'titleLine1', kind: 'text', label: 'Title — first line', required: true },
      { key: 'titleLine2', kind: 'text', label: 'Title — second line', help: 'Shown in the brand gradient on the article.' },
      { key: 'category', kind: 'text', label: 'Category', required: true, help: 'Shown on cards and in the breadcrumb, e.g. "SEO".' },
      { key: 'readTime', kind: 'text', label: 'Read time', help: 'e.g. "3 min"' },
      { key: 'date', kind: 'date', label: 'Date', help: 'Shown on the homepage cards.' },
      { key: 'excerpt', kind: 'textarea', label: 'Summary on the Blogs page' },
      { key: 'homeSummary', kind: 'textarea', label: 'Summary on the homepage' },
      { key: 'cardImage', kind: 'image', object: true, label: 'Card image (Blogs page)', help: IMAGE_HELP },
      { key: 'homeImage', kind: 'image', object: true, label: 'Homepage image', help: 'Leave empty to use the card image.' },
      { key: 'articleImage', kind: 'image', object: true, label: 'Article cover', help: 'Also used in the "Recent articles" slider.' },
      { key: 'recentAlt', kind: 'text', label: 'Cover description in "Recent articles"', advanced: true },
      { key: 'ctaTitle', kind: 'text', label: 'Question in the closing box', help: 'e.g. "Want your business to rank higher?"' },
      { key: 'featured', kind: 'boolean', label: 'Featured', help: 'Shown first, with a "Featured" flag.' },
      { key: 'showOnHome', kind: 'boolean', label: 'Show on the homepage', help: 'The homepage shows the featured post and the next two.' },
      {
        key: 'blocks',
        kind: 'blocks',
        label: 'Article',
        blocks: {
          text: { label: 'Text section', fields: [
            { key: 'heading', kind: 'text', label: 'Heading' },
            { key: 'html', kind: 'rich', label: 'Text', help: 'The first text section is the article’s lead paragraph.' },
          ] },
          points: { label: 'Numbered points', fields: [
            { key: 'heading', kind: 'text', label: 'Heading' },
            { key: 'items', kind: 'list', label: 'Points', itemLabel: 'Point', item: [
              { key: 'title', kind: 'text', label: 'Title' },
              { key: 'html', kind: 'rich', label: 'Text' },
            ] },
          ] },
          figure: { label: 'Image', fields: [
            { key: 'image', kind: 'image', object: true, label: 'Image' },
            { key: 'caption', kind: 'text', label: 'Caption' },
          ] },
        },
      },
    ],
  },

  service: {
    label: 'Services',
    singular: 'Service',
    routeBase: '/service',
    templates: ['service-web-design'],
    titleFrom: (f) => f.name,
    fields: [
      { key: 'name', kind: 'text', label: 'Name', required: true },
      { key: 'indexLabel', kind: 'text', label: 'Short name in the Services page index', help: 'Leave empty to use the name.' },
      { key: 'icon', kind: 'icon', label: 'Icon' },
      { key: 'description', kind: 'rich', label: 'Description (Services page)' },
      { key: 'features', kind: 'strings', label: 'Key points (Services page)', itemLabel: 'Point' },
      { key: 'anchor', kind: 'text', label: 'Anchor on the Services page', advanced: true, help: 'e.g. "svc-seo" → /services#svc-seo' },
      { key: 'showOnHome', kind: 'boolean', label: 'Show on the homepage' },
      { key: 'homeOrder', kind: 'number', label: 'Position on the homepage', advanced: true },
      { key: 'homeTitle', kind: 'text', label: 'Homepage card title' },
      { key: 'homeText', kind: 'rich', label: 'Homepage card text' },
      { key: 'homeIcon', kind: 'icon', label: 'Homepage card icon', help: 'Leave empty to use the main icon.', advanced: true },
      { key: 'showInFooter', kind: 'boolean', label: 'Show in the footer' },
      { key: 'footerLabel', kind: 'text', label: 'Footer link text' },
      { key: 'footerOrder', kind: 'number', label: 'Position in the footer', advanced: true },
    ],
  },

  product: {
    label: 'Products',
    singular: 'Product',
    routeBase: '/product',
    templates: ['product-lms'],
    fragment: 'product-section',
    fragmentLabel: 'Section on the Products page',
    titleFrom: (f) => f.name,
    fields: [
      { key: 'name', kind: 'text', label: 'Name', required: true },
    ],
  },

  case: {
    label: 'Case studies',
    singular: 'Case study',
    routeBase: '/case-study',
    templates: ['work-tonezone', 'work-metrotruck', 'work-accounting'],
    titleFrom: (f) => f.title,
    fields: [
      { key: 'title', kind: 'text', label: 'Title', required: true },
      { key: 'image', kind: 'image', object: true, label: 'Card image (Case Studies page)' },
      { key: 'coverStyle', kind: 'select', label: 'Card background', options: [1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: n, label: `Style ${n}` })) },
      { key: 'tags', kind: 'strings', label: 'Tags', itemLabel: 'Tag' },
      { key: 'categories', kind: 'strings', label: 'Filter categories (Case Studies page)', itemLabel: 'Category', help: 'Slugs that match the filter buttons, e.g. web-design, web-development, seo.' },
      { key: 'comingSoonText', kind: 'text', label: 'Text when it has no page yet', help: 'e.g. "Case study coming soon"' },
      { key: 'linkLabel', kind: 'text', label: 'Link description for screen readers', advanced: true },
      { key: 'showOnHome', kind: 'boolean', label: 'Show on the homepage' },
      { key: 'homeOrder', kind: 'number', label: 'Position on the homepage', advanced: true },
      { key: 'homeImage', kind: 'image', object: true, label: 'Homepage card image', help: 'Leave empty to use the card image.' },
      { key: 'homeCoverStyle', kind: 'select', label: 'Homepage card background', options: [1, 2, 3, 4, 5, 6, 7].map((n) => ({ value: n, label: `Style ${n}` })) },
      { key: 'homeCategories', kind: 'strings', label: 'Filter categories (homepage)', itemLabel: 'Category' },
    ],
  },
};

export const COLLECTION_TYPES = Object.keys(collections);

/* The public URL of an entry's own page, or null if it has none. */
export function entryUrl(entry) {
  if (entry.type === 'blog') return `/blog/${entry.slug}`;
  if (!entry.template) return null;
  return `${collections[entry.type].routeBase}/${entry.slug}`;
}

export const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[‐-―]/g, '-')
  .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
