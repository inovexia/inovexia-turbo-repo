// AUTO-GENERATED from INW_Variation_1/Light/index.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import { loadPage } from '@/lib/cms/content';
import FooterServices from '@/components/cms/FooterServices';

/* The site footer. Its text and links are the "Site-wide" content; the
   Services column lists the services marked "show in footer". */
export default async function Footer() {
  const c = await loadPage('global');
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href={c.a("footer.logoLink")} className="logo" aria-label="Inovexia home">
              {" "}
              <img className="logo__img logo__img--on-dark" src={c.a("footer.image")} alt={c.a("footer.imageAlt")} width="174" height="40" />{" "}
              <img className="logo__img logo__img--on-light" src={c.a("footer.image2")} alt={c.a("footer.imageAlt2")} width="174" height="40" />{" "}
            </a>{" "}
            <p>{c.t("footer.text")}</p>
            <ul className="footer__reach">
              {c.l("footer.itemList").map((it, i) => (
                <Fragment key={i}>
                  {i > 0 && " "}
                  <li dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                </Fragment>
              ))}
            </ul>
          </div>{" "}
          <nav className="footer__cols" aria-label="Footer">
            <div className="footer__col">
              <h4>{c.t("footer.subheading")}</h4>
              <FooterServices />
            </div>{" "}
            <div className="footer__col">
              <h4>{c.t("footer.subheading2")}</h4>
              <ul>
                {c.l("footer.itemList2").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                  </Fragment>
                ))}
              </ul>
            </div>{" "}
            <div className="footer__col">
              <h4>{c.t("footer.subheading3")}</h4>
              <ul>
                {c.l("footer.itemList3").map((it, i) => (
                  <Fragment key={i}>
                    {i > 0 && " "}
                    <li dangerouslySetInnerHTML={{ __html: it.h("item") }} />
                  </Fragment>
                ))}
              </ul>
            </div>
          </nav>
        </div>{" "}
        <div className="footer__bottom">
          <p dangerouslySetInnerHTML={{ __html: c.h("footer.text2") }} />
        </div>
      </div>{" "}
      <div className="footer__wordmark" aria-hidden="true" data-parallax="0.12">{c.t("footer.wordmark")}</div>
    </footer>
  );
}
