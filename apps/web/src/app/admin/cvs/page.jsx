'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, fmtDate, fmtSize } from '../_lib/api';
import { Alert, Button, Card, Confirm, Empty, PageHeader, Pager, Spinner } from '../_ui';

export default function CvsPage() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError('');
    try {
      setData(await api(`/api/admin/applications?page=${page}&pageSize=20`));
    } catch (err) {
      setError(err.message);
    }
  }, [page]);

  useEffect(() => { load(); }, [load]);

  async function download(item) {
    try {
      const res = await api(`/api/admin/applications/${item.id}/cv`, { raw: true });
      const url = URL.createObjectURL(await res.blob());
      Object.assign(document.createElement('a'), { href: url, download: item.fileName }).click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await api(`/api/admin/applications/${del.id}`, { method: 'DELETE' });
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
      <PageHeader title="CVs" description="Applications sent from the Careers pop-up on the About page." actions={<Button onClick={load}>Refresh</Button>} />
      {error && <div className="tw:mb-4"><Alert>{error}</Alert></div>}
      <Card>
        {!data && !error && <Spinner />}
        {data && data.items.length === 0 && <Empty>No CVs yet.</Empty>}
        {data && data.items.length > 0 && (
          <ul className="tw:divide-y tw:divide-slate-200 tw:dark:divide-slate-800">
            {data.items.map((it) => (
              <li key={it.id} className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:p-4">
                <div className="tw:min-w-0 tw:flex-1">
                  <p className="tw:font-medium">{it.name}</p>
                  <p className="tw:mt-0.5 tw:text-sm tw:text-slate-500 tw:dark:text-slate-400">
                    <a className="tw:hover:underline" href={`mailto:${it.email}`}>{it.email}</a> · {fmtDate(it.createdAt)}
                  </p>
                </div>
                <Button size="sm" onClick={() => download(it)}>
                  {it.fileName} <span className="tw:text-slate-500">({fmtSize(it.fileSize)})</span>
                </Button>
                <Button size="sm" variant="danger" onClick={() => setDel(it)}>Delete</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
      {data && <Pager page={data.page} pageSize={data.pageSize} total={data.total} onPage={setPage} />}
      <Confirm
        open={Boolean(del)}
        title="Delete this CV?"
        message={del ? `${del.name}'s application and CV file will be removed permanently.` : ''}
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDel(null)}
      />
    </>
  );
}
