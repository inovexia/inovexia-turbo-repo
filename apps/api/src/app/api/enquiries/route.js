import { after } from 'next/server';
import { prisma } from '@inovexia/database';
import { clientIp, fieldErrors, json, preflight, rateLimited } from '@/lib/http';
import { notifyEnquiry } from '@/lib/mail';
import { enquirySchema } from '@/lib/validation';

/* POST /api/enquiries — the Contact form (type "contact"), the Get in Touch
   form (type "quote") and the Discuss Your Project brief (type "project"). */

// Each form's fields → the enquiries table.
function toRow(d) {
  switch (d.type) {
    case 'quote':
      return { type: 'QUOTE', phone: d.mobile, company: d.company, message: d.details };
    case 'project':
      return {
        type: 'PROJECT', phone: d.phone, company: d.company, message: d.overview, role: d.role,
        goals: d.goals, websiteUrl: d.websiteUrl, projectStage: d.projectStage, timeline: d.timeline,
      };
    default:
      return { type: 'CONTACT', phone: d.phone, message: d.message };
  }
}
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json(req, { ok: false, error: 'Invalid request body.' }, 400);
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json(req, { ok: false, error: 'Please check the highlighted fields.', fields: fieldErrors(parsed.error) }, 422);
  }
  const data = parsed.data;

  // Honeypot filled in: a bot. Answer as if it worked and store nothing.
  if (data.website) return json(req, { ok: true });

  if (rateLimited(req, 'enquiry')) {
    return json(req, { ok: false, error: 'Too many messages from this connection. Please try again later.' }, 429);
  }

  try {
    // Empty optional fields are stored as NULL, not ''.
    const row = Object.fromEntries(Object.entries(toRow(data)).map(([k, v]) => [k, v === '' ? null : v ?? null]));
    const enquiry = await prisma.enquiry.create({
      data: {
        ...row,
        name: data.name,
        email: data.email,
        service: data.service,
        pageUrl: data.pageUrl || null,
        ip: clientIp(req),
        userAgent: (req.headers.get('user-agent') || '').slice(0, 255) || null,
      },
    });
    after(() => notifyEnquiry(enquiry)); // email once the visitor has their answer
    return json(req, { ok: true, id: enquiry.id }, 201);
  } catch (err) {
    console.error('[enquiries] save failed:', err.message);
    return json(req, { ok: false, error: 'We could not send your message just now. Please email contact@inovexiasoftware.com.' }, 500);
  }
}

export const OPTIONS = preflight;
