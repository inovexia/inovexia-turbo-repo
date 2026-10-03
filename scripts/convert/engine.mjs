/* =========================================================
   HTML → JSX engine with editable content fields.

   renderNodes/renderElement turn parsed design HTML into JSX node for node
   (same DOM as the design). When a CMS scope is active they also turn the
   page's content into fields:

     text   a text node, or an element that holds only text   {c.t("key")}
     rich   an element that holds text + inline formatting     dangerouslySetInnerHTML={{ __html: c.h("key") }}
     image  <img src>, alt  <img alt>, link  <a href>           src={c.a("key")}
     icon   an <svg> whose drawing differs between list items   dangerouslySetInnerHTML
     list   a run of ≥ 2 sibling elements with the same shape  {c.l("key").map((it, i) => …)}

   Inside a list, anything that follows the item's position (01/02/03,
   --d:0/1/2, faq-q-1/2) is computed from the index instead of stored, and
   attributes that are the same in every item stay literal.

   Every field is recorded with a key, a label, its page section and its
   current (design) value, which becomes the default — the page renders
   exactly as the design until someone edits it.
   ========================================================= */

/* ---------------------------------------------------------------- utils */

export const isEl = (n) => n.type === 'tag' || n.type === 'script' || n.type === 'style';
export const kids = (n) => n.children || [];
export const jsStr = (s) => JSON.stringify(s);
const elKids = (n) => kids(n).filter(isEl);
const isWs = (n) => n.type === 'text' && !/[^ \t\n\r\f]/.test(n.data);

export function walk(node, fn) {
  for (const c of kids(node)) {
    if (fn(c) === false) return false;
    if (walk(c, fn) === false) return false;
  }
}
export function findAll(node, pred) {
  const out = [];
  walk(node, (n) => { if (isEl(n) && pred(n)) out.push(n); });
  return out;
}
export const find = (node, pred) => findAll(node, pred)[0] || null;
export const hasClass = (n, c) => (n.attribs?.class || '').split(/\s+/).includes(c);
const classes = (n) => (n.attribs?.class || '').trim().split(/\s+/).filter(Boolean);

const collapse = (s) => s.replace(/[ \t\n\r\f]+/g, ' ');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/ /g, '&nbsp;');
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

/* ------------------------------------------------------- attributes */

const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly',
  maxlength: 'maxLength', minlength: 'minLength', autocomplete: 'autoComplete',
  autofocus: 'autoFocus', inputmode: 'inputMode', crossorigin: 'crossOrigin',
  novalidate: 'noValidate', colspan: 'colSpan', rowspan: 'rowSpan', srcset: 'srcSet',
  datetime: 'dateTime', autoplay: 'autoPlay', playsinline: 'playsInline',
  frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen', enctype: 'encType',
  contenteditable: 'contentEditable', spellcheck: 'spellCheck', fetchpriority: 'fetchPriority',
  referrerpolicy: 'referrerPolicy', 'accept-charset': 'acceptCharset', 'http-equiv': 'httpEquiv',
  charset: 'charSet', itemprop: 'itemProp', itemscope: 'itemScope', itemtype: 'itemType',
  enterkeyhint: 'enterKeyHint', formnovalidate: 'formNoValidate', popovertarget: 'popoverTarget',
  'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', 'xml:lang': 'xmlLang', 'xmlns:xlink': 'xmlnsXlink',
};
const BOOL = new Set([
  'hidden', 'required', 'disabled', 'checked', 'novalidate', 'readonly', 'multiple', 'autofocus',
  'autoplay', 'muted', 'loop', 'playsinline', 'controls', 'open', 'allowfullscreen', 'defer',
  'async', 'itemscope', 'selected', 'formnovalidate', 'inert', 'reversed',
]);
const URL_ATTRS = new Set(['href', 'src', 'poster', 'action', 'data-src']);

function jsxAttrName(name, tag) {
  const low = name.toLowerCase();
  if (low.startsWith('data-') || low.startsWith('aria-')) return low;
  if (low === 'value' && (tag === 'input' || tag === 'textarea')) return 'defaultValue';
  if (low === 'checked' && tag === 'input') return 'defaultChecked';
  if (ATTR_MAP[low]) return ATTR_MAP[low];
  if (name.includes('-')) return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return name;
}

function splitDecls(css) {
  const out = [];
  let depth = 0, quote = null, cur = '';
  for (const ch of css) {
    if (quote) { if (ch === quote) quote = null; cur += ch; continue; }
    if (ch === '"' || ch === "'") quote = ch;
    else if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth === 0) { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim()).filter(Boolean);
}
function styleDecls(css) {
  return splitDecls(css).map((d) => {
    const i = d.indexOf(':');
    return i < 0 ? null : [d.slice(0, i).trim(), d.slice(i + 1).trim().replace(/url\((['"]?)assets\//g, 'url($1/assets/')];
  }).filter(Boolean);
}
const styleKey = (prop) => (prop.startsWith('--') ? prop : prop.toLowerCase().replace(/^-ms-/, 'ms-').replace(/-([a-z])/g, (_, c) => c.toUpperCase()));
const objKey = (k) => (/^[a-zA-Z]+$/.test(k) ? k : jsStr(k));

/* The value an attribute renders with (URLs rewritten to site routes). */
function attrValue(ctx, name, raw) {
  const low = name.toLowerCase();
  if (URL_ATTRS.has(low)) return ctx.rewriteUrl(raw);
  if (low === 'srcset') return raw.split(',').map((s) => { const [u, ...d] = s.trim().split(/\s+/); return [ctx.rewriteUrl(u), ...d].join(' '); }).join(', ');
  return raw;
}
const literalAttr = (jsx, v) => (/["\\\n\r&]/.test(v) ? `${jsx}={${jsStr(v)}}` : `${jsx}="${v}"`);

/* ------------------------------------------------------------- fields */

/* Attributes whose value is content an editor would change. */
export function contentAttrKind(el, name) {
  const tag = el.name.toLowerCase();
  if (tag === 'img' && name === 'src') return 'image';
  if (tag === 'img' && name === 'alt') return 'alt';
  if (tag === 'a' && name === 'href') {
    const v = el.attribs.href || '';
    return v.startsWith('#') || v.startsWith('javascript:') ? null : 'link';
  }
  if (name === 'data-count' || name === 'data-suffix' || name === 'data-cap' || name === 'data-url') return 'text';
  return null;
}

const FORMAT_TAGS = new Set(['b', 'strong', 'i', 'em', 'a', 'br', 'small', 'sup', 'sub', 'code', 'u', 'mark', 's', 'abbr', 'time', 'q', 'cite', 'span']);
// Spans that are formatting inside a sentence. Any other classed span is
// structure (a mask line, an icon slot, a counter) and is descended into.
const INLINE_SPAN_CLASSES = new Set(['grad']);
// Small status indicators (a live dot, a tick) that sit inside a chip's
// sentence: the chip stays one rich field and keeps its indicator.
const INDICATOR_SPAN_CLASSES = new Set(['pd__live', 'pd__ok', 'appx__live', 'appx__ok']);
const RAW_TAGS = new Set(['script', 'style', 'template', 'noscript', 'textarea']);

const hasText = (n) => (n.type === 'text' ? /[^ \t\n\r\f]/.test(n.data) : kids(n).some(hasText));

function inlineOk(n) {
  if (n.type === 'text' || n.type === 'comment') return true;
  if (!isEl(n)) return false;
  const tag = n.name.toLowerCase();
  if (!FORMAT_TAGS.has(tag)) return false;
  if (tag === 'span' && classes(n).length && classes(n).every((c) => INDICATOR_SPAN_CLASSES.has(c))) return true;
  if (tag === 'span' && classes(n).some((c) => !INLINE_SPAN_CLASSES.has(c))) return false;
  if (tag === 'br') return true;
  return hasText(n) && kids(n).every(inlineOk);
}

/* What an element is, for content purposes. */
export function classify(el) {
  const tag = el.name.toLowerCase();
  if (RAW_TAGS.has(tag)) return 'raw';
  if (tag === 'svg') return 'svg';
  if (el.attribs?.['data-count'] !== undefined) return 'counter';
  if (tag === 'option' || tag === 'select') return 'tree';
  if (hasText(el) && kids(el).every(inlineOk)) {
    return kids(el).every((c) => c.type !== 'tag') ? 'text' : 'rich';
  }
  return 'tree';
}

/* An aria-hidden copy of the previous sibling's text (the header's hover
   labels) mirrors that field instead of becoming a second one. */
function mirrorOf(el) {
  if (el.attribs?.['aria-hidden'] !== 'true') return null;
  const sibs = elKids(el.parent);
  const prev = sibs[sibs.indexOf(el) - 1];
  if (!prev || prev.name !== el.name || prev.attribs?.['aria-hidden'] === 'true') return null;
  return blockText(prev) === blockText(el) ? prev : null;
}
const blockText = (el) => collapse(textOf(el)).trim();
function textOf(n) { return n.type === 'text' ? n.data : kids(n).map(textOf).join(''); }

/* Inner HTML of a rich block, whitespace collapsed, URLs rewritten. */
function serializeInline(nodes, ctx) {
  return nodes.map((n) => {
    if (n.type === 'text') return escText(collapse(n.data));
    if (n.type === 'comment' || !isEl(n)) return '';
    const tag = n.name.toLowerCase();
    const attrs = Object.entries(n.attribs || {}).map(([k, v]) => ` ${k}="${escAttr(attrValue(ctx, k, v))}"`).join('');
    if (tag === 'br') return `<br${attrs}>`;
    return `<${tag}${attrs}>${serializeInline(kids(n), ctx)}</${tag}>`;
  }).join('');
}
function blockHtml(el, ctx) {
  const html = serializeInline(kids(el), ctx);
  return BLOCK_CONTAINER.has(el.name.toLowerCase()) ? html.trim() : html;
}
/* For the seed extractor: an element's text, and its inner HTML. */
export const textContent = (el) => (el ? blockText(el) : '');
export const innerHtml = (el, ctx) => (el ? serializeInline(kids(el), ctx).trim() : '');
export const svgMarkup = (el, ctx) => (el ? svgInner(el, ctx) : '');

/* A short role name for an element: the last BEM part of its first class,
   else a word for its tag. Keys and labels are built from it. */
const TAG_ROLE = {
  h1: 'title', h2: 'heading', h3: 'subheading', h4: 'subheading', h5: 'subheading', h6: 'subheading',
  p: 'text', li: 'item', a: 'link', button: 'button', label: 'label', figcaption: 'caption',
  blockquote: 'quote', option: 'option', img: 'image', b: 'bold', strong: 'bold', em: 'emphasis',
  i: 'italic', small: 'small', span: 'text', dt: 'term', dd: 'detail', time: 'date', th: 'cell', td: 'cell',
  legend: 'legend', summary: 'summary', cite: 'cite', q: 'quote', div: 'block', article: 'item', svg: 'icon',
};
const FRIENDLY = {
  'm__i': 'title line', wcell: 'card', 'tl__item': 'step', 'faq__item': 'question', srv: 'service',
  'svcg__card': 'card', 'tsm__card': 'testimonial', node: 'node', 'art__pt': 'point', feat: 'feature',
  'pfm__card': 'card', 'stx__col': 'column', 'work__item': 'case study', 'bcard': 'article',
};
export function roleOf(el) {
  // the label inside a button ("Start Your Project") and the button itself
  if (el.name === 'span' && !classes(el).length && el.parent && classes(el.parent).includes('btn')) return 'buttonText';
  if (classes(el).includes('btn')) return 'button';
  const cls = classes(el)[0];
  if (cls && FRIENDLY[cls]) return camel(FRIENDLY[cls]);
  if (cls && !/^(reveal|glint|magnetic|is-|has-)/.test(cls)) {
    const part = cls.includes('__') ? cls.split('__').pop() : cls.split('--')[0];
    const r = camel(part.replace(/[^a-zA-Z0-9-]/g, ''));
    if (r && r.length > 1 && r !== 'i' && r !== 'n') return r;
  }
  return TAG_ROLE[el.name.toLowerCase()] || el.name.toLowerCase();
}
const camel = (s) => s.replace(/[-\s]+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase()).replace(/^[A-Z]/, (c) => c.toLowerCase());
export const humanize = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[-_.]+/g, ' ').replace(/^./, (c) => c.toUpperCase());

const ATTR_ROLE = { href: 'link', 'data-count': 'number', 'data-suffix': 'suffix', 'data-cap': 'caption', 'data-url': 'addressBar' };
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function attrRole(el, name) {
  const plain = camel(name.replace(/^(data|aria)-/, ''));
  if (el.name.toLowerCase() === 'img') return name === 'src' ? 'image' : name === 'alt' ? 'imageAlt' : `image${cap(plain)}`;
  const base = roleOf(el);
  if (name === 'href' && base === 'link') return 'linkAddress';
  return `${base}${cap(ATTR_ROLE[name] || plain)}`;
}

/* A field collector. Keys are "<section>.<role>" (numbered when repeated)
   at page level, or just "<role>" inside a list item. */
export class Scope {
  constructor(section = null) {
    this.section = section;
    this.fields = [];
    this.counts = new Map();
  }
  key(role) {
    const base = this.section ? `${this.section.id}.${role}` : role;
    const n = (this.counts.get(base) || 0) + 1;
    this.counts.set(base, n);
    return { key: n === 1 ? base : `${base}${n}`, n };
  }
  add(role, kind, value, extra = {}) {
    const { key, n } = this.key(role);
    const field = { key, kind, label: humanize(role) + (n > 1 ? ` ${n}` : ''), ...extra };
    if (this.section) field.section = this.section.label;
    if (value !== undefined) field.default = value;
    this.fields.push(field);
    return key;
  }
}

/* ----------------------------------------------- list (run) detection */

/* Shape of an element for repeat detection: tag, classes and child shapes.
   Text content, attributes and the drawing inside an <svg> are ignored —
   those are what varies between items. */
function signature(el, relaxRoot = false) {
  const tag = el.name.toLowerCase();
  // the drawing varies, but a classed svg (icon-sun vs icon-moon) is a different thing
  if (tag === 'svg') return `svg.${classes(el).join('.')}`;
  const parts = kids(el).map((c) => (c.type === 'text' ? (/[^ \t\n\r\f]/.test(c.data) ? '#t' : '') : isEl(c) ? signature(c) : '')).filter(Boolean);
  return `${tag}${relaxRoot ? '' : `.${classes(el).join('.')}`}[${parts.join(',')}]`;
}

/* Runs of ≥ 2 consecutive sibling elements with the same shape. */
function findRuns(nodes) {
  const runs = [];
  let cur = null;
  const close = () => { if (cur && cur.items.length >= 2) runs.push(cur); cur = null; };
  nodes.forEach((n, idx) => {
    if (n.type === 'comment' || isWs(n)) return;
    if (!isEl(n) || n.name === 'br' || n.name === 'script' || RAW_TAGS.has(n.name)) { close(); return; }
    const sig = signature(n);
    if (cur && cur.sig === sig) { cur.items.push(n); cur.end = idx; return; }
    close();
    cur = { sig, items: [n], start: idx, end: idx };
  });
  close();
  return runs.filter((r) => /#t|img|svg/.test(r.sig)); // a list must carry content
}

/* Element paths relative to an item root: "/0/2" for elements, "#k" for
   the k-th text child. The same walk drives analysis and emission. */
function pathIndex(root) {
  const map = new Map();
  (function go(el, p) {
    map.set(el, p);
    let e = 0, t = 0;
    for (const c of kids(el)) {
      if (c.type === 'text') map.set(c, `${p}#${t++}`);
      else if (isEl(c)) go(c, `${p}/${e++}`);
    }
  })(root, '');
  return map;
}

/* Everything that could vary inside one list item. */
function analyzeItem(root, ctx, { relaxRoot = false } = {}) {
  const paths = pathIndex(root);
  const obs = new Map();
  const nested = new Map();
  const record = (p, v) => obs.set(p, v);

  (function visit(el) {
    const p = paths.get(el);
    for (const [name, raw] of Object.entries(el.attribs || {})) {
      if (name === 'class' && !relaxRoot) continue;
      if (name === 'style') { for (const [prop, v] of styleDecls(raw)) record(`${p}@style:${prop}`, v); continue; }
      // a boolean attribute (hidden) is present or not — record presence, not its empty value
      if (BOOL.has(name.toLowerCase()) && (raw === '' || raw.toLowerCase() === name.toLowerCase())) { record(`${p}@${name}`, 'true'); continue; }
      record(`${p}@${name}`, attrValue(ctx, name, raw));
    }
    const kind = classify(el);
    if (kind === 'raw' || kind === 'counter') return;
    if (kind === 'svg') { record(`${p}#svg`, svgInner(el, ctx)); return; }
    if (kind === 'text' || kind === 'rich') {
      if (mirrorOf(el)) return;
      record(`${p}#block`, kind === 'text' ? blockText(el) : blockHtml(el, ctx));
      return;
    }
    const children = kids(el);
    const runs = findRuns(children);
    const inRun = new Set(runs.flatMap((r) => r.items));
    for (const r of runs) nested.set(`${p}#run${children.indexOf(r.items[0])}`, r.items);
    for (const c of children) {
      if (c.type === 'text' && /[^ \t\n\r\f]/.test(c.data)) record(paths.get(c), collapse(c.data).trim());
      else if (isEl(c) && !inRun.has(c)) visit(c);
    }
  })(root);
  return { obs, nested, paths };
}

function svgInner(el, ctx) {
  const k = kids(el);
  return k.length ? ctx.source.slice(k[0].startIndex, k.at(-1).endIndex + 1).trim() : '';
}

/* Index expressions a varying value can be explained by. */
const INDEX_FORMS = [
  { expr: (i) => `String(${i} + 1).padStart(2, "0")`, val: (i) => String(i + 1).padStart(2, '0') },
  { expr: (i) => `String(${i} + 1)`, val: (i) => String(i + 1) },
  { expr: (i) => `String(${i})`, val: (i) => String(i) },
];
function indexTemplate(values, iVar) {
  if (values.some((v) => typeof v !== 'string')) return null;
  if (values.every((v) => v === values[0])) return null;
  for (const f of INDEX_FORMS) {
    const tpls = values.map((v, i) => {
      const s = f.val(i);
      const at = v.indexOf(s);
      return at < 0 ? null : [v.slice(0, at), v.slice(at + s.length)];
    });
    if (tpls.every((t) => t && t[0] === tpls[0][0] && t[1] === tpls[0][1])) {
      const [pre, post] = tpls[0];
      return [pre && jsStr(pre), f.expr(iVar), post && jsStr(post)].filter(Boolean).join(' + ');
    }
  }
  return null;
}

/* For each varying path: literal (same everywhere), computed (follows the
   index), or a per-item field. */
function decide(analyses, iVar) {
  const paths = new Set(analyses.flatMap((a) => [...a.obs.keys()]));
  const out = new Map();
  for (const p of paths) {
    const values = analyses.map((a) => a.obs.get(p));
    const missing = values.some((v) => v === undefined);
    const same = !missing && values.every((v) => v === values[0]);
    const isAttr = p.includes('@');
    const name = isAttr ? p.split('@')[1] : null;

    if (!isAttr) {
      // text, rich, svg
      if (p.endsWith('#svg')) { out.set(p, same ? { mode: 'literal' } : { mode: 'field' }); continue; }
      const expr = missing ? null : indexTemplate(values, iVar);
      out.set(p, expr ? { mode: 'computed', expr } : { mode: 'field' });
      continue;
    }
    if (name === 'class') {
      // only fragment roots observe class; two values alternate by position
      const distinct = [...new Set(values)];
      out.set(p, same ? { mode: 'literal' }
        : distinct.length === 2 ? { mode: 'computed', expr: `${iVar} % 2 === 0 ? ${jsStr(values[0])} : ${jsStr(values.find((v) => v !== values[0]))}` }
          : { mode: 'field', advanced: true });
      continue;
    }
    if (missing) { out.set(p, { mode: 'field', optional: true, advanced: !CONTENT_ATTRS.has(name) }); continue; }
    if (same) { out.set(p, CONTENT_ATTRS.has(name) ? { mode: 'field' } : { mode: 'literal' }); continue; }
    const expr = indexTemplate(values, iVar);
    out.set(p, expr ? { mode: 'computed', expr } : { mode: 'field', advanced: !CONTENT_ATTRS.has(name) });
  }
  return out;
}
const CONTENT_ATTRS = new Set(['src', 'alt', 'href', 'data-count', 'data-suffix', 'data-cap', 'data-url']);

/* ------------------------------------------------------------- JSX */

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const NO_WS_PARENTS = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'colgroup', 'select', 'optgroup', 'datalist', 'html', 'head']);
const SVG_TEXT = new Set(['text', 'tspan', 'textPath', 'foreignObject']);
const ODD_SPACE = new RegExp(`[${[0xa0, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x200b, 0x2028, 0x2029, 0x202f, 0x205f, 0x3000, 0xfeff].map((c) => String.fromCharCode(c)).join('')}]`);
export const SPACE = { space: true };

/* See the converter's header: whitespace HTML never renders is dropped. */
export const BLOCK_CONTAINER = new Set([
  'div', 'section', 'header', 'footer', 'main', 'nav', 'aside', 'article', 'ul', 'ol', 'li', 'p',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'form', 'figure', 'figcaption', 'blockquote', 'dialog',
  'fieldset', 'dl', 'dt', 'dd', 'td', 'th', 'caption', 'button', 'body', 'address', 'details', 'summary', 'legend',
]);
const BLOCK_LEVEL = new Set([
  'section', 'header', 'footer', 'main', 'nav', 'aside', 'article', 'ul', 'ol', 'p', 'h1', 'h2', 'h3',
  'h4', 'h5', 'h6', 'form', 'figure', 'blockquote', 'dialog', 'table', 'dl', 'hr', 'fieldset',
  'template', 'noscript', 'script', 'style',
]);

function literalTextTokens(raw, ctx) {
  const t = collapse(raw);
  if (t === '') return [];
  if (t === ' ') return ctx.noWs ? [] : [SPACE];
  const core = t.trim();
  const safe = /[{}<>]|&[#a-zA-Z0-9]+;/.test(core) || ODD_SPACE.test(core[0]) || ODD_SPACE.test(core.at(-1));
  const out = [];
  if (t.startsWith(' ')) out.push(SPACE);
  out.push({ inline: safe ? `{${jsStr(core)}}` : core });
  if (t.endsWith(' ')) out.push(SPACE);
  return out;
}

export function commentLines(data, pad) {
  const lines = data.replace(/\*\//g, '* /').replace(/\r/g, '').split('\n');
  const strip = Math.min(...lines.slice(1).filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length), Infinity);
  const body = lines.map((l, i) => (i === 0 ? l.trim() : l.slice(Number.isFinite(strip) ? strip : 0).trimEnd()));
  while (body.length && !body.at(-1)) body.pop();
  if (body.length === 1) return [`${pad}{/* ${body[0]} */}`];
  return [`${pad}{/* ${body[0]}`, ...body.slice(1).map((l) => (l ? `${pad}   ${l}` : '')), `${pad}*/}`];
}

/* A content expression for a slot at `node`/`suffix`. Page level: a new
   field. Inside a list item: whatever decide() said for that path. */
function slotExpr(ctx, path, role, kind, value, extra = {}) {
  const cms = ctx.cms;
  const method = kind === 'rich' || kind === 'icon' ? 'h' : kind === 'text' ? 't' : 'a';
  if (!cms.item) {
    const key = cms.scope.add(role, kind, value, extra);
    return `${cms.acc}.${method}(${jsStr(key)})`;
  }
  const d = cms.item.decisions.get(path);
  if (!d || d.mode === 'literal') return null;
  if (d.mode === 'computed') return d.expr;
  const key = cms.scope.add(role, kind, undefined, { path, ...(d.advanced && { advanced: true }), ...(d.optional && { optional: true }), ...extra });
  return `${cms.acc}.${method}(${jsStr(key)})`;
}

function renderAttrs(el, ctx, extra = []) {
  const parts = [];
  const tag = el.name;
  const cms = ctx.cms && !ctx.literal ? ctx.cms : null;
  for (const [name, raw] of Object.entries(el.attribs || {})) {
    const low = name.toLowerCase();
    const jsx = jsxAttrName(name, tag);
    if (low === 'style') {
      const props = styleDecls(raw).map(([prop, v]) => {
        let expr = null;
        if (cms?.item) expr = slotExpr(ctx, `${cms.item.paths.get(el)}@style:${prop}`, `${roleOf(el)}${cap(camel(prop.replace(/^--/, '')))}`, 'attr', v);
        return `${objKey(styleKey(prop))}: ${expr ?? jsStr(v)}`;
      });
      parts.push(`style={{ ${props.join(', ')} }}`);
      continue;
    }
    const v = attrValue(ctx, name, raw);
    if (cms?.item && (low !== 'class' || cms.item.relaxRoot)) {
      const d = cms.item.decisions.get(`${cms.item.paths.get(el)}@${name}`);
      if (d && d.mode !== 'literal') {
        const expr = slotExpr(ctx, `${cms.item.paths.get(el)}@${name}`, attrRole(el, low), contentAttrKind(el, low) || 'attr', v);
        if (BOOL.has(low)) parts.push(`${jsx}={${expr} ? true : undefined}`);
        else parts.push(d.optional ? `${jsx}={${expr} || undefined}` : `${jsx}={${expr}}`);
        continue;
      }
    } else if (cms && !cms.item) {
      const kind = contentAttrKind(el, low);
      if (kind) {
        parts.push(`${jsx}={${slotExpr(ctx, '', attrRole(el, low), kind, v)}}`);
        continue;
      }
    }
    if (BOOL.has(low) && (raw === '' || raw.toLowerCase() === low)) { parts.push(jsx); continue; }
    parts.push(literalAttr(jsx, v));
  }
  if (cms?.item) {
    const p = cms.item.paths.get(el);
    for (const [path, d] of cms.item.decisions) {
      if (!path.startsWith(`${p}@`) || path.includes('@style:') || d.mode === 'literal') continue;
      const name = path.slice(p.length + 1);
      if (name.includes('/') || name.includes('#') || el.attribs?.[name] !== undefined || name === 'class') continue;
      const low = name.toLowerCase();
      const expr = slotExpr(ctx, path, attrRole(el, low), contentAttrKind(el, low) || 'attr', '');
      const jsx = jsxAttrName(name, tag);
      parts.push(BOOL.has(low) ? `${jsx}={${expr} ? true : undefined}` : `${jsx}={${expr} || undefined}`);
    }
  }
  return [...parts, ...extra];
}

/* Render sibling nodes as JSX lines (see BLOCK_* for whitespace rules). */
export function renderNodes(nodes, depth, ctx) {
  const pad = '  '.repeat(depth);
  const items = []; // SPACE | { inline } | { lines, comment } | { lines, tag }
  const cms = ctx.cms && !ctx.literal && !ctx.svg ? ctx.cms : null;
  const runs = cms ? findRuns(nodes) : [];
  const runAt = new Map(runs.map((r) => [r.start, r]));

  let lastComment = null;
  for (let idx = 0; idx < nodes.length; idx++) {
    const n = nodes[idx];
    if (n.type === 'comment') lastComment = n;
    if (cms && !cms.item && ctx.sectionize && isEl(n) && n.name !== 'script') {
      cms.scope.section = sectionFor(n, lastComment, ctx.usedSections);
      lastComment = null;
    }
    const run = runAt.get(idx);
    if (run) {
      const lines = emitRun(run, depth, ctx);
      if (lines) {
        items.push({ lines, tag: run.items[0].name.toLowerCase() });
        idx = run.end;
        continue;
      }
    }
    if (ctx.regions?.has(n)) {
      const r = ctx.regions.get(n);
      if (r) items.push({ lines: [`${pad}${r}`], tag: n.name.toLowerCase() });
      continue;
    }
    if (n.type === 'text') {
      if (cms && /[^ \t\n\r\f]/.test(n.data)) {
        const t = collapse(n.data);
        const expr = slotExpr(ctx, cms.item ? cms.item.paths.get(n) : '', `${roleOf(n.parent)}Text`, 'text', t.trim());
        if (t.startsWith(' ')) items.push(SPACE);
        items.push({ inline: expr ? `{${expr}}` : literalTextTokens(t.trim(), ctx)[0]?.inline ?? '' });
        if (t.endsWith(' ')) items.push(SPACE);
      } else items.push(...literalTextTokens(n.data, ctx));
    } else if (n.type === 'comment') {
      if (ctx.comments !== false) items.push({ lines: commentLines(n.data, pad), comment: true });
    } else if (isEl(n)) {
      const lines = renderElement(n, depth, ctx);
      items.push(lines.length ? { lines, tag: n.name.toLowerCase(), comment: n.name === 'script' } : { lines: [], comment: true });
    }
  }

  const blockParent = ctx.topLevel || BLOCK_CONTAINER.has(ctx.parent);
  const content = (it) => it !== SPACE && !it.comment;
  const neighbour = (i, step) => { for (let j = i + step; j >= 0 && j < items.length; j += step) if (content(items[j])) return items[j]; return null; };
  const kept = items.filter((it, i) => {
    if (it !== SPACE) return true;
    if (ctx.noWs) return false;
    const prev = neighbour(i, -1), next = neighbour(i, 1);
    if (blockParent && (!prev || !next)) return false;
    return !(prev && next && BLOCK_LEVEL.has(prev.tag) && BLOCK_LEVEL.has(next.tag));
  });
  items.length = 0;
  for (const it of kept) {
    if (it === SPACE && items.length) {
      const last = [...items].reverse().find((x) => !x.comment);
      if (last === SPACE) continue;
    }
    items.push(it);
  }

  const out = [];
  for (const it of items) {
    if (it === SPACE) {
      if (out.length) out[out.length - 1] += '{" "}';
      else out.push(`${pad}{" "}`);
    } else if (it.inline) out.push(pad + it.inline);
    else out.push(...it.lines);
  }
  return out;
}

/* A repeated group → {c.l("key").map(...)}; the field's default is the
   list of every item's values. Returns null when nothing in it varies. */
function emitRun(run, depth, ctx, opts = {}) {
  const cms = ctx.cms;
  const level = (cms.item?.level || 0) + 1;
  const itVar = level === 1 ? 'it' : `it${level}`;
  const iVar = level === 1 ? 'i' : `i${level}`;
  const relax = opts.relaxRoot || false;
  const analyses = run.items.map((el) => analyzeItem(el, ctx, { relaxRoot: relax }));
  const decisions = decide(analyses, iVar);
  if (![...decisions.values()].some((d) => d.mode === 'field' || d.mode === 'computed')) return null;

  const scope = new Scope(null);
  const first = run.items[0];
  const itemCtx = {
    ...ctx,
    topLevel: false,
    cms: { scope, acc: itVar, item: { decisions, paths: analyses[0].paths, level, iVar, analyses, relaxRoot: relax ? first : null } },
  };
  const pad = '  '.repeat(depth);
  const inner = renderElement(first, depth + 2, itemCtx);

  // Separator between items: kept unless both sides are block-level boxes.
  const between = run.items.length > 1 ? betweenNodes(run.items[0], run.items[1]) : [];
  const sep = between.some((n) => n.type === 'text') && !BLOCK_LEVEL.has(first.name.toLowerCase());

  const itemLabel = humanize(roleOf(first));
  const defaults = analyses.map((a) => itemValues(a, scope.fields, ctx));
  if (opts.fragment) return { inner, fields: scope.fields, defaults, itVar, iVar };

  // At page level the list's default is every item's values; inside another
  // list it is filled per outer item from the path (see itemValues).
  const role = `${camel(roleOf(first))}List`;
  const key = cms.item
    ? cms.scope.add(role, 'list', undefined, { path: `${cms.item.paths.get(first.parent)}#run${kids(first.parent).indexOf(first)}`, itemLabel, item: scope.fields })
    : cms.scope.add(role, 'list', defaults, { itemLabel, item: scope.fields });
  return [
    `${pad}{${cms.acc}.l(${jsStr(key)}).map((${itVar}, ${iVar}) => (`,
    `${pad}  <Fragment key={${iVar}}>`,
    ...(sep ? [`${pad}    {${iVar} > 0 && " "}`] : []),
    ...inner,
    `${pad}  </Fragment>`,
    `${pad}))}`,
  ];
}

function betweenNodes(a, b) {
  const sib = kids(a.parent);
  return sib.slice(sib.indexOf(a) + 1, sib.indexOf(b));
}

/* One item's values for the fields its list declared (nested lists too). */
function itemValues(analysis, fields, ctx) {
  const out = {};
  for (const f of fields) {
    if (f.kind === 'list') {
      const items = analysis.nested.get(f.path) || [];
      out[f.key] = items.map((el) => itemValues(analyzeItem(el, ctx), f.item, ctx));
    } else {
      const v = analysis.obs.get(f.path);
      out[f.key] = v === undefined ? '' : v;
    }
  }
  return out;
}

export function renderElement(el, depth, ctx) {
  const pad = '  '.repeat(depth);
  const tag = el.name;
  const low = tag.toLowerCase();

  if (low === 'script') {
    const type = (el.attribs.type || '').toLowerCase();
    const code = kids(el).map((c) => c.data).join('');
    if (type === 'application/ld+json') {
      return [`${pad}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ${jsStr(JSON.stringify(JSON.parse(code)))} }} />`];
    }
    if (el.attribs.src) return [];
    ctx.scripts.push(code.replace(/document\.currentScript\.parentNode|document\.currentScript\.parentElement/g,
      `document.querySelector(${jsStr(ctx.selectorFor(el.parent))})`));
    return [`${pad}{/* inline script moved to src/lib/runtime/pages/${ctx.slug}-${ctx.scripts.length}.js */}`];
  }

  if (low === 'template' || low === 'noscript' || low === 'style') {
    const inner = kids(el).length ? ctx.source.slice(kids(el)[0].startIndex, kids(el).at(-1).endIndex + 1) : '';
    const html = low === 'style' ? inner : ctx.rewriteRawHtml(inner);
    const attrs = renderAttrs(el, { ...ctx, literal: true }, [`dangerouslySetInnerHTML={{ __html: ${jsStr(html)} }}`]);
    return [`${pad}<${tag} ${attrs.join(' ')} />`];
  }

  const cms = ctx.cms && !ctx.literal && !ctx.svg ? ctx.cms : null;
  const kind = classify(el);

  // An <svg> that differs between list items carries its drawing as a field.
  if (cms?.item && kind === 'svg') {
    const expr = slotExpr(ctx, `${cms.item.paths.get(el)}#svg`, 'icon', 'icon', undefined);
    if (expr) {
      const attrs = renderAttrs(el, ctx, [`dangerouslySetInnerHTML={{ __html: ${expr} }}`]);
      return [`${pad}<${tag} ${attrs.join(' ')} />`];
    }
  }

  let extra = ctx.attrHook ? ctx.attrHook(el) : [];
  let children = kids(el);
  if (low === 'textarea') {
    const val = children.map((c) => c.data || '').join('');
    if (val) extra = [...extra, `defaultValue={${jsStr(val)}}`];
    children = [];
  }

  // Text and rich blocks: the whole content is one field.
  if (cms && (kind === 'text' || kind === 'rich')) {
    const mirror = mirrorOf(el);
    const role = roleOf(el);
    let expr;
    if (mirror && ctx.lastBlock?.el === mirror) expr = ctx.lastBlock.expr;
    else {
      expr = kind === 'text'
        ? slotExpr(ctx, `${cms.item ? cms.item.paths.get(el) : ''}#block`, role, 'text', blockText(el))
        : slotExpr(ctx, `${cms.item ? cms.item.paths.get(el) : ''}#block`, role, 'rich', blockHtml(el, ctx));
    }
    ctx.lastBlock = { el, expr };
    if (expr) {
      const attrs = renderAttrs(el, ctx, kind === 'rich' ? [...extra, `dangerouslySetInnerHTML={{ __html: ${expr} }}`] : extra);
      const open = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
      if (kind === 'rich') return [`${pad}${open} />`];
      const t = collapse(textOf(el));
      const inline = BLOCK_CONTAINER.has(low);
      const lead = !inline && t.startsWith(' ') ? '{" "}' : '';
      const trail = !inline && t.endsWith(' ') ? '{" "}' : '';
      return [`${pad}${open}>${lead}{${expr}}${trail}</${tag}>`];
    }
  }

  const literalHere = kind === 'raw' || kind === 'counter' || kind === 'svg';
  const attrs = renderAttrs(el, ctx, extra);
  const open = `<${tag}${attrs.length ? ' ' + attrs.join(' ') : ''}`;
  if (VOID.has(low) || !children.length) return [`${pad}${open} />`];

  const inSvg = ctx.svg ? !SVG_TEXT.has(tag) : low === 'svg';
  const childCtx = {
    ...ctx,
    topLevel: false,
    parent: low,
    svg: inSvg,
    noWs: inSvg || NO_WS_PARENTS.has(low),
    literal: ctx.literal || literalHere,
    sectionize: low === 'main',
  };
  const body = renderNodes(children, depth + 1, childCtx);
  ctx.lastBlock = childCtx.lastBlock;
  if (!body.length) return [`${pad}${open} />`];

  const allInline = children.every((c) => c.type === 'text');
  const joined = body.map((l) => l.trim()).join('');
  if (allInline && body.length <= 3 && (pad.length + open.length + joined.length) < 160) {
    return [`${pad}${open}>${joined}</${tag}>`];
  }
  return [`${pad}${open}>`, ...body, `${pad}</${tag}>`];
}

/* A set of sibling instances (e.g. the two product sections) as one
   reusable fragment: JSX for an item component + each instance's values. */
export function renderFragment(instances, depth, ctx) {
  const run = { items: instances, start: 0, end: 0 };
  const res = emitRun(run, depth, { ...ctx, cms: { scope: new Scope(null), acc: 'c', item: null } }, { relaxRoot: true, fragment: true });
  return res;
}

/* Sections for page-level fields: each top-level <section> (or other
   element) inside <main>, labelled by the design's "=== NAME ===" comment. */
export function sectionFor(el, prevComment, used) {
  const m = prevComment && /=+\s*([^=\n]+?)\s*=+/.exec(prevComment.data);
  const label = m ? humanize(m[1].toLowerCase()).replace(/\b(lms|seo|cta|faq|ui|ux|cv)\b/gi, (w) => w.toUpperCase()) : humanize(el.attribs?.id || el.name);
  let id = (el.attribs?.id || label).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
  while (used.has(id)) id += '-2';
  used.add(id);
  return { id, label };
}
