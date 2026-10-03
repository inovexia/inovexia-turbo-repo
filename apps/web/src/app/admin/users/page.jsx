'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, fmtDate } from '../_lib/api';
import { Alert, Badge, Button, Card, Confirm, Field, inputClass, Modal, PageHeader, Spinner } from '../_ui';
import { useAdmin } from '../_ui/AdminApp';

const EMPTY = { name: '', email: '', password: '' };

export default function UsersPage() {
  const { user: me } = useAdmin();
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [fields, setFields] = useState({});
  const [formError, setFormError] = useState('');
  const [reset, setReset] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [del, setDel] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems((await api('/api/admin/users')).items);
    } catch (err) {
      setError(err.message);
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  const close = () => { setAdding(false); setReset(null); setForm(EMPTY); setNewPassword(''); setFields({}); setFormError(''); };

  async function run(fn) {
    setBusy(true);
    setFields({});
    setFormError('');
    try {
      await fn();
      close();
      await load();
    } catch (err) {
      setFields(err.fields);
      setFormError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    setBusy(true);
    try {
      await api(`/api/admin/users/${del.id}`, { method: 'DELETE' });
      setDel(null);
      await load();
    } catch (err) {
      setDel(null);
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <PageHeader title="Admin users" description="Everyone who can sign in to this admin." actions={<Button variant="primary" onClick={() => setAdding(true)}>Add admin</Button>} />
      {error && <div className="tw:mb-4"><Alert>{error}</Alert></div>}
      <Card>
        {!items && !error && <Spinner />}
        {items && (
          <ul className="tw:divide-y tw:divide-slate-200 tw:dark:divide-slate-800">
            {items.map((u) => (
              <li key={u.id} className="tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:p-4">
                <span className="tw:grid tw:size-9 tw:place-items-center tw:rounded-full tw:bg-indigo-600 tw:text-sm tw:font-semibold tw:text-white">{u.name.slice(0, 1).toUpperCase()}</span>
                <div className="tw:min-w-0 tw:flex-1">
                  <p className="tw:font-medium">{u.name} {u.id === me.id && <Badge tone="indigo">you</Badge>}</p>
                  <p className="tw:text-sm tw:text-slate-500 tw:dark:text-slate-400">{u.email} · {u.lastLoginAt ? `last signed in ${fmtDate(u.lastLoginAt)}` : 'never signed in'}</p>
                </div>
                {u.id !== me.id && (
                  <>
                    <Button size="sm" onClick={() => setReset(u)}>Reset password</Button>
                    <Button size="sm" variant="danger" onClick={() => setDel(u)}>Remove</Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Modal
        open={adding}
        onClose={close}
        title="Add an admin"
        footer={<>
          <Button onClick={close}>Cancel</Button>
          <Button variant="primary" busy={busy} onClick={() => run(() => api('/api/admin/users', { method: 'POST', body: form }))}>Add admin</Button>
        </>}
      >
        <Field label="Name" htmlFor="nu-name" error={fields.name}><input id="nu-name" className={inputClass} value={form.name} onChange={set('name')} /></Field>
        <Field label="Email" htmlFor="nu-email" error={fields.email}><input id="nu-email" type="email" className={inputClass} value={form.email} onChange={set('email')} /></Field>
        <Field label="Password" htmlFor="nu-password" error={fields.password} hint="At least 10 characters. Share it with them securely; they can change it under My account.">
          <input id="nu-password" type="password" autoComplete="new-password" className={inputClass} value={form.password} onChange={set('password')} />
        </Field>
        {formError && !Object.keys(fields).length && <Alert>{formError}</Alert>}
      </Modal>

      <Modal
        open={Boolean(reset)}
        onClose={close}
        title={reset ? `Reset ${reset.name}'s password` : ''}
        footer={<>
          <Button onClick={close}>Cancel</Button>
          <Button variant="primary" busy={busy} onClick={() => run(() => api(`/api/admin/users/${reset.id}`, { method: 'PATCH', body: { password: newPassword } }))}>Set password</Button>
        </>}
      >
        <Field label="New password" htmlFor="rp-password" error={fields.password} hint="They will be signed out everywhere.">
          <input id="rp-password" type="password" autoComplete="new-password" className={inputClass} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </Field>
        {formError && !Object.keys(fields).length && <Alert>{formError}</Alert>}
      </Modal>

      <Confirm
        open={Boolean(del)}
        title="Remove this admin?"
        message={del ? `${del.name} (${del.email}) will no longer be able to sign in.` : ''}
        confirmLabel="Remove"
        busy={busy}
        onConfirm={remove}
        onCancel={() => setDel(null)}
      />
    </>
  );
}
