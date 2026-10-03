import { withAdmin } from '@/lib/auth';
import { json, preflight } from '@/lib/http';

export const dynamic = 'force-dynamic';

/* GET /api/auth/me → the signed-in admin, or 401 */
export const GET = withAdmin(async (req, ctx, user) => json(req, { ok: true, user }));

export const OPTIONS = preflight;
