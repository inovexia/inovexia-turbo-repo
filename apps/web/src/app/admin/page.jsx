'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, enquiryRef, fmtDate } from './_lib/api';
import { FORM_LABEL, STATUS_TONE, statusLabel } from './_lib/labels';
import { Alert, Badge, Card, Empty, PageHeader, Spinner } from './_ui';
import { useAdmin } from './_ui/AdminApp';

function Stat({ label, value, href, tone }) {
  return (
    <Link href={href} className="tw:block tw:rounded-xl tw:border tw:border-slate-200 tw:bg-white tw:p-5 tw:transition tw:hover:border-indigo-300 tw:dark:border-slate-800 tw:dark:bg-slate-900 tw:dark:hover:border-indigo-500/50">
      <p className="tw:text-sm tw:text-slate-500 tw:dark:text-slate-400">{label}</p>
      <p className={`tw:mt-2 tw:text-3xl tw:font-semibold ${tone || 'tw:text-slate-900 tw:dark:text-white'}`}>{value}</p>
    </Link>
  );
}

export default function Dashboard() {
  const { user } = useAdmin();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/admin/stats').then(setData).catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <PageHeader title={`Welcome, ${user.name.split(' ')[0]}`} description="What has come in through the website." />
      {error && <Alert>{error}</Alert>}
      {!data && !error && <Spinner />}
      {data && (
        <div className="tw:grid tw:gap-6">
          {data.stats.email.on ? (
            <Alert tone="green">Email notifications are on — every submission is sent to <b>{data.stats.email.to}</b>.</Alert>
          ) : (
            <Alert tone="amber">
              <b>Email notifications are off.</b> Submissions are saved here, but not emailed yet. Add your mailbox&rsquo;s SMTP settings
              (SMTP_HOST, SMTP_USER, SMTP_PASS, NOTIFY_TO) to <code>.env</code> and restart the server.
            </Alert>
          )}

          <div className="tw:grid tw:gap-4 tw:sm:grid-cols-2 tw:lg:grid-cols-4">
            <Stat label="New enquiries" value={data.stats.newEnquiries} href="/admin/enquiries?status=NEW" tone="tw:text-indigo-600 tw:dark:text-indigo-300" />
            <Stat label="Enquiries this week" value={data.stats.weekEnquiries} href="/admin/enquiries" />
            <Stat label="All enquiries" value={data.stats.totalEnquiries} href="/admin/enquiries" />
            <Stat label="CVs received" value={data.stats.cvs} href="/admin/cvs" />
          </div>

          <Card>
            <div className="tw:flex tw:items-center tw:justify-between tw:border-b tw:border-slate-200 tw:px-5 tw:py-4 tw:dark:border-slate-800">
              <h2 className="tw:font-semibold tw:text-base">Latest enquiries</h2>
              <Link href="/admin/enquiries" className="tw:text-sm tw:text-indigo-600 tw:hover:underline tw:dark:text-indigo-300">View all</Link>
            </div>
            {data.recent.length === 0 ? (
              <Empty>No enquiries yet. They appear here as soon as someone sends a form on the site.</Empty>
            ) : (
              <ul className="tw:divide-y tw:divide-slate-200 tw:dark:divide-slate-800">
                {data.recent.map((e) => (
                  <li key={e.id}>
                    <Link href={`/admin/enquiries?open=${e.id}`} className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-4 tw:gap-y-1 tw:px-5 tw:py-3 tw:hover:bg-slate-50 tw:dark:hover:bg-slate-800/50">
                      <span className="tw:min-w-0 tw:flex-1">
                        <span className="tw:font-medium">{e.name}</span>
                        <span className="tw:text-slate-500 tw:dark:text-slate-400"> · {e.service}</span>
                      </span>
                      <span className="tw:text-xs tw:text-slate-500">{FORM_LABEL[e.type]} · {enquiryRef(e.id)} · {fmtDate(e.createdAt)}</span>
                      <Badge tone={STATUS_TONE[e.status]}>{statusLabel(e.status)}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </>
  );
}
