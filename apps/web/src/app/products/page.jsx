// AUTO-GENERATED from INW_Variation_1/Light/product.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';
import ProductSections from '@/components/cms/ProductSections';

const META = {
  "title": "Examiner & Accounting Software Solutions for Businesses & Educational Institutions | Inovexia",
  "description": "Discover Examiner online examination and Accounting Software solutions designed to streamline assessments, finance operations, reporting, payroll, and business growth.",
  "openGraph": {
    "title": "Examiner & Accounting Software Solutions for Businesses & Educational Institutions | Inovexia",
    "description": "Discover Examiner online examination and Accounting Software solutions designed to streamline assessments, finance operations, reporting, payroll, and business growth.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("product", META);
}

export default async function Page() {
  const c = await loadPage("product");
  return (
    <>
      <BodyClass name="page-product" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/products" currentValue="page" />
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
              {/* Same shape as the Services banner. Each product's features are listed
                 in full in its own section below, so the banner carries the facts.
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
        {/* ============ PRODUCTS ============
           Each product: copy beside the real product (browser window, plus the
           mobile app for Examiner), then its features as the site's
           standard feature cards. The second product is mirrored.
        */}
        <ProductSections />
        {/* ============ WHY CHOOSE US ============ */}
        <section className="section section--product" id="why">
          <div className="container">
            <div className="whyp">
              <div className="whyp__body">
                <span className="eyebrow reveal">{c.t("why.eyebrow")}</span>{" "}
                <h2 className="section__title uline" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("why.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("why.titleLine2")}</span>
                  </span>
                </h2>
                {c.l("why.textList").map((it, i) => (
                  <Fragment key={i}>
                    <p className="reveal" data-delay={it.a("textDelay")} style={{ marginTop: it.a("textMarginTop") }}>{it.t("text")}</p>
                  </Fragment>
                ))}{" "}
                <a href={c.a("why.buttonLink")} className="btn btn--outline magnetic reveal" data-delay="4">
                  {" "}
                  <span>{c.t("why.buttonText")}</span>{" "}
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>{" "}
                </a>
              </div>{" "}
              <ul className="bens" data-stagger="">
                {c.l("why.benList").map((it, i) => (
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
