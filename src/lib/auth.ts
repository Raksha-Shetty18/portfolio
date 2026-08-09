import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_change_me';

export interface AdminPayload {
  id: string;
  username: string;
}

export async function verifyAuth(): Promise<AdminPayload | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('admin_token');

    if (!tokenCookie || !tokenCookie.value) {
      return null;
    }

    const decoded = jwt.verify(tokenCookie.value, JWT_SECRET) as AdminPayload;
    return decoded;
  } catch (err) {
    console.error('JWT Verification Error:', err);
    return null;
  }
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}
