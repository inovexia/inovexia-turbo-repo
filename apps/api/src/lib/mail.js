import nodemailer from 'nodemailer';

/* Email notifications for form submissions, sent through the SMTP account
   in .env (e.g. a cPanel mailbox). Until SMTP_HOST and NOTIFY_TO are set,
   nothing is sent and a line is logged instead — a submission is always
   saved first, so email can never lose one. */

export const mailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.NOTIFY_TO);

let transport;
function transporter() {
  if (!transport) {
    const port = Number(process.env.SMTP_PORT || 465);
    transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
    });
  }
  return transport;
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const siteUrl = () => (process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

/* A plain, readable email: heading, a two-column table of the fields, a
   button into the admin. Inline styles only — mail clients ignore <style>. */
function render({ heading, intro, rows, link, linkLabel }) {
  const filled = rows.filter(([, v]) => v !== undefined && v !== null && String(v).trim() !== '');
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f6fb;font-family:Segoe UI,Arial,sans-serif;color:#35406a">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4e6f0;border-radius:14px">
<tr><td style="padding:24px 28px 8px"><p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#5a4ae8">Inovexia website</p>
<h1 style="margin:8px 0 6px;font-size:20px;color:#0a1030">${esc(heading)}</h1><p style="margin:0;font-size:14px;color:#626d92">${esc(intro)}</p></td></tr>
<tr><td style="padding:12px 28px"><table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px">
${filled.map(([k, v]) => `<tr><td style="padding:9px 12px 9px 0;border-top:1px solid #eef0f6;color:#626d92;vertical-align:top;white-space:nowrap;width:150px">${esc(k)}</td><td style="padding:9px 0;border-top:1px solid #eef0f6;color:#0a1030;white-space:pre-wrap">${esc(v)}</td></tr>`).join('\n')}
</table></td></tr>
<tr><td style="padding:12px 28px 26px"><a href="${esc(link)}" style="display:inline-block;padding:11px 20px;border-radius:999px;background:#5a4ae8;color:#fff;text-decoration:none;font-weight:600;font-size:14px">${esc(linkLabel)}</a></td></tr>
</table></body></html>`;
  const text = `${heading}\n${intro}\n\n${filled.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${linkLabel}: ${link}\n`;
  return { html, text };
}

async function send(message) {
  if (!mailConfigured()) {
    console.log(`[mail] not configured (SMTP_HOST / NOTIFY_TO) — skipped: ${message.subject}`);
    return;
  }
  try {
    await transporter().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFY_TO,
      ...message,
    });
  } catch (err) {
    console.error(`[mail] failed to send "${message.subject}":`, err.message);
  }
}

const FORM = { CONTACT: 'Contact Us', QUOTE: 'Get in Touch', PROJECT: 'Discuss Your Project' };
export const enquiryRef = (id) => `INV-${String(id).padStart(5, '0')}`;

export function notifyEnquiry(e) {
  const ref = enquiryRef(e.id);
  const kind = e.type === 'PROJECT' ? 'project brief' : 'enquiry';
  const { html, text } = render({
    heading: `New ${kind}: ${e.name}`,
    intro: `${FORM[e.type]} form · ${ref} · ${new Date(e.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}. Reply to this email to answer ${e.name.split(' ')[0]} directly.`,
    rows: [
      ['Name', e.name],
      ['Email', e.email],
      ['Phone', e.phone],
      ['Company', e.company],
      ['Role', e.role],
      ['Service', e.service],
      [e.type === 'PROJECT' ? 'Project overview' : 'Message', e.message],
      ['Goals & objectives', e.goals],
      ['Website', e.websiteUrl],
      ['Project stage', e.projectStage],
      ['Timeline', e.timeline],
      ['Sent from', e.pageUrl ? siteUrl() + e.pageUrl : ''],
    ],
    link: `${siteUrl()}/admin/enquiries?open=${e.id}`,
    linkLabel: 'Open in admin',
  });
  return send({ subject: `[${ref}] ${FORM[e.type]}: ${e.service} — ${e.name}`, replyTo: { name: e.name, address: e.email }, html, text });
}

export function notifyApplication(a, fileBuffer) {
  const { html, text } = render({
    heading: `New CV: ${a.name}`,
    intro: `Careers pop-up on the About page. The CV is attached. Reply to this email to answer ${a.name.split(' ')[0]} directly.`,
    rows: [['Name', a.name], ['Email', a.email], ['CV', `${a.fileName} (${Math.ceil(a.fileSize / 1024)} KB)`]],
    link: `${siteUrl()}/admin/cvs`,
    linkLabel: 'Open in admin',
  });
  return send({
    subject: `[CV] ${a.name}`,
    replyTo: { name: a.name, address: a.email },
    html,
    text,
    attachments: [{ filename: a.fileName, content: fileBuffer, contentType: a.mimeType }],
  });
}
