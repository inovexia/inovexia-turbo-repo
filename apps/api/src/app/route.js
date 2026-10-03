import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    name: 'Inovexia API',
    endpoints: [
      'GET  /api/health',
      'POST /api/enquiries',
      'POST /api/careers',
      'GET  /api/admin/enquiries',
      'PATCH /api/admin/enquiries/:id',
      'GET  /api/admin/applications',
      'GET  /api/admin/applications/:id/cv',
    ],
  });
}
