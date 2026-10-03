'use client';

import { useEffect } from 'react';
import { Button } from './index';

/* A sticky bar at the bottom of an editor: unsaved state, Save, and a
   browser warning before leaving with unsaved changes. */
export default function SaveBar({ dirty, saving, onSave, onDiscard, message, error, extra }) {
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  // Ctrl/Cmd+S saves
  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (dirty && !saving) onSave(); }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [dirty, saving, onSave]);

  return (
    <div className="tw:sticky tw:bottom-0 tw:z-10 tw:-mx-4 tw:mt-8 tw:flex tw:flex-wrap tw:items-center tw:gap-3 tw:border-t tw:border-slate-200 tw:bg-white/95 tw:px-4 tw:py-3 tw:backdrop-blur tw:sm:-mx-6 tw:sm:px-6 tw:dark:border-slate-800 tw:dark:bg-slate-900/95">
      <span className={`tw:text-sm ${error ? 'tw:text-red-600 tw:dark:text-red-400' : 'tw:text-slate-500'}`} role="status">
        {error || message || (dirty ? 'You have unsaved changes.' : 'All changes saved.')}
      </span>
      <div className="tw:ml-auto tw:flex tw:gap-2">
        {extra}
        {onDiscard && <Button disabled={!dirty || saving} onClick={onDiscard}>Discard changes</Button>}
        <Button variant="primary" busy={saving} disabled={!dirty} onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}
