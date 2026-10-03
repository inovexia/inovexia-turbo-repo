import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

/* DELETE /api/admin/applications/:id — removes the application and its CV. */
export const DELETE = withAdmin(async (req, { params }) => {
  const id = parseInt((await params).id, 10);
  try {
    await prisma.jobApplication.delete({ where: { id } });
    return json(req, { ok: true });
  } catch (err) {
    if (err.code === 'P2025') return json(req, { ok: false, error: 'Not found' }, 404);
    console.error('[admin/applications] delete failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
});

export const OPTIONS = preflight;
