import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

/* PATCH /api/admin/media/:id  { alt } — the default description for the image. */
export const PATCH = withAdmin(async (req, { params }) => {
  const id = parseInt((await params).id, 10);
  const body = await req.json().catch(() => ({}));
  try {
    await prisma.media.update({ where: { id }, data: { alt: String(body.alt || '').slice(0, 255) } });
    return json(req, { ok: true });
  } catch (err) {
    if (err.code === 'P2025') return json(req, { ok: false, error: 'Not found' }, 404);
    throw err;
  }
});

/* DELETE /api/admin/media/:id — pages still pointing at it lose the image,
   so the admin asks first. */
export const DELETE = withAdmin(async (req, { params }) => {
  const id = parseInt((await params).id, 10);
  try {
    await prisma.media.delete({ where: { id } });
    return json(req, { ok: true });
  } catch (err) {
    if (err.code === 'P2025') return json(req, { ok: false, error: 'Not found' }, 404);
    throw err;
  }
});

export const OPTIONS = preflight;
