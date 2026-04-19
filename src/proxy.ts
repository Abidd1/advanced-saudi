import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('admin_token')?.value;

  // Protect /admin routes, but allow /admin/login freely
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      // Invalid or expired token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If visiting /admin/login when already authenticated, redirect to /admin dashboard
  if (path === '/admin/login' && token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
      await jwtVerify(token, secret);
      return NextResponse.redirect(new URL('/admin', request.url));
    } catch {
      return NextResponse.next();
    }
  }

  // Protect API certificate creation/deletion
  if (path.startsWith('/api/certificates') && request.method !== 'GET') {
     if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
        await jwtVerify(token, secret);
     } catch (err) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/certificates/:path*'],
};
