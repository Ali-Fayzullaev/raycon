"use client";

import React, { useMemo } from "react";
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

// Функция для парсинга Markdown в HTML
function parseMarkdown(markdown: string): string {
  let html = markdown;
  
  // Заголовки
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Жирный текст
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Курсив
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Цитаты (blockquote)
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Горизонтальная линия
  html = html.replace(/^---$/gim, '<hr />');
  
  // Инлайн код
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Таблицы
  const tableRegex = /\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, header, body) => {
    const headerCells = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`;
  });
  
  // Списки с дефисом
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)\n(?!<li>)/gim, '$1</ul>\n');
  html = html.replace(/(?<!<\/ul>\n)(<li>)/gim, '<ul>$1');
  
  // Параграфы
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    // Не оборачиваем если уже HTML тег
    if (trimmed.startsWith('<')) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');
  
  return html;
}

function ArticlePageContent({ article }: { article: Article }) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Парсим Markdown в HTML
  const parsedContent = useMemo(() => parseMarkdown(article.content), [article.content]);

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
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950
              prose-table:border-collapse prose-th:bg-slate-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
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
