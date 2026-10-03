import { Fragment } from 'react';
import { pad2 } from '@/lib/cms/content';

/* A blog post's article (the design's blog article banner section): title,
   category + read time, cover, then its blocks — text sections, numbered
   points and figures. The first text section is the lead paragraph. */
export default function BlogArticle({ post }) {
  const f = post.fields;
  const cover = f.articleImage || {};
  const blocks = f.blocks || [];
  const leadIndex = blocks.findIndex((b) => b.type === 'text');
  return (
    <section className="phero" id="top">
      <div className="hero__grid" aria-hidden="true" />{" "}
      <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{" "}
      <div className="container">
        <article className="art">
          <nav className="crumb reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>{" "}
            <span aria-hidden="true">/</span>{" "}
            <a href="/blogs">Blog</a>{" "}
            <span aria-hidden="true">/</span>{" "}
            <span aria-current="page">{f.category}</span>
          </nav>
          <h1 className="phero__title phero__title--xs" data-mask="">
            <span className="m" style={{ '--i': '0' }}>
              <span className="m__i">{f.titleLine1}</span>
            </span>
            {f.titleLine2 && (
              <>
                {" "}
                <span className="m" style={{ '--i': '1' }}>
                  <span className="m__i grad">{f.titleLine2}</span>
                </span>
              </>
            )}
          </h1>
          <ul className="lmeta" data-stagger="" style={{ '--d0': '2' }}>
            <li className="reveal reveal--zoom">
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                <rect x="3.5" y="4.5" width="17" height="16" rx="2.4" />
                <path d="M3.5 9.4h17M8 3v3M16 3v3" />
              </svg>{" "}
              <b>{f.category}</b>
            </li>
            {f.readTime && (
              <>
                {" "}
                <li className="reveal reveal--zoom">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.4" />
                    <path d="M12 7.6V12l2.8 1.8" />
                  </svg>{" "}
                  <b>{f.readTime}</b>{" "}
                  read
                </li>
              </>
            )}
          </ul>
          {cover.src && (
            <figure className="art__fig art__hero reveal reveal--zoom" style={{ '--d': '3' }}>
              <span className="art__media">
                <img src={cover.src} alt={cover.alt || ''} width={cover.width || 400} height={cover.height || 250} loading="eager" decoding="async" />
              </span>
            </figure>
          )}
          {blocks.map((b, i) => (
            <Fragment key={i}>
              {" "}
              <Block block={b} lead={i === leadIndex} />
            </Fragment>
          ))}
        </article>
      </div>
    </section>
  );
}

function Block({ block: b, lead }) {
  if (b.type === 'points') {
    return (
      <div className="art__sec">
        {b.heading && <h2 className="reveal">{b.heading}</h2>}
        {(b.items || []).map((it, i) => (
          <Fragment key={i}>
            {(i > 0 || b.heading) && ' '}
            <div className="art__pt reveal">
              <span className="art__pt__n" aria-hidden="true">{pad2(i + 1)}</span>{" "}
              <h3>{it.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: it.html || '' }} />
            </div>
          </Fragment>
        ))}
      </div>
    );
  }
  if (b.type === 'figure') {
    const img = b.image || {};
    return (
      <figure className="art__fig reveal reveal--zoom">
        <span className="art__media">
          {img.src && <img src={img.src} alt={img.alt || ''} width={img.width || 880} height={img.height || 400} loading="lazy" decoding="async" />}
        </span>
        {b.caption && <>{" "}<figcaption>{b.caption}</figcaption></>}
      </figure>
    );
  }
  return (
    <div className="art__sec reveal">
      {b.heading && <h2>{b.heading}</h2>}
      <p className={lead ? 'art__lead' : undefined} style={{ marginTop: '18px' }} dangerouslySetInnerHTML={{ __html: b.html || '' }} />
    </div>
  );
}
