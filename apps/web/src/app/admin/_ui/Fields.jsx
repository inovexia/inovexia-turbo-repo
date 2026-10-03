'use client';

import { createContext, useContext, useId, useState } from 'react';
import MediaLibrary from './MediaLibrary';
import RichText from './RichText';
import { Badge, Button, inputClass, Modal } from './index';

/* Field editors, driven by field definitions (page/template manifests and
   collection schemas from @inovexia/content). FieldsForm renders a list of
   fields; Field picks the control for one field's kind. */

export const EditorContext = createContext({ icons: [], links: [], showAdvanced: false });

const stripHtml = (s) => String(s || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
const long = (v) => String(v || '').length > 90;

/* A label for a list item: its first non-empty text. */
function itemSummary(item, fields) {
  for (const f of fields) {
    const v = item?.[f.key];
    if (typeof v === 'string' && ['text', 'rich', 'textarea'].includes(f.kind) && stripHtml(v)) return stripHtml(v).slice(0, 80);
  }
  for (const f of fields) {
    const v = item?.[f.key];
    if (typeof v === 'string' && stripHtml(v) && !['icon', 'image', 'attr'].includes(f.kind)) return stripHtml(v).slice(0, 80);
  }
  return '';
}

/* A new list item: a copy of the last one with its words cleared (images,
   icons and technical attributes are kept so it still looks right). */
function blankFrom(last, fields) {
  const out = {};
  for (const f of fields) {
    const v = last?.[f.key];
    if (['text', 'rich', 'textarea', 'alt', 'link'].includes(f.kind)) out[f.key] = '';
    else if (f.kind === 'list' || f.kind === 'strings' || f.kind === 'blocks') out[f.key] = Array.isArray(v) ? JSON.parse(JSON.stringify(v)) : [];
    else out[f.key] = v === undefined ? null : JSON.parse(JSON.stringify(v));
  }
  return out;
}

export function FieldsForm({ fields, value, onChange, defaults, showAdvanced }) {
  const ctx = useContext(EditorContext);
  const adv = showAdvanced ?? ctx.showAdvanced;
  const visible = fields.filter((f) => adv || !f.advanced);
  return (
    <div className="tw:grid tw:gap-5">
      {visible.map((f) => (
        <Field
          key={f.key}
          field={f}
          value={value?.[f.key]}
          defaultValue={defaults ? (f.key in defaults ? defaults[f.key] : f.default) : undefined}
          onChange={(v) => onChange({ ...value, [f.key]: v })}
        />
      ))}
      {!visible.length && <p className="tw:text-sm tw:text-slate-500">Nothing to edit here.</p>}
    </div>
  );
}

export function Field({ field: f, value, onChange, defaultValue }) {
  const id = useId();
  const edited = defaultValue !== undefined && !same(value, defaultValue);
  const label = (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
      <label htmlFor={id} className="tw:text-sm tw:font-medium tw:text-slate-700 tw:dark:text-slate-300">
        {f.label}
        {f.required && <span className="tw:ml-0.5 tw:text-red-500">*</span>}
      </label>
      {f.advanced && <Badge>advanced</Badge>}
      {edited && (
        <>
          <Badge tone="indigo">edited</Badge>
          <button type="button" onClick={() => onChange(JSON.parse(JSON.stringify(defaultValue)))} className="tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-xs tw:text-slate-500 tw:underline tw:hover:text-indigo-600">
            Reset to design
          </button>
        </>
      )}
    </div>
  );
  return (
    <div className="tw:grid tw:gap-1.5">
      {label}
      <Control f={f} id={id} value={value} onChange={onChange} />
      {f.help && <p className="tw:text-xs tw:text-slate-500">{f.help}</p>}
      {edited && typeof defaultValue === 'string' && defaultValue && f.kind !== 'icon' && (
        <p className="tw:truncate tw:text-xs tw:text-slate-400" title={stripHtml(defaultValue)}>Design: {stripHtml(defaultValue)}</p>
      )}
    </div>
  );
}

function Control({ f, id, value, onChange }) {
  const ctx = useContext(EditorContext);
  switch (f.kind) {
    case 'rich':
      return <RichText id={id} label={f.label} value={value || ''} onChange={onChange} rows={long(value) ? 4 : 2} />;
    case 'textarea':
      return <textarea id={id} className={inputClass} rows={4} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
    case 'link':
      return (
        <>
          <input id={id} className={inputClass} list="cms-links" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="/contact or https://…" />
          <datalist id="cms-links">{ctx.links.map((l) => <option key={l} value={l} />)}</datalist>
        </>
      );
    case 'image':
      return <ImageControl id={id} value={value} onChange={onChange} asObject={f.object === true || (typeof value === 'object' && value !== null)} />;
    case 'icon':
      return <IconControl id={id} value={value || ''} onChange={onChange} />;
    case 'boolean':
      return (
        <label className="tw:inline-flex tw:w-fit tw:cursor-pointer tw:items-center tw:gap-2 tw:text-sm">
          <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="tw:size-4 tw:accent-indigo-600" />
          {value ? 'Yes' : 'No'}
        </label>
      );
    case 'number':
      return <input id={id} type="number" className={`${inputClass} tw:max-w-40`} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />;
    case 'date':
      return <input id={id} type="date" className={`${inputClass} tw:max-w-52`} value={value || ''} onChange={(e) => onChange(e.target.value)} />;
    case 'select':
      return (
        <select id={id} className={`${inputClass} tw:max-w-60`} value={value ?? ''} onChange={(e) => onChange(f.options.find((o) => String(o.value) === e.target.value)?.value ?? e.target.value)}>
          {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      );
    case 'strings':
      return <StringsControl f={f} value={Array.isArray(value) ? value : []} onChange={onChange} />;
    case 'list':
      return <ListControl f={f} value={Array.isArray(value) ? value : []} onChange={onChange} />;
    case 'blocks':
      return <BlocksControl f={f} value={Array.isArray(value) ? value : []} onChange={onChange} />;
    default: {
      // text, alt, attr
      const v = value ?? '';
      return long(v)
        ? <textarea id={id} className={inputClass} rows={3} value={v} onChange={(e) => onChange(e.target.value)} />
        : <input id={id} className={inputClass} value={v} onChange={(e) => onChange(e.target.value)} />;
    }
  }
}

/* ------------------------------------------------------------ images */

function ImageControl({ id, value, onChange, asObject }) {
  const [open, setOpen] = useState(false);
  const src = asObject ? value?.src : value;
  const set = (img) => onChange(asObject ? img : img?.src || '');
  return (
    <div className="tw:flex tw:flex-wrap tw:items-start tw:gap-3">
      <div className="tw:grid tw:size-24 tw:place-items-center tw:overflow-hidden tw:rounded-lg tw:border tw:border-slate-200 tw:bg-[repeating-conic-gradient(#f1f5f9_0_25%,#fff_0_50%)] tw:bg-[length:12px_12px] tw:dark:border-slate-700 tw:dark:bg-[repeating-conic-gradient(#1e293b_0_25%,#0f172a_0_50%)]">
        {src ? <img src={src} alt="" className="tw:max-h-full tw:max-w-full tw:object-contain" /> : <span className="tw:text-xs tw:text-slate-400">No image</span>}
      </div>
      <div className="tw:grid tw:min-w-56 tw:flex-1 tw:gap-2">
        <div className="tw:flex tw:flex-wrap tw:gap-2">
          <Button size="sm" onClick={() => setOpen(true)}>Choose image…</Button>
          {src && <Button size="sm" variant="ghost" onClick={() => set(null)}>Remove</Button>}
        </div>
        <input id={id} className={`${inputClass} tw:text-xs`} value={src || ''} placeholder="/api/media/… or /assets/img/…" onChange={(e) => set(e.target.value ? { ...(asObject ? value : {}), src: e.target.value } : null)} />
        {asObject && src && (
          <input className={`${inputClass} tw:text-xs`} value={value?.alt || ''} placeholder="Description (alt text)" onChange={(e) => onChange({ ...value, alt: e.target.value })} aria-label="Image description" />
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Choose an image" wide>
        <MediaLibrary compact onPick={(img) => { set(asObject ? { ...img, alt: img.alt || value?.alt || '' } : img); setOpen(false); }} />
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------- icons */

function IconControl({ id, value, onChange }) {
  const { icons } = useContext(EditorContext);
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const preview = (inner, size = 'tw:size-7') => (
    <svg viewBox="0 0 24 24" className={size} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: inner }} />
  );
  return (
    <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-3">
      <span className="tw:grid tw:size-12 tw:place-items-center tw:rounded-lg tw:border tw:border-slate-200 tw:text-indigo-600 tw:dark:border-slate-700 tw:dark:text-indigo-300">{value ? preview(value) : <span className="tw:text-xs tw:text-slate-400">none</span>}</span>
      <Button id={id} size="sm" onClick={() => setOpen(true)}>Choose icon…</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Choose an icon" wide>
        <ul className="tw:grid tw:max-h-96 tw:grid-cols-6 tw:gap-2 tw:overflow-y-auto tw:sm:grid-cols-8">
          {icons.map((ic, i) => (
            <li key={i}>
              <button type="button" onClick={() => { onChange(ic); setOpen(false); }} className={`tw:grid tw:aspect-square tw:w-full tw:cursor-pointer tw:place-items-center tw:rounded-lg tw:border tw:bg-transparent tw:text-slate-700 tw:hover:border-indigo-400 tw:dark:text-slate-200 ${ic === value ? 'tw:border-indigo-500 tw:ring-2 tw:ring-indigo-500/30' : 'tw:border-slate-200 tw:dark:border-slate-700'}`}>
                {preview(ic, 'tw:size-6')}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setCustom(!custom)} className="tw:w-fit tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-sm tw:text-indigo-600 tw:underline">
          {custom ? 'Hide custom SVG' : 'Paste your own SVG instead'}
        </button>
        {custom && (
          <textarea className={`${inputClass} tw:font-mono tw:text-xs`} rows={4} value={value} onChange={(e) => onChange(e.target.value)} placeholder={'<path d="…" /> (24×24 drawing, stroke-based)'} aria-label="Custom SVG" />
        )}
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------- lists */

function Move({ i, n, onMove, onRemove, onDuplicate, label }) {
  return (
    <div className="tw:flex tw:shrink-0 tw:gap-1">
      <Button size="sm" variant="ghost" disabled={i === 0} onClick={() => onMove(i, i - 1)} aria-label={`Move ${label} up`}>↑</Button>
      <Button size="sm" variant="ghost" disabled={i === n - 1} onClick={() => onMove(i, i + 1)} aria-label={`Move ${label} down`}>↓</Button>
      {onDuplicate && <Button size="sm" variant="ghost" onClick={() => onDuplicate(i)} aria-label={`Duplicate ${label}`}>Duplicate</Button>}
      <Button size="sm" variant="ghost" className="tw:text-red-600" onClick={() => onRemove(i)} aria-label={`Remove ${label}`}>Remove</Button>
    </div>
  );
}
const move = (arr, from, to) => { const a = [...arr]; const [x] = a.splice(from, 1); a.splice(to, 0, x); return a; };

function StringsControl({ f, value, onChange }) {
  return (
    <div className="tw:grid tw:gap-2">
      {value.map((s, i) => (
        <div key={i} className="tw:flex tw:items-center tw:gap-2">
          <input className={inputClass} value={s} onChange={(e) => onChange(value.map((x, j) => (j === i ? e.target.value : x)))} aria-label={`${f.itemLabel || 'Item'} ${i + 1}`} />
          <Move i={i} n={value.length} label={`${f.itemLabel || 'item'} ${i + 1}`} onMove={(a, b) => onChange(move(value, a, b))} onRemove={(k) => onChange(value.filter((_, j) => j !== k))} />
        </div>
      ))}
      <div><Button size="sm" onClick={() => onChange([...value, ''])}>+ Add {(f.itemLabel || 'item').toLowerCase()}</Button></div>
    </div>
  );
}

function ListControl({ f, value, onChange }) {
  const [open, setOpen] = useState(() => (value.length <= 1 ? 0 : -1));
  const name = (f.itemLabel || 'Item').replace(/ list$/i, '');
  return (
    <div className="tw:grid tw:gap-2">
      {value.map((item, i) => {
        const summary = itemSummary(item, f.item);
        return (
          <div key={i} className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-slate-50/60 tw:dark:border-slate-800 tw:dark:bg-slate-950/40">
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:px-3 tw:py-2">
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="tw:min-w-0 tw:flex-1 tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-left tw:text-sm tw:text-inherit">
                <span className="tw:mr-2 tw:text-slate-400">{open === i ? '▾' : '▸'}</span>
                <b className="tw:font-medium">{name} {i + 1}</b>
                {summary && <span className="tw:text-slate-500"> · {summary}</span>}
              </button>
              <Move
                i={i}
                n={value.length}
                label={`${name} ${i + 1}`}
                onMove={(a, b) => { onChange(move(value, a, b)); setOpen(b); }}
                onDuplicate={(k) => { onChange([...value.slice(0, k + 1), JSON.parse(JSON.stringify(value[k])), ...value.slice(k + 1)]); setOpen(k + 1); }}
                onRemove={(k) => { onChange(value.filter((_, j) => j !== k)); setOpen(-1); }}
              />
            </div>
            {open === i && (
              <div className="tw:border-t tw:border-slate-200 tw:p-4 tw:dark:border-slate-800">
                <FieldsForm fields={f.item} value={item} onChange={(v) => onChange(value.map((x, j) => (j === i ? v : x)))} />
              </div>
            )}
          </div>
        );
      })}
      <div>
        <Button size="sm" onClick={() => { onChange([...value, blankFrom(value.at(-1), f.item)]); setOpen(value.length); }}>+ Add {name.toLowerCase()}</Button>
      </div>
    </div>
  );
}

function BlocksControl({ f, value, onChange }) {
  const [open, setOpen] = useState(-1);
  const types = Object.entries(f.blocks);
  const blank = (type) => ({ type, ...Object.fromEntries(f.blocks[type].fields.map((x) => [x.key, x.kind === 'list' ? [] : x.kind === 'image' ? null : ''])) });
  return (
    <div className="tw:grid tw:gap-2">
      {value.map((b, i) => {
        const def = f.blocks[b.type];
        if (!def) return null;
        const summary = stripHtml(b.heading || b.caption || b.html || '').slice(0, 80);
        return (
          <div key={i} className="tw:rounded-lg tw:border tw:border-slate-200 tw:bg-slate-50/60 tw:dark:border-slate-800 tw:dark:bg-slate-950/40">
            <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:px-3 tw:py-2">
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="tw:min-w-0 tw:flex-1 tw:cursor-pointer tw:border-0 tw:bg-transparent tw:p-0 tw:text-left tw:text-sm tw:text-inherit">
                <span className="tw:mr-2 tw:text-slate-400">{open === i ? '▾' : '▸'}</span>
                <Badge tone="indigo">{def.label}</Badge>
                {summary && <span className="tw:ml-2 tw:text-slate-600 tw:dark:text-slate-300">{summary}</span>}
              </button>
              <Move i={i} n={value.length} label={`block ${i + 1}`} onMove={(a, b2) => { onChange(move(value, a, b2)); setOpen(b2); }} onRemove={(k) => { onChange(value.filter((_, j) => j !== k)); setOpen(-1); }} />
            </div>
            {open === i && (
              <div className="tw:border-t tw:border-slate-200 tw:p-4 tw:dark:border-slate-800">
                <FieldsForm fields={def.fields} value={b} onChange={(v) => onChange(value.map((x, j) => (j === i ? { ...v, type: b.type } : x)))} />
              </div>
            )}
          </div>
        );
      })}
      <div className="tw:flex tw:flex-wrap tw:gap-2">
        {types.map(([type, def]) => (
          <Button key={type} size="sm" onClick={() => { onChange([...value, blank(type)]); setOpen(value.length); }}>+ {def.label}</Button>
        ))}
      </div>
    </div>
  );
}
