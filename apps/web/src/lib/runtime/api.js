/* Form submission to the backend (apps/api, proxied at /api by next.config).
   Always resolves to { ok, id?, error?, fields? } — network failures included —
   so the form handlers have one shape to deal with. `fields` maps a field
   name to the server's message for it. */
const OFFLINE = 'We could not reach the server. Please check your connection and try again.';

export async function submitForm(path, body) {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData;
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: isForm ? undefined : { 'Content-Type': 'application/json' },
      body: isForm ? body : JSON.stringify({ ...body, pageUrl: location.pathname }),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) return { ok: true, id: data.id };
    return { ok: false, error: data.error || OFFLINE, fields: data.fields || {} };
  } catch {
    return { ok: false, error: OFFLINE, fields: {} };
  }
}

/* Toggle a submit button's busy state without changing its markup. */
export function setBusy(form, busy) {
  const btn = form.querySelector('[type="submit"]');
  if (!btn) return;
  btn.disabled = busy;
  btn.setAttribute('aria-busy', String(busy));
  btn.style.opacity = busy ? '0.7' : '';
}
