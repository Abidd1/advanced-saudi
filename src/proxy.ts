import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

// Patterns for sensitive files that must never be accessible via HTTP
const SENSITIVE_PATTERNS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /\.(db|sqlite|sqlite3|bak|sql|pem|key|log)$/i,
  /^\/prisma(\/|$)/i,
  /^\/dev\.db/i,
];

// Next.js 16+ uses "proxy" (not "middleware") as the exported function name
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Block access to sensitive files immediately with 404
  if (SENSITIVE_PATTERNS.some((pattern) => pattern.test(path))) {
    return new NextResponse(null, { status: 404 });
  }

  const token = request.cookies.get('admin_token')?.value;

  // 2. Protect /admin routes, but allow /admin/login freely
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const auth = await verifyAdminToken(token);
    if (!auth) {
      // Invalid or expired token — clear cookie and redirect
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }

    return NextResponse.next();
  }

  // 3. If visiting /admin/login when already authenticated, redirect to /admin dashboard
  if (path === '/admin/login' && token) {
    const auth = await verifyAdminToken(token);
    if (auth) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 4. Protect API certificate mutations (POST / DELETE)
  if (path.startsWith('/api/certificates') && request.method !== 'GET') {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const auth = await verifyAdminToken(token);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized. Invalid or expired token.' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except internal Next.js assets, public images, and static files
     */
    '/((?!_next/static|_next/image|images|favicon.ico).*)',
  ],
};
