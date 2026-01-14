import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import { getTokenFromRequest, validateToken } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

// GET - получить одну статью по slug
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    const { slug } = await params;

    const article = await Article.findOne({ slug });

    if (!article) {
      return NextResponse.json(
        { error: "Статья не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Ошибка при получении статьи" },
      { status: 500 }
    );
  }
}

// PUT - обновить статью (требуется авторизация)
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;

    const data = await request.json();

    const article = await Article.findOneAndUpdate(
      { slug },
      data,
      { new: true, runValidators: true }
    );

    if (!article) {
      return NextResponse.json(
        { error: "Статья не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error updating article:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении статьи" },
      { status: 500 }
    );
  }
}

// DELETE - удалить статью (требуется авторизация)
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const token = getTokenFromRequest(request);
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    await connectDB();
    const { slug } = await params;

    const article = await Article.findOneAndDelete({ slug });

    if (!article) {
      return NextResponse.json(
        { error: "Статья не найдена" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Статья удалена" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении статьи" },
      { status: 500 }
    );
  }
}
