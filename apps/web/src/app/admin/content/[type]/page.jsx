'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useCallback, useEffect, useState } from 'react';
import { collections, entryUrl, templates } from '@inovexia/content';
import { api, fmtDate } from '../../_lib/api';
import { Alert, Badge, Button, Card, Confirm, Empty, Field, inputClass, Modal, PageHeader, Spinner } from '../../_ui';

/* A collection: every blog / service / product / case study, in site order. */
export default function CollectionList({ params }) {
  const { type } = use(params);
  const col = collections[type];
  const router = useRouter();
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTemplate, setNewTemplate] = useState('');
  const [fields, setFields] = useState({});
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError('');
    try {
      setItems((await api(`/api/admin/entries?type=${type}`)).items);
    } catch (err) {
      setError(err.message);
    }
  }, [type]);
  useEffect(() => { if (col) load(); }, [col, load]);

  if (!col) return <Alert>Unknown section.</Alert>;

  async function create() {
    setBusy(true);
    setFields({});
    try {
      const { item } = await api('/api/admin/entries', { method: 'POST', body: { type, title: newTitle, template: newTemplate || null } });
      router.push(`/admin/content/${type}/${item.id}`);
    } catch (err) {
      setFields(err.fields || { title: err.message });
      setBusy(false);
    }
  }

  async function reorder(from, to) {
    const next = [...items];
    const [x] = next.splice(from, 1);
    next.splice(to, 0, x);
    setItems(next);
    await api('/api/admin/entries/reorder', { method: 'POST', body: { type, ids: next.map((e) => e.id) } }).catch((err) => setError(err.message));
  }

  async function togglePublished(e) {
    await api(`/api/admin/entries/${e.id}`, { method: 'PUT', body: { published: !e.published } }).catch((err) => setError(err.message));
    load();
  }

  async function duplicate(e) {
    try {
      const { item } = await api('/api/admin/entries', { method: 'POST', body: { duplicateOf: e.id } });
      router.push(`/admin/content/${type}/${item.id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove() {
    setBusy(true);
    await api(`/api/admin/entries/${del.id}`, { method: 'DELETE' }).catch((err) => setError(err.message));
    setDel(null);
    setBusy(false);
    load();
  }

  const singular = col.singular.toLowerCase();
  return (
    <>
      <PageHeader
        title={col.label}
        description={`The order here is the order on the site. Drafts are hidden from visitors.`}
        actions={<Button variant="primary" onClick={() => { setCreating(true); setNewTitle(''); setNewTemplate(col.templates[0] || ''); }}>New {singular}</Button>}
      />
      {error && <div className="tw:mb-4"><Alert>{error}</Alert></div>}
      <Card>
        {!items && !error && <Spinner />}
        {items && items.length === 0 && <Empty>No {col.label.toLowerCase()} yet.</Empty>}
        {items && items.length > 0 && (
          <ul className="tw:divide-y tw:divide-slate-200 tw:dark:divide-slate-800">
            {items.map((e, i) => {
              const url = e.published ? entryUrl(e) : null;
              return (
                <li key={e.id} className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:px-4 tw:py-3">
                  <div className="tw:flex tw:flex-col tw:gap-0.5">
                    <Button size="sm" variant="ghost" disabled={i === 0} onClick={() => reorder(i, i - 1)} aria-label={`Move ${e.title} up`}>↑</Button>
                    <Button size="sm" variant="ghost" disabled={i === items.length - 1} onClick={() => reorder(i, i + 1)} aria-label={`Move ${e.title} down`}>↓</Button>
                  </div>
                  <Link href={`/admin/content/${type}/${e.id}`} className="tw:min-w-0 tw:flex-1 tw:basis-60">
                    <span className="tw:font-medium tw:hover:text-indigo-600">{e.title}</span>
                    <span className="tw:block tw:text-xs tw:text-slate-500">
                      {entryUrl(e) || 'No page of its own'}
                      {e.template && type !== 'blog' && templates[e.template] && ` · ${templates[e.template].title}`}
                      {' · '}updated {fmtDate(e.updatedAt)}
                    </span>
                  </Link>
                  <button type="button" onClick={() => togglePublished(e)} className="tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0" title={e.published ? 'Click to hide from the site' : 'Click to publish'}>
                    {e.published ? <Badge tone="green">published</Badge> : <Badge tone="amber">draft</Badge>}
                  </button>
                  <div className="tw:flex tw:gap-1">
                    <Link href={`/admin/content/${type}/${e.id}`} className="tw:rounded-lg tw:px-2.5 tw:py-1 tw:text-xs tw:font-medium tw:text-indigo-600 tw:hover:bg-indigo-50 tw:dark:text-indigo-300 tw:dark:hover:bg-indigo-500/10">Edit</Link>
                    {url && <a href={url} target="_blank" rel="noopener" className="tw:rounded-lg tw:px-2.5 tw:py-1 tw:text-xs tw:text-slate-600 tw:hover:bg-slate-100 tw:dark:text-slate-300 tw:dark:hover:bg-slate-800">View ↗</a>}
                    <Button size="sm" variant="ghost" onClick={() => duplicate(e)}>Duplicate</Button>
                    <Button size="sm" variant="ghost" className="tw:text-red-600" onClick={() => setDel(e)}>Delete</Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      <Modal
        open={creating}
        onClose={() => setCreating(false)}
        title={`New ${singular}`}
        footer={<><Button onClick={() => setCreating(false)}>Cancel</Button><Button variant="primary" busy={busy} onClick={create}>Create draft</Button></>}
      >
        <Field label={type === 'blog' ? 'Title' : 'Name'} htmlFor="new-title" error={fields.title}>
          <input id="new-title" autoFocus className={inputClass} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && create()} />
        </Field>
        {col.templates.length > 0 && (
          <Field label="Its own page" htmlFor="new-tpl" hint="A page starts as a copy of the design's, ready to edit. You can add or remove it later.">
            <select id="new-tpl" className={inputClass} value={newTemplate} onChange={(e) => setNewTemplate(e.target.value)}>
              <option value="">No page — listed only</option>
              {col.templates.map((t) => <option key={t} value={t}>{templates[t].title}</option>)}
            </select>
          </Field>
        )}
        <p className="tw:text-xs tw:text-slate-500">It is created as a draft, so visitors won’t see it until you publish.</p>
      </Modal>
      <Confirm
        open={Boolean(del)}
        title={`Delete this ${singular}?`}
        message={del ? `“${del.title}” will be removed from the site permanently.` : ''}
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDel(null)}
      />
    </>
  );
}
