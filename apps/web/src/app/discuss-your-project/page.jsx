import BodyClass from '@/components/site/BodyClass';
import SiteTop from '@/components/site/SiteTop';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import DiscussForm from './DiscussForm';

export const metadata = {
  title: 'Discuss Your Project — Inovexia Software',
  description: 'Tell us about your website, app, e-commerce or software project. A specialist reviews your brief and replies within one business day with a recommendation, a rough timeline and an honest budget range.',
  alternates: { canonical: 'https://inovexiasoftware.com/discuss-your-project' },
  openGraph: {
    title: 'Discuss Your Project — Inovexia Software',
    description: 'Share your project brief and get a recommendation, rough timeline and honest budget range within one business day.',
    type: 'website',
    url: 'https://inovexiasoftware.com/discuss-your-project',
  },
};

const EXPECT = [
  {
    label: 'Reply within one business day',
    icon: <><circle cx="12" cy="12.6" r="8.2" /><path d="M12 8.2v4.4l2.9 1.8" /><path d="M9.2 2.6h5.6" /></>,
  },
  {
    label: 'A specialist, not a sales script',
    icon: <><circle cx="9" cy="8.2" r="3.4" /><path d="M3.2 19.5a5.8 5.8 0 0 1 11.6 0" /><path d="M16.2 5.2a3.2 3.2 0 0 1 0 6" /><path d="M17.4 14.4a5.6 5.6 0 0 1 3.4 5.1" /></>,
  },
  {
    label: 'Honest timeline & budget range',
    icon: <><path d="M5 20V4M12 20v-7M19 20V9" /><circle cx="5" cy="8.5" r="2.1" /><circle cx="12" cy="17.4" r="2.1" /><circle cx="19" cy="6" r="2.1" /></>,
  },
  {
    label: 'Your details stay confidential',
    icon: <><rect x="4.5" y="10.5" width="15" height="10" rx="2.2" /><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" /><path d="M12 14.6v2" /></>,
  },
];

/* Discuss Your Project — where the single service pages send visitors who
   are ready to talk. The .chero split from Get in Touch: the pitch on the
   left, the three-step brief on the right. */
export default function DiscussYourProjectPage() {
  return (
    <>
      <BodyClass name="page-quote page-discuss" />
      <SiteTop />
      <Header />
      <main id="main">
        <section className="chero" id="top">
          <div className="hero__grid" aria-hidden="true" />{' '}
          <div className="glow-blob glow-blob--a" aria-hidden="true" data-parallax="0.06" />{' '}
          <div className="container">
            <div className="chero__grid">
              <div className="chero__copy">
                <nav className="crumb reveal" aria-label="Breadcrumb">
                  <a href="/">Home</a> <span aria-hidden="true">/</span> <span aria-current="page">Discuss Your Project</span>
                </nav>
                <h1 className="phero__title phero__title--xs" data-mask="">
                  <span className="m" style={{ '--i': '0' }}>
                    <span className="m__i">Discuss Your Project</span>
                  </span>{' '}
                  <span className="m" style={{ '--i': '1' }}>
                    <span className="m__i grad">and let’s build it right.</span>
                  </span>
                </h1>
                <p className="phero__tag reveal" data-delay="2">Three short steps. One clear plan.</p>
                <p className="chero__lead reveal" data-delay="3">
                  Tell us who you are, what you want to build or improve, and where the project stands. A project specialist
                  reviews every brief personally and comes back with a recommendation, a rough timeline and an honest budget range.
                </p>
                <div className="gwhy reveal" data-delay="4">
                  <p className="gwhy__label">What to expect</p>
                  <ul className="gwhy__list dsp-expect">
                    {EXPECT.map((x) => (
                      <li key={x.label}>
                        <span className="gwhy__ico" aria-hidden="true"><svg viewBox="0 0 24 24">{x.icon}</svg></span>
                        {x.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="reveal reveal--right" data-delay="2">
                <DiscussForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
