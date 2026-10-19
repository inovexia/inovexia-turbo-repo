import { notFound } from 'next/navigation';
import { entryUrl } from '@inovexia/content';
import { templates } from '@/templates';
import { entryMetadata, getEntries, getEntry, templateAccessor } from './content';

/* The three "entry with its own page" routes (/service, /product,
   /case-study) are the same code: find the published entry, render its
   template with its content. Every page is pre-rendered at build time;
   an unknown slug is a 404. */
export function entryRoute(type) {
  async function load(params) {
    const { slug } = await params;
    const entry = await getEntry(type, slug);
    return entry?.template && templates[entry.template] ? entry : null;
  }

  return {
    async generateStaticParams() {
      const items = await getEntries(type);
      return items.filter((e) => e.template && templates[e.template]).map((e) => ({ slug: e.slug }));
    },
    async generateMetadata({ params }) {
      const entry = await load(params);
      if (!entry) return {};
      return entryMetadata(entry, templates[entry.template].meta, entryUrl(entry));
    },
    async Page({ params }) {
      const entry = await load(params);
      if (!entry) notFound();
      const { Component } = templates[entry.template];
      return <Component c={templateAccessor(entry)} />;
    },
  };
}
