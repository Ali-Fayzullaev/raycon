import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Вы вышли из системы" },
    { status: 200 }
  );

  response.cookies.delete("admin_token");

  return response;
}
