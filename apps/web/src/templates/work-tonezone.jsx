// AUTO-GENERATED from INW_Variation_1/Light/work-tonezone.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';


export const META = {
  "title": "ToneZone Case Study — WooCommerce Beauty & Wellness Store | Inovexia",
  "description": "How we designed and built ToneZone, a WooCommerce store for beauty and wellness services and products: the challenge, our solution and the outcome.",
  "robots": "index, follow",
  "openGraph": {
    "title": "ToneZone Case Study — WooCommerce Beauty & Wellness Store | Inovexia",
    "description": "How we designed and built ToneZone, a WooCommerce store for beauty and wellness services and products: the challenge, our solution and the outcome.",
    "type": "website"
  }
};

export default function WorkTonezoneTemplate({ c }) {
  return (
    <>
      <BodyClass name="page-case" scripts="work-tonezone" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .tl__fill { height: 100% !important; }\n  .faq__a { grid-template-rows: 1fr !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/case-studies" currentValue="true" />
      <main id="main">
        {/* ============ BANNER + SCREENSHOT ============ */}
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
              {/* The live ToneZone site on a desk setup: monitor, laptop, tablet and
                 phone, all captured from tonezone.in. The Products page slider drives
                 the monitor (.pd-wslide) and phone (.pd-slide); the script below keeps
                 the laptop and tablet in step. Arrows, dots, swipe and keys.
              */}
              <div className="pd__vis pd-slider tzx reveal reveal--right" data-delay="2" role="group" aria-roledescription="carousel" aria-label="ToneZone website on monitor, laptop, tablet and phone">
                <div className="tzx__stage">
                  <div className="tzx__glow" aria-hidden="true" />{" "}
                  <div className="tzx__desk" aria-hidden="true" />{" "}
                  <div className="tzx__monitor">
                    <div className="tzx__bezel">
                      <div className="tzx__screen pd-wslides">
                        <img className="pd-wslide is-active" src={c.a("top.image")} alt={c.a("top.imageAlt")} width="1200" height="750" loading="eager" decoding="async" />{" "}
                        {c.l("top.pdWslideList").map((it, i) => (
                          <Fragment key={i}>
                            {i > 0 && " "}
                            <img className="pd-wslide" src={it.a("image")} alt={it.a("imageAlt")} width="1200" height="750" loading="eager" decoding="async" aria-hidden="true" />
                          </Fragment>
                        ))}
                      </div>
                    </div>{" "}
                    <div className="tzx__chin" aria-hidden="true" />{" "}
                    <div className="tzx__neck" aria-hidden="true" />{" "}
                    <div className="tzx__foot" aria-hidden="true" />
                  </div>{" "}
                  <div className="tzx__tablet">
                    <div className="tzx__screen">
                      <img className="tzx-sync is-active" src={c.a("top.image2")} alt={c.a("top.imageAlt2")} width="615" height="772" loading="eager" decoding="async" aria-hidden="true" />{" "}
                      {c.l("top.tzxSyncList").map((it, i) => (
                        <Fragment key={i}>
                          {i > 0 && " "}
                          <img className="tzx-sync" src={it.a("image")} alt={it.a("imageAlt")} width="615" height="772" loading="eager" decoding="async" aria-hidden="true" />
                        </Fragment>
                      ))}
                    </div>
                  </div>{" "}
                  <div className="tzx__laptop">
                    <div className="tzx__lid">
                      <div className="tzx__screen">
                        <img className="tzx-sync is-active" src={c.a("top.image3")} alt={c.a("top.imageAlt3")} width="1200" height="750" loading="eager" decoding="async" aria-hidden="true" />{" "}
                        {c.l("top.tzxSyncList2").map((it, i) => (
                          <Fragment key={i}>
                            {i > 0 && " "}
                            <img className="tzx-sync" src={it.a("image")} alt={it.a("imageAlt")} width="1200" height="750" loading="eager" decoding="async" aria-hidden="true" />
                          </Fragment>
                        ))}
                      </div>
                    </div>{" "}
                    <div className="tzx__deck" aria-hidden="true">
                      <i />
                    </div>
                  </div>{" "}
                  <div className="tzx__phone">
                    <span className="tzx__notch" aria-hidden="true" />
                    <div className="pd-slider__win">
                      <div className="pd-slider__track">
                        <img className="pd-slide is-active" src={c.a("top.image4")} alt={c.a("top.imageAlt4")} data-cap={c.t("top.imageCap")} width="540" height="1169" loading="eager" decoding="async" />{" "}
                        {c.l("top.pdSlideList").map((it, i) => (
                          <Fragment key={i}>
                            {i > 0 && " "}
                            <img className="pd-slide" src={it.a("image")} alt={it.a("imageAlt")} data-cap={it.t("imageCap")} width="540" height="1169" loading="eager" decoding="async" aria-hidden="true" />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="pd__chip tzx__chip" aria-hidden="true" dangerouslySetInnerHTML={{ __html: c.h("top.chip") }} />
                </div>{" "}
                <div className="pd-slider__foot">
                  <button className="pd-slider__btn" type="button" data-step="-1" aria-label="Previous screen">
                    <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                      <path d="M12 4.5 6.5 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>{" "}
                  <div className="pd-slider__dots" />{" "}
                  <button className="pd-slider__btn" type="button" data-step="1" aria-label="Next screen">
                    <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                      <path d="m8 4.5 5.5 5.5L8 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>{" "}
                  <p className="pd-slider__cap" aria-live="polite">{c.t("top.cap")}</p>
                </div>
                {/* inline script moved to src/lib/runtime/pages/work-tonezone-1.js */}
              </div>
            </div>
          </div>
        </section>
        {/* ============ OVERVIEW ============
           The story and a project snapshot side by side.
        */}
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
        {/* ============ CHALLENGE / SOLUTION ============
           The .cmp split from the service page, used for what it was built for:
           the difficulty on one side, the answer on the other, sharing a hairline
           so the reader is not holding one in their head while reading the other.
        */}
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
        {/* ============ OUR ROLE + STACK ============ */}
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
        {/* ============ RESULTS ============ */}
        <section className="section" id="results">
          <div className="container">
            <div className="section__head section__head--left">
              <span className="eyebrow reveal">{c.t("results.eyebrow")}</span>{" "}
              <h2 className="section__title uline" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{c.t("results.titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{c.t("results.titleLine2")}</span>
                </span>
              </h2>
            </div>{" "}
            {/* PageSpeed Insights reports for the live site, mobile and desktop.
               Each report sits in a frame the visitor can scroll with the mouse.
            */}
            <div className="psx-split">
              <div className="psx psx--slider reveal" aria-roledescription="carousel" aria-label="PageSpeed Insights reports">
                <div className="psx__nav">
                  <div className="psx__arrows">
                    <button type="button" className="psx__btn" data-step="-1" aria-label="Previous report">
                      <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                        <path d="M12 4.5 6.5 10l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>{" "}
                    <div className="psx__dots">
                      <button type="button" aria-label="Mobile report" aria-current="true" data-go="0" />
                      <button type="button" aria-label="Desktop report" data-go="1" />
                    </div>
                    <span className="psx__count" dangerouslySetInnerHTML={{ __html: c.h("results.count") }} />{" "}
                    <button type="button" className="psx__btn" data-step="1" aria-label="Next report">
                      <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                        <path d="m8 4.5 5.5 5.5L8 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>{" "}
                <div className="psx__viewport">
                  <div className="psx__track">
                    <article className="psx__card" role="group" aria-roledescription="slide">
                      <header className="psx__head">
                        <div className="psx__top">
                          <span className="psx__dev">
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                              <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
                              <path d="M10.5 5.3h3M10.8 18.4h2.4" />
                            </svg>
                            {c.t("results.devText")}
                          </span>
                          <span className="psx__meta">
                            <span className="psx__src">
                              <i />
                              {c.t("results.srcText")}
                            </span>
                            <time className="psx__date" dateTime="2026-09-29">
                              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                                <rect x="3.5" y="4.5" width="17" height="16" rx="2.4" />
                                <path d="M3.5 9.4h17M8 3v3M16 3v3" />
                              </svg>
                              {c.t("results.dateText")}
                            </time>
                          </span>
                        </div>{" "}
                        <ul className="psx__rings">
                          {c.l("results.psrList").map((it, i) => (
                            <Fragment key={i}>
                              <li className="psr psr--mid">
                                <svg viewBox="0 0 40 40" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                                <b>{it.t("bold")}</b>
                                <span>{it.t("text")}</span>
                              </li>
                            </Fragment>
                          ))}
                          <li className="psr psr--good">
                            <svg viewBox="0 0 40 40" aria-hidden="true">
                              <circle className="psr__t" cx="20" cy="20" r="16" />
                              <circle className="psr__v" cx="20" cy="20" r="16" strokeDasharray="96.5 100.5" />
                            </svg>
                            <b>{c.t("results.bold")}</b>
                            <span>{c.t("results.text")}</span>
                          </li>
                          <li className="psr psr--mid">
                            <svg viewBox="0 0 40 40" aria-hidden="true">
                              <circle className="psr__t" cx="20" cy="20" r="16" />
                              <circle className="psr__v" cx="20" cy="20" r="16" strokeDasharray="77.4 100.5" />
                            </svg>
                            <b>{c.t("results.bold2")}</b>
                            <span>{c.t("results.text2")}</span>
                          </li>
                        </ul>
                      </header>{" "}
                      <div className="psx__frame" tabIndex="0" aria-label="Mobile PageSpeed report, scroll to see all of it">
                        <div className="pd__bar" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                          <span>{c.t("results.text3")}</span>
                        </div>{" "}
                        <div className="psx__scroll">
                          <img src={c.a("results.image")} alt={c.a("results.imageAlt")} width="976" height="578" loading="lazy" decoding="async" />
                        </div>{" "}
                        <span className="psx__hint" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="14" height="14">
                            <rect x="7" y="3" width="10" height="16" rx="5" />
                            <path d="M12 7v3" />
                          </svg>
                          {c.t("results.hintText")}
                        </span>
                      </div>
                    </article>
                    <article className="psx__card" role="group" aria-roledescription="slide">
                      <header className="psx__head">
                        <div className="psx__top">
                          <span className="psx__dev">
                            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                              <rect x="3" y="4" width="18" height="12.5" rx="2" />
                              <path d="M9 20h6M12 16.5V20" />
                            </svg>
                            {c.t("results.devText2")}
                          </span>
                          <span className="psx__meta">
                            <span className="psx__src">
                              <i />
                              {c.t("results.srcText2")}
                            </span>
                            <time className="psx__date" dateTime="2026-09-29">
                              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true">
                                <rect x="3.5" y="4.5" width="17" height="16" rx="2.4" />
                                <path d="M3.5 9.4h17M8 3v3M16 3v3" />
                              </svg>
                              {c.t("results.dateText2")}
                            </time>
                          </span>
                        </div>{" "}
                        <ul className="psx__rings">
                          <li className="psr psr--low">
                            <svg viewBox="0 0 40 40" aria-hidden="true">
                              <circle className="psr__t" cx="20" cy="20" r="16" />
                              <circle className="psr__v" cx="20" cy="20" r="16" strokeDasharray="37.2 100.5" />
                            </svg>
                            <b>{c.t("results.bold3")}</b>
                            <span>{c.t("results.text4")}</span>
                          </li>
                          <li className="psr psr--mid">
                            <svg viewBox="0 0 40 40" aria-hidden="true">
                              <circle className="psr__t" cx="20" cy="20" r="16" />
                              <circle className="psr__v" cx="20" cy="20" r="16" strokeDasharray="84.4 100.5" />
                            </svg>
                            <b>{c.t("results.bold4")}</b>
                            <span>{c.t("results.text5")}</span>
                          </li>
                          <li className="psr psr--good">
                            <svg viewBox="0 0 40 40" aria-hidden="true">
                              <circle className="psr__t" cx="20" cy="20" r="16" />
                              <circle className="psr__v" cx="20" cy="20" r="16" strokeDasharray="100.5 100.5" />
                            </svg>
                            <b>{c.t("results.bold5")}</b>
                            <span>{c.t("results.text6")}</span>
                          </li>
                          <li className="psr psr--mid">
                            <svg viewBox="0 0 40 40" aria-hidden="true">
                              <circle className="psr__t" cx="20" cy="20" r="16" />
                              <circle className="psr__v" cx="20" cy="20" r="16" strokeDasharray="77.4 100.5" />
                            </svg>
                            <b>{c.t("results.bold6")}</b>
                            <span>{c.t("results.text7")}</span>
                          </li>
                        </ul>
                      </header>{" "}
                      <div className="psx__frame" tabIndex="0" aria-label="Desktop PageSpeed report, scroll to see all of it">
                        <div className="pd__bar" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                          <span>{c.t("results.text8")}</span>
                        </div>{" "}
                        <div className="psx__scroll">
                          <img src={c.a("results.image2")} alt={c.a("results.imageAlt2")} width="971" height="547" loading="lazy" decoding="async" />
                        </div>{" "}
                        <span className="psx__hint" aria-hidden="true">
                          <svg viewBox="0 0 24 24" width="14" height="14">
                            <rect x="7" y="3" width="10" height="16" rx="5" />
                            <path d="M12 7v3" />
                          </svg>
                          {c.t("results.hintText2")}
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>{" "}
              <div className="rx-copy">
                <p className="rx-lead">{c.t("results.rxLead")}</p>
                <p>{c.t("results.text9")}</p>
                <ul className="rx-points">
                  {c.l("results.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li>
                        <span className="rx-points__ico">
                          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                        </span>
                        <div dangerouslySetInnerHTML={{ __html: it.h("block") }} />
                      </li>
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
            {/* inline script moved to src/lib/runtime/pages/work-tonezone-2.js */}
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
