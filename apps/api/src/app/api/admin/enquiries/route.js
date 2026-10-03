import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

const TYPES = ['CONTACT', 'QUOTE', 'PROJECT'];
const STATUSES = ['NEW', 'IN_PROGRESS', 'CLOSED'];

/* GET /api/admin/enquiries?type=QUOTE&status=NEW&page=1&pageSize=20 */
export const GET = withAdmin(async (req) => {
  const q = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(q.get('page') || '1', 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(q.get('pageSize') || '20', 10) || 20));
  const where = {};
  if (TYPES.includes(q.get('type'))) where.type = q.get('type');
  if (STATUSES.includes(q.get('status'))) where.status = q.get('status');

  try {
    const [total, items] = await Promise.all([
      prisma.enquiry.count({ where }),
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return json(req, { ok: true, total, page, pageSize, items });
  } catch (err) {
    console.error('[admin/enquiries] list failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
});

export const OPTIONS = preflight;
