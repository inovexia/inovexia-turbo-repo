import sanitizeHtml from 'sanitize-html';

/* Content arrives from the admin as JSON shaped by field definitions
   (packages/content: page/template manifests and collection schemas).
   clean() walks a value by its fields: unknown keys are dropped, text is
   trimmed, rich text and icons are sanitised — nothing an editor saves can
   inject script into the public site. */

// Inline formatting only, as the design's text uses: bold, italic, links,
// line breaks and the brand-gradient span.
const RICH = {
  allowedTags: ['b', 'strong', 'i', 'em', 'a', 'br', 'small', 'sup', 'sub', 'code', 'u', 'mark', 's', 'span', 'time', 'abbr'],
  allowedAttributes: {
    a: ['href', 'target', 'rel', 'title', 'aria-label'],
    span: ['class', 'aria-hidden'],
    time: ['datetime'],
    abbr: ['title'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowProtocolRelative: false,
  transformTags: {
    a: (tag, attribs) => (attribs.target === '_blank' ? { tagName: 'a', attribs: { ...attribs, rel: 'noopener noreferrer' } } : { tagName: tag, attribs }),
  },
};

// The drawing inside an <svg> icon: shapes and their geometry, no scripts,
// no event handlers, no external references.
const SVG_SHAPES = ['path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse', 'g'];
const SVG_ATTRS = ['d', 'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'y1', 'x2', 'y2', 'width', 'height', 'points', 'transform',
  'fill', 'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'opacity', 'fill-opacity', 'stroke-opacity'];
const ICON = {
  allowedTags: SVG_SHAPES,
  allowedAttributes: Object.fromEntries(SVG_SHAPES.map((t) => [t, SVG_ATTRS])),
  parser: { lowerCaseAttributeNames: false, lowerCaseTags: false },
};

export const cleanRich = (v) => sanitizeHtml(String(v ?? ''), RICH).trim();
export const cleanIcon = (v) => sanitizeHtml(String(v ?? '').replace(/<\/?svg[^>]*>/gi, ''), ICON).trim();

const str = (v, max = 20000) => String(v ?? '').slice(0, max);

function cleanImage(v) {
  if (!v || typeof v !== 'object') return null;
  const src = str(v.src, 500).trim();
  if (!src) return null;
  if (!/^(\/|https?:\/\/)/i.test(src)) return null; // site paths or http(s) only
  const out = { src, alt: str(v.alt, 500) };
  if (Number(v.width) > 0) out.width = Math.round(Number(v.width));
  if (Number(v.height) > 0) out.height = Math.round(Number(v.height));
  return out;
}

function cleanUrl(v) {
  const s = str(v, 1000).trim();
  return /^\s*(javascript|data|vbscript):/i.test(s) ? '' : s;
}

/* One value by its field definition. */
export function cleanValue(field, v) {
  switch (field.kind) {
    case 'rich': return cleanRich(v);
    case 'icon': return cleanIcon(v);
    case 'link': return cleanUrl(v);
    case 'image': return typeof v === 'object' && v !== null ? cleanImage(v) : cleanUrl(v); // manifests: a plain src
    case 'boolean': return Boolean(v);
    case 'number': return v === '' || v == null || Number.isNaN(Number(v)) ? null : Number(v);
    case 'select': return field.options?.some((o) => String(o.value) === String(v)) ? field.options.find((o) => String(o.value) === String(v)).value : field.options?.[0]?.value ?? null;
    case 'date': return /^\d{4}-\d{2}-\d{2}$/.test(String(v || '')) ? String(v) : '';
    case 'strings': return (Array.isArray(v) ? v : []).map((x) => str(x, 500).trim()).filter(Boolean).slice(0, 200);
    case 'list': return (Array.isArray(v) ? v : []).slice(0, 500).map((item) => cleanObject(field.item, item));
    case 'blocks': return (Array.isArray(v) ? v : []).slice(0, 500).map((b) => {
      const def = field.blocks?.[b?.type];
      return def ? { type: b.type, ...cleanObject(def.fields, b) } : null;
    }).filter(Boolean);
    default: return str(v); // text, textarea, alt, attr
  }
}

/* An object by its fields: only known keys survive. */
export function cleanObject(fields, obj) {
  const out = {};
  const src = obj && typeof obj === 'object' ? obj : {};
  for (const f of fields || []) {
    if (f.key in src) out[f.key] = cleanValue(f, src[f.key]);
  }
  return out;
}

export function cleanSeo(seo) {
  const s = seo && typeof seo === 'object' ? seo : {};
  return { title: str(s.title, 255).trim(), description: str(s.description, 500).trim() };
}

/* Only the fields that differ from their default are worth storing for a
   page (so a later design change still reaches untouched fields). */
export function diffFromDefaults(fields, data) {
  const out = {};
  for (const f of fields) {
    if (!(f.key in data)) continue;
    if (JSON.stringify(data[f.key]) !== JSON.stringify(f.default)) out[f.key] = data[f.key];
  }
  return out;
}
