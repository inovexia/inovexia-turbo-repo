import { pages } from '@inovexia/content';
import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { cleanObject, cleanSeo, diffFromDefaults } from '@/lib/clean';
import { json, preflight } from '@/lib/http';
import { revalidateSite } from '@/lib/revalidate';

export const dynamic = 'force-dynamic';

/* GET /api/admin/pages/:name → { data: saved edits } (the admin has the
   field definitions and defaults from @inovexia/content). */
export const GET = withAdmin(async (req, { params }) => {
  const { name } = await params;
  if (!pages[name]) return json(req, { ok: false, error: 'Not found' }, 404);
  const row = await prisma.pageContent.findUnique({ where: { page: name } });
  return json(req, { ok: true, data: row?.data || {}, updatedAt: row?.updatedAt || null });
});

/* PUT /api/admin/pages/:name  { data, seo } — data is the full form; only
   fields that differ from the design are stored. */
export const PUT = withAdmin(async (req, { params }) => {
  const { name } = await params;
  const m = pages[name];
  if (!m) return json(req, { ok: false, error: 'Not found' }, 404);
  const body = await req.json().catch(() => null);
  if (!body || typeof body.data !== 'object') return json(req, { ok: false, error: 'Invalid request body.' }, 400);

  const data = diffFromDefaults(m.fields, cleanObject(m.fields, body.data));
  const seo = cleanSeo(body.seo);
  if (seo.title || seo.description) data.$seo = seo;

  const row = Object.keys(data).length
    ? await prisma.pageContent.upsert({ where: { page: name }, create: { page: name, data }, update: { data } })
    : await prisma.pageContent.deleteMany({ where: { page: name } }).then(() => null);
  await revalidateSite();
  return json(req, { ok: true, data, updatedAt: row?.updatedAt || null });
});

export const OPTIONS = preflight;
