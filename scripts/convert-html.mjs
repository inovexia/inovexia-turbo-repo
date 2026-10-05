#!/usr/bin/env node
/* =========================================================
   HTML design → Next.js pages, templates and editable content

   Reads the static design in INW_Variation_1/Light and writes:

     apps/web/src/app/<route>/page.jsx     one per standalone page
     apps/web/src/templates/*.jsx          service / product / case-study /
                                           blog-article templates (+ fragments)
     apps/web/src/components/site/*.jsx    SiteTop, Header, Footer
     apps/web/src/lib/runtime/pages/*.js   each page's inline <script>
     apps/web/src/lib/runtime/registry.js  script group → those scripts
     packages/content/manifests/*.json     every editable field + its default
     packages/content/seed/entries.json    blogs, services, products, case
                                           studies as they are in the design
     apps/web/public/assets/img/**, apps/web/src/styles/site.css

   The markup is converted node for node (see scripts/convert/engine.mjs),
   so with no edits saved every page renders exactly as the design.

   Generated files start with an AUTO-GENERATED line. Delete that line to
   keep hand edits: the converter then leaves the file alone.

   Run:  pnpm convert:html
   ========================================================= */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parseDocument } from 'htmlparser2';
import {
  Scope, find, findAll, hasClass, humanize, isEl, jsStr, kids,
  renderElement, renderFragment, renderNodes, walk,
} from './convert/engine.mjs';
import { extractSeed } from './convert/seed.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'INW_Variation_1', 'Light');
const WEB = path.join(ROOT, 'apps', 'web');
const APP_DIR = path.join(WEB, 'src', 'app');
const TPL_DIR = path.join(WEB, 'src', 'templates');
const COMP_DIR = path.join(WEB, 'src', 'components', 'site');
const RT_DIR = path.join(WEB, 'src', 'lib', 'runtime');
const CONTENT = path.join(ROOT, 'packages', 'content');
const MARK = 'AUTO-GENERATED';

/* ------------------------------------------------------------- routes */

/* Design page name → URL. Renamed: product → /products, work →
   /case-studies, blog → /blogs. Single pages nest under a section:
   service-web-design → /service/web-design, work-tonezone →
   /case-study/tonezone, product-lms → /product/lms, blog-x → /blog/x.
   next.config.mjs redirects the old URLs — keep it in step. */
const RENAMED = { product: 'products', work: 'case-studies', blog: 'blogs' };
const SECTION = { service: 'service', work: 'case-study', product: 'product', blog: 'blog' };
const NESTED = /^(service|work|product|blog)-(.+)$/;
export function routeFor(name) {
  if (name === 'index') return '/';
  const m = NESTED.exec(name);
  if (m) return `/${SECTION[m[1]]}/${m[2]}`;
  return `/${RENAMED[name] || name}`;
}

/* "about.html#x" → "/about#x", "index.html" → "/", "assets/…" → "/assets/…" */
function rewriteUrl(v) {
  if (!v || /^(?:[a-z][a-z0-9+.-]*:|#|\/\/|\/)/i.test(v)) return v;
  if (v.startsWith('assets/')) return `/${v}`;
  const m = /^([\w-]+)\.html((?:[?#].*)?)$/.exec(v);
  if (m) return routeFor(m[1]) + m[2];
  return v;
}
function rewriteRawHtml(html) {
  return html
    .replace(/\b(src|href|poster)="([^"]*)"/g, (_, a, v) => `${a}="${rewriteUrl(v)}"`)
    .replace(/url\((['"]?)assets\//g, 'url($1/assets/');
}
function rewriteJs(code) {
  return code.replace(/(["'])([\w-]+)\.html(?=[#?"'])/g, (_, q, name) => `${q}${routeFor(name)}`);
}

/* A CSS selector for an element (inline scripts that used currentScript). */
function selectorFor(el) {
  const steps = [];
  for (let n = el; n && n.name !== 'body'; n = n.parent) {
    if (n.attribs?.id) { steps.unshift(`#${n.attribs.id}`); break; }
    const cls = (n.attribs?.class || '').trim().split(/\s+/).filter(Boolean).map((c) => `.${c}`).join('');
    const same = kids(n.parent).filter((s) => s.name === n.name);
    const nth = same.length > 1 ? `:nth-of-type(${same.indexOf(n) + 1})` : '';
    steps.unshift(`${n.name}${cls}${nth}`);
  }
  return steps.join(' > ');
}

/* --------------------------------------------------------------- what */

/* Standalone pages are everything except the single-item templates. */
const TEMPLATES = {
  'service-web-design': { type: 'service', label: 'Service page' },
  'product-lms': { type: 'product', label: 'Product page' },
  'work-tonezone': { type: 'case', label: 'Case study (ToneZone layout)' },
  'work-metrotruck': { type: 'case', label: 'Case study (Metro Truck layout)' },
  'work-accounting': { type: 'case', label: 'Case study (Accounting layout)' },
};
// The blog article page is a template for every post; its shared parts
// (recent-posts heading, CTA) are edited once, under Pages.
const BLOG_TEMPLATE_FROM = 'blog-seo-for-business';

const PAGE_TITLES = {
  index: 'Home', about: 'About Us', services: 'Services', product: 'Products', portfolio: 'Portfolio',
  work: 'Case Studies', blog: 'Blogs', contact: 'Contact Us', 'get-in-touch': 'Get in Touch',
  privacy: 'Privacy Policy', terms: 'Terms & Conditions', 'blog-article': 'Blog article (shared parts)',
};

/* List regions that collections fill. Each entry finds design elements and
   says what replaces them; extra matches are removed. */
const REGIONS = {
  index: [
    { find: (n) => hasClass(n, 'svcg--home'), jsx: '<HomeServiceCards />', imp: 'HomeServiceCards' },
    { find: (n) => n.attribs?.id === 'wkgrid', jsx: '<CaseStudyCards variant="home" />', imp: 'CaseStudyCards' },
    { find: (n) => hasClass(n, 'bx'), jsx: '<HomeInsights />', imp: 'HomeInsights' },
  ],
  services: [{ find: (n) => hasClass(n, 'svcx'), jsx: '<ServicesIndex />', imp: 'ServicesIndex' }],
  blog: [{ find: (n) => hasClass(n, 'bgrid'), jsx: '<BlogCards />', imp: 'BlogCards' }],
  work: [{ find: (n) => n.attribs?.id === 'wkgrid', jsx: '<CaseStudyCards variant="grid" />', imp: 'CaseStudyCards' }],
  product: [{ find: (n) => n.name === 'section' && hasClass(n, 'prod-sec'), jsx: '<ProductSections />', imp: 'ProductSections', fragment: 'product-section' }],
  'blog-article': [
    { find: (n) => n.name === 'section' && n.attribs?.id === 'top', jsx: '<BlogArticle post={post} />', imp: 'BlogArticle' },
    { find: (n) => hasClass(n, 'rsl__track'), jsx: '<RecentPosts current={post.slug} />', imp: 'RecentPosts' },
    // each post asks its own question in the closing box
    { find: (n) => n.name === 'h2' && n.parent && hasClass(n.parent, 'join'), jsx: '<h2>{post.fields.ctaTitle}</h2>', imp: null },
  ],
};

/* ------------------------------------------------------------- output */

const hash = (s) => crypto.createHash('md5').update(s).digest('hex').slice(0, 10);
const pascal = (s) => s.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const written = [];

function writeGenerated(file, content) {
  if (fs.existsSync(file)) {
    const first = fs.readFileSync(file, 'utf8').split('\n', 1)[0];
    if (!first.includes(MARK)) {
      console.log(`  kept (hand-edited): ${path.relative(ROOT, file)}`);
      return;
    }
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  written.push(file);
}
const writeJson = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
  written.push(file);
};
const banner = (srcRel) => `// ${MARK} from ${srcRel} by scripts/convert-html.mjs.\n// Delete this line to keep hand edits — the converter then leaves the file alone.\n`;
const rel = (file) => path.relative(ROOT, file).replace(/\\/g, '/');

/* --------------------------------------------------------------- head */

function readHead(doc) {
  const head = find(doc, (n) => n.name === 'head');
  const meta = {};
  for (const m of findAll(head, (n) => n.name === 'meta')) {
    const key = m.attribs.name || m.attribs.property;
    if (key) meta[key] = m.attribs.content;
  }
  const title = find(head, (n) => n.name === 'title');
  const canonical = find(head, (n) => n.name === 'link' && n.attribs.rel === 'canonical');
  return {
    title: title ? kids(title).map((c) => c.data).join('').trim() : '',
    meta,
    canonical: canonical?.attribs.href,
    ldjson: findAll(head, (n) => n.name === 'script' && (n.attribs.type || '') === 'application/ld+json'),
    noscript: find(head, (n) => n.name === 'noscript'),
  };
}

function metadataObject(h) {
  const m = h.meta;
  const md = { title: h.title, description: m.description };
  if (m.robots) md.robots = m.robots;
  if (h.canonical) md.alternates = { canonical: h.canonical };
  const og = {};
  if (m['og:title']) og.title = m['og:title'];
  if (m['og:description']) og.description = m['og:description'];
  if (m['og:type']) og.type = m['og:type'];
  if (m['og:url']) og.url = m['og:url'];
  if (m['og:site_name']) og.siteName = m['og:site_name'];
  if (m['og:image']) {
    og.images = [{
      url: m['og:image'],
      ...(m['og:image:width'] && { width: Number(m['og:image:width']) }),
      ...(m['og:image:height'] && { height: Number(m['og:image:height']) }),
      ...(m['og:image:alt'] && { alt: m['og:image:alt'] }),
    }];
  }
  if (Object.keys(og).length) md.openGraph = og;
  const tw = {};
  if (m['twitter:card']) tw.card = m['twitter:card'];
  if (m['twitter:title']) tw.title = m['twitter:title'];
  if (m['twitter:image']) tw.images = [m['twitter:image']];
  if (Object.keys(tw).length) md.twitter = tw;
  return md;
}

/* ------------------------------------------------------------- parsing */

function parse(file) {
  const source = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n'); // some pages are CRLF
  const doc = parseDocument(source, {
    lowerCaseTags: false,
    lowerCaseAttributeNames: false,
    recognizeSelfClosing: true,
    withStartIndices: true,
    withEndIndices: true,
    decodeEntities: true,
  });
  const body = find(doc, (n) => n.name === 'body');
  const header = find(body, (n) => n.name === 'header' && hasClass(n, 'header'));
  const footer = find(body, (n) => n.name === 'footer' && hasClass(n, 'footer'));
  const top = kids(body);
  const hi = top.indexOf(header);
  const fi = top.indexOf(footer);
  if (hi < 0 || fi < 0) throw new Error(`${path.basename(file)}: header/footer must be direct children of <body>`);
  return { file, source, doc, body, header, footer, before: top.slice(0, hi), middle: top.slice(hi + 1, fi), after: top.slice(fi + 1) };
}

function fingerprint(nodes, source) {
  return hash(nodes.filter((n) => n.type !== 'comment' && !(n.type === 'text' && !n.data.trim()))
    .map((n) => source.slice(n.startIndex, n.endIndex + 1)).join('\n'));
}

function headerCurrent(header) {
  const marked = findAll(header, (n) => n.name === 'a' && n.attribs['aria-current']);
  const hrefs = [...new Set(marked.map((a) => rewriteUrl(a.attribs.href)))];
  if (hrefs.length > 1) throw new Error(`header marks more than one page current: ${hrefs.join(', ')}`);
  return hrefs.length ? { href: hrefs[0], value: marked[0].attribs['aria-current'] } : null;
}

/* Site changes the design HTML does not carry, applied before conversion. */
const TWEAKS = [
  {
    // Single service pages: the closing CTA asks the visitor to discuss their
    // project, on a page that opens with this service already selected.
    // {slug} is filled in per service at render time (lib/cms accessor).
    match: (name) => name.startsWith('service-'),
    apply(doc, name) {
      const join = find(doc, (n) => hasClass(n, 'join'));
      const btn = join && find(join, (n) => n.name === 'a' && hasClass(n, 'btn--primary'));
      if (!btn) throw new Error(`${name}.html: no .join call-to-action button to retarget`);
      btn.attribs.href = 'discuss-your-project.html?service={slug}';
      const label = find(btn, (n) => n.name === 'span');
      label.children = [{ type: 'text', data: 'Discuss Your Project', parent: label }];
    },
  },
];

/* Mark region elements: the first match of each region renders its
   component, any further matches render nothing. */
function regionMap(doc, name) {
  const map = new Map();
  const fragments = [];
  for (const r of REGIONS[name] || []) {
    const els = findAll(doc, r.find);
    if (!els.length) throw new Error(`${name}: region for ${r.imp} not found`);
    els.forEach((el, i) => map.set(el, i === 0 ? r.jsx : null));
    if (r.fragment) fragments.push({ name: r.fragment, instances: els });
  }
  return { map, fragments };
}

/* ------------------------------------------------------------- render */

function baseCtx(parsed, slug, extra = {}) {
  return {
    source: parsed.source,
    slug,
    scripts: [],
    topLevel: true,
    noWs: true,
    rewriteUrl,
    rewriteRawHtml,
    selectorFor,
    usedSections: new Set(),
    ...extra,
  };
}

/* The JSX for a whole page body (between the site chrome) with its fields. */
function renderPageBody(parsed, name, slug, { regions }) {
  const head = readHead(parsed.doc);
  const scope = new Scope({ id: 'page', label: 'Page' });
  const ctx = baseCtx(parsed, slug, { cms: { scope, acc: 'c', item: null }, sectionize: true, regions });
  const lines = [];
  if (head.noscript) lines.push(...renderElement(head.noscript, 3, { ...ctx, cms: null }));
  for (const s of head.ldjson) lines.push(...renderElement(s, 3, { ...ctx, cms: null }));
  lines.push('      <SiteTop />');
  const cur = headerCurrent(parsed.header);
  lines.push(cur ? `      <Header current=${jsStr(cur.href)} currentValue=${jsStr(cur.value)} />` : '      <Header />');
  lines.push(...renderNodes(parsed.middle, 3, ctx));
  lines.push('      <Footer />');
  lines.push(...renderNodes(parsed.after, 3, ctx));
  return { head, lines, fields: scope.fields, scripts: ctx.scripts };
}

function writeScripts(slug, scripts, srcRel) {
  return scripts.map((code, i) => {
    const mod = `${slug}-${i + 1}`;
    const src = rewriteJs(code).replace(/^\n+|\s+$/g, '').split('\n');
    const indent = Math.min(...src.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    const body = src.map((l) => (l.trim() ? `  ${l.slice(indent)}` : '')).join('\n');
    writeGenerated(path.join(RT_DIR, 'pages', `${mod}.js`),
      `${banner(`${srcRel} (inline script #${i + 1})`)}export default function run() {\n${body}\n}\n`);
    return mod;
  });
}

const regionImports = (name) => [...new Set((REGIONS[name] || []).map((r) => r.imp).filter(Boolean))]
  .map((c) => `import ${c} from '@/components/cms/${c}';`).join('\n');

function buildFragments(parsed, fragments, slug) {
  const out = {};
  for (const f of fragments) {
    const ctx = baseCtx(parsed, slug);
    const res = renderFragment(f.instances, 1, ctx);
    const comp = f.name.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
    writeGenerated(path.join(TPL_DIR, 'fragments', `${f.name}.jsx`), `${banner(rel(parsed.file))}import { Fragment } from 'react';

/* One instance of a repeated page fragment. \`c\` holds this instance's
   content, \`i\` its position (some classes alternate by position). */
export default function ${comp}({ c: ${res.itVar}, i: ${res.iVar} }) {
  return (
${res.inner.join('\n')}
  );
}
`);
    out[f.name] = { fields: res.fields, instances: res.defaults };
  }
  return out;
}

function buildPage(parsed, name) {
  const slug = name === 'index' ? 'home' : name;
  const { map, fragments } = regionMap(parsed.doc, name);
  const frag = buildFragments(parsed, fragments, slug);
  const body = renderPageBody(parsed, name, slug, { regions: map });
  const srcRel = rel(parsed.file);
  const modules = writeScripts(slug, body.scripts, srcRel);
  const route = routeFor(name);
  const bodyClass = parsed.body.attribs.class || '';

  writeGenerated(route === '/' ? path.join(APP_DIR, 'page.jsx') : path.join(APP_DIR, route.slice(1), 'page.jsx'),
    `${banner(srcRel)}import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';
${regionImports(name)}

const META = ${JSON.stringify(metadataObject(body.head), null, 2)};

export async function generateMetadata() {
  return pageMetadata(${jsStr(name)}, META);
}

export default async function Page() {
  const c = await loadPage(${jsStr(name)});
  return (
    <>
      <BodyClass name=${jsStr(bodyClass)}${modules.length ? ` scripts=${jsStr(slug)}` : ''} />
${body.lines.join('\n')}
    </>
  );
}
`);
  return {
    manifest: { name, kind: 'page', title: PAGE_TITLES[name] || humanize(name), route, meta: metadataObject(body.head), fields: body.fields },
    modules: modules.length ? { [slug]: modules } : {},
    fragments: frag,
  };
}

/* A single-item template: the same JSX, but content comes from an entry. */
function buildTemplate(parsed, name, { label, type, kind = 'template', regionsName = null, props = '{ c }' }) {
  const slug = name;
  const { map } = regionMap(parsed.doc, regionsName || name);
  const body = renderPageBody(parsed, name, slug, { regions: map });
  const srcRel = rel(parsed.file);
  const modules = writeScripts(slug, body.scripts, srcRel);
  const comp = `${pascal(name)}Template`;
  writeGenerated(path.join(TPL_DIR, `${name}.jsx`), `${banner(srcRel)}import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
${regionImports(regionsName || name)}

export const META = ${JSON.stringify(metadataObject(body.head), null, 2)};

export default function ${comp}(${props}) {
  return (
    <>
      <BodyClass name=${jsStr(parsed.body.attribs.class || '')}${modules.length ? ` scripts=${jsStr(slug)}` : ''} />
${body.lines.join('\n')}
    </>
  );
}
`);
  return {
    manifest: { name, kind, type, title: label, meta: metadataObject(body.head), fields: body.fields },
    modules: modules.length ? { [slug]: modules } : {},
  };
}

/* Header + footer: one "Site-wide" content entry. */
function buildChrome(parsed) {
  const srcRel = rel(parsed.file);
  const top = renderNodes(parsed.before, 3, baseCtx(parsed, 'chrome'));
  writeGenerated(path.join(COMP_DIR, 'SiteTop.jsx'), `${banner(srcRel)}/* Custom cursor + skip link: the same on every page, before the header. */
export default function SiteTop() {
  return (
    <>
${top.join('\n')}
    </>
  );
}
`);

  const scope = new Scope({ id: 'header', label: 'Header' });
  const stripped = stripCurrent(parsed.header);
  const headerCtx = baseCtx(parsed, 'chrome', {
    cms: { scope, acc: 'c', item: null },
    // aria-current is decided per page: every <a> asks ac(original href).
    attrHook: (el) => (el.name === 'a' && el.attribs.href ? [`{...ac(${jsStr(rewriteUrl(el.attribs.href))})}`] : []),
  });
  // A CMS-driven href (e.g. a nav list item) must ask ac() about its own
  // value, not the design's first item, or every link reads as current.
  const headerLines = renderElement(stripped, 2, headerCtx)
    .map((l) => l.replace(/href=\{([^{}]+)\}(.*)\{\.\.\.ac\([^)]*\)\}/, 'href={$1}$2{...ac($1)}'));
  writeGenerated(path.join(COMP_DIR, 'Header.jsx'), `${banner(srcRel)}import { Fragment } from 'react';
import { loadPage } from '@/lib/cms/content';

/* The site header. \`current\` is the route whose link carries aria-current —
   "page" on the page itself, "true" on its parent section (a case study
   marks Case Studies). Its text and links are the "Site-wide" content. */
export default async function Header({ current = null, currentValue = 'page' }) {
  const c = await loadPage('global');
  const ac = (href) => (href === current ? { 'aria-current': currentValue } : {});
  return (
${headerLines.join('\n')}
  );
}
`);

  scope.section = { id: 'footer', label: 'Footer' };
  const servicesList = find(parsed.footer, (n) => n.name === 'ul' && find(n.parent, (h) => h.name === 'h4' && kids(h).some((t) => t.type === 'text' && /Services/.test(t.data))));
  const footerCtx = baseCtx(parsed, 'chrome', { cms: { scope, acc: 'c', item: null }, regions: new Map([[servicesList, '<FooterServices />']]) });
  const footerLines = renderElement(parsed.footer, 2, footerCtx);
  writeGenerated(path.join(COMP_DIR, 'Footer.jsx'), `${banner(srcRel)}import { Fragment } from 'react';
import { loadPage } from '@/lib/cms/content';
import FooterServices from '@/components/cms/FooterServices';

/* The site footer. Its text and links are the "Site-wide" content; the
   Services column lists the services marked "show in footer". */
export default async function Footer() {
  const c = await loadPage('global');
  return (
${footerLines.join('\n')}
  );
}
`);
  return { name: 'global', kind: 'page', title: 'Site-wide (header & footer)', route: null, fields: scope.fields };
}

function stripCurrent(node) {
  walk(node, (n) => { if (n.attribs) delete n.attribs['aria-current']; });
  return node;
}

/* ------------------------------------------------------------ assets */

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, entry.name), b = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(a, b);
    else fs.copyFileSync(a, b);
  }
}

function copyAssets() {
  copyDir(path.join(SRC, 'assets', 'img'), path.join(WEB, 'public', 'assets', 'img'));
  const css = fs.readFileSync(path.join(SRC, 'assets', 'css', 'style.css'), 'utf8')
    .replace(/url\((['"]?)\.\.\/img\//g, 'url($1/assets/img/')
    .replace(/url\((['"]?)assets\//g, 'url($1/assets/');
  const dest = path.join(WEB, 'src', 'styles', 'site.css');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, `/* ${MARK} copy of INW_Variation_1/Light/assets/css/style.css (url() paths made absolute). Edit the design file and re-run pnpm convert:html. */\n${css}`);
}

/* -------------------------------------------------------------- main */

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.html')).sort();
console.log(`Converting ${files.length} design pages from ${rel(SRC)}`);
const parsed = Object.fromEntries(files.map((f) => [f.replace(/\.html$/, ''), parse(path.join(SRC, f))]));

// Shared chrome must really be shared — refuse to guess if a page differs.
const ref = parsed.index;
for (const [name, p] of Object.entries(parsed)) {
  if (fingerprint(p.before, p.source) !== fingerprint(ref.before, ref.source)) throw new Error(`${name}: markup before <header> differs from index.html`);
  if (fingerprint([p.footer], p.source) !== fingerprint([ref.footer], ref.source)) throw new Error(`${name}: <footer> differs from index.html`);
}
for (const [name, p] of Object.entries(parsed)) for (const t of TWEAKS) if (t.match(name)) t.apply(p.doc, name);

const manifests = { pages: {}, templates: {}, fragments: {} };
const scriptGroups = {};

for (const [name, p] of Object.entries(parsed)) {
  if (TEMPLATES[name] || name.startsWith('blog-')) continue;
  const res = buildPage(p, name);
  manifests.pages[name] = res.manifest;
  Object.assign(scriptGroups, res.modules);
  for (const [fname, f] of Object.entries(res.fragments)) manifests.fragments[fname] = f;
}
for (const [name, t] of Object.entries(TEMPLATES)) {
  const res = buildTemplate(parsed[name], name, t);
  manifests.templates[name] = res.manifest;
  Object.assign(scriptGroups, res.modules);
}
{
  const res = buildTemplate(parsed[BLOG_TEMPLATE_FROM], 'blog-article', {
    label: PAGE_TITLES['blog-article'], type: 'blog', kind: 'page', regionsName: 'blog-article', props: '{ c, post }',
  });
  manifests.pages['blog-article'] = { ...res.manifest, route: null };
  Object.assign(scriptGroups, res.modules);
}
manifests.pages.global = buildChrome(ref);

// ---- manifests (field definitions + defaults) for the admin, API and web,
// as one plain module so every bundler and Node import it the same way
const manifestOut = {
  pages: manifests.pages,
  templates: manifests.templates,
  // a fragment's default is its first design instance (a new product starts from it)
  fragments: Object.fromEntries(Object.entries(manifests.fragments).map(([n, f]) => [n, { name: n, fields: f.fields, default: f.instances[0] }])),
};
fs.mkdirSync(path.join(CONTENT, 'src'), { recursive: true });
fs.writeFileSync(path.join(CONTENT, 'src', 'manifests.generated.js'), `// ${MARK} by scripts/convert-html.mjs — every editable field and its design default.
const manifests = ${JSON.stringify(manifestOut, null, 1)};

export default manifests;
export const { pages, templates, fragments } = manifests;
`);
written.push('manifests.generated.js');

// ---- seed content (collections as they are in the design)
const seed = extractSeed({ parsed, manifests, rewriteUrl, routeFor });
fs.writeFileSync(path.join(CONTENT, 'src', 'seed.generated.js'), `// ${MARK} by scripts/convert-html.mjs — the design's blogs, services, products and case studies.
const entries = ${JSON.stringify(seed, null, 1)};

export default entries;
`);

// ---- template + script registries for the web app
fs.writeFileSync(path.join(TPL_DIR, 'index.js'), `// ${MARK} by scripts/convert-html.mjs — template name → component.
${Object.keys(manifests.templates).map((n) => `import ${pascal(n)}Template, { META as ${pascal(n)}Meta } from './${n}';`).join('\n')}

export const templates = {
${Object.keys(manifests.templates).map((n) => `  ${jsStr(n)}: { Component: ${pascal(n)}Template, meta: ${pascal(n)}Meta },`).join('\n')}
};
`);
const runName = (m) => m.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => `run${c.toUpperCase()}`);
const allMods = Object.values(scriptGroups).flat();
fs.writeFileSync(path.join(RT_DIR, 'registry.js'), `// ${MARK} by scripts/convert-html.mjs — script group (body data-scripts) → the inline scripts of that page.
${allMods.map((m) => `import ${runName(m)} from './pages/${m}';`).join('\n')}

export const pageScripts = {
${Object.entries(scriptGroups).map(([g, mods]) => `  ${jsStr(g)}: [${mods.map(runName).join(', ')}],`).join('\n')}
};
`);

copyAssets();
const count = (fields) => fields.reduce((n, f) => n + (f.kind === 'list' ? 1 + count(f.item) : 1), 0);
console.log(`  ${Object.keys(manifests.pages).length} pages, ${Object.keys(manifests.templates).length} templates, ${Object.keys(manifests.fragments).length} fragments`);
for (const group of ['pages', 'templates']) for (const [n, m] of Object.entries(manifests[group])) console.log(`    ${group}/${n}: ${count(m.fields)} fields`);
console.log(`  seed: ${seed.length} entries (${['blog', 'service', 'product', 'case'].map((t) => `${seed.filter((e) => e.type === t).length} ${t}`).join(', ')})`);
console.log(`  wrote ${written.length} files. Done.`);
