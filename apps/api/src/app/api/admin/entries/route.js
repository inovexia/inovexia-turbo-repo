import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { publicEntry, starterFor, TYPES, uniqueSlug } from '@/lib/entries';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/admin/entries?type=blog → every entry of a type (drafts too). */
export const GET = withAdmin(async (req) => {
  const type = req.nextUrl.searchParams.get('type');
  if (!TYPES.includes(type)) return json(req, { ok: false, error: 'Unknown type' }, 400);
  const rows = await prisma.entry.findMany({
    where: { type },
    orderBy: [{ sort: 'asc' }, { id: 'asc' }],
    select: { id: true, type: true, slug: true, title: true, template: true, published: true, sort: true, updatedAt: true },
  });
  return json(req, { ok: true, items: rows });
});

/* POST /api/admin/entries  { type, title, template? } — a new entry, or
   { duplicateOf: id } — a copy (as a draft) of an existing one. */
export const POST = withAdmin(async (req) => {
  const body = await req.json().catch(() => ({}));
  let data;
  if (body.duplicateOf) {
    const src = await prisma.entry.findUnique({ where: { id: Number(body.duplicateOf) } });
    if (!src) return json(req, { ok: false, error: 'Not found' }, 404);
    data = {
      type: src.type, title: `${src.title} (copy)`, template: src.template, published: false,
      fields: src.fields, page: src.page ?? undefined, section: src.section ?? undefined, seo: src.seo ?? undefined,
      slug: await uniqueSlug(src.type, `${src.slug}-copy`),
    };
  } else {
    if (!TYPES.includes(body.type)) return json(req, { ok: false, error: 'Unknown type' }, 400);
    const title = String(body.title || '').trim();
    if (!title) return json(req, { ok: false, error: 'Please give it a title.', fields: { title: 'Please give it a title.' } }, 422);
    const start = starterFor(body.type, { title, template: body.template });
    data = {
      type: body.type, title, template: start.template, published: false,
      fields: start.fields, page: start.page ?? undefined, section: start.section ?? undefined,
      seo: { title: `${title} — Inovexia Software`, description: '' },
      slug: await uniqueSlug(body.type, body.slug || title),
    };
  }
  const last = await prisma.entry.aggregate({ where: { type: data.type }, _max: { sort: true } });
  const row = await prisma.entry.create({ data: { ...data, sort: (last._max.sort ?? -1) + 1 } });
  return json(req, { ok: true, item: publicEntry(row) }, 201);
});

export const OPTIONS = preflight;
