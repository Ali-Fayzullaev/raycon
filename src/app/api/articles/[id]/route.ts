import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import { getTokenFromRequest, validateToken } from "@/lib/auth";
import mongoose from "mongoose";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - получить одну статью по id
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectDB();
    const { id } = await params;

    // Проверяем, что id валидный ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Неверный ID статьи" },
        { status: 400 }
      );
    }

    const article = await Article.findById(id);

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
    const { id } = await params;

    // Проверяем, что id валидный ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Неверный ID статьи" },
        { status: 400 }
      );
    }

    const data = await request.json();

    const article = await Article.findByIdAndUpdate(
      id,
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
    const { id } = await params;

    // Проверяем, что id валидный ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Неверный ID статьи" },
        { status: 400 }
      );
    }

    const article = await Article.findByIdAndDelete(id);

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
