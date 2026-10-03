/* After any content change, tell the web app to drop its cached pages so
   the change shows on the next view. Never fails the save: if the site
   can't be reached the 5-minute revalidate picks the change up anyway. */
export async function revalidateSite() {
  const base = (process.env.WEB_URL || process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    console.warn('[revalidate] REVALIDATE_SECRET is not set — the site updates within 5 minutes instead of immediately.');
    return false;
  }
  try {
    const res = await fetch(`${base}/revalidate`, { method: 'POST', headers: { 'x-revalidate-secret': secret }, signal: AbortSignal.timeout(5000) });
    if (!res.ok) console.warn(`[revalidate] ${base}/revalidate answered ${res.status}`);
    return res.ok;
  } catch (err) {
    console.warn(`[revalidate] could not reach ${base}: ${err.message}`);
    return false;
  }
}
