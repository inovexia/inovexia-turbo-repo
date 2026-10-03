import { prisma } from '@inovexia/database';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return json(req, { ok: true, database: 'up' });
  } catch (err) {
    console.error('[health] database check failed:', err.message);
    return json(req, { ok: false, database: 'down' }, 503);
  }
}

export const OPTIONS = preflight;
