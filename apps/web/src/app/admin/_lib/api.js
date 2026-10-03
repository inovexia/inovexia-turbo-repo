'use client';

/* Admin API calls. The session lives in an HttpOnly cookie on this origin
   (set by /api/auth/login through the /api proxy), so requests just need
   same-origin credentials. A 401 anywhere means the session ended: the
   shell listens for 'admin:unauthorized' and shows the sign-in screen. */

export class ApiError extends Error {
  constructor(message, status, fields = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

export async function api(path, { method = 'GET', body, raw = false } = {}) {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  let res;
  try {
    res = await fetch(path, {
      method,
      credentials: 'same-origin',
      headers: body && !isForm ? { 'Content-Type': 'application/json' } : undefined,
      body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Could not reach the server. Check your connection and try again.', 0);
  }
  // A 401 from a content call means the session ran out mid-use. (From the
  // auth endpoints it just means "not signed in", which the shell handles.)
  if (res.status === 401 && !path.startsWith('/api/auth/')) {
    window.dispatchEvent(new Event('admin:unauthorized'));
  }
  if (raw && res.ok) return res;
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status, data.fields || {});
  }
  return data;
}

export const fmtDate = (d) => new Date(d).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
export const fmtSize = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(n / 1024)} KB`);
export const enquiryRef = (id) => `INV-${String(id).padStart(5, '0')}`;
