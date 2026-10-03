// AUTO-GENERATED from INW_Variation_1/Light/work-accounting.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';


export const META = {
  "title": "Smart Accounting Software Case Study — Accounting Web App | Inovexia",
  "description": "How we designed and built Smart Accounting Software: a web app and mobile app for invoicing, bookkeeping, payroll, tax and real-time financial reports.",
  "robots": "index, follow",
  "openGraph": {
    "title": "Smart Accounting Software Case Study — Accounting Web App | Inovexia",
    "description": "How we designed and built Smart Accounting Software: a web app and mobile app for invoicing, bookkeeping, payroll, tax and real-time financial reports.",
    "type": "website"
  }
};

export default function WorkAccountingTemplate({ c }) {
  return (
    <>
      <BodyClass name="page-case" scripts="work-accounting" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .tl__fill { height: 100% !important; }\n  .faq__a { grid-template-rows: 1fr !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/case-studies" currentValue="true" />
      <main id="main">
        {/* =========================================================
           WEB APP CASE STUDY — Smart Accounting Software
           Product, features, screens and technology stack come from the Products
           page. Timeline, roles and results are illustrative: confirm them before
           publishing.
           =========================================================
        */}
        {/* ============ BANNER ============ */}
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
                    <span>{c.t("top.buttonText")}</span>
                    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>{" "}
              <div className="shotwrap reveal reveal--right" data-delay="2">
                <div className="shotframe">
                  <div className="pd__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{c.t("top.text")}</span>
                  </div>{" "}
                  <img src={c.a("top.image")} alt={c.a("top.imageAlt")} width="714" height="474" loading="eager" decoding="async" />
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
                    <svg viewBox="0 0 24 24" width="19" height="19">
                      <path d="M12 8v5.4M12 16.6h.01" />
                      <path d="M10.3 3.9 2.5 17.4a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
                    </svg>
                  </span>
                  <h3>{c.t("challenge.subheading")}</h3>
                </div>{" "}
                <p>{c.t("challenge.text")}</p>
              </div>{" "}
              <div className="cmp__col cmp__col--ok">
                <div className="cmp__head">
                  <span className="cmp__ico" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="19" height="19">
                      <path d="M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z" />
                      <path d="m9 12 2.2 2.2L15.4 10" />
                    </svg>
                  </span>
                  <h3>{c.t("challenge.subheading2")}</h3>
                </div>{" "}
                <p>{c.t("challenge.text2")}</p>
              </div>
            </div>
          </div>
        </section>
        {/* ============ KEY FEATURES ============ */}
        <section className="section section--product" id="features">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("features.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("features.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("features.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="wa-feats" data-stagger="">
              {c.l("features.waFeatList").map((it, i) => (
                <Fragment key={i}>
                  <article className="wa-feat glint reveal">
                    <span className="wa-feat__ico">
                      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                    </span>
                    <span className="wa-feat__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text")}</p>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ PRODUCT TOUR ============ */}
        <section className="section" id="tour">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("tour.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("tour.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("tour.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="wa-tour reveal">
              <div className="wa-tour__tabs wa-tour__tabs--4" role="tablist" aria-label="App screens">
                {c.l("tour.buttonList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <button type="button" role="tab" id={it.a("buttonId")} aria-controls={it.a("buttonControls")} aria-selected={it.a("buttonSelected")} dangerouslySetInnerHTML={{ __html: it.h("button") }} />
                  </Fragment>
                ))}
              </div>{" "}
              <div className="wa-tour__stage">
                {c.l("tour.shotframeList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <div className="shotframe wa-tour__pane" id={it.a("shotframeId")} role="tabpanel" aria-labelledby={it.a("shotframeLabelledby")} hidden={it.a("shotframeHidden") ? true : undefined}>
                      <div className="pd__bar" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                        <span>{it.t("text")}</span>
                      </div>{" "}
                      <img src={it.a("image")} alt={it.a("imageAlt")} width={it.a("imageWidth")} height={it.a("imageHeight")} loading="lazy" decoding="async" />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
            {/* inline script moved to src/lib/runtime/pages/work-accounting-1.js */}
          </div>
        </section>
        {/* ============ USER ROLES ============ */}
        <section className="section section--product" id="roles">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("roles.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("roles.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("roles.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <ul className="wa-roles" data-stagger="">
              {c.l("roles.itemList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <li className="reveal">
                    <span className="wa-roles__i">{it.t("text")}</span>
                    <b>{it.t("bold")}</b>
                    <p>{it.t("text2")}</p>
                  </li>
                </Fragment>
              ))}
            </ul>
          </div>
        </section>
        {/* ============ ARCHITECTURE + STACK ============ */}
        <section className="section" id="stack">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("stack.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("stack.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("stack.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="wa-arch reveal" role="img" aria-label="Architecture: web browser and mobile app, a React.js front end, a Laravel REST API and a MySQL database, hosted on AWS cloud infrastructure.">
              <div className="wa-arch__flow">
                <div className="wa-arch__node" dangerouslySetInnerHTML={{ __html: c.h("stack.node") }} />{" "}
                <span className="wa-arch__arrow" aria-hidden="true" />{" "}
                <div className="wa-arch__node" dangerouslySetInnerHTML={{ __html: c.h("stack.node2") }} />{" "}
                <span className="wa-arch__arrow" aria-hidden="true" />{" "}
                <div className="wa-arch__node wa-arch__node--core" dangerouslySetInnerHTML={{ __html: c.h("stack.node3") }} />{" "}
                <span className="wa-arch__arrow" aria-hidden="true" />{" "}
                <div className="wa-arch__node" dangerouslySetInnerHTML={{ __html: c.h("stack.node4") }} />
              </div>{" "}
              <div className="wa-arch__svc">
                <p>{c.t("stack.text")}</p>
                <ul>
                  {c.l("stack.itemList").map((it, i) => (
                    <Fragment key={i}>
                      <li dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>{" "}
            <div className="stack-wrap reveal" style={{ marginTop: "34px" }}>
              <p className="wwa__label">{c.t("stack.label")}</p>
              <ul className="stack" data-stagger="" style={{ "--d0": "1" }}>
                {c.l("stack.itemList2").map((it, i) => (
                  <Fragment key={i}>
                    <li className="reveal reveal--zoom">{it.t("item")}</li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* ============ DELIVERY (illustrative timeline) ============ */}
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
                    <span className="uxp__n">{it.t("text")}</span>
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text2")}</p>
                  </li>
                </Fragment>
              ))}
            </ol>
          </div>
        </section>
        {/* ============ OUTCOME ============
           ILLUSTRATIVE FIGURES: check against real usage before publishing.
        */}
        <section className="section" id="results">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("results.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("results.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("results.titleLine2")}</span>
                </span>
              </h2>
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
        <section className="section section--product" id="start">
          <div className="container">
            <div className="join reveal reveal--zoom">
              <div className="join__glow" aria-hidden="true" />{" "}
              <span className="eyebrow">{c.t("start.eyebrow")}</span>{" "}
              <h2>{c.t("start.heading")}</h2>
              <p>{c.t("start.text")}</p>{" "}
              <a href={c.a("start.buttonLink")} className="btn btn--primary magnetic">
                <span>{c.t("start.buttonText")}</span>
                <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
