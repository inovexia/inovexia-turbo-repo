import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import TechGlobe from '@/components/TechGlobe';

export const metadata = {
  title: 'Page not found — Inovexia Software',
  robots: 'noindex',
};

/* Built from the design's own banner parts (.phero, .crumb, .btn) so it sits
   in the site like any other page; the WebGL tech globe fills the right side. */
export default function NotFound() {
  return (
    <>
      <BodyClass name="page-notfound" />
      <SiteTop />
      <Header />
      <main id="main">
        <section className="phero" id="top">
          <div className="hero__grid" aria-hidden="true" />{' '}
          <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{' '}
          <div className="container tw:grid tw:items-center tw:gap-10 tw:lg:grid-cols-2">
            <div className="phero__in">
              <nav className="crumb reveal" aria-label="Breadcrumb">
                <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">404</span>
              </nav>
              <h1 className="phero__title phero__title--sm" data-mask="">
                <span className="m" style={{ '--i': '0' }}>
                  <span className="m__i">This page has</span>
                </span>{' '}
                <span className="m" style={{ '--i': '1' }}>
                  <span className="m__i grad">moved or gone.</span>
                </span>
              </h1>
              <p className="phero__lead reveal" data-delay="2">
                The link may be old, or the address mistyped. Everything we build is still a click away.
              </p>
              <div className="hero__actions reveal" data-delay="3">
                <a href="/" className="btn btn--primary magnetic">
                  <span>Back to Home</span>
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>{' '}
                <a href="/services" className="btn btn--ghost">Explore Services</a>
              </div>
            </div>
            <TechGlobe className="tw:block tw:h-[340px] tw:w-full tw:touch-none tw:sm:h-[440px]" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
