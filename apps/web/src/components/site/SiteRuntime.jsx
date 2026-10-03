'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import initSite from '@/lib/runtime/main';
import { pageScripts } from '@/lib/runtime/registry';

// Internal links are plain <a>, so each page view is a full load and this
// runs once per load. The flag only absorbs React's dev-mode double effect.
let started = false;

/* Runs the design's behaviour once the page has hydrated: first the page's
   own scripts (they were inline in the HTML, ahead of main.js), then the
   shared site script. */
export default function SiteRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    if (started || pathname.startsWith('/admin')) return;
    started = true;

    const theme = document.documentElement.getAttribute('data-theme');
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#05060f' : '#f5f6fb');

    // Each script is isolated, as separate <script> tags were: one failing
    // logs its error and the rest still run, instead of an exception in this
    // effect unmounting the whole page.
    // Which page scripts: BodyClass names them (one template serves many URLs).
    const group = document.body.dataset.scripts;
    for (const run of [...(pageScripts[group] || []), initSite]) {
      try {
        run();
      } catch (err) {
        console.error(err);
      }
    }
  }, [pathname]);

  return null;
}
