import { jwtVerify, SignJWT } from 'jose';

// Centralized JWT secret retrieval with strict checks
export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET is not configured in environment variables.');
    }
    return new TextEncoder().encode('advanced_saudi_dev_jwt_secret_only_for_local_2026');
  }
  return new TextEncoder().encode(secret);
}

// Verify admin JWT token
export async function verifyAdminToken(token: string | undefined | null): Promise<{ user: string; role: string } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    if (payload && payload.role === 'admin' && typeof payload.user === 'string') {
      return { user: payload.user, role: payload.role };
    }
    return null;
  } catch {
    return null;
  }
}

// Generate admin JWT token
export async function signAdminToken(username: string): Promise<string> {
  return await new SignJWT({ user: username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getJwtSecret());
}

// Simple in-memory rate limiter for login protection against brute-force attacks
interface RateLimitEntry {
  count: number;
  firstAttempt: number;
}
const loginAttempts = new Map<string, RateLimitEntry>();

export function checkLoginRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes window
  const maxAttempts = 7;

  // Clean old entries periodically
  if (loginAttempts.size > 1000) {
    for (const [key, val] of loginAttempts.entries()) {
      if (now - val.firstAttempt > windowMs) {
        loginAttempts.delete(key);
      }
    }
  }

  const entry = loginAttempts.get(ip);
  if (!entry) {
    return { allowed: true };
  }

  if (now - entry.firstAttempt > windowMs) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  if (entry.count >= maxAttempts) {
    const remainingSeconds = Math.ceil((windowMs - (now - entry.firstAttempt)) / 1000);
    return { allowed: false, remainingSeconds };
  }

  return { allowed: true };
}

export function recordFailedLogin(ip: string) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const entry = loginAttempts.get(ip);
  if (!entry || (now - entry.firstAttempt > windowMs)) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    entry.count += 1;
  }
}

export function resetLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}
