import { Metadata } from "next";
import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import ArticleContent from "./ArticleContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Генерация метаданных для SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  await connectDB();
  const article = await Article.findOne({ slug, published: true });
  
  if (!article) {
    return {
      title: "Статья не найдена | Raycon",
    };
  }
  
  return {
    title: `${article.title} | Raycon`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

// Статическая генерация путей (опционально)
export async function generateStaticParams() {
  await connectDB();
  const articles = await Article.find({ published: true }).select("slug");
  
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  
  await connectDB();
  const articleDoc = await Article.findOne({ slug, published: true });
  
  if (!articleDoc) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Статья не найдена
          </h1>
          <a href="/articles" className="text-teal-500 hover:underline">
            Вернуться к статьям
          </a>
        </div>
      </div>
    );
  }
  
  // Преобразуем Mongoose документ в простой объект
  const article = {
    _id: articleDoc._id.toString(),
    title: articleDoc.title,
    slug: articleDoc.slug,
    content: articleDoc.content,
    excerpt: articleDoc.excerpt,
    coverImage: articleDoc.coverImage || null,
    published: articleDoc.published,
    createdAt: articleDoc.createdAt.toISOString(),
    updatedAt: articleDoc.updatedAt.toISOString(),
  };
  
  return <ArticleContent article={article} />;
}
