import { Fragment } from 'react';
import { getEntries, pad2 } from '@/lib/cms/content';
import { serviceHref } from './links';

/* Services page: the sticky numbered index beside every service's card.
   Markup as the design's .svcx block. */
export default async function ServicesIndex() {
  const items = await getEntries('service');
  const anchor = (s) => s.fields.anchor || `svc-${s.slug}`;
  return (
    <div className="svcx">
      <aside className="svcx__side">
        <div className="svcx__count reveal">
          <b>{pad2(items.length)}</b>
          <span>services</span>
        </div>{" "}
        <ul className="svcx__index" data-stagger="">
          {items.map((s, i) => (
            <Fragment key={s.slug}>
              {i > 0 && ' '}
              <li className="reveal">
                <a href={`#${anchor(s)}`}>
                  <em>{pad2(i + 1)}</em>{" "}
                  {s.fields.indexLabel || s.fields.name}
                </a>
              </li>
            </Fragment>
          ))}
        </ul>
      </aside>{" "}
      <div className="svcx__list" data-stagger="">
        {items.map((s, i) => (
          <article key={s.slug} className="srv glint reveal reveal--right" id={anchor(s)} data-cursor="VIEW">
            <div className="srv__head">
              <span className="srv__ico" aria-hidden="true">
                {" "}
                <svg viewBox="0 0 24 24" width="23" height="23" dangerouslySetInnerHTML={{ __html: s.fields.icon || '' }} />{" "}
              </span>{" "}
              <h3>{s.fields.name}</h3>{" "}
              <span className="srv__n" aria-hidden="true">{pad2(i + 1)}</span>
            </div>{" "}
            <p dangerouslySetInnerHTML={{ __html: s.fields.description || '' }} />
            <ul className="srv__feat">
              {(s.fields.features || []).map((f, j) => (
                <Fragment key={j}>
                  {j > 0 && ' '}
                  <li>
                    <span className="tick" aria-hidden="true" />{" "}
                    {f}
                  </li>
                </Fragment>
              ))}
            </ul>{" "}
            <a href={serviceHref(s, 'services')} className="btn btn--text srv__more">
              Explore Service{" "}
              <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
                <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>{" "}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
