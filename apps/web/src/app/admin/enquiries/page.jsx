'use client';

import { Fragment, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { api, enquiryRef, fmtDate } from '../_lib/api';
import { FORM_LABEL, STATUSES, STATUS_TONE, statusLabel } from '../_lib/labels';
import { Alert, Badge, Button, Card, Confirm, Empty, inputBase, PageHeader, Pager, Spinner } from '../_ui';

const link = 'tw:text-indigo-600 tw:hover:underline tw:dark:text-indigo-300';

function Detail({ it }) {
  const rows = [
    ['Email', it.email && <a className={link} href={`mailto:${it.email}?subject=${encodeURIComponent(`Re: your enquiry ${enquiryRef(it.id)}`)}`}>{it.email}</a>],
    ['Phone', it.phone && <a className={link} href={`tel:${it.phone}`}>{it.phone}</a>],
    ['Company', it.company],
    ['Role', it.role],
    ['Website', it.websiteUrl && <a className={link} href={/^https?:\/\//.test(it.websiteUrl) ? it.websiteUrl : `https://${it.websiteUrl}`} target="_blank" rel="noopener noreferrer">{it.websiteUrl}</a>],
    ['Project stage', it.projectStage],
    ['Timeline', it.timeline],
    ['Sent from', it.pageUrl],
  ].filter(([, v]) => v);
  const block = (title, text) => text && (
    <div>
      <p className="tw:text-xs tw:font-semibold tw:tracking-wide tw:text-slate-500 tw:uppercase">{title}</p>
      <p className="tw:mt-1 tw:whitespace-pre-wrap">{text}</p>
    </div>
  );
  return (
    <div className="tw:mt-3 tw:grid tw:gap-4 tw:rounded-lg tw:bg-slate-50 tw:p-4 tw:text-sm tw:dark:bg-slate-950">
      <dl className="tw:grid tw:gap-x-6 tw:gap-y-1.5 tw:sm:grid-cols-[8rem_1fr]">
        {rows.map(([k, v]) => <Fragment key={k}><dt className="tw:text-slate-500">{k}</dt><dd>{v}</dd></Fragment>)}
      </dl>
      {block(it.type === 'PROJECT' ? 'Project overview' : 'Message', it.message)}
      {block('Goals & objectives', it.goals)}
    </div>
  );
}

function Enquiries() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const type = params.get('type') || '';
  const status = params.get('status') || '';
  const page = Number(params.get('page') || 1);
  const openParam = Number(params.get('open') || 0);

  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(openParam || null);
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);
  const openRef = useRef(null);

  const setQuery = (next) => {
    const q = new URLSearchParams(params);
    for (const [k, v] of Object.entries(next)) (v ? q.set(k, v) : q.delete(k));
    router.replace(`${pathname}?${q}`, { scroll: false });
  };

  const load = useCallback(async () => {
    setError('');
    try {
      const q = new URLSearchParams({ page: String(page), pageSize: '20' });
      if (type) q.set('type', type);
      if (status) q.set('status', status);
      setData(await api(`/api/admin/enquiries?${q}`));
    } catch (err) {
      setError(err.message);
    }
  }, [type, status, page]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (openParam) setOpen(openParam); }, [openParam]);
  useEffect(() => { openRef.current?.scrollIntoView({ block: 'center' }); }, [data]);

  async function updateStatus(id, next) {
    try {
      await api(`/api/admin/enquiries/${id}`, { method: 'PATCH', body: { status: next } });
      setData((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, status: next } : it)) }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await api(`/api/admin/enquiries/${del.id}`, { method: 'DELETE' });
      setDel(null);
      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Enquiries"
        description="Everything sent through the Contact, Get in Touch and Discuss Your Project forms."
        actions={<Button onClick={load}>Refresh</Button>}
      />
      <div className="tw:mb-4 tw:flex tw:flex-wrap tw:gap-3">
        <select aria-label="Form" value={type} onChange={(e) => setQuery({ type: e.target.value, page: '' })} className={inputBase}>
          <option value="">All forms</option>
          {Object.entries(FORM_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select aria-label="Status" value={status} onChange={(e) => setQuery({ status: e.target.value, page: '' })} className={inputBase}>
          <option value="">Any status</option>
          {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
        </select>
      </div>
      {error && <div className="tw:mb-4"><Alert>{error}</Alert></div>}
      <Card>
        {!data && !error && <Spinner />}
        {data && data.items.length === 0 && <Empty>No enquiries match these filters.</Empty>}
        {data && data.items.length > 0 && (
          <ul className="tw:divide-y tw:divide-slate-200 tw:dark:divide-slate-800">
            {data.items.map((it) => (
              <li key={it.id} ref={open === it.id ? openRef : undefined} className={`tw:p-4 ${open === it.id ? 'tw:bg-indigo-50/40 tw:dark:bg-indigo-500/5' : ''}`}>
                <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-x-4 tw:gap-y-2">
                  <button type="button" onClick={() => setOpen(open === it.id ? null : it.id)} className="tw:min-w-0 tw:flex-1 tw:basis-full tw:sm:basis-0 tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-left tw:text-inherit" aria-expanded={open === it.id}>
                    <p className="tw:font-medium">{it.name} <span className="tw:font-normal tw:text-slate-500 tw:dark:text-slate-400">· {it.service}</span></p>
                    <p className="tw:mt-0.5 tw:text-sm tw:text-slate-500 tw:dark:text-slate-400">{FORM_LABEL[it.type]} · {enquiryRef(it.id)} · {fmtDate(it.createdAt)}</p>
                  </button>
                  <Badge tone={STATUS_TONE[it.status]}>{statusLabel(it.status)}</Badge>
                  <select aria-label={`Status of enquiry from ${it.name}`} value={it.status} onChange={(e) => updateStatus(it.id, e.target.value)} className={`${inputBase} tw:py-1 tw:text-xs`}>
                    {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
                  </select>
                  <Button size="sm" variant="danger" onClick={() => setDel(it)}>Delete</Button>
                </div>
                {open === it.id && <Detail it={it} />}
              </li>
            ))}
          </ul>
        )}
      </Card>
      {data && <Pager page={data.page} pageSize={data.pageSize} total={data.total} onPage={(p) => setQuery({ page: String(p) })} />}
      <Confirm
        open={Boolean(del)}
        title="Delete this enquiry?"
        message={del ? `${del.name}'s ${FORM_LABEL[del.type]} enquiry (${enquiryRef(del.id)}) will be removed permanently.` : ''}
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDel(null)}
      />
    </>
  );
}

export default function EnquiriesPage() {
  return <Suspense fallback={<Spinner />}><Enquiries /></Suspense>;
}
