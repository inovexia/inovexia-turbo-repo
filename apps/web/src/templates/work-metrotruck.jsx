// AUTO-GENERATED from INW_Variation_1/Light/work-metrotruck.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';


export const META = {
  "title": "Metro Truck Driving School Case Study — UI/UX Design | Inovexia",
  "description": "How we researched and designed a clearer website for Metro Truck Driving School: finding the right AZ or DZ course and applying online, from wireframes to a full design system.",
  "robots": "index, follow",
  "openGraph": {
    "title": "Metro Truck Driving School Case Study — UI/UX Design | Inovexia",
    "description": "How we researched and designed a clearer website for Metro Truck Driving School: finding the right AZ or DZ course and applying online, from wireframes to a full design system.",
    "type": "website"
  }
};

export default function WorkMetrotruckTemplate({ c }) {
  return (
    <>
      <BodyClass name="page-case" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .tl__fill { height: 100% !important; }\n  .faq__a { grid-template-rows: 1fr !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/case-studies" currentValue="true" />
      <main id="main">
        {/* =========================================================
           UI/UX CASE STUDY TEMPLATE — Metro Truck Driving School
           Location, timeline, prices, persona, research figures and results are
           realistic illustrative content. Confirm each against Metro Truck's real
           details and analytics before publishing.
           =========================================================
        */}
        {/* ============ BANNER + COVER ============ */}
        <section className="chero" id="top">
          <div className="hero__grid" aria-hidden="true" />{" "}
          <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{" "}
          <div className="container">
            <div className="chero__grid">
              <div className="chero__copy">
                <nav className="crumb reveal" aria-label="Breadcrumb" dangerouslySetInnerHTML={{ __html: c.h("top.crumb") }} />
                <h1 className="phero__title phero__title--xs" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("top.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("top.titleLine2")}</span>
                  </span>
                </h1>
                <p className="chero__lead reveal" data-delay="2">{c.t("top.lead")}</p>
                <ul className="lmeta" data-stagger="" style={{ "--d0": "3" }}>
                  {c.l("top.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li className="reveal reveal--zoom" dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                    </Fragment>
                  ))}
                </ul>{" "}
                <div className="phero__actions reveal" data-delay="5">
                  <a href={c.a("top.buttonLink")} className="btn btn--primary magnetic">
                    {" "}
                    <span>{c.t("top.buttonText")}</span>{" "}
                    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>{" "}
                  </a>
                </div>
              </div>{" "}
              {/* Final design: home page. */}
              <div className="shotwrap reveal reveal--right" data-delay="2">
                <div className="shotframe">
                  <div className="pd__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{c.t("top.text")}</span>
                  </div>{" "}
                  <img src={c.a("top.image")} alt={c.a("top.imageAlt")} width="1915" height="998" loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============ OVERVIEW ============ */}
        <section className="section section--product" id="overview">
          <div className="container">
            <div className="ovx">
              <div className="ovx__story">
                <span className="eyebrow reveal">{c.t("overview.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("overview.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("overview.titleLine2")}</span>
                  </span>
                </h2>
                <p className="ovx__lead reveal" data-delay="2">{c.t("overview.lead")}</p>
                <p className="ovx__sub reveal" data-delay="3">{c.t("overview.sub")}</p>
              </div>{" "}
              <aside className="ovx__facts reveal reveal--zoom" data-delay="2" aria-label="Project snapshot">
                <p className="ovx__label">{c.t("overview.label")}</p>
                <dl>
                  {c.l("overview.blockList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <div>
                        <dt>{it.t("term")}</dt>
                        <dd>{it.t("detail")}</dd>
                      </div>
                    </Fragment>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </section>
        {/* ============ CHALLENGE / SOLUTION ============ */}
        <section className="section" id="challenge">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("challenge.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("challenge.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("challenge.titleLine2")}</span>
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
                  <h3>{c.t("challenge.subheading")}</h3>
                </div>{" "}
                <p>{c.t("challenge.text")}</p>
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
                  <h3>{c.t("challenge.subheading2")}</h3>
                </div>{" "}
                <p>{c.t("challenge.text2")}</p>
              </div>
            </div>
          </div>
        </section>
        {/* ============ DESIGN PROCESS ============ */}
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
            <ol className="uxp" data-stagger="">
              {c.l("process.stepList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <li className="uxp__step reveal">
                    <span className="uxp__ico">
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                    </span>
                    <span className="uxp__n">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text")}</p>
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        </section>
        {/* ============ RESEARCH (sample content) ============ */}
        <section className="section" id="research">
          <div className="container">
            {/* Persona and insights written from a typical driving-school project: confirm against the real research. */}
            <div className="section__head section__head--left">
              <div>
                <span className="eyebrow reveal">{c.t("research.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("research.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("research.titleLine2")}</span>
                  </span>
                </h2>
              </div>
            </div>{" "}
            <div className="uxr">
              <article className="uxr__persona reveal reveal--left">
                <div className="uxr__who">
                  <span className="uxr__avatar" aria-hidden="true">{c.t("research.avatar")}</span>{" "}
                  <div>
                    <span className="uxr__k">{c.t("research.text")}</span>
                    <h3>{c.t("research.subheading")}</h3>
                    <p>{c.t("research.text2")}</p>
                  </div>
                </div>{" "}
                <div className="uxr__cols">
                  {c.l("research.blockList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <div>
                        <h4>{it.t("subheading")}</h4>
                        <ul>
                          {it.l("itemList").map((it2, i2) => (
                            <Fragment key={i2}>
                              <li>{it2.t("item")}</li>
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                    </Fragment>
                  ))}
                </div>{" "}
                <blockquote className="uxr__quote">{c.t("research.quote")}</blockquote>
              </article>{" "}
              <div className="uxr__insights" data-stagger="">
                {c.l("research.cardList").map((it, i) => (
                  <Fragment key={i}>
                    <article className="uxr__card reveal">
                      <span className="uxr__n">{"Insight " + String(i + 1).padStart(2, "0")}</span>
                      <h3>{it.t("subheading")}</h3>
                      <p>{it.t("text")}</p>
                    </article>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* ============ WIREFRAME → FINAL ============ */}
        <section className="section section--product" id="wireframes">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("wireframes.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("wireframes.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("wireframes.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="uxw">
              {/* Replace the drawn blocks with the real wireframe export (img, 1200 × 750). */}
              <figure className="uxw__item reveal reveal--left">
                <div className="uxw__frame uxw__frame--wire">
                  <div className="pd__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{c.t("wireframes.text")}</span>
                  </div>{" "}
                  <div className="ux-sk ux-sk--web" aria-hidden="true">
                    <div className="ux-sk__nav">
                      <i className="w12" />
                      <span>
                        <i className="w8" />
                        <i className="w8" />
                        <i className="w8" />
                      </span>
                      <i className="w14 is-btn" />
                    </div>{" "}
                    <div className="ux-sk__hero">
                      <div>
                        <i className="h3 w70" />
                        <i className="h3 w50" />
                        <i className="w80" />
                        <i className="w60" />
                        <i className="w30 is-btn" />
                      </div>
                      <b />
                    </div>{" "}
                    <div className="ux-sk__cards">
                      <div>
                        <b />
                        <i className="w70" />
                        <i className="w40" />
                      </div>
                      <div>
                        <b />
                        <i className="w70" />
                        <i className="w40" />
                      </div>
                      <div>
                        <b />
                        <i className="w70" />
                        <i className="w40" />
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <figcaption dangerouslySetInnerHTML={{ __html: c.h("wireframes.caption") }} />
              </figure>{" "}
              <span className="uxw__arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>{" "}
              <figure className="uxw__item reveal reveal--right">
                <div className="uxw__frame">
                  <div className="pd__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{c.t("wireframes.text2")}</span>
                  </div>{" "}
                  <img src={c.a("wireframes.image")} alt={c.a("wireframes.imageAlt")} width="1915" height="998" loading="lazy" decoding="async" />
                </div>{" "}
                <figcaption dangerouslySetInnerHTML={{ __html: c.h("wireframes.caption2") }} />
              </figure>
            </div>
          </div>
        </section>
        {/* ============ DESIGN SYSTEM ============
           The client's own palette (taken from the cover design) on a fixed white
           canvas, so it reads the same in both site themes.
        */}
        <section className="section" id="design-system">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("design-system.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("design-system.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("design-system.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="uxds reveal">
              <div className="uxds__block uxds__block--colours">
                <h3 className="uxds__h">{c.t("design-system.subheading")}</h3>
                <ul className="uxds__sw">
                  {c.l("design-system.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li>
                        <i style={{ "--c": it.a("italicC") }} />
                        <b>{it.t("bold")}</b>
                        <code>{it.t("code")}</code>
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>{" "}
              <div className="uxds__block uxds__block--type">
                <h3 className="uxds__h">{c.t("design-system.subheading2")}</h3>{" "}
                <div className="uxds__type">
                  <span className="uxds__aa" aria-hidden="true">{c.t("design-system.aa")}</span>{" "}
                  <dl>
                    {c.l("design-system.blockList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <div>
                          <dt>{it.t("term")}</dt>
                          <dd>{it.t("detail")}</dd>
                        </div>
                      </Fragment>
                    ))}
                  </dl>
                </div>{" "}
                <p className="uxds__scale" dangerouslySetInnerHTML={{ __html: c.h("design-system.scale") }} />
              </div>{" "}
              <div className="uxds__block uxds__block--ui">
                <h3 className="uxds__h">{c.t("design-system.subheading3")}</h3>{" "}
                <div className="uxds__canvas">
                  <div className="uxds__row">
                    <span className="mt-btn">{c.t("design-system.mtBtn")}</span>{" "}
                    <span className="mt-btn mt-btn--ghost">{c.t("design-system.mtBtn2")}</span>
                  </div>{" "}
                  <div className="uxds__row">
                    {c.l("design-system.mtChipList").map((it, i) => (
                      <Fragment key={i}>
                        <span className="mt-chip">{it.t("mtChip")}</span>
                      </Fragment>
                    ))}
                    <span className="mt-chip is-on">{c.t("design-system.mtChip")}</span>
                  </div>{" "}
                  <label className="mt-field" dangerouslySetInnerHTML={{ __html: c.h("design-system.mtField") }} />{" "}
                  <div className="mt-card">
                    <span className="mt-card__tag">{c.t("design-system.tag")}</span>{" "}
                    <b>{c.t("design-system.bold")}</b>{" "}
                    <span className="mt-card__meta">{c.t("design-system.meta")}</span>{" "}
                    <span className="mt-card__price">{c.t("design-system.price")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============ KEY SCREENS ============ */}
        <section className="section section--product" id="screens">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("screens.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("screens.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("screens.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            {/* Final mobile designs. */}
            <div className="uxs" data-stagger="">
              {c.l("screens.uxPhoneList").map((it, i) => (
                <Fragment key={i}>
                  <figure className="ux-phone reveal">
                    <div className="ux-phone__body">
                      <img src={it.a("image")} alt={it.a("imageAlt")} width="390" height="844" loading="lazy" decoding="async" />
                    </div>{" "}
                    <figcaption>{it.t("caption")}</figcaption>
                  </figure>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ OUR ROLE + TOOLS ============ */}
        <section className="section" id="role">
          <div className="container">
            <div className="whyp">
              <div className="whyp__body">
                <span className="eyebrow reveal">{c.t("role.eyebrow")}</span>{" "}
                <h2 className="section__title uline" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("role.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("role.titleLine2")}</span>
                  </span>
                </h2>{" "}
                <div className="stack-wrap reveal" data-delay="3">
                  <p className="wwa__label">{c.t("role.label")}</p>
                  <ul className="stack" data-stagger="" style={{ "--d0": "1" }}>
                    {c.l("role.itemList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li className="reveal reveal--zoom">{it.t("item")}</li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>{" "}
              <ul className="bens" data-stagger="" style={{ "--d0": "1" }}>
                {c.l("role.benList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li className="ben reveal reveal--zoom">
                      <span className="tick" aria-hidden="true" />{" "}
                      {it.t("benText")}
                    </li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* ============ OUTCOME (placeholders) ============ */}
        <section className="section section--product" id="results">
          <div className="container">
            {/* ILLUSTRATIVE FIGURES: check these against Metro Truck's real analytics before publishing. */}
            <div className="section__head section__head--left">
              <div>
                <span className="eyebrow reveal">{c.t("results.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("results.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("results.titleLine2")}</span>
                  </span>
                </h2>
              </div>
            </div>{" "}
            <ul className="uxo" data-stagger="">
              {c.l("results.itemList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <li className="reveal" dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                </Fragment>
              ))}
            </ul>
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
