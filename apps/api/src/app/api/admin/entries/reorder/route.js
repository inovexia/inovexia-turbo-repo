import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { TYPES } from '@/lib/entries';
import { json, preflight } from '@/lib/http';
import { revalidateSite } from '@/lib/revalidate';

/* POST /api/admin/entries/reorder  { type, ids: [id, …] } — the new order. */
export const POST = withAdmin(async (req) => {
  const body = await req.json().catch(() => ({}));
  if (!TYPES.includes(body.type) || !Array.isArray(body.ids)) return json(req, { ok: false, error: 'Invalid request body.' }, 400);
  const ids = body.ids.map(Number).filter(Boolean);
  await prisma.$transaction(ids.map((id, sort) => prisma.entry.updateMany({ where: { id, type: body.type }, data: { sort } })));
  await revalidateSite();
  return json(req, { ok: true });
});

export const OPTIONS = preflight;
