'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { api } from '../_lib/api';
import { Alert, Button, Field, inputClass, Spinner } from './index';

/* The admin shell: checks the session, shows sign-in when there is none,
   otherwise the sidebar + top bar around the current admin page. */

const AuthContext = createContext(null);
export const useAdmin = () => useContext(AuthContext);

const I = {
  dashboard: 'M3 13h8V3H3zm0 8h8v-6H3zm10 0h8V11h-8zm0-18v6h8V3z',
  inbox: 'M4 4h16v10h-4.5a3.5 3.5 0 0 1-7 0H4zM4 14v6h16v-6',
  cv: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4',
  users: 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M22 21a7 7 0 0 0-4.5-6.5',
  account: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM4 21a8 8 0 0 1 16 0',
  pages: 'M6 3h9l4 4v14H6zM14 3v5h5M9 12h7M9 16h7',
  blog: 'M4 5h16M4 10h16M4 15h10M4 20h7',
  services: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9',
  products: 'M3 7h18v13H3zM8 7V4h8v3',
  cases: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  media: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01',
};

/* Sidebar. */
export const NAV = [
  { group: 'Overview', items: [{ href: '/admin', label: 'Dashboard', icon: I.dashboard, exact: true }] },
  {
    group: 'Content',
    items: [
      { href: '/admin/pages', label: 'Pages', icon: I.pages },
      { href: '/admin/content/blog', label: 'Blogs', icon: I.blog },
      { href: '/admin/content/service', label: 'Services', icon: I.services },
      { href: '/admin/content/product', label: 'Products', icon: I.products },
      { href: '/admin/content/case', label: 'Case studies', icon: I.cases },
      { href: '/admin/media', label: 'Media', icon: I.media },
    ],
  },
  {
    group: 'Inbox',
    items: [
      { href: '/admin/enquiries', label: 'Enquiries', icon: I.inbox },
      { href: '/admin/cvs', label: 'CVs', icon: I.cv },
    ],
  },
  { group: 'Settings', items: [{ href: '/admin/users', label: 'Admin users', icon: I.users }] },
];

function Icon({ d, className = 'tw:size-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Login({ onSignedIn, notice }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { user } = await api('/api/auth/login', { method: 'POST', body: { email, password } });
      onSignedIn(user);
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <main className="tw:flex tw:min-h-screen tw:items-center tw:justify-center tw:bg-slate-50 tw:p-4 tw:font-sans tw:text-slate-900 tw:dark:bg-slate-950 tw:dark:text-slate-100">
      <form onSubmit={submit} className="tw:grid tw:w-full tw:max-w-sm tw:gap-5 tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-8 tw:shadow-sm tw:dark:border-slate-800 tw:dark:bg-slate-900">
        <div>
          <img src="/assets/img/logo/inovexia-split-light.svg" alt="Inovexia" width="140" height="32" className="tw:mb-5 tw:dark:hidden" />
          <img src="/assets/img/logo/inovexia-split-dark.svg" alt="Inovexia" width="140" height="32" className="tw:mb-5 tw:hidden tw:dark:block" />
          <h1 className="tw:text-xl tw:font-semibold">Sign in to the admin</h1>
          <p className="tw:mt-1 tw:text-sm tw:text-slate-500 tw:dark:text-slate-400">Manage site content and read enquiries.</p>
        </div>
        {notice && <Alert tone="amber">{notice}</Alert>}
        <Field label="Email" htmlFor="login-email">
          <input id="login-email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Password" htmlFor="login-password">
          <input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </Field>
        {error && <Alert>{error}</Alert>}
        <Button type="submit" variant="primary" busy={busy} className="tw:w-full">Sign in</Button>
        <p className="tw:text-xs tw:text-slate-500">No account yet? Run <code className="tw:rounded tw:bg-slate-100 tw:px-1 tw:dark:bg-slate-800">pnpm admin:create</code> in the project folder.</p>
      </form>
    </main>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('inovexia-theme', next); } catch { /* storage blocked */ }
  };
  return (
    <Button variant="ghost" size="sm" onClick={toggle} aria-label="Switch colour theme" className="tw:size-8 tw:p-0">
      <Icon d="M20 14.2A8.2 8.2 0 1 1 9.8 4a6.6 6.6 0 0 0 10.2 10.2z" className="tw:size-4" />
    </Button>
  );
}

export default function AdminApp({ children }) {
  const [user, setUser] = useState(undefined); // undefined = checking, null = signed out
  const [notice, setNotice] = useState('');
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    api('/api/auth/me').then((d) => setUser(d.user)).catch((err) => {
      setUser(null);
      if (err.status !== 401) setNotice(err.message);
    });
    const expired = () => { setUser(null); setNotice('Your session ended. Please sign in again.'); };
    window.addEventListener('admin:unauthorized', expired);
    return () => window.removeEventListener('admin:unauthorized', expired);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  const signOut = useCallback(async () => {
    await api('/api/auth/logout', { method: 'POST' }).catch(() => {});
    setNotice('');
    setUser(null);
  }, []);

  if (user === undefined) {
    return <main className="tw:min-h-screen tw:bg-slate-50 tw:dark:bg-slate-950"><Spinner label="Checking your session…" /></main>;
  }
  if (!user) return <Login notice={notice} onSignedIn={(u) => { setNotice(''); setUser(u); }} />;

  const active = (item) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));

  const sidebar = (
    <nav aria-label="Admin" className="tw:grid tw:gap-6">
      {NAV.map((g) => (
        <div key={g.group}>
          <p className="tw:mb-2 tw:px-3 tw:text-[11px] tw:font-semibold tw:tracking-wider tw:text-slate-400 tw:uppercase">{g.group}</p>
          <ul className="tw:grid tw:gap-0.5">
            {g.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active(item) ? 'page' : undefined}
                  className={`tw:flex tw:items-center tw:gap-3 tw:rounded-lg tw:px-3 tw:py-2 tw:text-sm tw:font-medium tw:transition ${active(item) ? 'tw:bg-indigo-50 tw:text-indigo-700 tw:dark:bg-indigo-500/15 tw:dark:text-indigo-200' : 'tw:text-slate-600 tw:hover:bg-slate-100 tw:hover:text-slate-900 tw:dark:text-slate-300 tw:dark:hover:bg-slate-800'}`}
                >
                  <Icon d={item.icon} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <AuthContext.Provider value={{ user, setUser, signOut }}>
      <div className="tw:min-h-screen tw:bg-slate-50 tw:font-sans tw:text-slate-900 tw:dark:bg-slate-950 tw:dark:text-slate-100">
        <aside className={`tw:fixed tw:inset-y-0 tw:left-0 tw:z-40 tw:w-64 tw:overflow-y-auto tw:border-r tw:border-slate-200 tw:bg-white tw:p-4 tw:transition-transform tw:dark:border-slate-800 tw:dark:bg-slate-900 tw:lg:translate-x-0 ${menu ? 'tw:translate-x-0' : 'tw:-translate-x-full'}`}>
          <Link href="/admin" className="tw:mb-6 tw:block tw:px-3 tw:pt-1">
            <img src="/assets/img/logo/inovexia-split-light.svg" alt="Inovexia admin" width="128" height="29" className="tw:dark:hidden" />
            <img src="/assets/img/logo/inovexia-split-dark.svg" alt="Inovexia admin" width="128" height="29" className="tw:hidden tw:dark:block" />
          </Link>
          {sidebar}
        </aside>
        {menu && <button type="button" aria-label="Close menu" className="tw:fixed tw:inset-0 tw:z-30 tw:bg-slate-950/40 tw:lg:hidden" onClick={() => setMenu(false)} />}

        <div className="tw:lg:pl-64">
          <header className="tw:sticky tw:top-0 tw:z-20 tw:flex tw:h-14 tw:items-center tw:gap-3 tw:border-b tw:border-slate-200 tw:bg-white/90 tw:px-4 tw:backdrop-blur tw:dark:border-slate-800 tw:dark:bg-slate-900/90">
            <Button variant="ghost" size="sm" className="tw:lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
              <Icon d="M4 7h16M4 12h16M4 17h16" />
            </Button>
            <a href="/" target="_blank" rel="noopener" className="tw:text-sm tw:text-slate-500 tw:hover:text-indigo-600 tw:dark:text-slate-400">View site ↗</a>
            <div className="tw:ml-auto tw:flex tw:items-center tw:gap-2">
              <ThemeToggle />
              <Link href="/admin/account" className="tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:px-2 tw:py-1 tw:text-sm tw:hover:bg-slate-100 tw:dark:hover:bg-slate-800">
                <span className="tw:grid tw:size-7 tw:place-items-center tw:rounded-full tw:bg-indigo-600 tw:text-xs tw:font-semibold tw:text-white">{user.name.slice(0, 1).toUpperCase()}</span>
                <span className="tw:hidden tw:sm:inline">{user.name}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
            </div>
          </header>
          <main className="tw:mx-auto tw:max-w-6xl tw:px-4 tw:py-8 tw:sm:px-6">{children}</main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
