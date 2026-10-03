import { entryUrl } from '@inovexia/content';

/* Where a service points from each place it is listed. A service with its
   own page always links there; one without links to its card on the
   Services page (homepage, footer) or to Discuss Your Project (from the
   Services page itself, where its card already is). */
export function serviceHref(s, from) {
  const page = entryUrl(s);
  if (page) return page;
  if (from === 'services') return `/discuss-your-project?service=${s.slug}`;
  return `/services#${s.fields.anchor || `svc-${s.slug}`}`;
}

/* A case study without its own page links to the case studies page. */
export const caseHref = (c) => entryUrl(c) || '/case-studies';
