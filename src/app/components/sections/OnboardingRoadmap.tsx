"use client";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  CalendarClock,
  Video,
  Rocket,
  Zap,
  CheckCircle,
  Play,
  Star,
  Clock,
  Users,
} from "lucide-react";

// Добавлен CSS класс для оптимизации GPU-рендеринга
// Tailwind.config должен содержать 'will-change-transform': 'transform'
const willChangeTransform = "will-change-transform";

// Оптимизированные варианты анимаций
const fade: Variants = {
  hidden: { opacity: 0, y: 15 }, // Уменьшено смещение
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Сокращено для быстроты
      ease: "easeInOut", // Стандартный и быстрый easing
    },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Уменьшено для ускорения последовательности
      ease: "easeOut",
    },
  },
};

// --- ОСНОВНОЙ КОМПОНЕНТ ---
export default function OptimizedOnboardingRoadmap() {
  const { t } = useI18n();

  // Используем useMemo для предотвращения ненужных ререндеров
  const steps = useMemo(() => [
    {
      tag: t("roadmap_1_tag"),
      title: t("roadmap_1_title"),
      desc: t("roadmap_1_desc"),
      Icon: CalendarClock,
      accent: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      duration: "15 минут",
      features: ["Бесплатная консультация", "Анализ потребностей", "Подбор решения"],
      progress: 33,
    },
    {
      tag: t("roadmap_2_tag"),
      title: t("roadmap_2_title"),
      desc: t("roadmap_2_desc"),
      Icon: Video,
      accent: "from-teal-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      duration: "20 минут",
      features: ["Живая демонстрация", "Ответы на вопросы", "Практические примеры"],
      progress: 66,
    },
    {
      tag: t("roadmap_3_tag"),
      title: t("roadmap_3_title"),
      desc: t("roadmap_3_desc"),
      Icon: Rocket,
      accent: "from-purple-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      duration: "Мгновенно",
      features: ["Тестовый доступ", "Персональная настройка", "Обучение команды"],
      progress: 100,
    },
  ], [t]);

  // Упрощенный фон (менее ресурсоемкий)
  const BackgroundWave = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          background: `
            radial-gradient(circle at 10% 50%, var(--tw-color-orange-500) 0%, transparent 40%),
            radial-gradient(circle at 90% 30%, var(--tw-color-teal-500) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, var(--tw-color-purple-500) 0%, transparent 40%)
          `,
          // Чтобы Tailwind работал с CSS-переменными для цветов, нужно убедиться,
          // что он корректно преобразует цвета в переменные:
          // var(--tw-color-orange-500) -> #f97316 (для light) / #f97316 (для dark)
          // Или просто использовать RGBa:
          // background: `radial-gradient(circle at 10% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 40%)`
        }}
      />
    </div>
  );

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      <BackgroundWave />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Оптимизированный заголовок */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }} // Удален margin
          className="text-center mb-12"
        >
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 dark:from-teal-500/10 dark:to-emerald-500/10 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-4"
          >
            <Zap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("roadmap_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-4"
          >
            {t("roadmap_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("roadmap_subtitle")}
          </motion.p>
        </motion.div>

        {/* Desktop версия */}
        <div className="hidden lg:block">
          <DesktopRoadmap steps={steps} />
        </div>

        {/* Мобильная версия */}
        <div className="lg:hidden">
          <MobileRoadmap steps={steps} />
        </div>

        {/* Упрощенная CTA секция */}
        <OptimizedCTA t={t} />
      </div>
    </section>
  );
}

// --- ДЕСКТОП КОМПОНЕНТ ---
const DesktopRoadmap = ({ steps }: { steps: any[] }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }} // Упрощено
    variants={stagger}
    className="relative"
  >
    {/* Центральная линия */}
    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2 bg-gradient-to-b from-orange-500 via-teal-500 to-purple-500">
      {steps.map((_, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-current shadow-md"
          style={{
            top: `${(index + 0.5) * (100 / steps.length)}%`,
            color: index === 0 ? "#f97316" : index === 1 ? "#14b8a6" : "#8b5cf6",
          }}
          // Упрощенная и более плавная анимация для точек
          initial={{ opacity: 0, translateY: 10 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          transition={{ delay: index * 0.25, duration: 0.4 }} // Немного ускорено
          viewport={{ once: true }}
        />
      ))}
    </div>

    <div className="relative space-y-24 py-16">
      {steps.map((step, index) => (
        <OptimizedRoadmapStep
          key={index}
          step={step}
          index={index}
          position={index % 2 === 0 ? "left" : "right"}
        />
      ))}
    </div>
  </motion.div>
);

// --- МОБИЛЬНЫЙ КОМПОНЕНТ ---
const MobileRoadmap = ({ steps }: { steps: any[] }) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    className="relative"
  >
    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-purple-500">
      {steps.map((_, index) => (
        <motion.div
          key={index}
          className="absolute -left-1.5 w-4 h-4 rounded-full bg-white border-2 border-current shadow-md"
          style={{
            top: `${(index + 0.5) * (100 / steps.length)}%`,
            color: index === 0 ? "#f97316" : index === 1 ? "#14b8a6" : "#8b5cf6",
          }}
          // Более быстрая анимация для мобильных
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          viewport={{ once: true }}
        />
      ))}
    </div>

    <div className="space-y-6 pl-8">
      {steps.map((step, index) => (
        <OptimizedMobileStep key={index} step={step} index={index} />
      ))}
    </div>
  </motion.div>
);

// --- ДЕСКТОП ШАГ ---
const OptimizedRoadmapStep = ({
  step,
  index,
  position,
}: {
  step: any;
  index: number;
  position: "left" | "right";
}) => {
  return (
    <motion.div
      variants={fade}
      className={`flex items-center justify-between ${
        position === "left" ? "flex-row" : "flex-row-reverse"
      }`}
    >
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }} // Добавлено scale для лучшего эффекта
        className={`${willChangeTransform} relative ${position === "left" ? "mr-8" : "ml-8"} w-80`}
      >
        {/* Упрощенная соединительная линия */}
        <div
          className={`absolute top-1/2 w-8 h-0.5 transform -translate-y-1/2 ${
            position === "left"
              ? "left-full bg-gradient-to-r from-current/50 to-transparent text-teal-500"
              : "right-full bg-gradient-to-l from-current/50 to-transparent text-purple-500"
          }`}
        />

        <div
          className={`relative rounded-xl ${step.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-5 shadow-xl transition-all duration-300`}
        >
          {/* ... остальная часть содержимого шага (без изменений) ... */}
          <div
            className={`absolute -top-3 ${
              position === "left" ? "-left-3" : "-right-3"
            } w-10 h-10 rounded-xl bg-gradient-to-br ${
              step.accent
            } shadow-md flex items-center justify-center text-white font-bold`}
          >
            {index + 1}
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-sm`}>
              <step.Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {step.tag}
              </span>
              <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {step.duration}
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            {step.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm leading-relaxed">
            {step.desc}
          </p>

          <div className="space-y-1.5 mb-3">
            {step.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300"
              >
                <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${step.accent} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${step.progress}%` }}
                transition={{ delay: index * 0.1, duration: 0.6 }} // Сокращено
                viewport={{ once: true }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {step.progress}%
            </span>
          </div>
        </div>
      </motion.div>

      <div className={`flex-1 ${position === "left" ? "text-right" : "text-left"}`}>
        <div className="inline-flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 rounded-full px-3 py-1">
          <Star className="w-3 h-3 text-amber-500" />
          <span className="text-xs text-slate-600 dark:text-slate-400">
            Шаг {index + 1}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// --- МОБИЛЬНЫЙ ШАГ ---
const OptimizedMobileStep = ({ step, index }: { step: any; index: number }) => (
  <motion.div variants={fade} className={`group ${willChangeTransform}`}>
    <div
      className={`relative rounded-xl ${step.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-5 shadow-lg`}
    >
      <div
        className={`absolute -top-2 -left-2 w-8 h-8 rounded-lg bg-gradient-to-br ${step.accent} shadow-md flex items-center justify-center text-white font-bold text-sm`}
      >
        {index + 1}
      </div>

      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-sm flex-shrink-0`}>
          <step.Icon className="w-5 h-5 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
              {step.tag}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {step.duration}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            {step.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-400 mb-2 text-sm">
            {step.desc}
          </p>

          <div className="space-y-1 mb-2">
            {step.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${step.accent} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${step.progress}%` }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {step.progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- CTA СЕКЦИЯ ---
const OptimizedCTA = ({ t }: { t: any }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className={`${willChangeTransform} text-center mt-12`}
  >
    <div className="inline-flex flex-col sm:flex-row gap-3 items-center">
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.15)" }} // Улучшен эффект наведения
        whileTap={{ scale: 0.95 }} // Более выразительный тап
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
      >
        <span className="flex items-center gap-2">
          {t("roadmap_cta")}
          <Play className="w-4 h-4" />
        </span>
      </motion.button>

      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 rounded-full px-2 py-1">
          <Clock className="w-3 h-3 text-teal-500" />
          <span className="text-xs font-medium">{t("roadmap_time")}</span>
        </div>
        <div className="flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 rounded-full px-2 py-1">
          <Users className="w-3 h-3 text-amber-500" />
          <span className="text-xs font-medium">{t("roadmap_support")}</span>
        </div>
      </div>
    </div>
  </motion.div>
);