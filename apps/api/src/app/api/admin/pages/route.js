import { PAGE_ORDER, pages } from '@inovexia/content';
import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/admin/pages → every editable page, with how many fields are edited. */
export const GET = withAdmin(async (req) => {
  const rows = await prisma.pageContent.findMany({ select: { page: true, data: true, updatedAt: true } });
  const byName = Object.fromEntries(rows.map((r) => [r.page, r]));
  const names = [...PAGE_ORDER.filter((n) => pages[n]), ...Object.keys(pages).filter((n) => !PAGE_ORDER.includes(n))];
  const items = names.map((name) => {
    const m = pages[name];
    const row = byName[name];
    return {
      name,
      title: m.title,
      route: m.route,
      fieldCount: m.fields.length,
      editedCount: row ? Object.keys(row.data || {}).filter((k) => k !== '$seo').length : 0,
      updatedAt: row?.updatedAt || null,
    };
  });
  return json(req, { ok: true, items });
});

export const OPTIONS = preflight;
