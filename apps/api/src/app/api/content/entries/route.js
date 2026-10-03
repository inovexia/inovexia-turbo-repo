import { prisma } from '@inovexia/database';
import { TYPES, publicEntry } from '@/lib/entries';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/content/entries?type=blog → published entries of a type, in order. */
export async function GET(req) {
  const type = req.nextUrl.searchParams.get('type');
  if (!TYPES.includes(type)) return json(req, { ok: false, error: 'Unknown type' }, 400);
  try {
    const rows = await prisma.entry.findMany({ where: { type, published: true }, orderBy: [{ sort: 'asc' }, { id: 'asc' }] });
    return json(req, { ok: true, items: rows.map(publicEntry) });
  } catch (err) {
    console.error('[content/entries] list failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
}

export const OPTIONS = preflight;
