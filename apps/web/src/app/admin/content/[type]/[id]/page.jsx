'use client';

import Link from 'next/link';
import { use, useCallback, useEffect, useMemo, useState } from 'react';
import { collections, defaultsOf, entryUrl, fragments, templates } from '@inovexia/content';
import { api } from '../../../_lib/api';
import { EditorContext, FieldsForm } from '../../../_ui/Fields';
import { Alert, Badge, Card, Field, inputClass, PageHeader, Spinner } from '../../../_ui';
import SaveBar from '../../../_ui/SaveBar';
import SectionedFields from '../../../_ui/SectionedFields';
import { ICONS, LINKS } from '../../../_lib/editorData';

const pick = (e) => ({ slug: e.slug, published: e.published, template: e.template, fields: e.fields, page: e.page, section: e.section, seo: { title: e.seo?.title || '', description: e.seo?.description || '' } });

/* Edit one blog post / service / product / case study. */
export default function EntryEditor({ params }) {
  const { type, id } = use(params);
  const col = collections[type];
  const [entry, setEntry] = useState(null);
  const [form, setForm] = useState(null);
  const [tab, setTab] = useState('details');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const { item } = await api(`/api/admin/entries/${id}`);
      setEntry(item);
      setForm(pick(item));
    } catch (err) {
      setError(err.message);
    }
  }, [id]);
  useEffect(() => { load(); }, [load]);

  const tplDefaults = useMemo(() => (form?.template && templates[form.template] ? defaultsOf(templates[form.template].fields) : null), [form?.template]);

  if (!col) return <Alert>Unknown section.</Alert>;
  if (!form) return error ? <Alert>{error}</Alert> : <Spinner />;

  const saved = pick(entry);
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);
  const set = (patch) => setForm((f) => ({ ...f, ...patch }));
  const url = entryUrl({ ...entry, ...form });
  const hasPage = Boolean(form.template && templates[form.template]);

  async function save() {
    setSaving(true);
    setError('');
    setFieldErrors({});
    setMessage('');
    try {
      const { item } = await api(`/api/admin/entries/${id}`, { method: 'PUT', body: form });
      setEntry(item);
      setForm(pick(item));
      setMessage(item.published ? 'Saved — live on the site.' : 'Saved as a draft (not visible to visitors).');
    } catch (err) {
      setError(err.message);
      setFieldErrors(err.fields || {});
      if (err.fields?.slug) setTab('settings');
    } finally {
      setSaving(false);
    }
  }

  const TABS = [
    ['details', type === 'blog' ? 'Article & cards' : 'Details'],
    ...(col.templates.length ? [['page', hasPage ? 'Its page' : 'Its page (none)']] : []),
    ...(col.fragment ? [['section', col.fragmentLabel]] : []),
    ['settings', 'Settings & SEO'],
  ];

  return (
    <EditorContext.Provider value={{ icons: ICONS, links: LINKS }}>
      <PageHeader
        title={entry.title}
        description={<>{col.singular} · {form.published ? <Badge tone="green">published</Badge> : <Badge tone="amber">draft</Badge>}</>}
        actions={<>
          <Link href={`/admin/content/${type}`} className="tw:self-center tw:text-sm tw:text-slate-500 tw:hover:text-indigo-600">← All {col.label.toLowerCase()}</Link>
          {url && entry.published && <a href={url} target="_blank" rel="noopener" className="tw:self-center tw:text-sm tw:text-indigo-600 tw:hover:underline">View on site ↗</a>}
        </>}
      />

      <div className="tw:mb-5 tw:flex tw:flex-wrap tw:gap-1 tw:border-b tw:border-slate-200 tw:dark:border-slate-800" role="tablist">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={`tw:-mb-px tw:cursor-pointer tw:border-0 tw:border-b-2 tw:bg-transparent tw:px-4 tw:py-2 tw:text-sm tw:font-medium ${tab === key ? 'tw:border-indigo-600 tw:text-indigo-700 tw:dark:text-indigo-300' : 'tw:border-transparent tw:text-slate-500 tw:hover:text-slate-800 tw:dark:hover:text-slate-200'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'details' && (
        <Card className="tw:p-5">
          <FieldsForm fields={col.fields} value={form.fields} onChange={(fields) => set({ fields })} />
        </Card>
      )}

      {tab === 'page' && (
        hasPage ? (
          <SectionedFields fields={templates[form.template].fields} value={{ ...tplDefaults, ...(form.page || {}) }} defaults={tplDefaults} onChange={(page) => set({ page })} />
        ) : (
          <Card className="tw:grid tw:gap-3 tw:p-5">
            <p className="tw:text-sm">This {col.singular.toLowerCase()} has no page of its own — it only appears in lists{type === 'case' ? ' (as “coming soon”)' : ''}.</p>
            <p className="tw:text-sm tw:text-slate-500">Give it one under <button type="button" className="tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-indigo-600 tw:underline" onClick={() => setTab('settings')}>Settings</button>; it starts as a copy of the design’s page, ready to edit.</p>
          </Card>
        )
      )}

      {tab === 'section' && col.fragment && (
        <SectionedFields fields={fragments[col.fragment].fields} value={{ ...(fragments[col.fragment].default || {}), ...(form.section || {}) }} onChange={(section) => set({ section })} />
      )}

      {tab === 'settings' && (
        <Card className="tw:grid tw:max-w-2xl tw:gap-5 tw:p-5">
          <Field label="Visible on the site" htmlFor="pub">
            <label className="tw:inline-flex tw:w-fit tw:cursor-pointer tw:items-center tw:gap-2 tw:text-sm">
              <input id="pub" type="checkbox" checked={form.published} onChange={(e) => set({ published: e.target.checked })} className="tw:size-4 tw:accent-indigo-600" />
              {form.published ? 'Published' : 'Draft — hidden from visitors'}
            </label>
          </Field>
          {col.templates.length > 0 && (
            <Field label="Its own page" htmlFor="tpl" hint={form.template && !entry.template ? 'Saving creates the page as a copy of the design’s; then edit it under “Its page”.' : 'Without a page it appears only in lists.'}>
              <select id="tpl" className={inputClass} value={form.template || ''} onChange={(e) => set({ template: e.target.value || null })}>
                <option value="">No page — listed only</option>
                {col.templates.map((t) => <option key={t} value={t}>{templates[t].title}</option>)}
              </select>
            </Field>
          )}
          {(type === 'blog' || hasPage) && (
            <Field label="Page address" htmlFor="slug" error={fieldErrors.slug} hint="Lowercase letters, numbers and hyphens. Changing it breaks links to the old address.">
              <div className="tw:flex tw:items-center tw:gap-1 tw:text-sm">
                <span className="tw:text-slate-500">{col.routeBase}/</span>
                <input id="slug" className={inputClass} value={form.slug} onChange={(e) => set({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })} />
              </div>
            </Field>
          )}
          <h2 className="tw:mt-2 tw:font-semibold tw:text-base">Search engines</h2>
          <Field label="Page title" htmlFor="seo-title">
            <input id="seo-title" className={inputClass} value={form.seo.title} onChange={(e) => set({ seo: { ...form.seo, title: e.target.value } })} />
          </Field>
          <Field label="Description" htmlFor="seo-desc" hint="Shown under the title in search results (about 150 characters).">
            <textarea id="seo-desc" rows={3} className={inputClass} value={form.seo.description} onChange={(e) => set({ seo: { ...form.seo, description: e.target.value } })} />
          </Field>
        </Card>
      )}

      <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={() => { setForm(saved); setMessage(''); setFieldErrors({}); }} message={message} error={error} />
    </EditorContext.Provider>
  );
}
