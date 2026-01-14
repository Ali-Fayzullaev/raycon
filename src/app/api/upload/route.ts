import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, validateToken } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    // Проверка авторизации
    const token = getTokenFromRequest(request);
    if (!token || !validateToken(token)) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не найден" },
        { status: 400 }
      );
    }

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Допускаются только изображения" },
        { status: 400 }
      );
    }

    // Проверка размера (макс 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Максимальный размер файла - 5MB" },
        { status: 400 }
      );
    }

    // Конвертируем файл в base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Загружаем в Cloudinary
    const result = await uploadImage(base64);

    return NextResponse.json({
      url: result.url,
      publicId: result.publicId,
    });
  } catch (error) {
    console.error("Upload error details:", error);
    const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
    return NextResponse.json(
      { error: "Ошибка при загрузке изображения", details: errorMessage },
      { status: 500 }
    );
  }
}
