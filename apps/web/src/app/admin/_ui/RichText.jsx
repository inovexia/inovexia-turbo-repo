'use client';

import { useEffect, useRef } from 'react';

/* A small rich-text editor for the design's inline formatting: bold,
   italic, links, line breaks. It edits the HTML in place (contentEditable),
   so formatting the design already uses — like the brand-gradient span in
   a heading — survives an edit. The API sanitises whatever is saved. */
const TOOLS = [
  { cmd: 'bold', label: 'B', title: 'Bold (Ctrl+B)', cls: 'tw:font-bold' },
  { cmd: 'italic', label: 'I', title: 'Italic (Ctrl+I)', cls: 'tw:italic' },
  { cmd: 'link', label: 'Link', title: 'Add a link to the selected text' },
  { cmd: 'unlink', label: 'Unlink', title: 'Remove the link' },
  { cmd: 'removeFormat', label: 'Clear', title: 'Remove bold/italic from the selection' },
];

export default function RichText({ value, onChange, id, rows = 3, label }) {
  const ref = useRef(null);

  // Only push the value into the DOM when it changed from outside (reset,
  // load) — rewriting it while typing would move the caret.
  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || '')) ref.current.innerHTML = value || '';
  }, [value]);

  const emit = () => onChange(ref.current.innerHTML.replace(/<div><br><\/div>/g, '<br>').replace(/&nbsp;$/, ''));

  function run(cmd) {
    ref.current.focus();
    if (cmd === 'link') {
      const url = window.prompt('Link address (e.g. /contact or https://…)', 'https://');
      if (!url) return;
      document.execCommand('createLink', false, url);
    } else {
      document.execCommand(cmd);
    }
    emit();
  }

  return (
    <div className="tw:rounded-lg tw:border tw:border-slate-300 tw:bg-white tw:focus-within:border-indigo-500 tw:focus-within:ring-2 tw:focus-within:ring-indigo-500/25 tw:dark:border-slate-700 tw:dark:bg-slate-950">
      <div className="tw:flex tw:flex-wrap tw:gap-1 tw:border-b tw:border-slate-200 tw:px-1.5 tw:py-1 tw:dark:border-slate-800" role="toolbar" aria-label={`Formatting for ${label || 'text'}`}>
        {TOOLS.map((t) => (
          <button
            key={t.cmd}
            type="button"
            title={t.title}
            onMouseDown={(e) => { e.preventDefault(); run(t.cmd); }}
            className={`tw:cursor-pointer tw:rounded tw:border-0 tw:bg-transparent tw:px-2 tw:py-0.5 tw:text-xs tw:text-slate-600 tw:hover:bg-slate-100 tw:dark:text-slate-300 tw:dark:hover:bg-slate-800 ${t.cls || ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        id={id}
        role="textbox"
        aria-multiline="true"
        aria-label={label}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        // Enter makes a line break, not a new <div>; pasted text arrives plain.
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); document.execCommand('insertLineBreak'); emit(); }
        }}
        onPaste={(e) => {
          e.preventDefault();
          document.execCommand('insertText', false, e.clipboardData.getData('text/plain'));
          emit();
        }}
        style={{ minHeight: `${rows * 1.6}em` }}
        className="cms-rich tw:px-3 tw:py-2 tw:text-sm tw:text-slate-900 tw:outline-none tw:dark:text-slate-100"
      />
    </div>
  );
}
