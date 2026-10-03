import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// One .env for the whole monorepo, at its root. (Not @next/env: it caches its
// first load — Next's own, of this app folder — and ignores a second dir.)
// Existing variables win, so real environment settings override the file.
const envFile = path.join(root, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

const API_URL = (process.env.API_URL || 'http://localhost:4000').replace(/\/$/, '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: root,
  turbopack: { root },
  poweredByHeader: false,
  // The browser only ever talks to this origin; /api/* is proxied to apps/api.
  async rewrites() {
    return [{ source: '/api/:path*', destination: `${API_URL}/api/:path*` }];
  },
  // Keep old links and bookmarks working: the design's .html names, the
  // earlier flat URLs (/work-tonezone) and the earlier section names
  // (/work, /product) all land on the current URL in one hop. Mirrors the
  // route maps in scripts/convert-html.mjs. Specific rules first.
  async redirects() {
    const renamed = { work: '/case-studies', product: '/products', blog: '/blogs' };
    const section = { service: 'service', work: 'case-study', product: 'product', blog: 'blog' };
    const go = (source, destination) => ({ source, destination, permanent: true });
    return [
      go('/index.html', '/'),
      ...Object.entries(renamed).flatMap(([old, now]) => [go(`/${old}`, now), go(`/${old}.html`, now)]),
      go('/work/:slug', '/case-study/:slug'),
      ...Object.entries(section).flatMap(([prefix, s]) => [
        go(`/${prefix}-:slug.html`, `/${s}/:slug`),
        go(`/${prefix}-:slug`, `/${s}/:slug`),
      ]),
      // a section with no slug goes to its list page
      { source: '/service', destination: '/services', permanent: false },
      { source: '/case-study', destination: '/case-studies', permanent: false },
      go('/:page.html', '/:page'),
    ];
  },
};

export default nextConfig;
