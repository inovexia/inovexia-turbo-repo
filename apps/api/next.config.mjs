import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

// One .env for the whole monorepo, at its root. (Not @next/env: it caches its
// first load — Next's own, of this app folder — and ignores a second dir.)
// Existing variables win, so real environment settings override the file.
const envFile = path.join(root, '.env');
if (fs.existsSync(envFile)) process.loadEnvFile(envFile);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@inovexia/database'],
  serverExternalPackages: ['@prisma/client', '.prisma/client'],
  outputFileTracingRoot: root,
  turbopack: { root },
  poweredByHeader: false,
};

export default nextConfig;
