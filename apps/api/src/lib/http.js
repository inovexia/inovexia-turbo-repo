import { NextResponse } from 'next/server';

export const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(req) {
  const origin = req.headers.get('origin');
  if (!origin || !allowedOrigins.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

export function json(req, body, status = 200) {
  return NextResponse.json(body, { status, headers: corsHeaders(req) });
}

export function preflight(req) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export function clientIp(req) {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip') || '').trim().slice(0, 64) || null;
}

/* Fixed-window rate limit, per IP and bucket. In-memory, so per process —
   enough to stop a form being hammered; put a shared store in front if the
   API ever runs as several instances. */
const hits = new Map();

export function rateLimited(req, bucket, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const key = `${bucket}:${clientIp(req) || 'unknown'}`;
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || now > entry.reset) {
    hits.set(key, { count: 1, reset: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (now > v.reset) hits.delete(k);
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

/* Turn a zod error into the { field: message } map the forms display. */
export function fieldErrors(error) {
  const out = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
