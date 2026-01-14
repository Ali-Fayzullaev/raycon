"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { I18nProvider } from "@/providers/I18nProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";

interface Article {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

function ArticlePageContent({ article }: { article: Article }) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleShare = async () => {
    const url = window.location.href;
    
    try {
      // navigator.share работает только на HTTPS или localhost
      if (navigator.share && window.isSecureContext) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url,
        });
      } else {
        // Fallback: копируем в буфер
        await navigator.clipboard.writeText(url);
        alert("Ссылка скопирована в буфер обмена!");
      }
    } catch (error) {
      // Если пользователь отменил или ошибка
      if ((error as Error).name !== "AbortError") {
        // Пробуем скопировать в буфер
        try {
          await navigator.clipboard.writeText(url);
          alert("Ссылка скопирована!");
        } catch {
          // Последний fallback
          prompt("Скопируйте ссылку:", url);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Все статьи
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formattedDate}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Поделиться
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cover Image */}
      {article.coverImage && (
        <section className="pb-12 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <article
            className="prose prose-lg dark:prose-invert prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-ul:text-slate-700 dark:prose-ul:text-slate-300
              prose-ol:text-slate-700 dark:prose-ol:text-slate-300
              prose-blockquote:border-teal-500 prose-blockquote:bg-slate-100 dark:prose-blockquote:bg-slate-800/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Готовы автоматизировать ваш бизнес?
            </h2>
            <p className="text-teal-100 mb-6 max-w-xl mx-auto">
              Попробуйте Raycon CRM бесплатно и убедитесь в эффективности
              автоматизации
            </p>
            <Link href="/#pricing">
              <Button className="bg-white text-teal-600 hover:bg-teal-50 font-medium px-8 py-3">
                Попробовать бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ArticleContent({ article }: { article: Article }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ArticlePageContent article={article} />
      </I18nProvider>
    </ThemeProvider>
  );
}
