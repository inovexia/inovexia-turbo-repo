import { z } from 'zod';
import { prisma } from '@inovexia/database';
import { hashPassword, MIN_PASSWORD_LENGTH } from '@inovexia/database/password';
import { withAdmin } from '@/lib/auth';
import { fieldErrors, json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

const PUBLIC = { id: true, email: true, name: true, lastLoginAt: true, createdAt: true };

const newUserSchema = z.object({
  name: z.string().trim().min(2, 'Please enter a name.').max(120),
  email: z.string().trim().toLowerCase().max(190).refine((v) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v), 'Please enter a valid email address.'),
  password: z.string().min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters.`).max(200),
});

/* GET /api/admin/users */
export const GET = withAdmin(async (req) => {
  const items = await prisma.user.findMany({ select: PUBLIC, orderBy: { createdAt: 'asc' } });
  return json(req, { ok: true, items });
});

/* POST /api/admin/users  { name, email, password } */
export const POST = withAdmin(async (req) => {
  const parsed = newUserSchema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: fieldErrors(parsed.error) }, 422);
  const { name, email, password } = parsed.data;
  try {
    const user = await prisma.user.create({ data: { name, email, passwordHash: await hashPassword(password) }, select: PUBLIC });
    return json(req, { ok: true, item: user }, 201);
  } catch (err) {
    if (err.code === 'P2002') return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: { email: 'An admin with this email already exists.' } }, 422);
    throw err;
  }
});

export const OPTIONS = preflight;
