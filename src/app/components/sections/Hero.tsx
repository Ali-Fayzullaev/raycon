"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  MessageCircle,
  Bot,
} from "lucide-react";
import { useI18n } from "@/providers/I18nProvider";
import ModernTryModal from "../modals/TryModal";
import "../../css/hero.css";
import AnimatedBackground from "../Animated/AnimatedBackground.client";

// --- Варианты анимаций для Framer Motion ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function PhoneFrameVideo({
  src = "/demo.mp4",
  poster = "/favicon.png",
  className = "",
}) {
  return (
    <motion.div
      variants={itemVariants}
      initial={{ ...itemVariants.hidden, scale: 0.9, rotateY: 15 }}
      animate={{ ...itemVariants.show, scale: 1, rotateY: 0 }}
      transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative w-full max-w-[360px] md:max-w-[400px] mx-auto ${className}`}
    >
      {/* Анимированная подсветка */}
      <motion.div
        className="absolute inset-0 rounded-[42px] opacity-60"
        animate={{
          background: [
            "radial-gradient(circle at 30% 30%, rgba(120,119,198,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 70%, rgba(255,119,198,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(120,219,255,0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, rgba(120,119,198,0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Внешняя тень с анимацией */}
      <motion.div
        className="absolute inset-0 rounded-[42px] opacity-30"
        animate={{
          boxShadow: [
            "0 0 60px -20px rgba(79, 70, 229, 0.6)",
            "0 0 80px -20px rgba(236, 72, 153, 0.6)",
            "0 0 60px -20px rgba(14, 165, 233, 0.6)",
            "0 0 60px -20px rgba(79, 70, 229, 0.6)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Основной контейнер телефона */}
      <div className="relative aspect-[9/16] rounded-[40px] p-[12px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border border-white/10 backdrop-blur-sm">
        {/* Металлический блеск */}
        <div className="absolute inset-0 rounded-[40px] overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
                "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.15) 60%, transparent 80%)",
                "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Внутренняя рамка с градиентом */}
        <div className="relative h-full w-full rounded-[32px] p-[8px] bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border border-white/20 shadow-inner">
          {/* Акцентная подсветка краев */}
          <div className="absolute inset-0 rounded-[32px] border border-white/5" />
          <div className="absolute -inset-[1px] rounded-[33px] border border-transparent bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-50 blur-[1px]" />

          {/* Контентная область */}
          <div className="relative h-full w-full rounded-[26px] overflow-hidden bg-black border border-white/10">
            {/* ВИДЕО - ДОЛЖНО БЫТЬ ПЕРВЫМ И БЕЗ Z-INDEX */}
            <video
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full rounded-[26px] object-cover bg-black"
            />

            {/* Динамический градиент поверх видео - с пониженной прозрачностью */}
            <motion.div
              className="absolute inset-0 rounded-[26px] pointer-events-none opacity-20"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
                  "linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(239,68,68,0.05) 50%, transparent 100%)",
                  "linear-gradient(135deg, rgba(14,165,233,0.05) 0%, rgba(34,197,94,0.05) 50%, transparent 100%)",
                  "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(139,92,246,0.05) 50%, transparent 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Верхняя часть телефона (динамик) */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
              <div className="relative">
                <div className="h-6 w-32 rounded-full bg-black/95 border border-white/10 shadow-lg backdrop-blur-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-1 w-16 rounded-full bg-slate-700/80 border border-white/5" />
                  </div>
                </div>
                {/* Анимированный индикатор звука */}
                <motion.div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Боковые кнопки с анимацией */}
            <div className="absolute -left-1 top-24 z-10">
              <div className="relative">
                <div className="h-12 w-1 rounded-r bg-gradient-to-b from-slate-600 to-slate-700 border-r border-white/10 shadow-lg" />
                <motion.div
                  className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-l bg-blue-400/80"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            <div className="absolute -right-1 top-32 z-10">
              <div className="relative">
                <div className="h-20 w-1 rounded-l bg-gradient-to-b from-slate-600 to-slate-700 border-l border-white/10 shadow-lg" />
                <motion.div
                  className="absolute -right-0.5 top-1/3 w-1 h-6 rounded-r bg-purple-400/80"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Индикатор загрузки/процесса */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-green-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="text-xs text-white/80 font-medium">
                  Демо • Raycon CRM
                </span>
                <motion.div
                  className="w-1 h-1 rounded-full bg-white/60"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>

            {/* Наложение с градиентом по краям - УМЕНЬШАЕМ ПРОЗРАЧНОСТЬ */}
            <div
              className="absolute inset-0 rounded-[26px] pointer-events-none opacity-30"
              style={{
                background: `
                  radial-gradient(ellipse at 20% 20%, transparent 70%, rgba(0,0,0,0.2) 100%),
                  radial-gradient(ellipse at 80% 80%, transparent 70%, rgba(0,0,0,0.2) 100%),
                  radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,0.1) 80%)
                `,
              }}
            />

            {/* Анимированные угловые акценты */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-400/50 rounded-tl-lg z-10" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-400/50 rounded-tr-lg z-10" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-pink-400/50 rounded-bl-lg z-10" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-green-400/50 rounded-br-lg z-10" />

            {/* Блестящие частицы - УМЕНЬШАЕМ КОЛИЧЕСТВО И ПРОЗРАЧНОСТЬ */}
            <div className="absolute inset-0 rounded-[26px] pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[1px] h-[1px] bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 0.3, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    delay: Math.random() * 4,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 6,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Ваш основной компонент ModernHero остается почти без изменений
export default function ModernHero() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const bulletPoints = [
    { icon: Bot, text: t("hero_bul_1"), color: "from-blue-500 to-cyan-500" },
    { icon: Zap, text: t("hero_bul_2"), color: "from-amber-500 to-orange-500" },
    {
      icon: MessageCircle,
      text: t("hero_bul_3"),
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Левая колонка с контентом */}
          <div className="relative z-20">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 dark:from-teal-400/10 dark:to-cyan-400/10 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 mb-8"
            >
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Новое поколение CRM-систем
              <div className="w-3 h-3 border border-teal-400 dark:border-teal-500 border-dashed rounded-full animate-spin-slow" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6"
            >
              {t("hero_title_1")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              {t("hero_title_2")}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {bulletPoints.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 items-start"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                <span className="relative flex items-center gap-3">
                  {t("hero_cta")}
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>

              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 pt-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-6 h-6 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </motion.div>
                {t("hero_trial_note")}
              </div>
            </motion.div>
          </div>

          {/* Правая колонка - Видеоблок */}
          <PhoneFrameVideo />
        </motion.div>

        <ModernTryModal open={open} onOpenChange={setOpen} />
      </div>
    </section>
  );
}
