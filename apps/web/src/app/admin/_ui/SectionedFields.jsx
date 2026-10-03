'use client';

import { useMemo, useState } from 'react';
import { Field } from './Fields';
import { Button, Card, inputClass } from './index';

const stripHtml = (s) => String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();
const contains = (v, q) => (typeof v === 'string' ? stripHtml(v).includes(q)
  : Array.isArray(v) ? v.some((x) => contains(x, q))
    : v && typeof v === 'object' ? Object.values(v).some((x) => contains(x, q)) : false);

/* Manifest fields grouped by the design's page sections (Hero, Services…),
   each a collapsible card, with a search box and an "advanced" switch.
   `defaults` are the design's values: edited fields are marked and can be
   reset to them. */
export default function SectionedFields({ fields, value, onChange, defaults }) {
  const [q, setQ] = useState('');
  const [advanced, setAdvanced] = useState(false);
  const [open, setOpen] = useState(() => new Set());

  const sections = useMemo(() => {
    const out = [];
    for (const f of fields) {
      const label = f.section || 'Content';
      let s = out.find((x) => x.label === label);
      if (!s) out.push((s = { label, fields: [] }));
      s.fields.push(f);
    }
    return out;
  }, [fields]);

  const query = q.trim().toLowerCase();
  const defaultOf = (f) => (defaults && f.key in defaults ? defaults[f.key] : f.default);
  const visible = (s) => s.fields.filter((f) => (advanced || !f.advanced) && (!query || f.label.toLowerCase().includes(query) || contains(value[f.key], query)));
  const edited = (s) => s.fields.filter((f) => defaultOf(f) !== undefined && JSON.stringify(value[f.key]) !== JSON.stringify(defaultOf(f))).length;
  const toggle = (label) => setOpen((o) => { const n = new Set(o); if (n.has(label)) n.delete(label); else n.add(label); return n; });
  const single = sections.length === 1;

  return (
    <div className="tw:grid tw:gap-3">
      <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a field by its words…" className={`${inputClass} tw:max-w-sm`} aria-label="Find a field" />
        <label className="tw:flex tw:items-center tw:gap-2 tw:text-sm tw:text-slate-600 tw:dark:text-slate-300">
          <input type="checkbox" checked={advanced} onChange={(e) => setAdvanced(e.target.checked)} className="tw:accent-indigo-600" />
          Show advanced fields
        </label>
        {!single && (
          <>
            <Button size="sm" variant="ghost" onClick={() => setOpen(new Set(sections.map((s) => s.label)))}>Expand all</Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen(new Set())}>Collapse all</Button>
          </>
        )}
      </div>
      {sections.map((s) => {
        const list = visible(s);
        if (query && !list.length) return null;
        const isOpen = single || open.has(s.label) || Boolean(query);
        const n = edited(s);
        return (
          <Card key={s.label}>
            <button type="button" onClick={() => toggle(s.label)} aria-expanded={isOpen} className="tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-3 tw:border-0 tw:bg-transparent tw:px-5 tw:py-4 tw:text-left tw:text-inherit">
              <span className="tw:text-slate-400">{isOpen ? '▾' : '▸'}</span>
              <span className="tw:flex-1 tw:font-semibold">{s.label}</span>
              {n > 0 && <span className="tw:text-xs tw:text-indigo-600 tw:dark:text-indigo-300">{n} edited</span>}
              <span className="tw:text-xs tw:text-slate-500">{list.length} fields</span>
            </button>
            {isOpen && (
              <div className="tw:grid tw:gap-5 tw:border-t tw:border-slate-200 tw:px-5 tw:py-5 tw:dark:border-slate-800">
                {list.map((f) => (
                  <Field key={f.key} field={f} value={value[f.key]} defaultValue={defaultOf(f)} onChange={(v) => onChange({ ...value, [f.key]: v })} />
                ))}
                {!list.length && <p className="tw:text-sm tw:text-slate-500">Only advanced fields here — tick “Show advanced fields”.</p>}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
