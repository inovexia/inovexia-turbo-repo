// AUTO-GENERATED from INW_Variation_1/Light/blog-seo-for-business.html by scripts/convert-html.mjs.
// Delete this line to keep hand edits — the converter then leaves the file alone.
import { Fragment } from 'react';
import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import BlogArticle from '@/components/cms/BlogArticle';
import RecentPosts from '@/components/cms/RecentPosts';

export const META = {
  "title": "What is SEO and Why Does Your Business Need It? | Inovexia",
  "description": "What search engine optimisation is, how technical, on-page and off-page SEO work together, and why it pays off for businesses of every size.",
  "robots": "index, follow",
  "openGraph": {
    "title": "What is SEO and Why Does Your Business Need It? | Inovexia",
    "description": "What search engine optimisation is, how technical, on-page and off-page SEO work together, and why it pays off for businesses of every size.",
    "type": "article"
  }
};

export default function BlogArticleTemplate({ c, post }) {
  return (
    <>
      <BodyClass name="page-article" />
      <noscript dangerouslySetInnerHTML={{ __html: "<style>\n  .reveal, [data-mask] { opacity: 1 !important; transform: none !important; }\n  .m__i { transform: none !important; }\n  .tl__fill { height: 100% !important; }\n  .faq__a { grid-template-rows: 1fr !important; }\n</style>" }} />
      <SiteTop />
      <Header />
      <main id="main">
        {/* ============ ARTICLE ============ */}
        <BlogArticle post={post} />
        {/* ============ RECENT POSTS ============
           A scroll-snap track, so it works with a trackpad, a touch drag and the
           keyboard before the buttons run at all — they only add a click target.
           The cards are .bcard from the blog index, unchanged.
        */}
        <section className="section section--product" id="recent">
          <div className="container">
            <div className="rsl" id="rsl">
              <div className="rsl__head">
                <div>
                  <span className="eyebrow reveal">{c.t("recent.eyebrow")}</span>{" "}
                  <h2 className="section__title" data-mask="">
                    <span className="m" style={{ "--i": "0" }}>
                      <span className="m__i" dangerouslySetInnerHTML={{ __html: c.h("recent.titleLine") }} />
                    </span>
                  </h2>
                </div>{" "}
                <div className="rsl__nav reveal">
                  {c.l("recent.btnList").map((it, i) => (
                    <Fragment key={i}>
                      {i > 0 && " "}
                      <button className="rsl__btn" id={it.a("btnId")} type="button" aria-label={it.a("btnLabel")}>
                        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" dangerouslySetInnerHTML={{ __html: it.h("icon") }} />
                      </button>
                    </Fragment>
                  ))}
                </div>
              </div>{" "}
              <RecentPosts current={post.slug} />
            </div>
          </div>
        </section>
        {/* ============ CTA ============ */}
        <section className="section" id="start">
          <div className="container">
            <div className="join reveal reveal--zoom">
              <div className="join__glow" aria-hidden="true" />{" "}
              <span className="eyebrow">{c.t("start.eyebrow")}</span>{" "}
              <h2>{post.fields.ctaTitle}</h2>
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
