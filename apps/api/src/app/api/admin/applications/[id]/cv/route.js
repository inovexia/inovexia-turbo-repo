import { NextResponse } from 'next/server';
import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/admin/applications/:id/cv — streams the stored CV as a download. */
export const GET = withAdmin(async (req, { params }) => {
  const id = parseInt((await params).id, 10);
  const app = id
    ? await prisma.jobApplication.findUnique({ where: { id }, select: { fileName: true, mimeType: true, file: true } })
    : null;
  if (!app) return json(req, { ok: false, error: 'Not found' }, 404);

  const safeName = app.fileName.replace(/[^\w.\- ]+/g, '_');
  return new NextResponse(app.file, {
    headers: {
      'Content-Type': app.mimeType,
      'Content-Disposition': `attachment; filename="${safeName}"`,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'private, no-store',
    },
  });
});

export const OPTIONS = preflight;
