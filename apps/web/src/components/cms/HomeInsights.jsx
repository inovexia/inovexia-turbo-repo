import { Fragment } from 'react';
import { entryUrl } from '@inovexia/content';
import { formatDate, getEntries } from '@/lib/cms/content';
import { postTitle } from './BlogCards';

const UpRight = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path d="M6 14 14 6M7.4 6H14v6.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Meta({ p }) {
  const date = p.fields.date || (p.createdAt ? String(p.createdAt).slice(0, 10) : '');
  return (
    <span className="bx__meta">
      <span className="bx__tag">{p.fields.category}</span>
      {date && <time dateTime={date}>{formatDate(date)}</time>}
    </span>
  );
}
function Cover({ p, small }) {
  const img = p.fields.homeImage?.src ? p.fields.homeImage : p.fields.cardImage?.src ? p.fields.cardImage : p.fields.articleImage || {};
  const tag = <img src={img.src} alt={img.alt || ''} width={img.width || 1200} height={img.height || 750} loading="lazy" decoding="async" />;
  return small ? <span className="bx__cover bx__cover--sm">{tag}</span> : tag;
}

/* Homepage "Insights": the featured homepage post beside the next two. */
export default async function HomeInsights() {
  const posts = (await getEntries('blog')).filter((p) => p.fields.showOnHome);
  const feat = posts.find((p) => p.fields.featured) || posts[0];
  const side = posts.filter((p) => p !== feat).slice(0, 2);
  return (
    <div className="bx">
      {feat && (
        <a href={entryUrl(feat)} className="bx__feat reveal" data-cursor="READ">
          {" "}
          <span className="bx__cover">
            {" "}
            <Cover p={feat} />{" "}
            <span className="bx__flag">Featured</span>{" "}
          </span>{" "}
          <Meta p={feat} />{" "}
          <h3>
            <span>{postTitle(feat)}</span>
          </h3>{" "}
          <span className="bx__sub">{feat.fields.homeSummary || feat.fields.excerpt}</span>{" "}
          <span className="bx__more">
            Read Full Article{" "}
            <i>
              <UpRight />
            </i>
          </span>{" "}
        </a>
      )}{" "}
      <div className="bx__side">
        {side.map((p, i) => (
          <Fragment key={p.slug}>
            {i > 0 && ' '}
            <a href={entryUrl(p)} className="bx__item reveal" data-delay={String(i + 1)} data-cursor="READ">
              {" "}
              <Cover p={p} small />{" "}
              <span className="bx__body">
                {" "}
                <Meta p={p} />{" "}
                <h3>
                  <span>{postTitle(p)}</span>
                </h3>{" "}
                <span className="bx__sub">{p.fields.homeSummary || p.fields.excerpt}</span>{" "}
              </span>{" "}
              <span className="bx__go" aria-hidden="true">
                <UpRight />
              </span>{" "}
            </a>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
