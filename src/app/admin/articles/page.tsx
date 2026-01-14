"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  ArrowLeft,
} from "lucide-react";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
}

export default function AdminArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    try {
      const authRes = await fetch("/api/admin/check", {
        method: "GET",
        credentials: "include"
      });
      if (!authRes.ok) {
        router.push("/admin");
        return;
      }
      await fetchArticles();
    } catch {
      router.push("/admin");
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту статью?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setArticles(articles.filter((a) => a._id !== id));
      } else {
        alert("Ошибка при удалении статьи");
      }
    } catch {
      alert("Ошибка сервера");
    } finally {
      setDeleting(null);
    }
  };

  const togglePublish = async (article: Article) => {
    try {
      const res = await fetch(`/api/articles/${article._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !article.published }),
      });

      if (res.ok) {
        setArticles(
          articles.map((a) =>
            a._id === article._id ? { ...a, published: !a.published } : a
          )
        );
      }
    } catch {
      alert("Ошибка при изменении статуса");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                На сайт
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Управление статьями
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/articles/new">
              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Новая статья
              </Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Пока нет ни одной статьи
            </p>
            <Link href="/admin/articles/new">
              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Создать первую статью
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {article.title}
                      </h2>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          article.published
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {article.published ? "Опубликовано" : "Черновик"}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                      {article.excerpt}
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-xs">
                      ID: {article._id} •{" "}
                      {new Date(article.createdAt).toLocaleDateString("ru-RU")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(article)}
                      title={
                        article.published ? "Снять с публикации" : "Опубликовать"
                      }
                    >
                      {article.published ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Link href={`/admin/articles/${article._id}/edit`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(article._id)}
                      disabled={deleting === article._id}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      {deleting === article._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
