import { entryUrl } from '@inovexia/content';
import { getEntries } from '@/lib/cms/content';
import { Arrow14, postTitle, UpRight } from './BlogCards';

/* "Recent articles" slider under a post: every other published post. */
export default async function RecentPosts({ current }) {
  const posts = (await getEntries('blog')).filter((p) => p.slug !== current);
  return (
    <div className="rsl__track reveal" role="list" aria-label="Recent articles">
      {posts.map((p) => {
        const url = entryUrl(p);
        const img = p.fields.articleImage?.src ? p.fields.articleImage : p.fields.cardImage || {};
        const title = postTitle(p);
        return (
          <article key={p.slug} className="bcard">
            <a className="bcard__cov" href={url} tabIndex="-1" aria-hidden="true">
              {" "}
              <img className="bcard__img" src={img.src} alt={p.fields.recentAlt || img.alt || ''} width={img.width || 400} height={img.height || 250} loading="lazy" decoding="async" />{" "}
              <span className="bcard__go">
                <UpRight />
              </span>{" "}
            </a>{" "}
            <div className="bcard__body">
              <span className="bcard__tag">{p.fields.category}</span>{" "}
              <h3>
                <a href={url} data-cursor="READ" title={title}>{title}</a>
              </h3>{" "}
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
