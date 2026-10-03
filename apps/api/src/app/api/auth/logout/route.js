import { destroySession } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

/* POST /api/auth/logout → ends this session and clears the cookie */
export async function POST(req) {
  let cookie;
  try {
    cookie = await destroySession(req);
  } catch (err) {
    console.error('[auth] logout failed:', err.message);
  }
  const res = json(req, { ok: true });
  if (cookie) res.headers.append('Set-Cookie', cookie);
  return res;
}

export const OPTIONS = preflight;
