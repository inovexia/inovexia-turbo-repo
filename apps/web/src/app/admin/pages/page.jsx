'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, fmtDate } from '../_lib/api';
import { Alert, Badge, Card, PageHeader, Spinner } from '../_ui';

/* Every page of the site whose words, images and links can be edited. */
export default function PagesList() {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api('/api/admin/pages').then((d) => setItems(d.items)).catch((err) => setError(err.message)); }, []);

  return (
    <>
      <PageHeader title="Pages" description="Edit the text, images and links on every page. Lists of blogs, services, products and case studies are edited in their own sections." />
      {error && <Alert>{error}</Alert>}
      {!items && !error && <Spinner />}
      {items && (
        <Card>
          <ul className="tw:divide-y tw:divide-slate-200 tw:dark:divide-slate-800">
            {items.map((p) => (
              <li key={p.name}>
                <Link href={`/admin/pages/${p.name}`} className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-4 tw:gap-y-1 tw:px-5 tw:py-4 tw:hover:bg-slate-50 tw:dark:hover:bg-slate-800/50">
                  <span className="tw:min-w-0 tw:flex-1">
                    <span className="tw:font-medium">{p.title}</span>
                    <span className="tw:ml-2 tw:text-sm tw:text-slate-500">{p.route || (p.name === 'global' ? 'every page' : 'every blog post')}</span>
                  </span>
                  {p.editedCount > 0 ? <Badge tone="indigo">{p.editedCount} edited</Badge> : <Badge>as designed</Badge>}
                  <span className="tw:w-44 tw:text-right tw:text-xs tw:text-slate-500">{p.updatedAt ? `Saved ${fmtDate(p.updatedAt)}` : ''}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
