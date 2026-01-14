import { NextRequest, NextResponse } from "next/server";
import { validatePassword, generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Пароль обязателен" },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { error: "Неверный пароль" },
        { status: 401 }
      );
    }

    const token = generateToken();

    const response = NextResponse.json(
      { success: true, message: "Успешная авторизация" },
      { status: 200 }
    );

    // Устанавливаем cookie с токеном
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 часа
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
