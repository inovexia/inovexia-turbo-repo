import { imageSize } from 'image-size';
import { prisma } from '@inovexia/database';
import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';
import { cleanSvgFile, mediaUrl } from '@/lib/media';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const MAX = 5 * 1024 * 1024;
const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' };

/* GET /api/admin/media?page=1&q=… → the library, newest first. */
export const GET = withAdmin(async (req) => {
  const q = req.nextUrl.searchParams;
  const page = Math.max(1, parseInt(q.get('page') || '1', 10) || 1);
  const pageSize = 48;
  const where = q.get('q') ? { OR: [{ fileName: { contains: q.get('q') } }, { alt: { contains: q.get('q') } }] } : {};
  const [total, rows] = await Promise.all([
    prisma.media.count({ where }),
    prisma.media.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, fileName: true, mimeType: true, size: true, width: true, height: true, alt: true, createdAt: true },
    }),
  ]);
  return json(req, { ok: true, total, page, pageSize, items: rows.map((m) => ({ ...m, url: mediaUrl(m) })) });
});

/* POST /api/admin/media  multipart: file (+ alt) — JPG, PNG, WebP, GIF or SVG, ≤ 5 MB. */
export const POST = withAdmin(async (req) => {
  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || typeof file === 'string') return json(req, { ok: false, error: 'Choose an image to upload.' }, 422);
  if (!TYPES[file.type]) return json(req, { ok: false, error: 'Use a JPG, PNG, WebP, GIF or SVG image.' }, 422);
  if (file.size > MAX) return json(req, { ok: false, error: 'That image is over 5 MB. Please use a smaller one.' }, 422);

  let bytes = Buffer.from(await file.arrayBuffer());
  if (file.type === 'image/svg+xml') {
    bytes = cleanSvgFile(bytes);
    if (!bytes) return json(req, { ok: false, error: 'That SVG could not be read.' }, 422);
  }
  let size = {};
  try { size = imageSize(bytes); } catch { /* unknown size: the page uses the design's */ }

  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'image';
  const media = await prisma.media.create({
    data: {
      fileName: `${base}.${TYPES[file.type]}`,
      mimeType: file.type,
      size: bytes.length,
      width: size.width || null,
      height: size.height || null,
      alt: String(form.get('alt') || '').slice(0, 255),
      data: bytes,
    },
    select: { id: true, fileName: true, mimeType: true, size: true, width: true, height: true, alt: true, createdAt: true },
  });
  return json(req, { ok: true, item: { ...media, url: mediaUrl(media) } }, 201);
});

export const OPTIONS = preflight;
