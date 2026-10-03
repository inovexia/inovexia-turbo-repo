// AUTO-GENERATED from INW_Variation_1/Light/service-web-design.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';


export const META = {
  "title": "Professional Web Design Services for Businesses Worldwide | Inovexia",
  "description": "Looking for professional web design services? We create responsive, SEO-friendly, and conversion-focused websites for businesses worldwide.",
  "robots": "index, follow",
  "openGraph": {
    "title": "Professional Web Design Services for Businesses Worldwide | Inovexia",
    "description": "Looking for professional web design services? We create responsive, SEO-friendly, and conversion-focused websites for businesses worldwide.",
    "type": "website"
  }
};

export default function ServiceWebDesignTemplate({ c }) {
  return (
    <>
      <BodyClass name="page-service" scripts="service-web-design" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .tl__fill { height: 100% !important; }\n  .faq__a { grid-template-rows: 1fr !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/services" currentValue="true" />
      <main id="main">
        {/* ============ BANNER ============ */}
        <section className="phero" id="top">
          <div className="hero__grid" aria-hidden="true" />{" "}
          <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{" "}
          <div className="container">
            <div className="phero__in phero__in--wide">
              <nav className="crumb reveal" aria-label="Breadcrumb" dangerouslySetInnerHTML={{ __html: c.h("top.crumb") }} />
              <h1 className="phero__title phero__title--sm" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("top.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("top.titleLine2")}</span>
                </span>
              </h1>
              <p className="phero__lead reveal" data-delay="2">{c.t("top.lead")}</p>
              {/* Same shape as the Services banner: what you get at a glance, then one
                 action. The technologies sit under the process, where they are used.
              */}
              <ul className="lmeta" data-stagger="" style={{ "--d0": "3" }}>
                {c.l("top.itemList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li className="reveal reveal--zoom">
                      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />{" "}
                      {it.t("itemText")}{" "}
                      <b>{it.t("bold")}</b>
                    </li>
                  </Fragment>
                ))}
              </ul>{" "}
              <div className="phero__actions reveal" data-delay="4">
                <a href={c.a("top.buttonLink")} className="btn btn--primary magnetic">
                  {" "}
                  <span>{c.t("top.buttonText")}</span>{" "}
                  <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>{" "}
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* ============ PROBLEM / SOLUTION ============
           Seven complaints against seven answers, side by side and sharing a
           hairline. Read as two sections they would have asked the reader to hold
           the first list in their head while reading the second.
        */}
        <section className="section section--product" id="approach">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("approach.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("approach.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("approach.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="cmp reveal reveal--zoom">
              <div className="cmp__col cmp__col--x">
                <div className="cmp__head">
                  <span className="cmp__ico" aria-hidden="true">
                    {" "}
                    <svg viewBox="0 0 24 24" width="19" height="19">
                      <path d="M12 8v5.4M12 16.6h.01" />
                      <path d="M10.3 3.9 2.5 17.4a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    </svg>{" "}
                  </span>{" "}
                  <h3>{c.t("approach.subheading")}</h3>
                </div>{" "}
                <p>{c.t("approach.text")}</p>
                <ul className="cmp__list">
                  {c.l("approach.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li>
                        <span className="xmark" aria-hidden="true" />
                        {it.t("itemText")}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>{" "}
              <div className="cmp__col cmp__col--ok">
                <div className="cmp__head">
                  <span className="cmp__ico" aria-hidden="true">
                    {" "}
                    <svg viewBox="0 0 24 24" width="19" height="19">
                      <path d="M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z" />
                      <path d="m9 12 2.2 2.2L15.4 10" />
                    </svg>{" "}
                  </span>{" "}
                  <h3>{c.t("approach.subheading2")}</h3>
                </div>{" "}
                <p>{c.t("approach.text2")}</p>
                <ul className="cmp__list">
                  {c.l("approach.itemList2").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li>
                        <span className="tick" aria-hidden="true" />
                        {it.t("itemText")}
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* ============ BENEFITS ============ */}
        <section className="section" id="benefits">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("benefits.eyebrow")}</span>{" "}
              <h2 className="section__title uline" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("benefits.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("benefits.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="wgrid wgrid--3 reveal">
              {c.l("benefits.cardList").map((it, i) => (
                <Fragment key={i}>
                  <article className="wcell glint" style={{ "--d": String(i) }}>
                    <span className="wcell__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{" "}
                    <span className="wcell__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="21" height="21" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                    </span>{" "}
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text")}</p>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ PROCESS ============
           .tl is the About page's story timeline; runTimeline fills its rail on
           scroll, guarded on #tl. The outlined numeral carries a step number here
           instead of a year, which is the job it was always doing.
        */}
        <section className="section section--product" id="process">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("process.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("process.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("process.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="tl" id="tl" data-stagger="">
              <div className="tl__rail" aria-hidden="true">
                <span className="tl__fill" id="tlFill" />
              </div>{" "}
              {c.l("process.stepList").map((it, i) => (
                <Fragment key={i}>
                  <article className="tl__item reveal reveal--left">
                    <span className="tl__dot" aria-hidden="true" />{" "}
                    <div className="tl__card glint">
                      <span className="tl__year tl__year--step" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{" "}
                      <div className="tl__body">
                        <h3>
                          <span className="sr-only">{"Step " + String(i + 1) + " —"}{" "}</span>
                          {it.t("subheadingText")}
                        </h3>
                        <p>{it.t("text")}</p>
                      </div>
                    </div>
                  </article>
                </Fragment>
              ))}
            </div>{" "}
            <div className="stack-wrap">
              <p className="wwa__label reveal">{c.t("process.label")}</p>
              <ul className="stack" data-stagger="" style={{ "--d0": "1" }}>
                {c.l("process.itemList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li className="reveal reveal--zoom">{it.t("item")}</li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* ============ WHY US ============ */}
        <section className="section" id="why">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("why.eyebrow")}</span>{" "}
              <h2 className="section__title uline" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("why.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("why.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="wgrid wgrid--3 reveal">
              {c.l("why.cardList").map((it, i) => (
                <Fragment key={i}>
                  <article className="wcell glint" style={{ "--d": String(i) }}>
                    <span className="wcell__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{" "}
                    <span className="wcell__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="21" height="21" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                    </span>{" "}
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text")}</p>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ FAQ ============
           .faq is the Contact page's accordion; the handler is guarded on
           .faq__item, so it works here with no change.
        */}
        <section className="section section--product" id="faq">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("faq.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("faq.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("faq.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="faq" data-stagger="">
              {c.l("faq.questionList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <div className="faq__item reveal">
                    <h3 className="faq__h">
                      <button className="faq__q" type="button" aria-expanded="false" aria-controls={"sv-a" + String(i + 1)}>
                        <span>{it.t("text")}</span>{" "}
                        <span className="faq__ico" aria-hidden="true" />
                      </button>
                    </h3>{" "}
                    <div className="faq__a" id={"sv-a" + String(i + 1)} role="region" aria-label={it.a("blockLabel")}>
                      <div className="faq__a-in">
                        <p>{it.t("text2")}</p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ RELATED CASE STUDIES ============
           Website design work, one large slide at a time: arrows, dots, swipe
           and keys; steps on its own while on screen, pauses on hover.
        */}
        <section className="section" id="case-studies">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("case-studies.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i" dangerouslySetInnerHTML={{ __html: c.h("case-studies.titleLine") }} />
                  </span>
                </h2>
              </div>{" "}
              <a href={c.a("case-studies.buttonLink")} className="btn btn--text reveal" data-delay="2">{c.t("case-studies.button")}</a>
            </div>{" "}
            <div className="rcs reveal" id="rcs" role="group" aria-roledescription="carousel" aria-label="Related case studies">
              <div className="rcs__viewport">
                <div className="rcs__track">
                  {c.l("case-studies.slideList").map((it, i) => (
                    <Fragment key={i}>
                      <article className="rcs__slide" role="group" aria-roledescription="slide" aria-label={String(i + 1) + " of 2"} aria-hidden={it.a("slideHidden") || undefined}>
                        <a className="rcs__media" href={it.a("mediaLink")} tabIndex="-1" aria-hidden="true">
                          {" "}
                          <span className="rcs__glow" />{" "}
                          <span className="rcs__win">
                            {" "}
                            <span className="pd__bar">
                              <i />
                              <i />
                              <i />
                              <span>{it.t("text")}</span>
                            </span>{" "}
                            <img src={it.a("image")} alt={it.a("imageAlt")} width={it.a("imageWidth")} height={it.a("imageHeight")} loading="lazy" decoding="async" />{" "}
                          </span>{" "}
                        </a>{" "}
                        <div className="rcs__body">
                          <span className="rcs__n" dangerouslySetInnerHTML={{ __html: "<b>" + String(i + 1).padStart(2, "0") + "</b> / 02" }} />{" "}
                          <ul className="rcs__tags">
                            {it.l("itemList").map((it2, i2) => (
                              <Fragment key={i2}>
                                <li>{it2.t("item")}</li>
                              </Fragment>
                            ))}
                          </ul>
                          <h3 dangerouslySetInnerHTML={{ __html: it.h("subheading") }} />
                          <p>{it.t("text2")}</p>
                          <ul className="rcs__pts">
                            {it.l("itemList2").map((it2, i2) => (
                              <Fragment key={i2}>
                                <li>
                                  <span className="tick" aria-hidden="true" />
                                  {it2.t("itemText")}
                                </li>
                              </Fragment>
                            ))}
                          </ul>{" "}
                          <a href={it.a("buttonLink")} className="btn btn--primary rcs__cta" tabIndex={it.a("buttonTabindex") || undefined}>
                            <span>{it.t("buttonText")}</span>
                            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                              <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        </div>
                      </article>
                    </Fragment>
                  ))}
                </div>
              </div>{" "}
              <div className="rcs__nav">
                <button className="rcs__btn" type="button" data-step="-1" aria-label="Previous case study">
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="M12 4.5 6.5 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>{" "}
                <div className="rcs__dots">
                  <button type="button" data-go="0" aria-label="Show case study 1" aria-current="true" />
                  <button type="button" data-go="1" aria-label="Show case study 2" />
                </div>{" "}
                <button className="rcs__btn" type="button" data-step="1" aria-label="Next case study">
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="m8 4.5 5.5 5.5L8 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>{" "}
                <span className="rcs__prog" aria-hidden="true">
                  <i />
                </span>
              </div>
            </div>
            {/* inline script moved to src/lib/runtime/pages/service-web-design-1.js */}
          </div>
        </section>
        {/* ============ CTA ============ */}
        <section className="section" id="start">
          <div className="container">
            <div className="join reveal reveal--zoom">
              <div className="join__glow" aria-hidden="true" />{" "}
              <span className="eyebrow">{c.t("start.eyebrow")}</span>{" "}
              <h2>{c.t("start.heading")}</h2>
              <p>{c.t("start.text")}</p>{" "}
              <a href={c.a("start.buttonLink")} className="btn btn--primary magnetic">
                {" "}
                <span>{c.t("start.buttonText")}</span>{" "}
                <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>{" "}
              </a>
            </div>
          </div>
        </section>
      </main>
      {/* ============ FOOTER ============ */}
      <Footer />
      <button className="to-top" id="toTop" type="button" aria-label="Back to top">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </>
  );
}
