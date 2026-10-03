import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/admin/applications?page=1&pageSize=20 — metadata only, no file bytes. */
export const GET = withAdmin(async (req) => {
  const q = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(q.get('page') || '1', 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(q.get('pageSize') || '20', 10) || 20));

  try {
    const [total, items] = await Promise.all([
      prisma.jobApplication.count(),
      prisma.jobApplication.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: { id: true, name: true, email: true, fileName: true, mimeType: true, fileSize: true, createdAt: true },
      }),
    ]);
    return json(req, { ok: true, total, page, pageSize, items });
  } catch (err) {
    console.error('[admin/applications] list failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
});

export const OPTIONS = preflight;
