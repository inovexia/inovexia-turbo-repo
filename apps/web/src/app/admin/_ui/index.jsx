'use client';

/* Small UI kit for the admin, in Tailwind (tw: prefix — see globals.css).
   Kept deliberately plain: the admin is a tool, the design lives on the site. */
import { useEffect, useRef } from 'react';

const cx = (...c) => c.filter(Boolean).join(' ');

const BTN = {
  primary: 'tw:bg-indigo-600 tw:text-white tw:hover:bg-indigo-500 tw:border-transparent',
  secondary: 'tw:bg-white tw:text-slate-700 tw:border-slate-300 tw:hover:bg-slate-50 tw:dark:bg-slate-900 tw:dark:text-slate-200 tw:dark:border-slate-700 tw:dark:hover:bg-slate-800',
  danger: 'tw:bg-white tw:text-red-600 tw:border-red-200 tw:hover:bg-red-50 tw:dark:bg-transparent tw:dark:border-red-500/40 tw:dark:text-red-300 tw:dark:hover:bg-red-500/10',
  ghost: 'tw:bg-transparent tw:text-slate-600 tw:border-transparent tw:hover:bg-slate-100 tw:dark:text-slate-300 tw:dark:hover:bg-slate-800',
};

export function Button({ variant = 'secondary', size = 'md', className, busy, children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || busy}
      className={cx(
        'tw:inline-flex tw:cursor-pointer tw:items-center tw:justify-center tw:gap-2 tw:rounded-lg tw:border tw:font-medium tw:transition tw:disabled:cursor-not-allowed tw:disabled:opacity-50',
        size === 'sm' ? 'tw:px-2.5 tw:py-1 tw:text-xs' : 'tw:px-3.5 tw:py-2 tw:text-sm',
        BTN[variant],
        className,
      )}
    >
      {busy && <span className="tw:size-3.5 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-t-transparent" aria-hidden="true" />}
      {children}
    </button>
  );
}

/* inputBase has no width, for inline selects; inputClass fills its column. */
export const inputBase =
  'tw:font-sans tw:rounded-lg tw:border tw:border-slate-300 tw:bg-white tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:outline-none tw:placeholder:text-slate-400 tw:focus:border-indigo-500 tw:focus:ring-2 tw:focus:ring-indigo-500/25 tw:aria-[invalid=true]:border-red-500 tw:dark:border-slate-700 tw:dark:bg-slate-950 tw:dark:text-slate-100';
export const inputClass = `tw:block tw:w-full ${inputBase}`;

export function Field({ label, htmlFor, error, hint, required, children, className }) {
  return (
    <div className={cx('tw:grid tw:gap-1.5', className)}>
      {label && (
        <label htmlFor={htmlFor} className="tw:text-sm tw:font-medium tw:text-slate-700 tw:dark:text-slate-300">
          {label}
          {required && <span className="tw:ml-0.5 tw:text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p className="tw:text-xs tw:text-slate-500">{hint}</p>}
      {error && <p className="tw:text-xs tw:text-red-600 tw:dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}

export function Card({ className, children, ...props }) {
  return (
    <div {...props} className={cx('tw:rounded-xl tw:border tw:border-slate-200 tw:bg-white tw:dark:border-slate-800 tw:dark:bg-slate-900', className)}>
      {children}
    </div>
  );
}

export function PageHeader({ title, description, actions }) {
  return (
    <div className="tw:mb-6 tw:flex tw:flex-wrap tw:items-end tw:justify-between tw:gap-4">
      <div>
        <h1 className="tw:text-2xl tw:font-semibold tw:text-slate-900 tw:dark:text-white">{title}</h1>
        {description && <p className="tw:mt-1 tw:text-sm tw:text-slate-500 tw:dark:text-slate-400">{description}</p>}
      </div>
      {actions && <div className="tw:flex tw:flex-wrap tw:gap-2">{actions}</div>}
    </div>
  );
}

const BADGE = {
  indigo: 'tw:bg-indigo-100 tw:text-indigo-700 tw:dark:bg-indigo-500/20 tw:dark:text-indigo-200',
  amber: 'tw:bg-amber-100 tw:text-amber-800 tw:dark:bg-amber-500/20 tw:dark:text-amber-200',
  slate: 'tw:bg-slate-200 tw:text-slate-600 tw:dark:bg-slate-500/20 tw:dark:text-slate-300',
  green: 'tw:bg-emerald-100 tw:text-emerald-700 tw:dark:bg-emerald-500/20 tw:dark:text-emerald-200',
  red: 'tw:bg-red-100 tw:text-red-700 tw:dark:bg-red-500/20 tw:dark:text-red-200',
};
export function Badge({ tone = 'slate', children }) {
  return <span className={cx('tw:inline-flex tw:items-center tw:rounded-full tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-medium tw:whitespace-nowrap', BADGE[tone])}>{children}</span>;
}

export function Alert({ tone = 'red', children }) {
  const t = {
    red: 'tw:bg-red-50 tw:text-red-700 tw:dark:bg-red-500/10 tw:dark:text-red-300',
    amber: 'tw:bg-amber-50 tw:text-amber-800 tw:dark:bg-amber-500/10 tw:dark:text-amber-200',
    green: 'tw:bg-emerald-50 tw:text-emerald-700 tw:dark:bg-emerald-500/10 tw:dark:text-emerald-200',
  };
  return <div className={cx('tw:rounded-lg tw:px-4 tw:py-3 tw:text-sm', t[tone])} role={tone === 'red' ? 'alert' : 'status'}>{children}</div>;
}

export function Empty({ children }) {
  return <p className="tw:p-10 tw:text-center tw:text-sm tw:text-slate-500">{children}</p>;
}

export function Spinner({ label = 'Loading…' }) {
  return (
    <div className="tw:flex tw:items-center tw:justify-center tw:gap-3 tw:p-10 tw:text-sm tw:text-slate-500" role="status">
      <span className="tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-indigo-500 tw:border-t-transparent" aria-hidden="true" />
      {label}
    </div>
  );
}

/* Native <dialog> modal: focus trap, Esc to close and backdrop for free. */
export function Modal({ open, onClose, title, children, footer, wide }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      className={cx('tw:m-auto tw:w-[calc(100%-2rem)] tw:rounded-2xl tw:border tw:border-slate-200 tw:bg-white tw:p-0 tw:text-slate-900 tw:shadow-xl tw:backdrop:bg-slate-950/50 tw:dark:border-slate-800 tw:dark:bg-slate-900 tw:dark:text-slate-100', wide ? 'tw:max-w-2xl' : 'tw:max-w-md')}
    >
      {open && (
        <div className="tw:grid tw:gap-4 tw:p-6">
          <h2 className="tw:text-lg tw:font-semibold">{title}</h2>
          {children}
          {footer && <div className="tw:flex tw:justify-end tw:gap-2 tw:pt-2">{footer}</div>}
        </div>
      )}
    </dialog>
  );
}

/* "Are you sure?" for deletes. */
export function Confirm({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel, busy }) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={<>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="danger" busy={busy} onClick={onConfirm}>{confirmLabel}</Button>
      </>}
    >
      <p className="tw:text-sm tw:text-slate-600 tw:dark:text-slate-300">{message}</p>
    </Modal>
  );
}

export function Pager({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (pages <= 1) return null;
  return (
    <div className="tw:mt-4 tw:flex tw:items-center tw:justify-between tw:text-sm">
      <span className="tw:text-slate-500">{total} total</span>
      <div className="tw:flex tw:items-center tw:gap-2">
        <Button size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>Previous</Button>
        <span className="tw:px-1">{page} / {pages}</span>
        <Button size="sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
