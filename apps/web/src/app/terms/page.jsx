// AUTO-GENERATED from INW_Variation_1/Light/terms.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';


const META = {
  "title": "Terms and Conditions | Inovexia Software Pvt. Ltd.",
  "description": "The terms and conditions governing your use of the inovexiasoftware.com website and any of its related products and services.",
  "robots": "index, follow",
  "openGraph": {
    "title": "Terms and Conditions | Inovexia Software Pvt. Ltd.",
    "description": "The terms and conditions governing your use of the inovexiasoftware.com website and any of its related products and services.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("terms", META);
}

export default async function Page() {
  const c = await loadPage("terms");
  return (
    <>
      <BodyClass name="page-legal" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  /* Without the scroll driver nothing is ever \"live\", so show every rule. */\n  .lsec::before { transform: scaleX(1) !important; }\n  .ltoc__rail i { height: 100% !important; }\n</style>" }} />
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
              <ul className="lmeta" data-stagger="" style={{ "--d0": "3" }}>
                <li className="reveal reveal--zoom">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <rect x="3.5" y="4.5" width="17" height="16" rx="2.4" />
                    <path d="M3.5 9.4h17M8 3v3M16 3v3" />
                  </svg>{" "}
                  {c.t("top.itemText")}{" "}
                  <b dangerouslySetInnerHTML={{ __html: c.h("top.bold") }} />
                </li>{" "}
                <li className="reveal reveal--zoom">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <path d="M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z" />
                    <path d="m9 12 2.2 2.2L15.4 10" />
                  </svg>{" "}
                  {c.t("top.itemText2")}{" "}
                  <b>{c.t("top.bold2")}</b>
                </li>{" "}
                <li className="reveal reveal--zoom">
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <path d="M5.5 4.5h13v15l-6.5-3.4-6.5 3.4z" />
                  </svg>{" "}
                  <b>{c.t("top.bold3")}</b>{" "}
                  {c.t("top.itemText3")}
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* ============ THE DOCUMENT ============
           Contents on a sticky rail beside the text, tracking where the reader is
           (runLegal in main.js, guarded on .lsec so no other page pays for it).
        */}
        <section className="section" id="doc">
          <div className="container">
            <div className="legal">
              <aside className="ltoc">
                <p className="ltoc__label reveal">{c.t("doc.label")}</p>{" "}
                <div className="ltoc__in">
                  <span className="ltoc__rail" aria-hidden="true">
                    <i id="ltocFill" />
                  </span>{" "}
                  <ol className="reveal" aria-label="Sections of this agreement">
                    {c.l("doc.itemList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                      </Fragment>
                    ))}
                  </ol>
                </div>
              </aside>{" "}
              <div className="lbody">
                <div className="lintro reveal">
                  <p>{c.t("doc.text")}</p>
                </div>{" "}
                {c.l("doc.lsecList").map((it, i) => (
                  <Fragment key={i}>
                    <article className="lsec reveal" id={"t" + String(i + 1)}>
                      <div className="lsec__head">
                        <span className="lsec__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{" "}
                        <h2>{it.t("heading")}</h2>
                      </div>{" "}
                      <p>{it.t("text")}</p>
                    </article>
                  </Fragment>
                ))}
                <article className="lsec reveal" id="t4">
                  <div className="lsec__head">
                    <span className="lsec__n" aria-hidden="true">{c.t("doc.text2")}</span>{" "}
                    <h2>{c.t("doc.heading")}</h2>
                  </div>{" "}
                  <p>{c.t("doc.text3")}</p>
                  <ul>
                    {c.l("doc.itemList2").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>{it.t("item")}</li>
                      </Fragment>
                    ))}
                  </ul>
                  <p>{c.t("doc.text4")}</p>
                </article>
                {c.l("doc.lsecList2").map((it, i) => (
                  <Fragment key={i}>
                    <article className="lsec reveal" id={it.a("lsecId")}>
                      <div className="lsec__head">
                        <span className="lsec__n" aria-hidden="true">{it.t("text")}</span>{" "}
                        <h2>{it.t("heading")}</h2>
                      </div>{" "}
                      <p>{it.t("text2")}</p>
                    </article>
                  </Fragment>
                ))}
                <article className="lsec reveal" id="t13">
                  <div className="lsec__head">
                    <span className="lsec__n" aria-hidden="true">{c.t("doc.text5")}</span>{" "}
                    <h2>{c.t("doc.heading2")}</h2>
                  </div>{" "}
                  <p dangerouslySetInnerHTML={{ __html: c.h("doc.text6") }} />
                </article>
                <p className="lfoot reveal" dangerouslySetInnerHTML={{ __html: c.h("doc.lfoot") }} />
              </div>
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
