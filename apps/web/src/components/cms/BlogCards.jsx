import { entryUrl } from '@inovexia/content';
import { getEntries } from '@/lib/cms/content';

export const UpRight = () => (
  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
    <path d="M6 14 14 6M7.4 6H14v6.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Arrow14 = () => (
  <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
    <path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const postTitle = (p) => [p.fields.titleLine1, p.fields.titleLine2].filter(Boolean).join(' ') || p.title;

/* Blogs page: every published post as a card, the featured one flagged. */
export default async function BlogCards() {
  const posts = await getEntries('blog');
  return (
    <div className="bgrid" data-stagger="">
      {posts.map((p, i) => {
        const url = entryUrl(p);
        const img = p.fields.cardImage?.src ? p.fields.cardImage : p.fields.articleImage || {};
        return (
          <article key={p.slug} className="bcard reveal">
            <a className="bcard__cov" href={url} tabIndex="-1" aria-hidden="true">
              {" "}
              <img className="bcard__img" src={img.src} alt={img.alt || ''} width={img.width || 1200} height={img.height || 750} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />{" "}
              {p.fields.featured && <><span className="bcard__flag">Featured</span>{" "}</>}
              <span className="bcard__go">
                <UpRight />
              </span>{" "}
            </a>{" "}
            <div className="bcard__body">
              <span className="bcard__tag">{p.fields.category}</span>{" "}
              <h3>
                <a href={url} data-cursor="READ">{postTitle(p)}</a>
              </h3>
              <p className="bcard__x">{p.fields.excerpt}</p>{" "}
              <span className="bcard__more">
                Read Full Article{" "}
                <Arrow14 />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
