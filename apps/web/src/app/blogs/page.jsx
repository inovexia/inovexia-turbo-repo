// AUTO-GENERATED from INW_Variation_1/Light/blog.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';
import BlogCards from '@/components/cms/BlogCards';

const META = {
  "title": "Blog & Insights | Web Development, SEO, Mobile Apps & eCommerce | Inovexia",
  "description": "Insights on accounting software, SEO, mobile app development, Shopify, interactive campaign microsites and modern website development.",
  "robots": "index, follow",
  "openGraph": {
    "title": "Blog & Insights | Inovexia",
    "description": "Insights on accounting software, SEO, mobile app development, Shopify, interactive campaign microsites and modern website development.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("blog", META);
}

export default async function Page() {
  const c = await loadPage("blog");
  return (
    <>
      <BodyClass name="page-blog" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .bcard__cov::after { display: none !important; }\n</style>" }} />
      <SiteTop />
      <Header />
      <main id="main">
        {/* ============ BANNER ============ */}
        <section className="phero" id="top">
          <div className="hero__grid" aria-hidden="true" />{" "}
          <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{" "}
          <div className="container">
            <div className="phero__in phero__in--wide">
              <nav className="crumb reveal" aria-label="Breadcrumb" dangerouslySetInnerHTML={{ __html: c.h("top.crumb") }} />
              <h1 className="phero__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("top.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("top.titleLine2")}</span>
                </span>
              </h1>
              <p className="phero__lead reveal" data-delay="2">{c.t("top.lead")}</p>
              <ul className="pills" data-stagger="" style={{ "--d0": "3" }}>
                {c.l("top.itemList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li className="reveal reveal--zoom">{it.t("item")}</li>
                  </Fragment>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* ============ ARTICLES ============
           The cards have their own white band under the banner, as every other
           page's first section does, so the banner reads as a banner. Six equal
           cards; each cover is a real file in assets/img/.
        */}
        <section className="section section--product" id="articles">
          <div className="container">
            <BlogCards />
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
