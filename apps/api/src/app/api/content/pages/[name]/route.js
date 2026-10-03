import { pages } from '@inovexia/content';
import { prisma } from '@inovexia/database';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/content/pages/:name → { data } — the page's saved edits (the
   web app merges them over the design defaults). */
export async function GET(req, { params }) {
  const { name } = await params;
  if (!pages[name]) return json(req, { ok: false, error: 'Not found' }, 404);
  try {
    const row = await prisma.pageContent.findUnique({ where: { page: name } });
    return json(req, { ok: true, data: row?.data || {} });
  } catch (err) {
    console.error('[content/pages] read failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
}

export const OPTIONS = preflight;
