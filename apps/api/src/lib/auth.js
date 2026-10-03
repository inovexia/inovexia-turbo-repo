import { createHash, randomBytes } from 'node:crypto';
import { prisma } from '@inovexia/database';
import { allowedOrigins, clientIp, json } from './http';

/* Admin sessions: a random token in an HttpOnly cookie, its SHA-256 in the
   sessions table. The browser reaches this API through the web app's /api
   proxy, so the cookie belongs to the site's own origin. */

export const COOKIE = 'inv_admin';
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // a week, renewed while in use
const RENEW_AFTER_MS = 24 * 60 * 60 * 1000;

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

/* Hash of the session token this request carries ('' when signed out). */
export function requestTokenHash(req) {
  const token = readToken(req);
  return token ? sha256(token) : '';
}

function cookieHeader(value, maxAgeSec) {
  return [
    `${COOKIE}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSec}`,
    // Secure whenever the public site is https (a Secure cookie is never sent over plain http)
    (process.env.SITE_URL || '').startsWith('https://') ? 'Secure' : '',
  ].filter(Boolean).join('; ');
}

function readToken(req) {
  return req.cookies.get(COOKIE)?.value || '';
}

export async function createSession(req, userId) {
  const token = randomBytes(32).toString('base64url');
  await prisma.session.create({
    data: {
      tokenHash: sha256(token),
      userId,
      expiresAt: new Date(Date.now() + TTL_MS),
      ip: clientIp(req),
      userAgent: (req.headers.get('user-agent') || '').slice(0, 255) || null,
    },
  });
  // housekeeping: expired sessions go when anyone signs in
  prisma.session.deleteMany({ where: { expiresAt: { lt: new Date() } } }).catch(() => {});
  return cookieHeader(token, TTL_MS / 1000);
}

export async function destroySession(req) {
  const token = readToken(req);
  if (token) await prisma.session.deleteMany({ where: { tokenHash: sha256(token) } });
  return cookieHeader('', 0);
}

/* The signed-in user, or null. Renews the session once a day while in use. */
export async function currentUser(req) {
  const token = readToken(req);
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: sha256(token) },
    include: { user: { select: { id: true, email: true, name: true } } },
  });
  if (!session || session.expiresAt < new Date()) return null;
  if (session.expiresAt.getTime() - Date.now() < TTL_MS - RENEW_AFTER_MS) {
    prisma.session.update({ where: { id: session.id }, data: { expiresAt: new Date(Date.now() + TTL_MS) } }).catch(() => {});
  }
  return session.user;
}

/* Cross-site request guard for state-changing admin calls: a browser always
   sends Origin on POST/PUT/PATCH/DELETE, and it must be the site itself.
   (SameSite=Lax already keeps the cookie off cross-site posts; this is the
   second lock.) */
function sameOrigin(req) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // non-browser clients (curl, server-to-server)
  return allowedOrigins.includes(origin);
}

/* Wrap an admin route handler: (req, ctx, user) => Response.
   Unauthenticated → 401; foreign origin on a mutation → 403. */
export function withAdmin(handler) {
  return async (req, ctx) => {
    if (req.method !== 'GET' && req.method !== 'HEAD' && !sameOrigin(req)) {
      return json(req, { ok: false, error: 'Forbidden' }, 403);
    }
    let user;
    try {
      user = await currentUser(req);
    } catch (err) {
      console.error('[auth] session lookup failed:', err.message);
      return json(req, { ok: false, error: 'Database unavailable.' }, 503);
    }
    if (!user) return json(req, { ok: false, error: 'Unauthorized' }, 401);
    return handler(req, ctx, user);
  };
}
