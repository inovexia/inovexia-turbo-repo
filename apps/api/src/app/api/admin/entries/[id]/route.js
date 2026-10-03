import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { cleanEntryInput, publicEntry, uniqueSlug } from '@/lib/entries';
import { json, preflight } from '@/lib/http';
import { revalidateSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';

const load = async (params) => {
  const id = parseInt((await params).id, 10);
  return id ? prisma.entry.findUnique({ where: { id } }) : null;
};

/* GET /api/admin/entries/:id → the full entry. */
export const GET = withAdmin(async (req, { params }) => {
  const row = await load(params);
  if (!row) return json(req, { ok: false, error: 'Not found' }, 404);
  return json(req, { ok: true, item: publicEntry(row) });
});

/* PUT /api/admin/entries/:id  { title?, slug?, published?, template?, fields?, page?, section?, seo? } */
export const PUT = withAdmin(async (req, { params }) => {
  const row = await load(params);
  if (!row) return json(req, { ok: false, error: 'Not found' }, 404);
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return json(req, { ok: false, error: 'Invalid request body.' }, 400);

  const data = cleanEntryInput(row.type, body, row);
  if ('slug' in data) {
    if (!data.slug) return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: { slug: 'Use letters, numbers and hyphens.' } }, 422);
    const free = await uniqueSlug(row.type, data.slug, row.id);
    if (free !== data.slug) return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: { slug: `That address is taken. Try "${free}".` } }, 422);
  }
  if ('title' in data && !data.title) return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: { title: 'Please give it a title.' } }, 422);

  const updated = await prisma.entry.update({ where: { id: row.id }, data });
  await revalidateSite();
  return json(req, { ok: true, item: publicEntry(updated) });
});

/* DELETE /api/admin/entries/:id */
export const DELETE = withAdmin(async (req, { params }) => {
  const row = await load(params);
  if (!row) return json(req, { ok: false, error: 'Not found' }, 404);
  await prisma.entry.delete({ where: { id: row.id } });
  await revalidateSite();
  return json(req, { ok: true });
});

export const OPTIONS = preflight;
