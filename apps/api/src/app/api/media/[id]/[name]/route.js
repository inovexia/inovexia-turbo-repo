import { NextResponse } from 'next/server';
import { prisma } from '@inovexia/database';

export const dynamic = 'force-dynamic';

/* GET /api/media/:id/:name — an uploaded image. Files never change once
   uploaded (a replacement is a new upload), so browsers and CDNs may cache
   them for a year. SVGs get a locked-down CSP so they can't run script even
   when opened directly. */
export async function GET(req, { params }) {
  const id = parseInt((await params).id, 10);
  const media = id ? await prisma.media.findUnique({ where: { id }, select: { data: true, mimeType: true } }).catch(() => null) : null;
  if (!media) return new NextResponse('Not found', { status: 404 });
  return new NextResponse(media.data, {
    headers: {
      'Content-Type': media.mimeType,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      ...(media.mimeType === 'image/svg+xml' && { 'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox" }),
    },
  });
}
