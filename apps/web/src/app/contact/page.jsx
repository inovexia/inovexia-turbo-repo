// AUTO-GENERATED from INW_Variation_1/Light/contact.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { loadPage, pageMetadata } from '@/lib/cms/content';


const META = {
  "title": "Contact Us | Web Design, Development & Digital Solutions Company",
  "description": "Contact our web design and development team for website development, mobile apps, eCommerce solutions, UI/UX design, and digital transformation services. Get a free consultation today.",
  "openGraph": {
    "title": "Contact Us | Web Design, Development & Digital Solutions Company",
    "description": "Planning a website, mobile app, eCommerce platform or custom software? Reach out and we'll turn your ideas into powerful digital experiences.",
    "type": "website"
  }
};

export async function generateMetadata() {
  return pageMetadata("contact", META);
}

export default async function Page() {
  const c = await loadPage("contact");
  return (
    <>
      <BodyClass name="page-contact" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  /* with no JS to drive it, every answer stays open rather than unreachable */\n  .faq__a { grid-template-rows: 1fr !important; }\n  .faq__ico { display: none !important; }\n</style>" }} />
      <SiteTop />
      <Header current="/contact" currentValue="page" />
      <main id="main">
        {/* ============ BANNER ============
           Same shape as the Services banner. The form has its own section below.
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
        {/* ============ GET IN TOUCH ============
           Ways to reach us beside the form. Details come first in the source:
           some visitors only want the phone number and should not have to tab
           through a form to reach it.
        */}
        <section className="section section--product" id="enquiry">
          <div className="container">
            <div className="chero__grid ctx">
              <div className="ctx__copy">
                <span className="eyebrow reveal">{c.t("enquiry.eyebrow")}</span>{" "}
                <h2 className="section__title" data-mask="">
                  <span className="m" style={{ "--i": "0" }}>
                    <span className="m__i">{c.t("enquiry.titleLine")}</span>
                  </span>{" "}
                  <span className="m" style={{ "--i": "1" }}>
                    <span className="m__i grad">{c.t("enquiry.titleLine2")}</span>
                  </span>
                </h2>
                <p className="ctx__lead reveal" data-delay="2">{c.t("enquiry.lead")}</p>
                <ul className="cinfo" data-stagger="">
                  {c.l("enquiry.itemList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <li className="cinfo__item glint reveal reveal--left">
                        <span className="cinfo__ico" aria-hidden="true">
                          {" "}
                          <svg viewBox="0 0 24 24" width="21" height="21" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />{" "}
                        </span>{" "}
                        <span className="cinfo__txt" dangerouslySetInnerHTML={{ __html: it.h("txt") }} />
                      </li>
                    </Fragment>
                  ))}{" "}
                  <li className="cinfo__item glint reveal reveal--left">
                    <span className="cinfo__ico cinfo__ico--wa" aria-hidden="true">
                      {" "}
                      <svg viewBox="0 0 24 24" width="21" height="21">
                        <path d="M3.5 20.5l1.3-4.2A8.2 8.2 0 1 1 8 19.3z" />
                        <path d="M8.8 9.1c.2 1.3.8 2.5 1.8 3.4s2.2 1.5 3.4 1.7l.9-1.4 2 .9v1.5c-.1.5-.6.9-1.1.8a8.6 8.6 0 0 1-7.2-7.2c-.1-.5.3-1 .8-1.1h1.5l.9 2z" />
                      </svg>{" "}
                    </span>{" "}
                    <span className="cinfo__txt" dangerouslySetInnerHTML={{ __html: c.h("enquiry.txt") }} />
                  </li>
                </ul>
              </div>{" "}
              <form className="form form--hero reveal reveal--right" id="contactForm" noValidate data-stagger="">
                <div className="form__head reveal">
                  <h2 className="uline">{c.t("enquiry.uline")}</h2>
                  <p>{c.t("enquiry.text")}</p>
                </div>{" "}
                <div className="form__row">
                  {c.l("enquiry.fieldList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <div className="field reveal">
                        <label htmlFor={it.a("labelFor")}>{it.t("label")}</label>{" "}
                        <input id={it.a("inputId")} name={it.a("inputName")} type={it.a("inputType")} autoComplete={it.a("inputAutocomplete")} placeholder={it.a("inputPlaceholder")} aria-describedby={it.a("inputDescribedby")} required />{" "}
                        <p className="field__err" id={it.a("errId")} role="alert" />
                      </div>
                    </Fragment>
                  ))}
                </div>{" "}
                <div className="form__row">
                  <div className="field reveal">
                    <label htmlFor="cfPhone">{c.t("enquiry.label")}</label>{" "}
                    <input id="cfPhone" name="phone" type="tel" autoComplete="tel" placeholder="+91 00000 00000" aria-describedby="cfPhoneErr" required />{" "}
                    <p className="field__err" id="cfPhoneErr" role="alert" />
                  </div>{" "}
                  <div className="field field--sel reveal">
                    <label htmlFor="cfService">{c.t("enquiry.label2")}</label>{" "}
                    <select id="cfService" name="service" aria-describedby="cfServiceErr" required>
                      {c.l("enquiry.optionList").map((it, i) => (
                        <Fragment key={i}>
                          {i > 0 && " "}
                          <option value={it.a("optionValue") || undefined}>{it.t("optionText")}</option>
                        </Fragment>
                      ))}
                    </select>{" "}
                    <p className="field__err" id="cfServiceErr" role="alert" />
                  </div>
                </div>{" "}
                <div className="field reveal">
                  <label htmlFor="cfMessage">{c.t("enquiry.label3")}</label>{" "}
                  <textarea id="cfMessage" name="message" placeholder="Tell us about your project — what you need, roughly when, and any budget range you have in mind." aria-describedby="cfMessageErr" required />{" "}
                  <p className="field__err" id="cfMessageErr" role="alert" />
                </div>{" "}
                <div className="form__foot reveal">
                  <button className="btn btn--primary magnetic" type="submit">
                    <span>{c.t("enquiry.buttonText")}</span>{" "}
                    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                      <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>{" "}
                  <p className="form__note">{c.t("enquiry.note")}</p>
                </div>{" "}
                <p className="form__msg" id="contactMsg" role="status" aria-live="polite" />
              </form>
            </div>
          </div>
        </section>
        {/* ============ FAQ ============ */}
        <section className="section" id="faq">
          <div className="container">
            <div className="section__head">
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
                      <button className="faq__q" type="button" aria-expanded="false" aria-controls={"faq-a" + String(i + 1)}>
                        <span>{it.t("text")}</span>{" "}
                        <span className="faq__ico" aria-hidden="true" />
                      </button>
                    </h3>{" "}
                    <div className="faq__a" id={"faq-a" + String(i + 1)} role="region" aria-label={it.a("blockLabel")}>
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
