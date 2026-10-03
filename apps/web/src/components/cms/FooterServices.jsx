import { Fragment } from 'react';
import { getEntries } from '@/lib/cms/content';
import { serviceHref } from './links';

/* Footer "Services" column: services marked "show in the footer". */
export default async function FooterServices() {
  const items = (await getEntries('service'))
    .filter((s) => s.fields.showInFooter)
    .sort((a, b) => (a.fields.footerOrder ?? 99) - (b.fields.footerOrder ?? 99));
  return (
    <ul>
      {items.map((s, i) => (
        <Fragment key={s.slug}>
          {i > 0 && ' '}
          <li>
            <a href={serviceHref(s, 'footer')}>{s.fields.footerLabel || s.fields.name}</a>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
