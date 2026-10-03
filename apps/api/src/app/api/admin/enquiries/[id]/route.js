import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { fieldErrors, json, preflight } from '@/lib/http';
import { statusSchema } from '@/lib/validation';

/* PATCH /api/admin/enquiries/:id  { status: "NEW" | "IN_PROGRESS" | "CLOSED" } */
export const PATCH = withAdmin(async (req, { params }) => {
  const id = parseInt((await params).id, 10);
  if (!id) return json(req, { ok: false, error: 'Not found' }, 404);

  const parsed = statusSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json(req, { ok: false, fields: fieldErrors(parsed.error) }, 422);

  try {
    const item = await prisma.enquiry.update({ where: { id }, data: { status: parsed.data.status } });
    return json(req, { ok: true, item });
  } catch (err) {
    if (err.code === 'P2025') return json(req, { ok: false, error: 'Not found' }, 404);
    console.error('[admin/enquiries] update failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
});

/* DELETE /api/admin/enquiries/:id */
export const DELETE = withAdmin(async (req, { params }) => {
  const id = parseInt((await params).id, 10);
  try {
    await prisma.enquiry.delete({ where: { id } });
    return json(req, { ok: true });
  } catch (err) {
    if (err.code === 'P2025') return json(req, { ok: false, error: 'Not found' }, 404);
    console.error('[admin/enquiries] delete failed:', err.message);
    return json(req, { ok: false, error: 'Database unavailable.' }, 503);
  }
});

export const OPTIONS = preflight;
