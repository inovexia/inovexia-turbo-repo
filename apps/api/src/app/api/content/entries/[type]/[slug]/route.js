import { prisma } from '@inovexia/database';
import { TYPES, publicEntry } from '@/lib/entries';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/content/entries/:type/:slug → one published entry, or 404. */
export async function GET(req, { params }) {
  const { type, slug } = await params;
  if (!TYPES.includes(type)) return json(req, { ok: false, error: 'Not found' }, 404);
  try {
    const row = await prisma.entry.findUnique({ where: { type_slug: { type, slug } } });
    if (!row || !row.published) return json(req, { ok: false, error: 'Not found' }, 404);
    return json(req, { ok: true, item: publicEntry(row) });
  } catch (err) {
    console.error('[content/entry] read failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
}

export const OPTIONS = preflight;
