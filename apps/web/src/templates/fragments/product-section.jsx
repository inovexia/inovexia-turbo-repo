// AUTO-GENERATED from INW_Variation_1/Light/product.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';

/* One instance of a repeated page fragment. `c` holds this instance's
   content, `i` its position (some classes alternate by position). */
export default function ProductSection({ c: it, i: i }) {
  return (
      <section className={i % 2 === 0 ? "section section--product prod-sec" : "section prod-sec"} id={it.a("sectionId")}>
        <div className="container">
          <div className={i % 2 === 0 ? "pd" : "pd pd--flip"}>
            <div className="pd__copy">
              <span className="prod__n reveal" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{" "}
              <span className="eyebrow reveal">{it.t("eyebrow")}</span>{" "}
              <h2 className="section__title" data-mask="">
                <span className="m" style={{ "--i": "0" }}>
                  <span className="m__i">{it.t("titleLine")}</span>
                </span>{" "}
                <span className="m" style={{ "--i": "1" }}>
                  <span className="m__i grad">{it.t("titleLine2")}</span>
                </span>
              </h2>
              <p className="section__sub reveal" data-delay="2">{it.t("sub")}</p>{" "}
              <div className="prod__stack reveal" data-delay="3">
                <h3>{it.t("subheading")}</h3>
                <ul className="chips">
                  {it.l("itemList").map((it2, i2) => (
                    <Fragment key={i2}>
                      {i2 > 0 && " "}
                      <li>{it2.t("item")}</li>
                    </Fragment>
                  ))}
                </ul>
              </div>{" "}
              <a href={it.a("buttonLink")} className="btn btn--primary magnetic reveal" data-delay="4">
                {" "}
                <span>{it.t("buttonText")}</span>{" "}
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>{" "}
              </a>
            </div>{" "}
            {/* The real product in a browser window, as on the homepage's app section. */}
            {/* The real product in a browser window, and its app in the phone as a
               slider (runPdSlider in the page script): arrows, dots, swipe and
               keys; it steps on its own while on screen and pauses on hover.
            */}
            <div className="pd__vis pd-slider reveal reveal--zoom" data-delay="2" role="group" aria-roledescription="carousel" aria-label={it.a("visLabel")}>
              <div className="pd__stage">
                <div className="pd__glow" aria-hidden="true" />{" "}
                <figure className="pd__win">
                  <div className="pd__bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{it.t("text")}</span>
                  </div>{" "}
                  <div className="pd-wslides">
                    <img className="pd-wslide is-active" src={it.a("image")} alt={it.a("imageAlt")} data-url={it.t("imageUrl")} width={it.a("imageWidth")} height={it.a("imageHeight")} loading="eager" decoding="async" />{" "}
                    {it.l("pdWslideList").map((it2, i2) => (
                      <Fragment key={i2}>
                        {i2 > 0 && " "}
                        <img className="pd-wslide" src={it2.a("image")} alt={it2.a("imageAlt")} data-url={it2.t("imageUrl")} width="1410" height="736" loading="lazy" decoding="async" aria-hidden="true" />
                      </Fragment>
                    ))}
                  </div>
                </figure>{" "}
                <div className="pd__phone">
                  <div className="pd-slider__win">
                    <div className="pd-slider__track">
                      <img className="pd-slide is-active" src={it.a("image2")} alt={it.a("imageAlt2")} data-cap={it.t("imageCap")} width="360" height="780" loading="eager" decoding="async" />{" "}
                      {it.l("pdSlideList").map((it2, i2) => (
                        <Fragment key={i2}>
                          {i2 > 0 && " "}
                          <img className="pd-slide" src={it2.a("image")} alt={it2.a("imageAlt")} data-cap={it2.t("imageCap")} width="360" height="780" loading="lazy" decoding="async" aria-hidden="true" />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>{" "}
                <div className="pd__chip" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("chip") }} />
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
                <p className="pd-slider__cap" aria-live="polite">{it.t("cap")}</p>
              </div>
            </div>
          </div>{" "}
          <div className="pd__feats" data-stagger="">
            {it.l("featureList").map((it2, i2) => (
              <Fragment key={i2}>
                <article className="feat glint reveal">
                  <span className="feat__n" aria-hidden="true">{String(i2 + 1).padStart(2, "0")}</span>{" "}
                  <span className="feat__ico" aria-hidden="true">
                    {" "}
                    <svg viewBox="0 0 24 24" width="22" height="22" dangerouslySetInnerHTML={{ __html: it2.h("icon") }} />{" "}
                  </span>{" "}
                  <h3>{it2.t("subheading")}</h3>
                  <p>{it2.t("text")}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
  );
}
