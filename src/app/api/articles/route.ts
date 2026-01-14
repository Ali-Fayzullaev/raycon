import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import { getTokenFromRequest, validateToken } from "@/lib/auth";

// GET - получить все статьи
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get("published") === "true";

    const filter = publishedOnly ? { published: true } : {};

    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .select("-content -contentKz"); // Не отправляем полный контент в списке

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Ошибка при получении статей" },
      { status: 500 }
    );
  }
}

// POST - создать новую статью (требуется авторизация)
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    // Убираем поле slug если оно есть, чтобы избежать конфликта индекса
    delete data.slug;

    const article = await Article.create(data);

    return NextResponse.json(article, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating article:", error);

    return NextResponse.json(
      { error: "Ошибка при создании статьи" },
      { status: 500 }
    );
  }
}
