import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import ArticlesListClient from "./ArticlesListClient";

export const metadata: Metadata = {
  title: "Статьи и руководства | Raycon CRM",
  description: "Полезные материалы о CRM-системах, автоматизации бизнеса и эффективных продажах",
};

// Отключаем кэширование для получения свежих данных
export const revalidate = 60; // Перевалидация каждые 60 секунд

export default async function ArticlesPage() {
  await connectDB();
  
  const articlesDoc = await Article.find({ published: true })
    .sort({ createdAt: -1 })
    .select("-content -contentKz"); // Не загружаем полный контент для списка
  
  // Преобразуем в простые объекты
  const articles = articlesDoc.map((doc) => ({
    _id: doc._id.toString(),
    title: doc.title,
    titleKz: doc.titleKz || null,
    slug: doc.slug,
    excerpt: doc.excerpt,
    excerptKz: doc.excerptKz || null,
    coverImage: doc.coverImage || null,
    published: doc.published,
    createdAt: doc.createdAt.toISOString(),
  }));
  
  return <ArticlesListClient articles={articles} />;
}