import { NextResponse } from 'next/server';

function createLogoutResponse(redirectUrl?: string) {
  const response = redirectUrl 
    ? NextResponse.redirect(redirectUrl)
    : NextResponse.json({ success: true, message: 'Logged out successfully' });

  // Clear the HttpOnly admin_token cookie
  response.cookies.set({
    name: 'admin_token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
    expires: new Date(0),
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}

export async function POST() {
  return createLogoutResponse();
}

export async function GET(request: Request) {
  const url = new URL('/admin/login', request.url);
  return createLogoutResponse(url.toString());
}
