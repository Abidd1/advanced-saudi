import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const envUser = process.env.ADMIN_USER;
    const envPass = process.env.ADMIN_PASS;

    if (username === envUser && password === envPass) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');
      
      const token = await new SignJWT({ user: username, role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('8h')
        .sign(secret);

      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set HttpOnly cookie
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8 // 8 hours
      });

      return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
