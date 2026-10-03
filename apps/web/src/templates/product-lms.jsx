// AUTO-GENERATED from INW_Variation_1/Light/product-lms.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';


export const META = {
  "title": "LMS App Development Company | Custom Learning Management Systems | Inovexia",
  "description": "Custom LMS app development for course management, learner tracking, automated assessments and certifications. Web and mobile learning platforms built to scale.",
  "robots": "index, follow",
  "openGraph": {
    "title": "LMS App Development Company | Custom Learning Management Systems | Inovexia",
    "description": "Custom LMS app development for course management, learner tracking, automated assessments and certifications. Web and mobile learning platforms built to scale.",
    "type": "website"
  }
};

export default function ProductLmsTemplate({ c }) {
  return (
    <>
      <BodyClass name="page-product-single" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .tl__fill { height: 100% !important; }\n  .faq__a { grid-template-rows: 1fr !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/products" currentValue="true" />
      <main id="main">
        {/* ============ BANNER + SCREENSHOT ============
           The pitch on one side, the product on the other. .chero is the Contact
           page's split; the frame and its glow are the only new parts. The image is
           a real file in assets/img/ — swap the src for a .png of the live app.
        */}
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
                <p className="chero__lead reveal" data-delay="2">{c.t("top.lead")}</p>{" "}
                <div className="phero__actions reveal" data-delay="3">
                  <a href="#" className="btn btn--primary magnetic">
                    {" "}
                    <span>{c.t("top.buttonText")}</span>{" "}
                    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>{" "}
                  </a>
                </div>
              </div>{" "}
              <div className="shotwrap reveal reveal--right" data-delay="2">
                <div className="shotframe">
                  <img src={c.a("top.image")} alt={c.a("top.imageAlt")} width="880" height="560" loading="eager" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============ OUR ROLE + KEY BENEFITS ============ */}
        <section className="section section--product" id="role">
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
                </h2>
                {c.l("role.textList").map((it, i) => (
                  <Fragment key={i}>
                    <p className="reveal" data-delay={it.a("textDelay")} style={{ marginTop: it.a("textMarginTop") }}>{it.t("text")}</p>
                  </Fragment>
                ))}
              </div>{" "}
              <ul className="bens" data-stagger="">
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
        {/* ============ FAQ ============ */}
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
                      <button className="faq__q" type="button" aria-expanded="false" aria-controls={"lms-a" + String(i + 1)}>
                        <span>{it.t("text")}</span>{" "}
                        <span className="faq__ico" aria-hidden="true" />
                      </button>
                    </h3>{" "}
                    <div className="faq__a" id={"lms-a" + String(i + 1)} role="region" aria-label={it.a("blockLabel")}>
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
