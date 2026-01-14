"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  User,
  Share2,
  MessageCircle,
  Zap,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { I18nProvider } from "@/providers/I18nProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const articleData = {
  title: "Что такое CRM и как она спасает ваш бизнес от «дырявых» продаж?",
  image: "/articles/articles01.jpeg",
  date: "14 января 2026",
  readTime: "5 мин",
  author: "Команда Raycon",
  category: "CRM",
};

export default function ArticlePage() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <Header />

      {/* Навигация */}
      <div className="pt-28 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к статьям
          </Link>
        </div>
      </div>

      {/* Шапка статьи */}
      <article className="px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Категория */}
            <span className="inline-block px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium mb-6">
              {articleData.category}
            </span>

            {/* Заголовок */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {articleData.title}
            </h1>

            {/* Метаданные */}
            <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {articleData.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {articleData.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {articleData.readTime} чтения
              </span>
              <button className="flex items-center gap-2 ml-auto hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                <Share2 className="w-5 h-5" />
                Поделиться
              </button>
            </div>
          </motion.div>

          {/* Главное изображение */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl"
          >
            <Image
              src={articleData.image}
              alt={articleData.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Контент статьи */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {/* Вступление */}
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
              Сегодня CRM — это не «фишка» для продвинутых, а мировой стандарт
              любого жизнеспособного бизнеса. Если вы ведете дела в WhatsApp или
              Instagram через блокноты — вы официально спонсируете успех своих
              конкурентов. Пока вы мучительно вспоминаете детали заказа, клиент
              уже уходит к тем, кто настроил систему.
            </p>

            {/* Секция 1 */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-10 border border-amber-200 dark:border-amber-800">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </span>
                Инструмент для избранных или необходимость?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Давайте честно: внедрение профессиональной CRM — удовольствие не
                из дешевых. На рынке полно гигантов, чьи лицензии, услуги
                интеграторов и ежемесячные подписки стоят сотни тысяч, а то и
                миллионы. Для большинства представителей микро и малого бизнеса
                это становится непреодолимым барьером.
              </p>
              <p className="text-lg font-medium text-amber-700 dark:text-amber-400 italic">
                Как быть, если автоматизация нужна «еще вчера», а бюджет не
                позволяет нанимать штат айтишников?
              </p>
            </div>

            {/* Секция 2 */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-2xl p-8 mb-10 border border-teal-200 dark:border-teal-800">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </span>
                Raycon CRM: Профессиональный стандарт по цене чашки кофе
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Мы в Raycon создали решение специально для тех, кто не готов
                переплачивать за избыточный функционал и сложные внедрения.{" "}
                <strong className="text-teal-600 dark:text-teal-400">
                  Мы сломали стереотип о том, что CRM — это дорого.
                </strong>
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Сегодня ваша автоматизация может стоить не дороже ежедневного
                латте, принося при этом «иксы» к прибыли. Мы убрали всё лишнее и
                оставили то, что реально приносит деньги.
              </p>
            </div>

            {/* Возможности */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-teal-500" />
              Мы объединили всё для ваших продаж:
            </h3>

            <div className="grid md:grid-cols-1 gap-6 mb-10">
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      Мультичат
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Все сообщения из Instagram и WhatsApp падают в одно окно.
                      Больше никаких прыжков между приложениями и потери
                      диалогов.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      Умные боты и автоответы
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Система удерживает клиента и отвечает на типовые вопросы,
                      пока вы заняты более важными делами.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                      Полная прозрачность
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Вы наконец-то увидите реальную картину своего бизнеса, а
                      не будете полагаться на «чувство рынка».
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Что в итоге */}
            <div className="bg-slate-100 dark:bg-slate-800/70 rounded-2xl p-8 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                Что в итоге?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Мы не будем обещать вам золотые горы. Мы дадим инструменты: от
                автораспределения заявок до глубокой интеграции с WhatsApp. Это
                позволит вам наконец-то увидеть, где именно вы теряли деньги все
                эти годы, не раздувая при этом бюджет.
              </p>
            </div>

            {/* Тарифы */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Начните работать системно уже сегодня:
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 shadow-lg border-2 border-slate-200 dark:border-slate-700 hover:border-teal-500 transition-colors">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Standard
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Идеальный порядок для микробизнеса и контроль 1–2 менеджеров.
                </p>
              </div>

              <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl p-6 shadow-lg text-white">
                <h4 className="text-xl font-bold mb-2">Pro</h4>
                <p className="text-teal-100">
                  Максимальная скорость и масштабируемость для тех, кто готов
                  расти быстро.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-2xl p-8 md:p-12 text-center text-white shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                3 дня полного тест-драйва бесплатно
              </h3>
              <p className="text-teal-100 mb-6 text-lg">
                Без привязки карт и долгих презентаций. Хватит работать «по
                памяти» — начните строить систему, которая продает.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 font-bold rounded-xl hover:bg-teal-50 transition-colors shadow-lg"
              >
                Попробовать бесплатно
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Подпись */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-600 dark:text-slate-400 italic text-lg">
                С уважением,
                <br />
                <strong className="text-teal-600 dark:text-teal-400">
                  Команда Raycon
                </strong>
              </p>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Навигация внизу */}
      <div className="px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>
        </div>
      </div>

          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
