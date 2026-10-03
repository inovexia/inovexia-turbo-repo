// AUTO-GENERATED from INW_Variation_1/Light/work.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';
import CaseStudyCards from '@/components/cms/CaseStudyCards';

const META = {
  "title": "Case Studies | Web, Mobile App & Ecommerce Development Projects",
  "description": "Explore our portfolio of web development, mobile app development, ecommerce, SEO, and custom software projects. Delivering innovative digital solutions that drive business growth.",
  "robots": "index, follow",
  "openGraph": {
    "title": "Case Studies | Web, Mobile App & Ecommerce Development Projects",
    "description": "Explore our portfolio of web development, mobile app development, ecommerce, SEO, and custom software projects. Delivering innovative digital solutions that drive business growth.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("work", META);
}

export default async function Page() {
  const c = await loadPage("work");
  return (
    <>
      <BodyClass name="page-work" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  /* No filter without JS, so every project stays on the page. */\n  .work__item[hidden] { display: block !important; }\n  .wkbar { display: none !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/case-studies" currentValue="page" />
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
              {/* Same shape as the Services banner: the chips sum up the grid below.
                 No button, as on Portfolio: the header's Get a Quote and the CTA at
                 the foot of the page carry that, and this page shows the work.
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
              </ul>
            </div>
          </div>
        </section>
        {/* ============ THE WORK ============
           Filter bar + grid. The bar's highlight is one element that slides; the
           grid replays its stagger on every change. Both live in the #wkbar block
           in main.js, guarded so no other page pays for it.
        */}
        <section className="section" id="work">
          <div className="container">
            <div className="wkbar reveal" id="wkbar" role="group" aria-label="Filter projects by category">
              <span className="wkbar__ink" aria-hidden="true" />{" "}
              {c.l("work.btnList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <button className="wkbar__btn" type="button" data-filter={it.a("btnFilter")} aria-pressed={it.a("btnPressed")}>
                    {it.t("btnText")}{" "}
                    <span className="wkbar__n" aria-hidden="true" />
                  </button>
                </Fragment>
              ))}
            </div>{" "}
            <CaseStudyCards variant="grid" />{" "}
            <p className="wkempty" id="wkempty" role="status" hidden>{c.t("work.wkempty")}</p>
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
