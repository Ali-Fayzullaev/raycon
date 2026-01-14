"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Share2, Clock } from "lucide-react";
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

// Функция для парсинга Markdown в красивый HTML
function parseMarkdown(markdown: string): string {
  let html = markdown;
  
  // Заголовки H2 - большие секции с иконкой
  html = html.replace(/^## (.*$)/gim, `
    <div class="mt-12 mb-6">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white text-xl">✦</div>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">$1</h2>
      </div>
    </div>
  `);
  
  // Заголовки H3 - подзаголовки в карточках
  html = html.replace(/^### (.*$)/gim, `
    <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4 flex items-center gap-2">
      <span class="text-teal-500">›</span> $1
    </h3>
  `);
  
  // Заголовки H4 с эмодзи
  html = html.replace(/^#### ([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|💬|🤖|📊) (.*$)/gimu, `
    <div class="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-lg border border-slate-200 dark:border-slate-700 my-4">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center text-2xl flex-shrink-0">$1</div>
        <div>
          <h4 class="font-bold text-slate-900 dark:text-white text-lg">$2</h4>
        </div>
      </div>
    </div>
  `);
  
  // Обычные H4
  html = html.replace(/^#### (.*$)/gim, `<h4 class="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-3">$1</h4>`);
  
  // Жирный текст
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
  
  // Курсив
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Цитаты - красивые карточки с подсветкой
  html = html.replace(/^> (💡|📌|⚠️|✨)?\s?(.*$)/gim, `
    <div class="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border-l-4 border-teal-500 rounded-r-xl p-5 my-6">
      <p class="text-slate-700 dark:text-slate-300 font-medium">$1 $2</p>
    </div>
  `);
  
  // Горизонтальная линия
  html = html.replace(/^---$/gim, '<hr class="my-10 border-slate-200 dark:border-slate-700" />');
  
  // Инлайн код
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-teal-600 dark:text-teal-400 text-sm font-mono">$1</code>');
  
  // Таблицы - красивые карточки
  const tableRegex = /\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, header, body) => {
    const headerCells = header.split('|').filter((c: string) => c.trim()).map((c: string) => 
      `<th class="px-6 py-4 text-left font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50">${c.trim()}</th>`
    ).join('');
    const rows = body.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => 
        `<td class="px-6 py-4 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700">${c.trim()}</td>`
      ).join('');
      return `<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">${cells}</tr>`;
    }).join('');
    return `
      <div class="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 my-6 shadow-lg">
        <table class="w-full">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  });
  
  // Списки с эмодзи - карточки
  html = html.replace(/^(✅|❌|💬|🤖|📊|📱|📉|⏰|🤯|🚀|🎯|📦|🎁) (.*$)/gim, `
    <div class="flex items-start gap-3 my-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <span class="text-xl flex-shrink-0">$1</span>
      <span class="text-slate-700 dark:text-slate-300">$2</span>
    </div>
  `);
  
  // Обычные списки с дефисом
  html = html.replace(/^- (.*$)/gim, `
    <li class="flex items-start gap-3 my-2">
      <span class="w-2 h-2 rounded-full bg-teal-500 mt-2 flex-shrink-0"></span>
      <span class="text-slate-700 dark:text-slate-300">$1</span>
    </li>
  `);
  
  // Оборачиваем списки
  html = html.replace(/(<li class="flex.*?<\/li>\s*)+/g, '<ul class="space-y-1 my-4">$&</ul>');
  
  // Параграфы
  const blocks = html.split('\n\n');
  html = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<')) return trimmed;
    return `<p class="text-slate-600 dark:text-slate-400 leading-relaxed my-4 text-lg">${trimmed.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');
  
  return html;
}

// Подсчёт времени чтения
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function ArticlePageContent({ article }: { article: Article }) {
  const formattedDate = new Date(article.createdAt).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = calculateReadTime(article.content);
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
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {readTime} мин чтения
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
      <section className="pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="article-content"
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
