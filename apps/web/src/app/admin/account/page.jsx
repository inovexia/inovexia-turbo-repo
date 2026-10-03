'use client';

import { useState } from 'react';
import { api } from '../_lib/api';
import { Alert, Button, Card, Field, inputClass, PageHeader } from '../_ui';
import { useAdmin } from '../_ui/AdminApp';

export default function AccountPage() {
  const { user, setUser } = useAdmin();
  const [name, setName] = useState(user.name);
  const [pw, setPw] = useState({ currentPassword: '', password: '', confirm: '' });
  const [fields, setFields] = useState({});
  const [msg, setMsg] = useState(null);
  const [busy, setBusy] = useState('');

  async function save(kind, body) {
    setBusy(kind);
    setFields({});
    setMsg(null);
    try {
      await api(`/api/admin/users/${user.id}`, { method: 'PATCH', body });
      if (kind === 'name') setUser({ ...user, name });
      if (kind === 'password') setPw({ currentPassword: '', password: '', confirm: '' });
      setMsg({ tone: 'green', text: kind === 'name' ? 'Name saved.' : 'Password changed. Your other sessions were signed out.' });
    } catch (err) {
      setFields(err.fields);
      setMsg({ tone: 'red', text: err.message });
    } finally {
      setBusy('');
    }
  }

  function changePassword(e) {
    e.preventDefault();
    if (pw.password !== pw.confirm) {
      setFields({ confirm: 'The passwords do not match.' });
      return;
    }
    save('password', { currentPassword: pw.currentPassword, password: pw.password });
  }

  const setP = (k) => (e) => setPw((p) => ({ ...p, [k]: e.target.value }));

  return (
    <>
      <PageHeader title="My account" description={user.email} />
      <div className="tw:grid tw:max-w-xl tw:gap-6">
        {msg && <Alert tone={msg.tone}>{msg.text}</Alert>}
        <Card className="tw:p-6">
          <form className="tw:grid tw:gap-4" onSubmit={(e) => { e.preventDefault(); save('name', { name }); }}>
            <h2 className="tw:font-semibold tw:text-base">Profile</h2>
            <Field label="Name" htmlFor="acc-name" error={fields.name}><input id="acc-name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <div><Button type="submit" variant="primary" busy={busy === 'name'}>Save name</Button></div>
          </form>
        </Card>
        <Card className="tw:p-6">
          <form className="tw:grid tw:gap-4" onSubmit={changePassword}>
            <h2 className="tw:font-semibold tw:text-base">Change password</h2>
            <Field label="Current password" htmlFor="acc-cur" error={fields.currentPassword}>
              <input id="acc-cur" type="password" autoComplete="current-password" className={inputClass} value={pw.currentPassword} onChange={setP('currentPassword')} />
            </Field>
            <Field label="New password" htmlFor="acc-new" error={fields.password} hint="At least 10 characters.">
              <input id="acc-new" type="password" autoComplete="new-password" className={inputClass} value={pw.password} onChange={setP('password')} />
            </Field>
            <Field label="Repeat new password" htmlFor="acc-rep" error={fields.confirm}>
              <input id="acc-rep" type="password" autoComplete="new-password" className={inputClass} value={pw.confirm} onChange={setP('confirm')} />
            </Field>
            <div><Button type="submit" variant="primary" busy={busy === 'password'}>Change password</Button></div>
          </form>
        </Card>
      </div>
    </>
  );
}
