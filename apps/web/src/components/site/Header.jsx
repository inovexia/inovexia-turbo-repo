// AUTO-GENERATED from INW_Variation_1/Light/index.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import { loadPage } from '@/lib/cms/content';

/* The site header. `current` is the route whose link carries aria-current —
   "page" on the page itself, "true" on its parent section (a case study
   marks Case Studies). Its text and links are the "Site-wide" content. */
export default async function Header({ current = null, currentValue = 'page' }) {
  const c = await loadPage('global');
  const ac = (href) => (href === current ? { 'aria-current': currentValue } : {});
  return (
    <header className="header" id="header">
      <div className="container header__inner">
        <a href={c.a("header.logoLink")} className="logo" aria-label="Inovexia home" {...ac("/")}>
          {" "}
          <img className="logo__img logo__img--on-dark" src={c.a("header.image")} alt={c.a("header.imageAlt")} width="174" height="40" />{" "}
          <img className="logo__img logo__img--on-light" src={c.a("header.image2")} alt={c.a("header.imageAlt2")} width="174" height="40" />{" "}
        </a>{" "}
        <nav className="nav" id="nav" aria-label="Primary">
          <ul className="nav__list">
            {c.l("header.itemList").map((it, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <li>
                  <a href={it.a("linkAddress")} className="nav__link" {...ac("/services")}>
                    <span className="nl" dangerouslySetInnerHTML={{ __html: it.h("nl") }} />
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>{" "}
          <div className="nav__cta" dangerouslySetInnerHTML={{ __html: c.h("header.cta") }} />
        </nav>{" "}
        <div className="header__actions">
          <button className="icon-btn" id="themeToggle" type="button" aria-label="Switch colour theme">
            <svg className="icon-sun" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2v2.6M12 19.4V22M4.2 4.2l1.9 1.9M17.9 17.9l1.9 1.9M2 12h2.6M19.4 12H22M4.2 19.8l1.9-1.9M17.9 6.1l1.9-1.9" />
            </svg>{" "}
            <svg className="icon-moon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2z" />
            </svg>
          </button>{" "}
          <a href={c.a("header.buttonLink")} className="btn btn--primary btn--sm magnetic" {...ac("/get-in-touch")}>
            {" "}
            <span>{c.t("header.buttonText")}</span>{" "}
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
              <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>{" "}
          </a>{" "}
          <button className="burger" id="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nav">
            <span />
            <span />
          </button>
        </div>
      </div>{" "}
      <div className="header__progress" id="scrollProgress" />
    </header>
  );
}
