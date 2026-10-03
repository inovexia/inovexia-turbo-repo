// AUTO-GENERATED from INW_Variation_1/Light/portfolio.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';


const META = {
  "title": "Portfolio | Web Development, App Development & Software Solutions",
  "description": "Explore our portfolio of website development, mobile app development, software solutions, LMS platforms, and business applications delivered for clients worldwide.",
  "openGraph": {
    "title": "Portfolio | Web Development, App Development & Software Solutions",
    "description": "Explore our portfolio of website development, mobile app development, software solutions, LMS platforms, and business applications delivered for clients worldwide.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("portfolio", META);
}

export default async function Page() {
  const c = await loadPage("portfolio");
  return (
    <>
      <BodyClass name="page-portfolio" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .pflist .pfrow::after { transform: scaleX(1) !important; }\n</style>" }} />
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
              <h1 className="phero__title phero__title--sm" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("top.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("top.titleLine2")}</span>
                </span>
              </h1>
              <p className="phero__lead reveal" data-delay="2">{c.t("top.lead")}</p>
              {/* Same shape as the Services banner: the chips sum up the two sections
                 below (services, then products) instead of listing their contents.
                 No button here — the header's Get a Quote and the CTA at the foot
                 of the page carry that, and this page's job is to show the work.
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
        {/* ============ SERVICES STRIP ============
           Sets the banner apart from the Services section, which shares its
           background. The homepage's services marquee, on its CSS drift only;
           the second copy exists to close the loop, so screen readers skip it.
        */}
        <section className="marquee-wrap" aria-label="Our services">
          <div className="marquee">
            <div className="marquee__track" dangerouslySetInnerHTML={{ __html: c.h("services-strip.track") }} />
          </div>
        </section>
        {/* ============ SERVICES ============
           Same layout as the Products page: copy beside a framed visual.
        */}
        <section className="section prod-sec" id="services">
          <div className="container">
            <div className="pd pd--pf">
              <div className="pd__copy">
                <span className="prod__n reveal" aria-hidden="true">{c.t("services.text")}</span>{" "}
                <span className="eyebrow reveal">{c.t("services.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("services.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("services.titleLine2")}</span>
                  </span>
                </h2>
                <p className="section__sub reveal" data-delay="2">{c.t("services.sub")}</p>{" "}
                <div className="prod__stack reveal" data-delay="3">
                  <h3>{c.t("services.subheading")}</h3>
                  <ul className="chips">
                    {c.l("services.itemList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>{it.t("item")}</li>
                      </Fragment>
                    ))}
                  </ul>
                </div>{" "}
                <a href={c.a("services.buttonLink")} className="btn btn--primary magnetic reveal" data-delay="4">
                  {" "}
                  <span>{c.t("services.buttonText")}</span>{" "}
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>{" "}
                </a>
              </div>{" "}
              <div className="pd__vis reveal reveal--zoom" data-delay="2">
                <div className="pd__stage">
                  <div className="pd__glow" aria-hidden="true" />{" "}
                  <figure className="pd__win pfv__win">
                    <img className="pfv__img" src={c.a("services.image")} alt={c.a("services.imageAlt")} width="1400" height="1090" loading="eager" decoding="async" />
                  </figure>{" "}
                  <div className="pd__chip" aria-hidden="true" dangerouslySetInnerHTML={{ __html: c.h("services.chip") }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============ PRODUCTS ============
           Same layout as the Products page: copy beside a framed visual. Mirrored.
        */}
        <section className="section section--product prod-sec" id="products">
          <div className="container">
            <div className="pd pd--pf pd--flip">
              <div className="pd__copy">
                <span className="prod__n reveal" aria-hidden="true">{c.t("products.text")}</span>{" "}
                <span className="eyebrow reveal">{c.t("products.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("products.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("products.titleLine2")}</span>
                  </span>
                </h2>
                <p className="section__sub reveal" data-delay="2">{c.t("products.sub")}</p>{" "}
                <div className="prod__stack reveal" data-delay="3">
                  <h3>{c.t("products.subheading")}</h3>
                  <ul className="chips">
                    {c.l("products.itemList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>{it.t("item")}</li>
                      </Fragment>
                    ))}
                  </ul>
                </div>{" "}
                <a href={c.a("products.buttonLink")} className="btn btn--primary magnetic reveal" data-delay="4">
                  {" "}
                  <span>{c.t("products.buttonText")}</span>{" "}
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>{" "}
                </a>
              </div>{" "}
              <div className="pd__vis reveal reveal--zoom" data-delay="2">
                <div className="pd__stage">
                  <div className="pd__glow" aria-hidden="true" />{" "}
                  <figure className="pd__win pfv__win">
                    <img className="pfv__img" src={c.a("products.image")} alt={c.a("products.imageAlt")} width="1400" height="1400" loading="lazy" decoding="async" />
                  </figure>{" "}
                  <div className="pd__chip" aria-hidden="true" dangerouslySetInnerHTML={{ __html: c.h("products.chip") }} />
                </div>
              </div>
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
