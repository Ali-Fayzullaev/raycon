"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Save, Upload, X } from "lucide-react";

export default function NewArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    coverImageId: "",
    published: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check");
        if (!res.ok) {
          router.push("/admin");
          return;
        }
      } catch {
        router.push("/admin");
        return;
      }
      setChecking(false);
    };
    checkAuth();
  }, [router]);

  // Автоматическая генерация slug из заголовка
  useEffect(() => {
    if (form.title && !form.slug) {
      const generatedSlug = form.title
        .toLowerCase()
        .replace(/[^a-zа-яё0-9\s-]/gi, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setForm((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [form.title, form.slug]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          coverImage: data.url,
          coverImageId: data.publicId,
        }));
      } else {
        const data = await res.json();
        alert(data.error || "Ошибка при загрузке");
      }
    } catch {
      alert("Ошибка при загрузке изображения");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, coverImage: "", coverImageId: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/articles");
      } else {
        const data = await res.json();
        alert(data.error || "Ошибка при создании статьи");
      }
    } catch {
      alert("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/articles">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Новая статья
            </h1>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Сохранить
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Обложка */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              Обложка статьи
            </h2>
            <div className="space-y-4">
              {form.coverImage ? (
                <div className="relative">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    <Image
                      src={form.coverImage}
                      alt="Обложка"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-colors"
                >
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-teal-500" />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Нажмите для загрузки изображения
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        PNG, JPG, WebP до 5MB
                      </p>
                    </>
                  )}
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Основная информация */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">
              Основная информация
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Заголовок *
                </label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value, slug: "" })
                  }
                  placeholder="Введите заголовок статьи"
                  required
                  className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Slug (URL) *
                </label>
                <Input
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: e.target.value })
                  }
                  placeholder="url-stati"
                  required
                  className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Будет использоваться в URL: /articles/{form.slug || "url-stati"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Краткое описание *
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  placeholder="Краткое описание для превью (макс. 300 символов)"
                  maxLength={300}
                  required
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white resize-none"
                />
                <p className="text-xs text-slate-500 mt-1">
                  {form.excerpt.length}/300 символов
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Контент (поддерживает HTML) *
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="<h2>Заголовок</h2><p>Текст статьи...</p>"
                  required
                  rows={15}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-mono text-sm"
                />
              </div>
            </div>
          </div>

          {/* Настройки публикации */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="published"
                checked={form.published}
                onChange={(e) =>
                  setForm({ ...form, published: e.target.checked })
                }
                className="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500"
              />
              <label
                htmlFor="published"
                className="text-sm text-slate-700 dark:text-slate-300"
              >
                Опубликовать сразу
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
