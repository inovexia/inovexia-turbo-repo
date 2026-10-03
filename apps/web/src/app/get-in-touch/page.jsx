// AUTO-GENERATED from INW_Variation_1/Light/get-in-touch.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';


const META = {
  "title": "Get in Touch | Inovexia Software",
  "description": "Get in touch with Inovexia about your website, app or software project. Share your details and we reply within one business day.",
  "openGraph": {
    "title": "Get in Touch | Inovexia Software",
    "description": "Get in touch with Inovexia about your website, app or software project. Share your details and we reply within one business day.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("get-in-touch", META);
}

export default async function Page() {
  const c = await loadPage("get-in-touch");
  return (
    <>
      <BodyClass name="page-quote" scripts="get-in-touch" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .form--quote .form__head,\n  .form--quote .field,\n  .form--quote .form__foot { opacity: 1 !important; transform: none !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/get-in-touch" currentValue="page" />
      <main id="main">
        {/* ============ BANNER + FORM ============
           One section, not two. Someone who opened a page called "Get a Quote"
           should not have to scroll to reach the form — the same reasoning as
           contact.html, and the same .chero split it already ships. The banner
           therefore carries no CTA of its own: the thing it would have pointed at
           is already on screen beside it.

           The form reuses the contact page's .form kit verbatim, including the ids
           — same #contactForm, same cf* fields, same #contactMsg — so main.js
           validates it without a line of change. Budget and Timeline have no rule
           in that handler, which is correct: they are the two optional fields.
        */}
        <section className="chero" id="top">
          <div className="hero__grid" aria-hidden="true" />{" "}
          <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{" "}
          <div className="container">
            <div className="chero__grid" id="quote-form">
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
                <p className="phero__tag reveal" data-delay="2">{c.t("top.tag")}</p>
                <p className="chero__lead reveal" data-delay="3">{c.t("top.lead")}</p>{" "}
                <div className="gwhy reveal" data-delay="4">
                  <p className="gwhy__label">{c.t("top.label")}</p>
                  <ul className="gwhy__list">
                    {c.l("top.itemList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <li>
                          <span className="gwhy__ico" aria-hidden="true">
                            <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                          </span>
                          {it.t("itemText")}
                        </li>
                      </Fragment>
                    ))}
                  </ul>
                </div>
              </div>{" "}
              <form className="form form--hero form--quote reveal reveal--right" id="gitForm" noValidate>
                <div className="form__head" style={{ "--d": "0" }}>
                  <span className="eyebrow">{c.t("top.eyebrow")}</span>{" "}
                  <h2>{c.t("top.heading")}</h2>
                </div>{" "}
                <div className="form__row">
                  {c.l("top.fieldList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <div className="field" style={{ "--d": String(i + 1) }}>
                        <label htmlFor={it.a("labelFor")}>
                          {it.t("labelText")}{" "}
                          <span className="req" aria-hidden="true">{it.t("req")}</span>
                        </label>{" "}
                        <input id={it.a("inputId")} name={it.a("inputName")} type={it.a("inputType")} autoComplete={it.a("inputAutocomplete")} placeholder={it.a("inputPlaceholder")} aria-describedby={it.a("inputDescribedby")} required />{" "}
                        <p className="field__err" id={it.a("errId")} role="alert" />
                      </div>
                    </Fragment>
                  ))}
                </div>{" "}
                <div className="form__row">
                  <div className="field" style={{ "--d": "3" }}>
                    <label htmlFor="gitMobile">
                      {c.t("top.labelText")}{" "}
                      <span className="opt">{c.t("top.opt")}</span>
                    </label>{" "}
                    <input id="gitMobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 00000 00000" aria-describedby="gitMobileErr" />{" "}
                    <p className="field__err" id="gitMobileErr" role="alert" />
                  </div>{" "}
                  <div className="field" style={{ "--d": "3" }}>
                    <label htmlFor="gitCompany">
                      {c.t("top.labelText2")}{" "}
                      <span className="opt">{c.t("top.opt2")}</span>
                    </label>{" "}
                    <input id="gitCompany" name="company" type="text" autoComplete="organization" placeholder="Your company" />
                  </div>
                </div>{" "}
                <div className="field field--sel" style={{ "--d": "4" }}>
                  <label htmlFor="gitService">
                    {c.t("top.labelText3")}{" "}
                    <span className="req" aria-hidden="true">{c.t("top.req")}</span>
                  </label>{" "}
                  <select id="gitService" name="service" aria-describedby="gitServiceErr" required>
                    {c.l("top.optionList").map((it, i) => (
                      <Fragment key={i}>
                        {i > 0 && " "}
                        <option value={it.a("optionValue") || undefined}>{it.t("optionText")}</option>
                      </Fragment>
                    ))}
                  </select>{" "}
                  <p className="field__err" id="gitServiceErr" role="alert" />
                </div>{" "}
                <div className="field" style={{ "--d": "5" }}>
                  <label htmlFor="gitDetails">
                    {c.t("top.labelText4")}{" "}
                    <span className="req" aria-hidden="true">{c.t("top.req2")}</span>
                  </label>{" "}
                  <textarea id="gitDetails" name="details" placeholder="Tell us what you need: the service, your goals and any timeline or budget in mind." aria-describedby="gitDetailsErr" required />{" "}
                  <p className="field__err" id="gitDetailsErr" role="alert" />
                </div>{" "}
                {/* Captcha: a sum drawn on a canvas (not in the page text), plus a
                   hidden field that only bots fill in. No third-party service.
                */}
                <div className="field" style={{ "--d": "6" }}>
                  <label htmlFor="gitCaptcha">
                    {c.t("top.labelText5")}{" "}
                    <span className="req" aria-hidden="true">{c.t("top.req3")}</span>
                  </label>{" "}
                  <div className="gcap">
                    <canvas className="gcap__img" id="gitCaptchaImg" width="150" height="48" role="img" aria-label="Captcha: a simple sum" />{" "}
                    <button type="button" className="gcap__new" id="gitCaptchaNew" aria-label="Show a new sum">
                      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                        <path d="M20 11a8 8 0 1 0-2.3 5.7" />
                        <path d="M20 4v7h-7" />
                      </svg>
                    </button>{" "}
                    <input id="gitCaptcha" name="captcha" type="text" inputMode="numeric" autoComplete="off" placeholder="Answer" aria-describedby="gitCaptchaHint gitCaptchaErr" required />
                  </div>{" "}
                  <p className="gcap__hint" id="gitCaptchaHint">{c.t("top.hint")}</p>
                  <p className="field__err" id="gitCaptchaErr" role="alert" />
                </div>{" "}
                <div className="gcap__trap" aria-hidden="true">
                  <label htmlFor="gitWebsite">{c.t("top.label2")}</label>{" "}
                  <input id="gitWebsite" name="website" type="text" tabIndex="-1" autoComplete="off" />
                </div>{" "}
                <div className="form__foot" style={{ "--d": "7" }}>
                  <button className="btn btn--primary magnetic" type="submit">
                    <span>{c.t("top.buttonText")}</span>{" "}
                    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>{" "}
                  <p className="form__note">{c.t("top.note")}</p>
                  <p className="form__msg" id="gitMsg" role="status" aria-live="polite" />
                </div>
              </form>
              {/* inline script moved to src/lib/runtime/pages/get-in-touch-1.js */}
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
