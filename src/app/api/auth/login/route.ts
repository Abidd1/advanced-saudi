import { NextResponse } from 'next/server';
import { signAdminToken, checkLoginRateLimit, recordFailedLogin, resetLoginAttempts } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Extract IP address for rate limiting
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    // Check rate limit
    const rateLimit = checkLoginRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Too many login attempts. Please try again in ${rateLimit.remainingSeconds || 900} seconds.` 
        }, 
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.username !== 'string' || typeof body.password !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const { username, password } = body;
    const envUser = process.env.ADMIN_USER;
    const envPass = process.env.ADMIN_PASS;

    if (!envUser || !envPass) {
      console.error('ADMIN_USER or ADMIN_PASS environment variable is not defined.');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    // Verify credentials
    if (username.trim() === envUser.trim() && password === envPass) {
      resetLoginAttempts(clientIp);

      const token = await signAdminToken(username);
      const response = NextResponse.json({ success: true }, { status: 200 });

      // Set secure HttpOnly cookie with lax SameSite for reliable redirects
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
      });

      return response;
    }

    recordFailedLogin(clientIp);
    return NextResponse.json({ success: false, message: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
