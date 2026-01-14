"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { I18nProvider } from "@/providers/I18nProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function ArticlesListContent({ articles }: { articles: Article[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />

      {/* Hero секция */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium mb-6">
              Блог Raycon
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Статьи и руководства
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Полезные материалы о CRM-системах, автоматизации бизнеса и эффективных продажах
            </p>
          </motion.div>
        </div>
      </section>

      {/* Список статей */}
      <section className="pb-24 px-4">
        {articles.length === 0 ? (
          <div className="max-w-7xl mx-auto text-center py-16">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Статей пока нет
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {articles.map((article) => {
              const formattedDate = new Date(article.createdAt).toLocaleDateString(
                "ru-RU",
                { year: "numeric", month: "long", day: "numeric" }
              );

              return (
                <motion.article
                  key={article._id}
                  variants={itemVariants}
                  className="group bg-white dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="relative h-56 overflow-hidden bg-slate-200 dark:bg-slate-700">
                      {article.coverImage ? (
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl text-slate-400">📄</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-teal-500 text-white text-sm font-medium rounded-full">
                          CRM
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formattedDate}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-end">
                        <span className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-medium group-hover:gap-2 transition-all">
                          Читать
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default function ArticlesListClient({ articles }: { articles: Article[] }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <ArticlesListContent articles={articles} />
      </I18nProvider>
    </ThemeProvider>
  );
}
