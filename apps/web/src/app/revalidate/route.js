import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/* POST /revalidate — called by the API after every admin save, so the
   change shows on the next page view. Authorised with REVALIDATE_SECRET
   (shared by both apps through the root .env). */
export async function POST(req) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get('x-revalidate-secret') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  revalidateTag('content', { expire: 0 });
  return NextResponse.json({ ok: true });
}
