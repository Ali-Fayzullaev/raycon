import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Простая реализация JWT-подобного токена (для production лучше использовать jose или jsonwebtoken)
function createToken(payload: object): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 }));
  const signature = btoa(JWT_SECRET + header + body);
  return `${header}.${body}.${signature}`;
}

function verifyToken(token: string): { valid: boolean; payload?: { exp: number } } {
  try {
    const [header, body, signature] = token.split(".");
    const expectedSignature = btoa(JWT_SECRET + header + body);
    
    if (signature !== expectedSignature) {
      return { valid: false };
    }
    
    const payload = JSON.parse(atob(body));
    
    if (payload.exp < Date.now()) {
      return { valid: false };
    }
    
    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function generateToken(): string {
  return createToken({ admin: true });
}

export function validateToken(token: string): boolean {
  return verifyToken(token).valid;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return request.cookies.get("admin_token")?.value || null;
}

export function withAuth(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest) => {
    const token = getTokenFromRequest(request);
    
    if (!token || !validateToken(token)) {
      return NextResponse.json(
        { error: "Не авторизован" },
        { status: 401 }
      );
    }
    
    return handler(request);
  };
}
