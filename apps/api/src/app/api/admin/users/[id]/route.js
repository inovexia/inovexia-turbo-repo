import { z } from 'zod';
import { prisma } from '@inovexia/database';
import { hashPassword, MIN_PASSWORD_LENGTH, verifyPassword } from '@inovexia/database/password';
import { requestTokenHash, withAdmin } from '@/lib/auth';
import { fieldErrors, json, preflight } from '@/lib/http';

const updateSchema = z.object({
  name: z.string().trim().min(2, 'Please enter a name.').max(120).optional(),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters.`).max(200).optional(),
  currentPassword: z.string().optional(),
});

/* PATCH /api/admin/users/:id  { name?, password?, currentPassword? }
   Changing your own password needs the current one; an admin may reset
   someone else's. Changing a password signs that user out everywhere. */
export const PATCH = withAdmin(async (req, { params }, me) => {
  const id = parseInt((await params).id, 10);
  const parsed = updateSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: fieldErrors(parsed.error) }, 422);
  const { name, password, currentPassword } = parsed.data;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) return json(req, { ok: false, error: 'Not found' }, 404);

  const data = {};
  if (name) data.name = name;
  if (password) {
    if (id === me.id && !(await verifyPassword(currentPassword || '', user.passwordHash))) {
      return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: { currentPassword: 'That is not your current password.' } }, 422);
    }
    data.passwordHash = await hashPassword(password);
  }
  await prisma.user.update({ where: { id }, data });
  if (password) {
    // end that user's other sessions; keep the one making this change if it is your own
    const keep = id === me.id ? requestTokenHash(req) : '';
    await prisma.session.deleteMany({ where: { userId: id, NOT: { tokenHash: keep } } });
  }
  return json(req, { ok: true });
});

/* DELETE /api/admin/users/:id — not yourself, and never the last admin. */
export const DELETE = withAdmin(async (req, { params }, me) => {
  const id = parseInt((await params).id, 10);
  if (id === me.id) return json(req, { ok: false, error: 'You cannot delete your own account.' }, 422);
  if ((await prisma.user.count()) <= 1) return json(req, { ok: false, error: 'At least one admin must remain.' }, 422);
  try {
    await prisma.user.delete({ where: { id } });
    return json(req, { ok: true });
  } catch (err) {
    if (err.code === 'P2025') return json(req, { ok: false, error: 'Not found' }, 404);
    throw err;
  }
});

export const OPTIONS = preflight;
