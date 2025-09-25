"use client";

import React from "react";
import { motion } from "framer-motion";
import { Instagram, Phone, HeartHandshake, Link as LinkIcon } from "lucide-react";
// Если нужны переключатели в футере, раскомментируйте:
// import LanguageSwitcher from "@/components/common/LanguageSwitcher";
// import ThemeToggle from "@/components/common/ThemeToggle";

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.06 * i },
  }),
};

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t bg-white/80 dark:bg-slate-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-950/60">
      {/* тонкая верхняя линия c фирменным градиентом */}
      <div className="absolute -top-px left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500/50 via-emerald-500/50 to-teal-500/50" />

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Колонка — бренд */}
          <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xl font-extrabold tracking-tight">Raycon</div>
                <div className="text-slate-600 dark:text-slate-300">CRM для людей</div>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Мы делаем сложные инструменты простыми для бизнеса. Достаточно телефона и WhatsApp — остальное берём на себя.
            </p>

            {/* Соцсети */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/raycon.kz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200/70 dark:border-white/10 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <Instagram className="h-4 w-4" />
                @raycon.kz
              </a>
            </div>
          </motion.div>

          {/* Колонка — навигация */}
          <motion.nav
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Навигация</div>
              <ul className="space-y-2 text-sm">
                <li><a href="#product" className="hover:opacity-80 inline-flex items-center gap-2"><LinkIcon className="h-3.5 w-3.5" /> Продукт</a></li>
                <li><a href="#features" className="hover:opacity-80 inline-flex items-center gap-2"><LinkIcon className="h-3.5 w-3.5" /> Функции</a></li>
                <li><a href="#cases" className="hover:opacity-80 inline-flex items-center gap-2"><LinkIcon className="h-3.5 w-3.5" /> Кейсы</a></li>
                <li><a href="#pricing" className="hover:opacity-80 inline-flex items-center gap-2"><LinkIcon className="h-3.5 w-3.5" /> Тарифы</a></li>
                <li><a href="#faq" className="hover:opacity-80 inline-flex items-center gap-2"><LinkIcon className="h-3.5 w-3.5" /> FAQ</a></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Поддержка</div>
              <ul className="space-y-2 text-sm">
                <li className="inline-flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4" />
                  <span>
                    Отдел подключения:&nbsp;
                    <a href="tel:+77078469999" className="hover:opacity-80">+7 707 846 99 99</a>
                  </span>
                </li>
                <li className="inline-flex items-start gap-2">
                  <HeartHandshake className="mt-0.5 h-4 w-4" />
                  <span>
                    Отдел заботы о клиентах:&nbsp;
                    <a href="tel:+77078465555" className="hover:opacity-80">+7 707 846 55 55</a>
                  </span>
                </li>
                {/* если понадобится email — раскомментируйте:
                <li className="inline-flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4" />
                  <a href="mailto:support@raycon.kz" className="hover:opacity-80">support@raycon.kz</a>
                </li>
                */}
              </ul>
              {/* переключатели в футере, если хотите:
              <div className="mt-4 flex items-center gap-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              */}
            </div>
          </motion.nav>

          {/* Колонка — мини-CTA (опционально) */}
          <motion.div
            variants={fade}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-200/70 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] backdrop-blur p-5"
          >
            <div className="text-sm font-semibold text-slate-900 dark:text-white">Начните бесплатно</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              14 дней полного доступа. Без карты.
            </p>
            <a
              href="#top" // или откройте TryModal по onClick из Header/Hero
              className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
              style={{ background: "linear-gradient(90deg, #007A6E 0%, #19B69F 100%)" }}
            >
              Начать бесплатно
            </a>
          </motion.div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="border-t border-slate-200/70 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© 2025 Raycon. Все права защищены.</div>
          <div className="opacity-80">Политика конфиденциальности • Условия использования</div>
        </div>
      </div>
    </footer>
  );
}
