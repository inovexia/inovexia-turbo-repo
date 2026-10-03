// AUTO-GENERATED from INW_Variation_1/Light/about.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';


const META = {
  "title": "About Us — Inovexia | Software Development for Businesses Worldwide",
  "description": "Inovexia is a software development company serving businesses worldwide with custom software, websites, mobile apps and digital solutions. Our story, our team and our impact.",
  "openGraph": {
    "title": "About Inovexia — Building Digital Solutions That Drive Business Growth",
    "description": "A software development company delivering custom software, websites and digital transformation for businesses around the world.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("about", META);
}

export default async function Page() {
  const c = await loadPage("about");
  return (
    <>
      <BodyClass name="page-about" scripts="about" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .abx-statement .w { opacity: 1 !important; }\n  .jrny::after { transform: none !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/about" currentValue="page" />
      <main id="main">
        {/* ============ BANNER ============
           Same shape as the Services banner.
        */}
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
        {/* ============ DISCIPLINES STRIP ============
           The homepage's marquee, on its CSS drift only; the second copy closes
           the loop, so screen readers skip it.
        */}
        <section className="marquee-wrap" aria-label="What we do">
          <div className="marquee">
            <div className="marquee__track" dangerouslySetInnerHTML={{ __html: c.h("disciplines-strip.track") }} />
          </div>
        </section>
        {/* ============ WHO WE ARE ============
           One statement, lit word by word as it scrolls up (CSS scroll timeline;
           fully lit where unsupported or with reduced motion).
        */}
        <section className="section" id="who">
          <div className="container">
            <span className="eyebrow reveal">{c.t("who.eyebrow")}</span>{" "}
            <p className="abx-statement">
              {c.l("who.textList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <span className="w">{it.t("text")}</span>
                </Fragment>
              ))}{" "}
              {c.l("who.textList2").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <span className="w grad">{it.t("text")}</span>
                </Fragment>
              ))}{" "}
              <span className="w">{c.t("who.text")}</span>{" "}
              {c.l("who.textList3").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <span className="w grad">{it.t("text")}</span>
                </Fragment>
              ))}{" "}
              {c.l("who.textList4").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <span className="w">{it.t("text")}</span>
                </Fragment>
              ))}{" "}
              <span className="w grad">{c.t("who.text2")}</span>
            </p>{" "}
            <div className="abx-who">
              <p className="reveal">{c.t("who.text3")}</p>{" "}
              <div className="reveal" data-delay="1">
                <p className="wwa__label">{c.t("who.label")}</p>
                <ul className="sectors">
                  {c.l("who.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li>{it.t("item")}</li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* ============ IMPACT ============ */}
        <section className="section section--product" id="impact">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("impact.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("impact.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("impact.titleLine2")}</span>
                  </span>
                </h2>
              </div>
            </div>{" "}
            {/* counters run as they come into view (the page script's .count) */}
            <div className="abx-stats">
              {c.l("impact.abxStatList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <div className="abx-stat reveal" data-delay={String(i)} dangerouslySetInnerHTML={{ __html: it.h("abxStat") }} />
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ OUR STORY ============
           A timeline across the page: the line draws in as the section scrolls
           into view (CSS scroll timeline; drawn in full where unsupported or with
           reduced motion). Vertical below 900px.
        */}
        <section className="section" id="story">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("story.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("story.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("story.titleLine2")}</span>
                  </span>
                </h2>
              </div>{" "}
              <p className="section__sub reveal" data-delay="2">{c.t("story.sub")}</p>
            </div>{" "}
            <ol className="jrny">
              {c.l("story.itemList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <li className="jrny__item reveal" data-delay={String(i)}>
                    <span className="jrny__dot" aria-hidden="true" />{" "}
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text")}</p>
                  </li>
                </Fragment>
              ))}{" "}
              <li className="jrny__item jrny__item--now reveal" data-delay="3">
                <span className="jrny__dot" aria-hidden="true" />{" "}
                <h3>{c.t("story.subheading")}</h3>
                <p>{c.t("story.text")}</p>
              </li>
            </ol>{" "}
            <div className="jrny__next reveal">
              <span className="jrny__next-k">{c.t("story.nextK")}</span>{" "}
              <p>{c.t("story.text2")}</p>{" "}
              <a href={c.a("story.linkAddress")} className="pstep__link">
                {c.t("story.linkText")}{" "}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        {/* ============ WHAT DRIVES US ============ */}
        <section className="section section--product" id="drives">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("drives.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("drives.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("drives.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <div className="vgrid" data-stagger="">
              <article className="vcard glint reveal reveal--left">
                <span className="vcard__ico" aria-hidden="true">
                  {" "}
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M12 3 4 6.5v5c0 4.7 3.3 8.5 8 9.5 4.7-1 8-4.8 8-9.5v-5z" />
                    <path d="m9 12 2.2 2.2L15.5 10" />
                  </svg>{" "}
                </span>{" "}
                <h3>{c.t("drives.subheading")}</h3>
                <p>{c.t("drives.text")}</p>
              </article>
              <article className="vcard glint reveal reveal--right">
                <span className="vcard__ico" aria-hidden="true">
                  {" "}
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <circle cx="9" cy="8" r="3.2" />
                    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
                    <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18.2 14.2a5.5 5.5 0 0 1 2.3 5.3" />
                  </svg>{" "}
                </span>{" "}
                <h3>{c.t("drives.subheading2")}</h3>
                <p>{c.t("drives.text2")}</p>
              </article>
            </div>{" "}
            <div className="abx-cards" data-stagger="">
              {c.l("drives.featureList").map((it, i) => (
                <Fragment key={i}>
                  <article className="feat glint reveal">
                    <span className="feat__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{" "}
                    <span className="feat__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                    </span>{" "}
                    <h3>{it.t("subheading")}</h3>
                    <p>{it.t("text")}</p>
                  </article>
                </Fragment>
              ))}
            </div>
          </div>
        </section>
        {/* ============ CAREERS ============
           One bold panel: the invitation, the three teams, and the CV button.
        */}
        <section className="section" id="careers">
          <div className="container">
            <div className="cj reveal reveal--zoom">
              <span className="cj__glow cj__glow--a" aria-hidden="true" />{" "}
              <span className="cj__glow cj__glow--b" aria-hidden="true" />{" "}
              <div className="cj__head">
                <div>
                  <span className="cj__eyebrow">{c.t("careers.eyebrow")}</span>{" "}
                  <h2>
                    {c.t("careers.headingText")}{" "}
                    <span className="cj__grad">{c.t("careers.grad")}</span>
                  </h2>
                </div>{" "}
                <p>{c.t("careers.text")}</p>
              </div>{" "}
              <div className="cj__foot">
                <div className="cj__text" dangerouslySetInnerHTML={{ __html: c.h("careers.text2") }} />{" "}
                <button type="button" className="btn cj__btn magnetic" data-cv-open="" aria-haspopup="dialog" aria-controls="cvModal">
                  <span>{c.t("careers.buttonText")}</span>
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* ============ CV POP-UP ============
           Opened by "Send Us Your CV" in Careers. Client-side only, like the other
           forms: point the submit handler at your form endpoint before launch.
        */}
        <dialog className="cvm" id="cvModal" aria-labelledby="cvTitle" aria-describedby="cvDesc">
          <form className="cvm__box" id="cvForm" noValidate>
            <button type="button" className="cvm__x" data-cv-close="" aria-label="Close">
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>{" "}
            <span className="cvm__kicker">{c.t("cvmodal.kicker")}</span>{" "}
            <h2 id="cvTitle">{c.t("cvmodal.heading")}</h2>
            <p id="cvDesc">{c.t("cvmodal.text")}</p>{" "}
            {c.l("cvmodal.fieldList").map((it, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <div className="field">
                  <label htmlFor={it.a("labelFor")}>{it.t("label")}</label>{" "}
                  <input id={it.a("inputId")} name={it.a("inputName")} type={it.a("inputType")} autoComplete={it.a("inputAutocomplete")} placeholder={it.a("inputPlaceholder")} aria-describedby={it.a("inputDescribedby")} required />{" "}
                  <p className="field__err" id={it.a("errId")} role="alert" />
                </div>
              </Fragment>
            ))}{" "}
            <div className="field">
              <span className="cvm__label" id="cvFileLabel">{c.t("cvmodal.label")}</span>{" "}
              <label className="cvm__drop" htmlFor="cvFile" id="cvDrop">
                {" "}
                <input id="cvFile" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" aria-labelledby="cvFileLabel" aria-describedby="cvFileHint cvFileErr" required />{" "}
                <span className="cvm__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 15.5V4.5M7.5 9 12 4.5 16.5 9" />
                    <path d="M4.5 15v3a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
                  </svg>
                </span>{" "}
                <span className="cvm__dz" dangerouslySetInnerHTML={{ __html: c.h("cvmodal.dz") }} />{" "}
              </label>{" "}
              <p className="cvm__hint" id="cvFileHint">{c.t("cvmodal.hint")}</p>
              <p className="field__err" id="cvFileErr" role="alert" />
            </div>{" "}
            <div className="cvm__foot">
              <button className="btn btn--primary" type="submit">
                <span>{c.t("cvmodal.buttonText")}</span>{" "}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>{" "}
              <p className="form__msg" id="cvMsg" role="status" aria-live="polite" />
            </div>
          </form>
        </dialog>
        {/* inline script moved to src/lib/runtime/pages/about-1.js */}
      </main>
      {/* ============ FOOTER ============ */}
      <Footer />
      <button className="to-top" id="toTop" type="button" aria-label="Back to top">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
      {/* No three.js here: the WebGL globe only exists on the homepage, so this
         page skips ~600KB of script it would never use.
      */}
    </>
  );
}
