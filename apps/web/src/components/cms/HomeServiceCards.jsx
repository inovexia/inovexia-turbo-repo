import { Fragment } from 'react';
import { getEntries, pad2 } from '@/lib/cms/content';
import { serviceHref } from './links';

/* Homepage "Services" cards: services marked "show on the homepage", in
   their homepage order. Markup as the design's .svcg--home grid. */
export default async function HomeServiceCards() {
  const items = (await getEntries('service'))
    .filter((s) => s.fields.showOnHome)
    .sort((a, b) => (a.fields.homeOrder ?? 99) - (b.fields.homeOrder ?? 99));
  return (
    <div className="svcg svcg--home" data-stagger="">
      {items.map((s, i) => (
        <Fragment key={s.slug}>
          {i > 0 && ' '}
          <a className="svcg__card glint reveal" href={serviceHref(s, 'home')} data-cursor="VIEW">
            {" "}
            <span className="svcg__n" aria-hidden="true">{pad2(i + 1)}</span>{" "}
            <span className="svcg__ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" dangerouslySetInnerHTML={{ __html: s.fields.homeIcon || s.fields.icon || '' }} />
            </span>{" "}
            <h3>{s.fields.homeTitle || s.fields.name}</h3>
            <p dangerouslySetInnerHTML={{ __html: s.fields.homeText || '' }} />{" "}
            <span className="svcg__more">
              Explore Service{" "}
              <i>
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                  <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </i>
            </span>{" "}
          </a>
        </Fragment>
      ))}
    </div>
  );
}
