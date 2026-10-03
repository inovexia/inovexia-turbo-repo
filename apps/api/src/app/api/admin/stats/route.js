import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';
import { mailConfigured } from '@/lib/mail';

export const dynamic = 'force-dynamic';

/* GET /api/admin/stats — numbers for the dashboard. */
export const GET = withAdmin(async (req) => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const [newEnquiries, weekEnquiries, totalEnquiries, cvs, byType, recent] = await Promise.all([
    prisma.enquiry.count({ where: { status: 'NEW' } }),
    prisma.enquiry.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.enquiry.count(),
    prisma.jobApplication.count(),
    prisma.enquiry.groupBy({ by: ['type'], _count: true }),
    prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 6, select: { id: true, type: true, name: true, service: true, status: true, createdAt: true } }),
  ]);
  return json(req, {
    ok: true,
    stats: {
      newEnquiries, weekEnquiries, totalEnquiries, cvs,
      byType: Object.fromEntries(byType.map((r) => [r.type, r._count])),
      email: mailConfigured() ? { on: true, to: process.env.NOTIFY_TO } : { on: false },
    },
    recent,
  });
});

export const OPTIONS = preflight;
