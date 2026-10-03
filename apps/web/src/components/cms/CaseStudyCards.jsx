import { Fragment } from 'react';
import { getEntries, pad2 } from '@/lib/cms/content';
import { caseHref } from './links';

const Go = ({ size }) => (
  <svg viewBox="0 0 20 20" width={size} height={size}>
    <path d={size === 17 ? 'M4 10h11M11 5.5 15.5 10 11 14.5' : 'M6 14 14 6M7.4 6H14v6.6'} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Img = ({ img }) => (img?.src ? (
  <img src={img.src} alt={img.alt || ''} width={img.width || 1200} height={img.height || 750} loading="lazy" decoding="async" />
) : null);

/* Case-study cards. variant "grid": the Case Studies page (every case
   study, with tags and filter categories; ones without a page show their
   "coming soon" text). variant "home": the homepage's three. */
export default async function CaseStudyCards({ variant = 'grid' }) {
  const all = await getEntries('case');

  if (variant === 'home') {
    const items = all.filter((c) => c.fields.showOnHome)
      .sort((a, b) => (a.fields.homeOrder ?? 99) - (b.fields.homeOrder ?? 99));
    return (
      <div className="work" id="wkgrid" data-stagger="">
        {items.map((c) => (
          <article key={c.slug} className="work__item work__item--eq reveal" data-cat={(c.fields.homeCategories || []).join(' ')} data-cursor="VIEW">
            <a href={caseHref(c)} className="work__link">
              {" "}
              <div className={`work__cover work__cover--${c.fields.homeCoverStyle || c.fields.coverStyle || 1} work__cover--shot`} aria-hidden="true">
                <Img img={c.fields.homeImage?.src ? c.fields.homeImage : c.fields.image} />
              </div>{" "}
              <div className="work__body">
                <h3>{c.fields.title}</h3>{" "}
                <span className="work__more">View Case Study</span>
              </div>{" "}
              <span className="work__go" aria-hidden="true">
                {" "}
                <Go size={17} />{" "}
              </span>{" "}
            </a>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="work work--grid" id="wkgrid" data-stagger="">
      {all.map((c, i) => {
        const inner = (
          <>
            <span className="work__go" aria-hidden="true">
              {" "}
              <Go size={16} />{" "}
            </span>{" "}
            <span className={`work__cover work__cover--${c.fields.coverStyle || 1} work__cover--shot`} aria-hidden="true">
              <Img img={c.fields.image} />
            </span>{" "}
            <span className="work__body">
              {" "}
              <span className="work__meta">
                {" "}
                <em className="work__idx">{pad2(i + 1)}</em>{" "}
                {(c.fields.tags || []).map((t, j) => (
                  <Fragment key={j}>
                    <span className="work__tag">{t}</span>{" "}
                  </Fragment>
                ))}
              </span>{" "}
              <h3>{c.fields.title}</h3>{" "}
              <span className="work__more">{c.template ? 'View Case Study' : c.fields.comingSoonText || 'Case study coming soon'}</span>{" "}
            </span>
          </>
        );
        return (
          <article key={c.slug} className="work__item reveal" data-cat={(c.fields.categories || []).join(' ')}>
            {c.template ? (
              <a className="work__link" href={caseHref(c)} data-cursor="VIEW" aria-label={c.fields.linkLabel || `${c.fields.title} — read the case study`}>
                {" "}
                {inner}{" "}
              </a>
            ) : (
              <div className="work__link work__link--soon">{inner}</div>
            )}
          </article>
        );
      })}
    </div>
  );
}
