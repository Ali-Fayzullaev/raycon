import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, validateToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  
  console.log("Auth check - token exists:", !!token);
  console.log("Auth check - token valid:", token ? validateToken(token) : false);
  
  if (!token || !validateToken(token)) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }
  
  return NextResponse.json({ authenticated: true });
}
