'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api, fmtSize } from '../_lib/api';
import { Alert, Button, Confirm, Empty, inputClass, Modal, Spinner } from './index';

/* The media library: upload, search, describe and delete images. In
   `pick` mode clicking an image chooses it (the image field's picker). */
export default function MediaLibrary({ onPick, compact = false }) {
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [del, setDel] = useState(null);
  const fileRef = useRef(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const d = await api(`/api/admin/media?page=${page}${q ? `&q=${encodeURIComponent(q)}` : ''}`);
      setItems(d.items);
      setTotal(d.total);
    } catch (err) {
      setError(err.message);
    }
  }, [page, q]);
  useEffect(() => { load(); }, [load]);

  async function upload(files) {
    setUploading(true);
    setError('');
    let last = null;
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      try {
        last = (await api('/api/admin/media', { method: 'POST', body: fd })).item;
      } catch (err) {
        setError(`${file.name}: ${err.message}`);
      }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
    setPage(1);
    await load();
    if (last && onPick && files.length === 1) onPick(toImage(last));
  }

  async function saveAlt() {
    await api(`/api/admin/media/${editing.id}`, { method: 'PATCH', body: { alt: editing.alt } }).catch((err) => setError(err.message));
    setEditing(null);
    load();
  }

  async function remove() {
    await api(`/api/admin/media/${del.id}`, { method: 'DELETE' }).catch((err) => setError(err.message));
    setDel(null);
    load();
  }

  const pages = Math.max(1, Math.ceil(total / 48));

  return (
    <div className="tw:grid tw:gap-4">
      <div
        className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:rounded-xl tw:border tw:border-dashed tw:border-slate-300 tw:p-4 tw:dark:border-slate-700"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files.length) upload([...e.dataTransfer.files]); }}
      >
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml" multiple className="tw:hidden" onChange={(e) => e.target.files.length && upload([...e.target.files])} />
        <Button variant="primary" busy={uploading} onClick={() => fileRef.current.click()}>Upload images</Button>
        <span className="tw:text-sm tw:text-slate-500">or drop them here — JPG, PNG, WebP, GIF or SVG, up to 5 MB each.</span>
        <input type="search" placeholder="Search…" value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} className={`${inputClass} tw:ml-auto tw:max-w-56`} aria-label="Search images" />
      </div>
      {error && <Alert>{error}</Alert>}
      {!items && !error && <Spinner />}
      {items && items.length === 0 && <Empty>No images yet. Upload one to use it on the site.</Empty>}
      {items && items.length > 0 && (
        <ul className={`tw:grid tw:gap-3 ${compact ? 'tw:grid-cols-3 tw:sm:grid-cols-4' : 'tw:grid-cols-2 tw:sm:grid-cols-4 tw:lg:grid-cols-6'}`}>
          {items.map((m) => (
            <li key={m.id} className="tw:group tw:overflow-hidden tw:rounded-lg tw:border tw:border-slate-200 tw:bg-white tw:dark:border-slate-800 tw:dark:bg-slate-900">
              <button
                type="button"
                onClick={() => (onPick ? onPick(toImage(m)) : setEditing({ ...m }))}
                className="tw:block tw:aspect-[4/3] tw:w-full tw:cursor-pointer tw:border-0 tw:bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] tw:bg-[length:16px_16px] tw:p-0 tw:dark:bg-[repeating-conic-gradient(#1e293b_0_25%,#0f172a_0_50%)]"
                title={onPick ? 'Use this image' : 'Edit description'}
              >
                <img src={m.url} alt={m.alt} className="tw:h-full tw:w-full tw:object-contain" loading="lazy" />
              </button>
              <div className="tw:flex tw:items-center tw:gap-1 tw:px-2 tw:py-1.5 tw:text-xs">
                <span className="tw:min-w-0 tw:flex-1 tw:truncate" title={m.fileName}>{m.fileName}</span>
                {!onPick && (
                  <button type="button" onClick={() => setDel(m)} className="tw:cursor-pointer tw:border-0 tw:bg-transparent tw:text-red-600 tw:opacity-60 tw:hover:opacity-100" aria-label={`Delete ${m.fileName}`}>✕</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {pages > 1 && (
        <div className="tw:flex tw:items-center tw:justify-end tw:gap-2 tw:text-sm">
          <Button size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
          <span>{page} / {pages}</span>
          <Button size="sm" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</Button>
        </div>
      )}

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title={editing?.fileName || ''}
        footer={<><Button onClick={() => setEditing(null)}>Close</Button><Button variant="primary" onClick={saveAlt}>Save description</Button></>}
      >
        {editing && (
          <>
            <img src={editing.url} alt="" className="tw:max-h-64 tw:w-full tw:rounded-lg tw:object-contain" />
            <p className="tw:text-xs tw:text-slate-500">{editing.width && `${editing.width} × ${editing.height}px · `}{fmtSize(editing.size)} · <a className="tw:text-indigo-600 tw:hover:underline" href={editing.url} target="_blank" rel="noopener">{editing.url}</a></p>
            <label className="tw:grid tw:gap-1.5 tw:text-sm tw:font-medium">
              Description (alt text) — what the image shows, for screen readers and search engines
              <input className={inputClass} value={editing.alt} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} />
            </label>
          </>
        )}
      </Modal>
      <Confirm
        open={Boolean(del)}
        title="Delete this image?"
        message="Anywhere on the site still using it will show a broken image until you choose another."
        onConfirm={remove}
        onCancel={() => setDel(null)}
      />
    </div>
  );
}

const toImage = (m) => ({ src: m.url, alt: m.alt || '', width: m.width || undefined, height: m.height || undefined });
