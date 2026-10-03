'use client';

import { use, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { defaultsOf, pages } from '@inovexia/content';
import { api } from '../../_lib/api';
import { EditorContext } from '../../_ui/Fields';
import { Alert, Card, Field as FormField, inputClass, PageHeader, Spinner } from '../../_ui';
import SaveBar from '../../_ui/SaveBar';
import SectionedFields from '../../_ui/SectionedFields';
import { ICONS, LINKS } from '../../_lib/editorData';

/* Edit one page: its fields grouped by the design's sections, plus its
   search-engine title and description. */
export default function PageEditor({ params }) {
  const { name } = use(params);
  const m = pages[name];
  const defaults = useMemo(() => (m ? defaultsOf(m.fields) : {}), [m]);
  const [saved, setSaved] = useState(null);
  const [form, setForm] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await api(`/api/admin/pages/${name}`);
      const { $seo, ...data } = d.data || {};
      const state = { data: { ...defaults, ...data }, seo: { title: $seo?.title || '', description: $seo?.description || '' } };
      setSaved(state);
      setForm(state);
    } catch (err) {
      setError(err.message);
    }
  }, [name, defaults]);
  useEffect(() => { if (m) load(); }, [m, load]);

  if (!m) return <Alert>Unknown page.</Alert>;
  if (!form) return error ? <Alert>{error}</Alert> : <Spinner />;

  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  async function save() {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await api(`/api/admin/pages/${name}`, { method: 'PUT', body: { data: form.data, seo: form.seo } });
      setSaved(form);
      setMessage('Saved — the page is updated.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <EditorContext.Provider value={{ icons: ICONS, links: LINKS }}>
      <PageHeader
        title={m.title}
        description={m.route ? `Everything on ${m.route} that isn’t a list of blogs, services, products or case studies.` : name === 'global' ? 'The header and footer, on every page.' : 'The parts every blog post shares.'}
        actions={<>
          <Link href="/admin/pages" className="tw:self-center tw:text-sm tw:text-slate-500 tw:hover:text-indigo-600">← All pages</Link>
          {m.route && <a href={m.route} target="_blank" rel="noopener" className="tw:self-center tw:text-sm tw:text-indigo-600 tw:hover:underline">View page ↗</a>}
        </>}
      />
      <SectionedFields fields={m.fields} value={form.data} defaults={defaults} onChange={(data) => setForm((x) => ({ ...x, data }))} />

      {m.route && (
        <Card className="tw:mt-3 tw:grid tw:gap-4 tw:p-5">
          <h2 className="tw:font-semibold tw:text-base">Search engines</h2>
          <FormField label="Page title" htmlFor="seo-title" hint={`Leave empty for the design's: “${m.meta?.title || ''}”`}>
            <input id="seo-title" className={inputClass} value={form.seo.title} onChange={(e) => setForm((x) => ({ ...x, seo: { ...x.seo, title: e.target.value } }))} placeholder={m.meta?.title} />
          </FormField>
          <FormField label="Description" htmlFor="seo-desc" hint="Shown under the title in search results. Leave empty for the design's.">
            <textarea id="seo-desc" rows={3} className={inputClass} value={form.seo.description} onChange={(e) => setForm((x) => ({ ...x, seo: { ...x.seo, description: e.target.value } }))} placeholder={m.meta?.description} />
          </FormField>
        </Card>
      )}

      <SaveBar dirty={dirty} saving={saving} onSave={save} onDiscard={() => { setForm(saved); setMessage(''); }} message={message} error={error} />
    </EditorContext.Provider>
  );
}
