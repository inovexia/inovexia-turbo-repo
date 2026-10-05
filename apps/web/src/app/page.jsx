// AUTO-GENERATED from INW_Variation_1/Light/index.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';
import HomeServiceCards from '@/components/cms/HomeServiceCards';
import CaseStudyCards from '@/components/cms/CaseStudyCards';
import HomeInsights from '@/components/cms/HomeInsights';

const META = {
  "title": "Inovexia Software — Providing Innovative Digital Solutions",
  "description": "Inovexia Software builds scalable, extensible software — e-commerce and website development, app and plugin development, SEO services and website design.",
  "alternates": {
    "canonical": "https://inovexiasoftware.com/"
  },
  "openGraph": {
    "title": "Inovexia Software — Providing Innovative Digital Solutions",
    "description": "We help businesses around the world grow online with scalable, extensible software — websites, apps and platforms built to last.",
    "type": "website",
    "url": "https://inovexiasoftware.com/",
    "siteName": "Inovexia Software",
    "images": [
      {
        "url": "https://inovexiasoftware.com/assets/img/og-image.jpg",
        "width": 1200,
        "height": 630,
        "alt": "Inovexia Software — Providing innovative digital solutions."
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Inovexia Software — Providing Innovative Digital Solutions",
    "images": [
      "https://inovexiasoftware.com/assets/img/og-image.jpg"
    ]
  }
};

export async function generateMetadata() {
  return pageMetadata("index", META);
}

export default async function Page() {
  const c = await loadPage("index");
  return (
    <>
      <BodyClass name="page-home" scripts="home" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  /* Masked text starts translated out of view and reveals start at opacity 0,\n     so with JS off the page would be mostly blank. Pin everything open. */\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .intro { display: none !important; }\n  .track { height: auto !important; }\n  .track__sticky { position: static !important; height: auto !important; }\n  .track__rail { flex-wrap: wrap !important; transform: none !important; }\n</style>" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "[{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Inovexia Software Pvt. Ltd.\",\"alternateName\":\"Inovexia Software\",\"url\":\"https://inovexiasoftware.com/\",\"logo\":\"https://inovexiasoftware.com/assets/img/logo.png\",\"image\":\"https://inovexiasoftware.com/assets/img/og-image.jpg\",\"email\":\"contact@inovexiasoftware.com\",\"telephone\":\"+91 95111 18896\",\"address\":{\"@type\":\"PostalAddress\",\"streetAddress\":\"Samfoun Academy, Afaq Building, Dharmshala Road\",\"addressLocality\":\"Gorakhpur\",\"postalCode\":\"273001\",\"addressRegion\":\"Uttar Pradesh\",\"addressCountry\":\"IN\"},\"areaServed\":\"Worldwide\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"sales\",\"email\":\"contact@inovexiasoftware.com\",\"telephone\":\"+91 95111 18896\",\"areaServed\":\"Worldwide\",\"availableLanguage\":\"English\"}},{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"name\":\"Inovexia Software\",\"url\":\"https://inovexiasoftware.com/\"}]" }} />
      <SiteTop />
      <Header />
      <main id="main">
        {/* ============ HERO ============ */}
        <section className="hero" id="hero">
          <div className="hero__grid" aria-hidden="true" />{" "}
          <div className="container hero__inner">
            <div className="hero__copy">
              <span className="badge hero-in" style={{ "--hd": ".05s" }}>
                {" "}
                <i className="badge__dot" />{" "}
                {c.t("hero.badgeText")}{" "}
              </span>{" "}
              <h1 className="hero__title hero__title--in">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("hero.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("hero.titleLine2")}</span>
                </span>
              </h1>
              <p className="hero__lead hero-in" style={{ "--hd": ".25s" }}>{c.t("hero.lead")}</p>{" "}
              <div className="hero__actions hero-in" style={{ "--hd": ".35s" }}>
                <a href={c.a("hero.buttonLink")} className="btn btn--primary magnetic">
                  {" "}
                  <span>{c.t("hero.buttonText")}</span>{" "}
                  <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>{" "}
                </a>
              </div>{" "}
              <ul className="hero__stats" data-stagger="" style={{ "--d0": "5" }}>
                {c.l("hero.itemList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li className="reveal" dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                  </Fragment>
                ))}
              </ul>
            </div>{" "}
            <div className="hero__orbit" data-parallax="-0.06">
              <div className="stack-map reveal" id="stackMap" data-cursor="DRAG">
                {/* orbit rings, connector beams and travelling sparks */}
                <svg className="stack-map__svg" viewBox="0 0 560 440" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <defs>
                    <radialGradient id="smCore" cx="50%" cy="50%">
                      <stop offset="0" stopColor="#6d5efc" stopOpacity=".5" />
                      <stop offset="1" stopColor="#6d5efc" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <ellipse className="sm-halo" cx="269" cy="211" rx="200" ry="150" fill="url(#smCore)" />
                  <g className="sm-rings">
                    <ellipse className="sm-ring sm-ring--1" cx="269" cy="211" rx="120" ry="52" />
                    <ellipse className="sm-ring sm-ring--2" cx="269" cy="211" rx="215" ry="95" />
                    <ellipse className="sm-ring sm-ring--3" cx="269" cy="211" rx="272" ry="140" />
                  </g>
                  <g className="sm-links">
                    <path d="M269 211 L280 57" />
                    <path d="M269 211 L101 128" />
                    <path d="M269 211 L454 145" />
                    <path d="M269 211 L90 282" />
                    <path d="M269 211 L437 299" />
                    <path d="M269 211 L258 365" />
                  </g>
                  <g className="sm-sparks">
                    <circle r="3.4">
                      <animateMotion dur="14s" repeatCount="indefinite" path="M 54,211 a 215,95 0 1,0 430,0 a 215,95 0 1,0 -430,0" />
                    </circle>
                    <circle r="2.6">
                      <animateMotion dur="14s" begin="-7s" repeatCount="indefinite" path="M 54,211 a 215,95 0 1,0 430,0 a 215,95 0 1,0 -430,0" />
                    </circle>
                    <circle r="2.8">
                      <animateMotion dur="9s" repeatCount="indefinite" path="M 149,211 a 120,52 0 1,1 240,0 a 120,52 0 1,1 -240,0" />
                    </circle>
                    <circle r="2.2">
                      <animateMotion dur="19s" begin="-4s" repeatCount="indefinite" path="M -3,211 a 272,140 0 1,0 544,0 a 272,140 0 1,0 -544,0" />
                    </circle>
                  </g>
                </svg>{" "}
                {/* centre */}
                <div className="node node--center" style={{ "--x": "48%", "--y": "48%", "--d": "0s" }}>
                  <div className="node__card">
                    <div className="node__inner" dangerouslySetInnerHTML={{ __html: c.h("hero.inner") }} />{" "}
                    <span className="node__ping" aria-hidden="true" />
                  </div>
                </div>{" "}
                {/* satellites */}
                {c.l("hero.nodeList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <div className="node" style={{ "--x": it.a("nodeX"), "--y": it.a("nodeY"), "--d": it.a("nodeD"), "--c": it.a("nodeC") }}>
                      <div className="node__card">
                        <div className="node__inner">
                          <span className="node__icon">
                            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                          </span>{" "}
                          <span className="node__text" dangerouslySetInnerHTML={{ __html: it.h("text") }} />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>{" "}
          <a href="#services" className="hero__scroll" aria-label="Scroll to services">
            {" "}
            <span className="hero__scroll-line" />{" "}
            <span className="hero__scroll-text">{c.t("hero.scrollText")}</span>{" "}
          </a>
        </section>
        {/* ============ MARQUEE ============ */}
        <section className="marquee-wrap" aria-label="Our services">
          <div className="marquee" id="marquee">
            <div className="marquee__track" id="marqueeTrack" dangerouslySetInnerHTML={{ __html: c.h("marquee.track") }} />
          </div>
        </section>
        {/* ============ TRUST PANEL ============
           What we do (a slow ribbon of services) and who trusts us (client logos),
           in one panel under the banner. The ribbon runs on CSS alone and pauses
           on hover; the second copy closes the loop and is hidden from readers.
        */}
        <section className="trustx" aria-label="Trusted by our clients">
          <div className="container">
            <div className="trustx__panel reveal">
              <div className="tx-clients">
                <div className="tx-clients__copy">
                  <span className="tx-clients__eyebrow">
                    <i aria-hidden="true" />
                    {c.t("trust-panel.eyebrowText")}
                  </span>{" "}
                  <p>{c.t("trust-panel.text")}</p>{" "}
                  <a href={c.a("trust-panel.linkAddress")} className="tx-clients__link">
                    {c.t("trust-panel.linkText")}{" "}
                    <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>{" "}
                <ul className="tx-clients__logos">
                  {c.l("trust-panel.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li>
                        <span className="tx-logo">
                          <img src={it.a("image")} alt={it.a("imageAlt")} width={it.a("imageWidth")} height={it.a("imageHeight")} loading="lazy" decoding="async" />
                        </span>
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* ============ SERVICES ============ */}
        <section className="section section--services" id="services">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("services.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("services.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("services.titleLine2")}</span>
                  </span>
                </h2>
                <p className="section__sub reveal" data-delay="2">{c.t("services.sub")}</p>
              </div>{" "}
              <a href={c.a("services.buttonLink")} className="btn btn--text reveal" data-delay="2">{c.t("services.button")}</a>
            </div>{" "}
            {/* The Portfolio page's service cards: the whole card is the link. */}
            <HomeServiceCards />
          </div>
        </section>
        {/* ============ SOUND FAMILIAR? ============
           Problem recognition before any selling: six situations the visitor can
           tick as they recognise them, then "We can help" and a route to Services.
        */}
        <section className="section pfm" id="challenges">
          <div className="container">
            <div className="pfm__head">
              <span className="eyebrow reveal">{c.t("challenges.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("challenges.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("challenges.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            <ul className="pfm__grid" data-stagger="">
              {c.l("challenges.itemList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <li className="reveal">
                    <div className="pfm__card">
                      <span className="pfm__ico">
                        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                      </span>{" "}
                      <span className="pfm__txt" dangerouslySetInnerHTML={{ __html: it.h("txt") }} />
                    </div>
                  </li>
                </Fragment>
              ))}
            </ul>{" "}
            <div className="pfm__answer reveal">
              <div className="pfm__answer-copy">
                <p className="pfm__count">{c.t("challenges.count")}</p>
                <h3>{c.t("challenges.subheading")}</h3>
                <p>{c.t("challenges.text")}</p>
              </div>{" "}
              <a href={c.a("challenges.buttonLink")} className="btn btn--primary magnetic">
                <span>{c.t("challenges.buttonText")}</span>
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        {/* ============ OUR APPS ============ */}
        <section className="section section--app section--band" id="product">
          {/* Pinned stage: the section is held for a few screens of scroll and the
             scroll position scrolls the phone through the app's screens. Only
             engaged where there is room (see .pstage in the CSS) — elsewhere it is
             an ordinary section and the phone advances on its own.
             Examiner / Accounting tabs swap the copy, the desktop screenshot, the chips
             and the phone's screens (from the templates below); main.js re-reads
             the strip on the 'inovexia:app-swap' event.
          */}
          <div className="pstage" id="appStage">
            <div className="pstage__sticky">
              <div className="container">
                <div className="product">
                  <div className="product__copy">
                    <span className="eyebrow reveal">{c.t("product.eyebrow")}</span>{" "}
                    <div className="apptabs reveal" role="tablist" aria-label="Our apps">
                      {c.l("product.buttonList").map((it, i) => (
                        <Fragment key={i}>
                          {i > 0 && " "}
                          <button type="button" role="tab" id={it.a("buttonId")} data-app={it.a("buttonApp")} aria-controls={it.a("buttonControls")} aria-selected={it.a("buttonSelected")}>{it.t("button")}</button>
                        </Fragment>
                      ))}{" "}
                      <span className="apptabs__ink" aria-hidden="true" />
                    </div>{" "}
                    {c.l("product.apppaneList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <div className="apppane" id={it.a("apppaneId")} role="tabpanel" aria-labelledby={it.a("apppaneLabelledby")} data-app-pane={it.a("apppaneAppPane")} hidden={it.a("apppaneHidden") ? true : undefined}>
                          <h2 className="section__title" data-mask="">
                            <span className="m" style={{ "--i": "0" }}>
                              <span className="m__i" dangerouslySetInnerHTML={{ __html: it.h("titleLine") }} />
                            </span>{" "}
                            <span className="m" style={{ "--i": "1" }}>
                              <span className="m__i">{it.t("titleLine2")}</span>
                            </span>
                          </h2>
                          <p className="section__sub reveal" data-delay="2">{it.t("sub")}</p>
                          <ul className="product__features product__features--steps reveal" data-delay="3">
                            {it.l("itemList").map((it2, i2) => (
                              <Fragment key={i2}>
                                {i2 > 0 && " "}
                                <li>
                                  <button type="button" className="appf" data-screen={String(i2 + 1)}>
                                    <span className="tick" aria-hidden="true" />{" "}
                                    {it2.t("appfText")}
                                  </button>
                                </li>
                              </Fragment>
                            ))}
                          </ul>{" "}
                          <div className="product__actions reveal" data-delay="4" dangerouslySetInnerHTML={{ __html: it.h("actions") }} />
                        </div>
                      </Fragment>
                    ))}
                  </div>{" "}
                  {/* Desktop app screenshot behind, the phone in front. */}
                  <div className="product__visual reveal reveal--zoom" data-delay="2">
                    <div className="appx" id="appx">
                      <div className="appx__glow" aria-hidden="true" />{" "}
                      <figure className="appx__web" aria-hidden="true">
                        <div className="appx__bar">
                          <i />
                          <i />
                          <i />
                          {c.l("product.textList").map((it, i) => (
                            <Fragment key={i}>
                              <span data-app-pane={it.a("textAppPane")} hidden={it.a("textHidden") ? true : undefined}>{it.t("text")}</span>
                            </Fragment>
                          ))}
                        </div>{" "}
                        {c.l("product.imageList").map((it, i) => (
                          <Fragment key={i}>
                            {i > 0 && " "}
                            <img data-app-pane={it.a("imageAppPane")} src={it.a("image")} alt={it.a("imageAlt")} width={it.a("imageWidth")} height={it.a("imageHeight")} loading="lazy" decoding="async" hidden={it.a("imageHidden") ? true : undefined} />
                          </Fragment>
                        ))}
                      </figure>{" "}
                      <div className="appx__phone">
                        <span className="appx__notch" aria-hidden="true" />{" "}
                        <div className="appx__screen">
                          <div className="appx__strip" id="appStrip">
                            {c.l("product.imageList2").map((it, i) => (
                              <Fragment key={i}>
                                {i > 0 && " "}
                                <img src={it.a("image")} alt={it.a("imageAlt")} data-cap={it.t("imageCap")} width="360" height="780" loading={it.a("imageLoading")} decoding="async" />
                              </Fragment>
                            ))}
                          </div>
                        </div>
                      </div>{" "}
                      <template id="appTplLms" dangerouslySetInnerHTML={{ __html: "\n              <img src=\"/assets/img/examiner-02-dashboard-mobile.png\" alt=\"Examiner dashboard on mobile with user counts and pending approvals\" data-cap=\"Dashboard — users, active learners and pending approvals at a glance\" width=\"360\" height=\"780\" loading=\"eager\" decoding=\"async\" />\n              <img src=\"/assets/img/examiner-03-test-mobile.png\" alt=\"Taking a test on mobile with the question palette\" data-cap=\"Take a test — question palette, bookmarks and live camera proctoring\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n              <img src=\"/assets/img/examiner-05-manage-test-mobile.png\" alt=\"Managing a test on mobile\" data-cap=\"Manage tests — publish, enroll, preview, print and export\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n              <img src=\"/assets/img/examiner-04-settings-mobile.png\" alt=\"Examiner settings on mobile\" data-cap=\"Your brand — app name, logo and favicon in one place\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n              <img src=\"/assets/img/examiner-01-login-mobile.png\" alt=\"Examiner sign-in on mobile\" data-cap=\"Secure sign-in — captcha, OTP login and self sign-up\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n          " }} />
                      <template id="appTplAcct" dangerouslySetInnerHTML={{ __html: "\n              <img src=\"/assets/img/acct-app.svg\" alt=\"Accounting app overview: cash balance, income and expenses, and recent invoices\" data-cap=\"Overview — cash balance, income and expenses at a glance\" width=\"360\" height=\"780\" loading=\"eager\" decoding=\"async\" />\n              <img src=\"/assets/img/acct-app-invoices.svg\" alt=\"Invoices list with paid, due and overdue invoices\" data-cap=\"Invoices — sent, due, paid and overdue at a glance\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n              <img src=\"/assets/img/acct-app-reports.svg\" alt=\"Quarterly profit and loss with downloadable statements\" data-cap=\"Reports — P&amp;L, balance sheet, cash flow and tax, export-ready\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n              <img src=\"/assets/img/acct-app-payroll.svg\" alt=\"Next payroll total and employee salaries with approval status\" data-cap=\"Payroll — salaries, deductions and approvals in one run\" width=\"360\" height=\"780\" loading=\"lazy\" decoding=\"async\" />\n          " }} />{" "}
                      <div className="appx__chip appx__chip--1" data-app-pane="lms" aria-hidden="true" dangerouslySetInnerHTML={{ __html: c.h("product.chip") }} />{" "}
                      <div className="appx__chip appx__chip--2" data-app-pane="lms" aria-hidden="true" dangerouslySetInnerHTML={{ __html: c.h("product.chip2") }} />{" "}
                      <div className="appx__chip appx__chip--3" data-app-pane="lms" aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="15" height="15">
                          <path d="M12 3.2 20 6.4v5.3c0 4.6-3.2 8-8 9.1-4.8-1.1-8-4.5-8-9.1V6.4z" />
                          <path d="m9 12 2.2 2.2L15.4 10" />
                        </svg>{" "}
                        {c.t("product.chipText")}
                      </div>{" "}
                      <div className="appx__chip appx__chip--1" data-app-pane="acct" aria-hidden="true" hidden dangerouslySetInnerHTML={{ __html: c.h("product.chip3") }} />{" "}
                      <div className="appx__chip appx__chip--2" data-app-pane="acct" aria-hidden="true" hidden dangerouslySetInnerHTML={{ __html: c.h("product.chip4") }} />{" "}
                      <div className="appx__chip appx__chip--3" data-app-pane="acct" aria-hidden="true" hidden>
                        <svg viewBox="0 0 24 24" width="15" height="15">
                          <path d="M3.5 20.5h17" />
                          <path d="M6.5 16v-5M11 16V7M15.5 16v-7M20 16V5" />
                        </svg>{" "}
                        {c.t("product.chipText2")}
                      </div>
                    </div>{" "}
                    <div className="appx__foot">
                      <span className="appx__count" dangerouslySetInnerHTML={{ __html: c.h("product.count") }} />{" "}
                      <p className="appx__cap" id="appCap">{c.t("product.cap")}</p>{" "}
                      <span className="appx__prog" aria-hidden="true">
                        <i id="appProg" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* inline script moved to src/lib/runtime/pages/home-1.js */}
        </section>
        {/* ============ OUR WORK ============ */}
        <section className="section section--work" id="work">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("work.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("work.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("work.titleLine2")}</span>
                  </span>
                </h2>
                <p className="section__sub reveal" data-delay="2">{c.t("work.sub")}</p>
              </div>{" "}
              <a href={c.a("work.buttonLink")} className="btn btn--text reveal" data-delay="2">{c.t("work.button")}</a>
            </div>{" "}
            {/* Category tabs: the same filter as the Our Work page (the #wkbar block
               in the shared script): sliding highlight, counts read from the cards.
            */}
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
            <CaseStudyCards variant="home" />{" "}
            <p className="wkempty" id="wkempty" role="status" hidden>{c.t("work.wkempty")}</p>
          </div>
        </section>
        {/* ============ TESTIMONIALS ============
           SAMPLE QUOTES: placeholders credited by role only. Replace each quote,
           role and city with a real client's words (with their permission) before
           publishing.
        */}
        <section className="section tsm" id="testimonials">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("testimonials.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("testimonials.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("testimonials.titleLine2")}</span>
                  </span>
                </h2>
              </div>{" "}
              <p className="section__sub reveal" data-delay="2">{c.t("testimonials.sub")}</p>
            </div>{" "}
            <ul className="tsm__grid" data-stagger="">
              <li className="tsm__card reveal">
                <span className="tsm__qm">
                  <svg viewBox="0 0 48 36" width="44" height="33" aria-hidden="true">
                    <path d="M0 36V20.6C0 8.9 6.2 1.6 18.6 0l1.9 5.1C13.4 7 9.9 11 9.4 17.2H18V36H0zm28.8 0V20.6C28.8 8.9 35 1.6 47.4 0l1.9 5.1c-7.1 1.9-10.6 5.9-11.1 12.1h8.6V36H28.8z" />
                  </svg>
                </span>{" "}
                <span className="tsm__tag">{c.t("testimonials.tag")}</span>{" "}
                <blockquote>{c.t("testimonials.quote")}</blockquote>{" "}
                <div className="tsm__who">
                  <span className="tsm__av" aria-hidden="true">{c.t("testimonials.av")}</span>
                  <span dangerouslySetInnerHTML={{ __html: c.h("testimonials.text") }} />
                </div>
              </li>{" "}
              <li className="tsm__card tsm__card--feat reveal">
                <span className="tsm__qm">
                  <svg viewBox="0 0 48 36" width="44" height="33" aria-hidden="true">
                    <path d="M0 36V20.6C0 8.9 6.2 1.6 18.6 0l1.9 5.1C13.4 7 9.9 11 9.4 17.2H18V36H0zm28.8 0V20.6C28.8 8.9 35 1.6 47.4 0l1.9 5.1c-7.1 1.9-10.6 5.9-11.1 12.1h8.6V36H28.8z" />
                  </svg>
                </span>{" "}
                <span className="tsm__tag">{c.t("testimonials.tag2")}</span>{" "}
                <blockquote>{c.t("testimonials.quote2")}</blockquote>{" "}
                <div className="tsm__who">
                  <span className="tsm__av" aria-hidden="true">{c.t("testimonials.av2")}</span>
                  <span dangerouslySetInnerHTML={{ __html: c.h("testimonials.text2") }} />
                </div>
              </li>{" "}
              <li className="tsm__card reveal">
                <span className="tsm__qm">
                  <svg viewBox="0 0 48 36" width="44" height="33" aria-hidden="true">
                    <path d="M0 36V20.6C0 8.9 6.2 1.6 18.6 0l1.9 5.1C13.4 7 9.9 11 9.4 17.2H18V36H0zm28.8 0V20.6C28.8 8.9 35 1.6 47.4 0l1.9 5.1c-7.1 1.9-10.6 5.9-11.1 12.1h8.6V36H28.8z" />
                  </svg>
                </span>{" "}
                <span className="tsm__tag">{c.t("testimonials.tag3")}</span>{" "}
                <blockquote>{c.t("testimonials.quote3")}</blockquote>{" "}
                <div className="tsm__who">
                  <span className="tsm__av" aria-hidden="true">{c.t("testimonials.av3")}</span>
                  <span dangerouslySetInnerHTML={{ __html: c.h("testimonials.text3") }} />
                </div>
              </li>
            </ul>
          </div>
        </section>
        {/* ============ TECHNOLOGY STACK ============
           Static by request: the four layers as cards, every tool listed once.
           (The 3D globe and its three.js library were removed from the homepage.)
        */}
        <section className="section section--tech section--band" id="tech">
          <div className="container">
            <div className="section__head section__head--row stk__head">
              <div>
                <span className="eyebrow reveal">{c.t("tech.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i" dangerouslySetInnerHTML={{ __html: c.h("tech.titleLine") }} />
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i">{c.t("tech.titleLine2")}</span>
                  </span>
                </h2>
              </div>{" "}
              <div className="stk__aside reveal" data-delay="2">
                <p>{c.t("tech.text")}</p>{" "}
                <div className="stk__facts">
                  {c.l("tech.blockList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <div dangerouslySetInnerHTML={{ __html: it.h("block") }} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>{" "}
            {/* One panel, four layers side by side, every tool on its own row.
               Static: hover only brightens a row.
            */}
            <div className="stx reveal">
              <span className="stx__glow stx__glow--a" aria-hidden="true" />{" "}
              <span className="stx__glow stx__glow--b" aria-hidden="true" />{" "}
              <div className="stx__cols">
                <div className="stx__col stx__col--indigo">
                  <div className="stx__top">
                    <span className="stx__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
                        <path d="M3 9h18M6.4 6.7h.01M9 6.7h.01" />
                        <path d="m10 12.5-2 2 2 2M14 12.5l2 2-2 2" />
                      </svg>
                    </span>{" "}
                    <span className="stx__n" aria-hidden="true">{c.t("tech.text2")}</span>
                  </div>{" "}
                  <h3>{c.t("tech.subheading")}</h3>
                  <p className="stx__count">{c.t("tech.count")}</p>
                  <ul className="stx__list">
                    {c.l("tech.itemList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>
                          <span className="stx__m" aria-hidden="true">{it.t("text")}</span>
                          {it.t("itemText")}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>{" "}
                <div className="stx__col stx__col--cyan">
                  <div className="stx__top">
                    <span className="stx__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
                        <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
                        <path d="M6.6 7.2h.01M6.6 16.8h.01" />
                      </svg>
                    </span>{" "}
                    <span className="stx__n" aria-hidden="true">{c.t("tech.text3")}</span>
                  </div>{" "}
                  <h3>{c.t("tech.subheading2")}</h3>
                  <p className="stx__count">{c.t("tech.count2")}</p>
                  <ul className="stx__list">
                    {c.l("tech.itemList2").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>
                          <span className="stx__m" aria-hidden="true">{it.t("text")}</span>
                          {it.t("itemText")}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>{" "}
                <div className="stx__col stx__col--pink">
                  <div className="stx__top">
                    <span className="stx__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
                        <path d="M10.5 5.3h3M10.8 18.4h2.4" />
                      </svg>
                    </span>{" "}
                    <span className="stx__n" aria-hidden="true">{c.t("tech.text4")}</span>
                  </div>{" "}
                  <h3>{c.t("tech.subheading3")}</h3>
                  <p className="stx__count">{c.t("tech.count3")}</p>
                  <ul className="stx__list">
                    {c.l("tech.itemList3").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>
                          <span className="stx__m" aria-hidden="true">{it.t("text")}</span>
                          {it.t("itemText")}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>{" "}
                <div className="stx__col stx__col--green">
                  <div className="stx__top">
                    <span className="stx__ico" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path d="M7 18.5h10.5a4 4 0 0 0 .6-7.96A6 6 0 0 0 6.3 9.3 4.6 4.6 0 0 0 7 18.5z" />
                      </svg>
                    </span>{" "}
                    <span className="stx__n" aria-hidden="true">{c.t("tech.text5")}</span>
                  </div>{" "}
                  <h3>{c.t("tech.subheading4")}</h3>
                  <p className="stx__count">{c.t("tech.count4")}</p>
                  <ul className="stx__list">
                    {c.l("tech.itemList4").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>
                          <span className="stx__m" aria-hidden="true">{it.t("text")}</span>
                          {it.t("itemText")}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>{" "}
              <div className="stx__foot">
                <span className="stx__foot-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M12 3 4 6.5v5c0 4.7 3.3 8.5 8 9.5 4.7-1 8-4.8 8-9.5v-5z" />
                    <path d="m9 12 2.2 2.2L15.5 10" />
                  </svg>
                </span>{" "}
                <p dangerouslySetInnerHTML={{ __html: c.h("tech.text6") }} />
              </div>
            </div>
          </div>
        </section>
        {/* ============ OUR PROCESS ============
           Sticky card on the left shows the step being read; the timeline on the
           right fills as it scrolls (runProcess in main.js). Below 900px the card
           is dropped and the timeline reads on its own.
        */}
        <section className="section section--process" id="process">
          <div className="container">
            <div className="section__head section__head--row prx__head">
              <div>
                <span className="eyebrow reveal">{c.t("process.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i" dangerouslySetInnerHTML={{ __html: c.h("process.titleLine") }} />
                  </span>
                </h2>
              </div>{" "}
              <p className="prx__intro reveal" data-delay="2">{c.t("process.intro")}</p>
            </div>{" "}
            <div className="prx" id="prx">
              <aside className="prx__side">
                <div className="prx__card" aria-hidden="true">
                  <div className="prx__top">
                    <span className="prx__now" dangerouslySetInnerHTML={{ __html: c.h("process.now") }} />{" "}
                    <svg className="prx__ring" viewBox="0 0 44 44">
                      <circle cx="22" cy="22" r="19" />
                      <circle id="prxRing" cx="22" cy="22" r="19" pathLength="100" />
                    </svg>
                  </div>{" "}
                  <div className="prx__body" id="prxBody">
                    <div className="prx__big">
                      <span className="prx__tile" id="prxIco">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14A1.5 1.5 0 0 1 16 20.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5z" />
                          <path d="M9.5 8h5M9.5 11.5h5M9.5 15h3" />
                        </svg>
                      </span>{" "}
                      <span className="prx__n" id="prxBig">{c.t("process.text")}</span>
                    </div>{" "}
                    <h3 id="prxTitle">{c.t("process.subheading")}</h3>
                    <p id="prxText">{c.t("process.text2")}</p>
                  </div>{" "}
                  <div className="prx__segs" id="prxSegs">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </aside>
              <ol className="prx__list" id="prxList">
                <span className="prx__rail" aria-hidden="true">
                  <i id="prxFill" />
                </span>{" "}
                {c.l("process.stepList").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li className="prx__step" data-step={String(i + 1)}>
                      <span className="prx__dot" aria-hidden="true" />{" "}
                      <p className="prx__k">
                        <span className="prx__ico" aria-hidden="true">
                          <svg viewBox="0 0 24 24" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                        </span>{" "}
                        {"Step " + String(i + 1).padStart(2, "0")}
                      </p>
                      <h3>{it.t("subheading")}</h3>
                      <p className="prx__d">{it.t("text")}</p>
                    </li>
                  </Fragment>
                ))}
              </ol>
            </div>
          </div>
        </section>
        {/* ============ WHY CHOOSE US ============
           A pinned horizontal gallery: the section holds while the promise and
           the six commitments glide sideways on a gentle arc — the centre card
           comes forward, the others tilt away (runTrack moves the rail; whyArc
           in main.js bends it and runs the counter). Below 900px it is a
           swipeable row.
        */}
        <section className="section section--why has-track section--band" id="why">
          <div className="track wha" id="track">
            <div className="track__sticky">
              <div className="container">
                <div className="section__head section__head--row wha__head">
                  <div>
                    <span className="eyebrow reveal">{c.t("why.eyebrow")}</span>{" "}
                    <h2 className="section__title" data-mask="">
                      <span className="m" style={{ "--i": "0" }}>
                        <span className="m__i">{c.t("why.titleLine")}</span>
                      </span>{" "}
                      <span className="m" style={{ "--i": "1" }}>
                        <span className="m__i grad">{c.t("why.titleLine2")}</span>
                      </span>
                    </h2>
                  </div>{" "}
                  <div className="wha__side reveal" data-delay="2">
                    <p>{c.t("why.text")}</p>{" "}
                    <div className="whys__meter" aria-hidden="true">
                      <svg className="whys__ring" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="19" />
                        <circle id="whysRing" cx="22" cy="22" r="19" pathLength="100" />
                      </svg>{" "}
                      <span className="whys__count" dangerouslySetInnerHTML={{ __html: c.h("why.count") }} />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="track__meter" aria-hidden="true">
                <span id="trackMeter" />
              </div>{" "}
              <div className="track__rail wha__rail" id="trackRail">
                <figure className="wha__card wha__card--quote">
                  <span className="whys__glow" aria-hidden="true" />{" "}
                  <span className="wha__qmark" aria-hidden="true">{c.t("why.qmark")}</span>{" "}
                  <blockquote>{c.t("why.quote")}</blockquote>{" "}
                  <figcaption>
                    <span className="avatar" aria-hidden="true">{c.t("why.avatar")}</span>{" "}
                    <div dangerouslySetInnerHTML={{ __html: c.h("why.block") }} />
                  </figcaption>
                </figure>
                {c.l("why.cardList").map((it, i) => (
                  <Fragment key={i}>
                    <article className="wha__card whys__card--light">
                      <span className="whys__glow" aria-hidden="true" />{" "}
                      <div className="whys__row">
                        <span className="whys__ico" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="26" height="26" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                        </span>{" "}
                        <span className="whys__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                      </div>{" "}
                      <div className="whys__txt">
                        <span className="whys__k">{"Commitment " + String(i + 1).padStart(2, "0")}</span>{" "}
                        <h3>{it.t("subheading")}</h3>
                        <p>{it.t("text")}</p>
                      </div>
                    </article>
                  </Fragment>
                ))}{" "}
                <div className="wha__card wha__card--end">
                  <a href={c.a("why.buttonLink")} className="btn btn--primary magnetic">
                    <span>{c.t("why.buttonText")}</span>
                    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ============ TEAM ============ */}
        <section className="section section--team tmx" id="about">
          {/* Sticky background: stays put while the content below scrolls over it.
             Add the photo as assets/img/team-bg.jpg (wide, ~2400px); the CSS
             already points at it and falls back to the gradient without it.
          */}
          <div className="tmx__bg" aria-hidden="true">
            <div className="tmx__img" />
            <div className="tmx__shade" />
          </div>{" "}
          <div className="container tmx__inner">
            <div className="team__copy tmx__copy">
              <span className="eyebrow reveal">{c.t("about.eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("about.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("about.titleLine2")}</span>
                </span>
              </h2>
              <p className="section__sub reveal" data-delay="2">{c.t("about.sub")}</p>{" "}
              <div className="team__roster reveal" data-delay="3">
                <span className="about__people" aria-hidden="true" dangerouslySetInnerHTML={{ __html: c.h("about.people") }} />{" "}
                <span>{c.t("about.text")}</span>
              </div>
            </div>
          </div>
        </section>
        {/* ============ INSIGHTS — featured article + two more ============ */}
        <section className="section section--blog section--band" id="blog">
          <div className="container">
            <div className="section__head section__head--row">
              <div>
                <span className="eyebrow reveal">{c.t("blog.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i" dangerouslySetInnerHTML={{ __html: c.h("blog.titleLine") }} />
                  </span>
                </h2>
              </div>{" "}
              <a href={c.a("blog.buttonLink")} className="btn btn--text reveal" data-delay="2">{c.t("blog.button")}</a>
            </div>{" "}
            {/* One featured article beside two more. Covers wipe up into place as
               they arrive; on hover the cover zooms, the title underlines and the
               arrow turns.
            */}
            <HomeInsights />
          </div>
        </section>
        {/* ============ CTA ============
           The same "Start Here" card that closes every other page.
        */}
        <section className="section" id="contact">
          <div className="container">
            <div className="join reveal reveal--zoom">
              <div className="join__glow" aria-hidden="true" />{" "}
              <span className="eyebrow">{c.t("contact.eyebrow")}</span>{" "}
              <h2 dangerouslySetInnerHTML={{ __html: c.h("contact.heading") }} />
              <p>{c.t("contact.text")}</p>{" "}
              <a href={c.a("contact.buttonLink")} className="btn btn--primary magnetic">
                {" "}
                <span>{c.t("contact.buttonText")}</span>{" "}
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
