import { prisma } from '@inovexia/database';
import { hashPassword, verifyPassword } from '@inovexia/database/password';
import { createSession } from '@/lib/auth';
import { json, preflight, rateLimited } from '@/lib/http';

// Compared against when the email is unknown, so a wrong email and a wrong
// password take the same time and give the same answer.
const dummyHash = hashPassword('not-a-real-password');

/* POST /api/auth/login  { email, password } → sets the session cookie */
export async function POST(req) {
  if (rateLimited(req, 'login', { limit: 10, windowMs: 15 * 60 * 1000 })) {
    return json(req, { ok: false, error: 'Too many sign-in attempts. Please wait 15 minutes and try again.' }, 429);
  }
  const body = await req.json().catch(() => ({}));
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  if (!email || !password) return json(req, { ok: false, error: 'Enter your email and password.' }, 422);

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const ok = await verifyPassword(password, user ? user.passwordHash : await dummyHash);
    if (!user || !ok) return json(req, { ok: false, error: 'That email and password do not match an admin account.' }, 401);

    const cookie = await createSession(req, user.id);
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    const res = json(req, { ok: true, user: { id: user.id, email: user.email, name: user.name } });
    res.headers.append('Set-Cookie', cookie);
    return res;
  } catch (err) {
    console.error('[auth] login failed:', err.message);
    return json(req, { ok: false, error: 'Sign-in is unavailable right now (database).' }, 503);
  }
}

export const OPTIONS = preflight;
