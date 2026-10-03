import { after } from 'next/server';
import { prisma } from '@inovexia/database';
import { clientIp, fieldErrors, json, preflight, rateLimited } from '@/lib/http';
import { notifyApplication } from '@/lib/mail';
import { CV_MAX_BYTES, CV_NAME_OK, applicationSchema } from '@/lib/validation';

export const runtime = 'nodejs';

/* POST /api/careers — multipart: name, email, cv (PDF or Word, max 5 MB). */
export async function POST(req) {
  let form;
  try {
    form = await req.formData();
  } catch {
    return json(req, { ok: false, error: 'Invalid request body.' }, 400);
  }

  const parsed = applicationSchema.safeParse({
    name: form.get('name') ?? '',
    email: form.get('email') ?? '',
  });
  const fields = parsed.success ? {} : fieldErrors(parsed.error);

  const file = form.get('cv');
  if (!file || typeof file === 'string' || file.size === 0) fields.cv = 'Please attach your CV.';
  else if (!CV_NAME_OK.test(file.name)) fields.cv = 'Please upload a PDF or Word file.';
  else if (file.size > CV_MAX_BYTES) fields.cv = 'That file is over 5 MB. Please upload a smaller one.';

  if (Object.keys(fields).length) {
    return json(req, { ok: false, error: 'Please check the highlighted fields.', fields }, 422);
  }

  if (rateLimited(req, 'careers', { limit: 3 })) {
    return json(req, { ok: false, error: 'Too many uploads from this connection. Please try again later.' }, 429);
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const application = await prisma.jobApplication.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        fileName: file.name.slice(0, 255),
        mimeType: (file.type || 'application/octet-stream').slice(0, 120),
        fileSize: bytes.length,
        file: bytes,
        ip: clientIp(req),
      },
      select: { id: true, name: true, email: true, fileName: true, mimeType: true, fileSize: true },
    });
    after(() => notifyApplication(application, bytes)); // CV attached
    return json(req, { ok: true, id: application.id }, 201);
  } catch (err) {
    console.error('[careers] save failed:', err.message);
    return json(req, { ok: false, error: 'We could not upload your CV just now. Please email it to contact@inovexiasoftware.com.' }, 500);
  }
}

export const OPTIONS = preflight;
