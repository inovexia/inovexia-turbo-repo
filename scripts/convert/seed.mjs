/* Seed content: the design's blogs, services, products and case studies as
   collection entries, so the database starts out exactly as the design.

   Entry shape (stored as-is by the API):
     { type, slug, template, title, published, sort,
       fields:  the collection's own fields (cards, listings, blog body…)
       page:    content for its single-page template, if it has one
       section: content for a per-item page fragment (product sections)
       seo:     { title, description } } */
import { find, findAll, hasClass, innerHtml, kids, svgMarkup, textContent } from './engine.mjs';
import { servicePageData } from './service-pages.mjs';

const slugify = (s) => s.toLowerCase().normalize('NFKD').replace(/[‐-―]/g, '-').replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Names as written in different places differ in hyphens and plurals
// ("E‑commerce" with a non-breaking hyphen, "SEO Service" vs "SEO Services").
const norm = (s) => s.normalize('NFKD').replace(/[‐-―]/g, '-').toLowerCase().trim().replace(/s$/, '');
const metaOf = (doc, name) => find(doc, (n) => n.name === 'meta' && (n.attribs.name === name || n.attribs.property === name))?.attribs.content || '';
const titleOf = (doc) => textContent(find(doc, (n) => n.name === 'title'));
const imgOf = (img, rewriteUrl) => (img ? {
  src: rewriteUrl(img.attribs.src),
  alt: img.attribs.alt || '',
  width: Number(img.attribs.width) || undefined,
  height: Number(img.attribs.height) || undefined,
} : null);

/* Field defaults → a data object (what the page renders with no edits). */
export const defaultsOf = (fields) => Object.fromEntries(fields.filter((f) => 'default' in f).map((f) => [f.key, f.default]));

export function extractSeed({ parsed, manifests, rewriteUrl }) {
  const ctx = { rewriteUrl, source: '' };
  const entries = [];

  /* ---------------------------------------------------------------- blogs */
  const blogIndex = parsed.blog.doc;
  const cards = findAll(blogIndex, (n) => n.name === 'article' && hasClass(n, 'bcard'));
  const homeBx = findAll(parsed.index.doc, (n) => n.name === 'a' && (hasClass(n, 'bx__feat') || hasClass(n, 'bx__item')));
  const blogFiles = Object.keys(parsed).filter((n) => n.startsWith('blog-'));
  // the recent-posts slider on each article describes its covers with its own alt text
  const recentAlt = {};
  for (const n of blogFiles) for (const a of findAll(parsed[n].doc, (x) => x.name === 'a' && hasClass(x, 'bcard__cov'))) {
    const img = find(a, (x) => x.name === 'img');
    if (img) recentAlt[a.attribs.href.replace(/.html$/, '')] = img.attribs.alt || '';
  }
  const cardFor = (name) => cards.find((c) => find(c, (n) => n.name === 'a' && n.attribs.href === `${name}.html`));
  const order = (name) => { const c = cardFor(name); return c ? cards.indexOf(c) : 99; };

  for (const name of blogFiles.sort((a, b) => order(a) - order(b))) {
    const p = parsed[name];
    ctx.source = p.source;
    const art = find(p.doc, (n) => n.name === 'article' && hasClass(n, 'art'));
    const lines = findAll(art, (n) => hasClass(n, 'm__i')).map(textContent);
    const meta = findAll(find(art, (n) => hasClass(n, 'lmeta')), (n) => n.name === 'li');
    const hero = find(art, (n) => hasClass(n, 'art__hero'));
    const blocks = [];
    for (const el of kids(art)) {
      if (el.type !== 'tag') continue;
      if (hasClass(el, 'art__sec')) {
        const heading = textContent(find(el, (n) => n.name === 'h2'));
        const points = findAll(el, (n) => hasClass(n, 'art__pt'));
        if (points.length) {
          blocks.push({
            type: 'points',
            heading,
            items: points.map((pt) => ({ title: textContent(find(pt, (n) => n.name === 'h3')), html: innerHtml(find(pt, (n) => n.name === 'p'), ctx) })),
          });
        } else {
          blocks.push({ type: 'text', heading, html: findAll(el, (n) => n.name === 'p').map((x) => innerHtml(x, ctx)).join('<br><br>') });
        }
      } else if (el.name === 'figure' && hasClass(el, 'art__fig') && !hasClass(el, 'art__hero')) {
        blocks.push({ type: 'figure', image: imgOf(find(el, (n) => n.name === 'img'), rewriteUrl), caption: textContent(find(el, (n) => n.name === 'figcaption')) });
      }
    }
    const card = cardFor(name);
    const bx = homeBx.find((a) => a.attribs.href === `${name}.html`);
    const time = bx && find(bx, (n) => n.name === 'time');
    entries.push({
      type: 'blog',
      slug: name.slice('blog-'.length),
      template: null,
      title: lines.join(' '),
      published: true,
      sort: entries.filter((e) => e.type === 'blog').length,
      fields: {
        titleLine1: lines[0] || '',
        titleLine2: lines[1] || '',
        category: textContent(find(meta[0], (n) => n.name === 'b')),
        readTime: textContent(find(meta[1], (n) => n.name === 'b')),
        date: time?.attribs.datetime || '',
        excerpt: card ? textContent(find(card, (n) => hasClass(n, 'bcard__x'))) : '',
        homeSummary: bx ? textContent(find(bx, (n) => hasClass(n, 'bx__sub'))) : '',
        cardImage: imgOf(find(card || {}, (n) => n.name === 'img'), rewriteUrl) || imgOf(find(hero, (n) => n.name === 'img'), rewriteUrl),
        articleImage: imgOf(find(hero, (n) => n.name === 'img'), rewriteUrl),
        recentAlt: recentAlt[name] ?? '',
        ctaTitle: textContent(find(find(p.doc, (n) => hasClass(n, 'join')), (n) => n.name === 'h2')),
        featured: Boolean(card && find(card, (n) => hasClass(n, 'bcard__flag'))),
        showOnHome: Boolean(bx),
        homeImage: bx ? imgOf(find(bx, (n) => n.name === 'img'), rewriteUrl) : null,
        blocks,
      },
      page: null,
      section: null,
      seo: { title: titleOf(p.doc), description: metaOf(p.doc, 'description') },
    });
  }

  /* ------------------------------------------------------------- services */
  const svc = parsed.services;
  ctx.source = svc.source;
  const srvs = findAll(svc.doc, (n) => n.name === 'article' && hasClass(n, 'srv'));
  const home = parsed.index;
  const homeCards = findAll(home.doc, (n) => hasClass(n, 'svcg__card'));
  const footerLinks = findAll(find(home.footer, (n) => n.name === 'ul' && find(n.parent, (h) => h.name === 'h4' && /Services/.test(textContent(h)))), (n) => n.name === 'a');
  const serviceTemplate = manifests.templates['service-web-design'];

  const indexLinks = findAll(find(svc.doc, (n) => hasClass(n, 'svcx__index')), (n) => n.name === 'a');
  srvs.forEach((el, i) => {
    const name = textContent(find(el, (n) => n.name === 'h3'));
    const anchor = el.attribs.id;
    const indexLink = indexLinks.find((a) => a.attribs.href === `#${anchor}`);
    // the index shows a shorter name than the card ("Shopify Theme Development")
    const indexLabel = indexLink ? textContent(indexLink).replace(/^\d+\s*/, '') : name;
    const homeCard = homeCards.find((c) => norm(textContent(find(c, (n) => n.name === 'h3'))) === norm(name));
    const footer = footerLinks.find((a) => a.attribs.href === `services.html#${anchor}`)
      || (anchor === 'svc-design' && footerLinks.find((a) => a.attribs.href === 'service-web-design.html'));
    // The design has one service page (Website Design); every other service
    // gets the same layout with its own starter copy (service-pages.mjs).
    const isDesignPage = anchor === 'svc-design';
    const slug = isDesignPage ? 'web-design' : slugify(name);
    const designDefaults = defaultsOf(serviceTemplate.fields);
    const page = isDesignPage ? designDefaults : servicePageData(slug, designDefaults);
    const hasPage = Boolean(page);
    ctx.source = svc.source;
    const icon = svgMarkup(find(el, (n) => n.name === 'svg'), ctx);
    let homeIcon = '';
    if (homeCard) { ctx.source = home.source; homeIcon = svgMarkup(find(homeCard, (n) => n.name === 'svg'), ctx); ctx.source = svc.source; }
    entries.push({
      type: 'service',
      slug,
      template: hasPage ? 'service-web-design' : null,
      title: name,
      published: true,
      sort: i,
      fields: {
        name,
        indexLabel: indexLabel === name ? '' : indexLabel,
        anchor,
        icon,
        description: innerHtml(find(el, (n) => n.name === 'p'), ctx),
        features: findAll(find(el, (n) => hasClass(n, 'srv__feat')), (n) => n.name === 'li').map((li) => textContent(li)),
        showOnHome: Boolean(homeCard),
        homeOrder: homeCard ? homeCards.indexOf(homeCard) : null,
        homeTitle: homeCard ? textContent(find(homeCard, (n) => n.name === 'h3')) : name,
        homeText: homeCard ? (ctx.source = home.source, innerHtml(find(homeCard, (n) => n.name === 'p'), ctx)) : '',
        homeIcon: homeIcon && homeIcon !== icon ? homeIcon : '',
        showInFooter: Boolean(footer),
        footerOrder: footer ? footerLinks.indexOf(footer) : null,
        footerLabel: footer ? textContent(footer) : name,
      },
      page,
      section: null,
      seo: isDesignPage
        ? { title: serviceTemplate.meta.title, description: serviceTemplate.meta.description }
        : { title: `${page ? `${page['top.titleLine']} ${page['top.titleLine2']}` : name} | Inovexia Software`, description: page ? page['top.lead'] : '' },
    });
  });

  /* ------------------------------------------------------------- products */
  const sections = manifests.fragments['product-section']?.instances || [];
  const productTemplate = manifests.templates['product-lms'];
  const prodDoc = parsed.product.doc;
  const prodSecs = findAll(prodDoc, (n) => n.name === 'section' && hasClass(n, 'prod-sec'));
  prodSecs.forEach((sec, i) => {
    const lines = findAll(sec, (n) => hasClass(n, 'm__i')).map(textContent);
    // Examiner (formerly the LMS) is the product with its own page.
    const isLms = sec.attribs.id === 'examiner';
    entries.push({
      type: 'product',
      slug: isLms ? 'examiner' : slugify(sec.attribs.id || lines.join(' ')),
      template: isLms ? 'product-lms' : null,
      title: lines.join(' '),
      published: true,
      sort: i,
      fields: { name: lines.join(' ') },
      page: isLms ? defaultsOf(productTemplate.fields) : null,
      section: sections[i] || null,
      seo: isLms
        ? { title: productTemplate.meta.title, description: productTemplate.meta.description }
        : { title: `${lines.join(' ')} — Inovexia Software`, description: '' },
    });
  });

  /* --------------------------------------------------------- case studies */
  const work = parsed.work;
  const items = findAll(find(work.doc, (n) => n.attribs?.id === 'wkgrid'), (n) => n.name === 'article' && hasClass(n, 'work__item'));
  const homeItems = findAll(find(home.doc, (n) => n.attribs?.id === 'wkgrid'), (n) => n.name === 'article' && hasClass(n, 'work__item'));
  const coverVariant = (el) => {
    const cover = find(el, (n) => hasClass(n, 'work__cover'));
    const m = /work__cover--(\d+)/.exec(cover?.attribs.class || '');
    return m ? Number(m[1]) : 1;
  };
  items.forEach((el, i) => {
    const title = textContent(find(el, (n) => n.name === 'h3'));
    const link = find(el, (n) => n.name === 'a' && hasClass(n, 'work__link'));
    const tpl = link && /^(work-[\w-]+)\.html$/.exec(link.attribs.href)?.[1];
    const homeItem = homeItems.find((h) => norm(textContent(find(h, (n) => n.name === 'h3'))) === norm(title));
    const t = tpl && manifests.templates[tpl];
    entries.push({
      type: 'case',
      slug: tpl ? tpl.slice('work-'.length) : slugify(title),
      template: tpl || null,
      title,
      published: true,
      sort: i,
      fields: {
        title,
        tags: findAll(el, (n) => hasClass(n, 'work__tag')).map(textContent),
        categories: (el.attribs['data-cat'] || '').split(/\s+/).filter(Boolean),
        image: imgOf(find(el, (n) => n.name === 'img'), rewriteUrl),
        coverStyle: coverVariant(el),
        comingSoonText: tpl ? '' : textContent(find(el, (n) => hasClass(n, 'work__more'))),
        linkLabel: link?.attribs['aria-label'] || '',
        homeCategories: homeItem ? (homeItem.attribs['data-cat'] || '').split(/\s+/).filter(Boolean) : [],
        showOnHome: Boolean(homeItem),
        homeOrder: homeItem ? homeItems.indexOf(homeItem) : null,
        homeImage: homeItem ? imgOf(find(homeItem, (n) => n.name === 'img'), rewriteUrl) : null,
        homeCoverStyle: homeItem ? coverVariant(homeItem) : null,
      },
      page: t ? defaultsOf(t.fields) : null,
      section: null,
      seo: t ? { title: t.meta.title, description: t.meta.description } : { title: `${title} — Case Study — Inovexia Software`, description: '' },
    });
  });

  return entries;
}
