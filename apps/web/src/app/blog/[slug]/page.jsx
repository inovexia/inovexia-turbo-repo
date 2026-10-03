import { notFound } from 'next/navigation';
import { entryUrl } from '@inovexia/content';
import BlogArticleTemplate, { META } from '@/templates/blog-article';
import { entryMetadata, getEntries, getEntry, loadPage } from '@/lib/cms/content';

/* A blog post: the shared article page (Pages → "Blog article (shared
   parts)") around this post's article and the recent-posts slider. */
export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getEntries('blog')).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getEntry('blog', (await params).slug);
  if (!post) return {};
  return entryMetadata(post, META, entryUrl(post));
}

export default async function BlogPostPage({ params }) {
  const post = await getEntry('blog', (await params).slug);
  if (!post) notFound();
  return <BlogArticleTemplate c={await loadPage('blog-article')} post={post} />;
}
