"use client";
import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  TrendingUp,
  Timer,
  Sparkles,
  Gauge,
  Clock,
  Smile,
  Zap,
  Target,
  ArrowRight,
  Rocket,
  BarChart3,
  Users,
  CheckCircle2,
} from "lucide-react";

// Оптимизированные easing функции
const EASE = {
  out: [0.16, 1, 0.3, 1] as const, // Более быстрый easeOut
  inOut: [0.65, 0, 0.35, 1] as const, // Оптимизированный easeInOut
};

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE.out },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      ease: EASE.out,
    },
  },
};

// Упрощенные позиции для фона
const FLOATING_POSITIONS = [
  { left: "10%", top: "20%" },
  { left: "85%", top: "30%" },
  { left: "15%", top: "70%" },
  { left: "90%", top: "60%" },
  { left: "50%", top: "15%" },
  { left: "75%", top: "80%" },
];

function Metric({
  icon: Icon,
  value,
  label,
  delay = 0,
  accent = "from-teal-500 to-emerald-500",
}: {
  icon: any;
  value: string;
  label: string;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30 hover:border-teal-300/50 transition-all duration-200 group"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -1, scale: 1.01 }}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${accent} flex items-center justify-center shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xl font-black bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
          {label}
        </div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ArrowRight className="w-4 h-4 text-slate-400" />
      </div>
    </motion.div>
  );
}

export default function OptimizedClientResults() {
  const { t } = useI18n();

  // Используем useMemo для оптимизации
  const cards = useMemo(() => [
    {
      title: t("res1_title"),
      icon: TrendingUp,
      accent: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      metrics: [
        { icon: BarChart3, value: t("res1_a"), label: t("res1_a_label") },
        { icon: Gauge, value: t("res1_b"), label: t("res1_b_label") },
      ],
      description: t("res1_desc"),
      features: [t("res1_feature1"), t("res1_feature2"), t("res1_feature3")],
    },
    {
      title: t("res2_title"),
      icon: Timer,
      accent: "from-teal-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      metrics: [
        { icon: Rocket, value: t("res2_a"), label: t("res2_a_label") },
        { icon: Sparkles, value: t("res2_b"), label: t("res2_b_label") },
      ],
      description: t("res2_desc"),
      features: [t("res2_feature1"), t("res2_feature2"), t("res2_feature3")],
    },
    {
      title: t("res3_title"),
      icon: Smile,
      accent: "from-purple-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      metrics: [
        { icon: Users, value: t("res3_a"), label: t("res3_a_label") },
        { icon: Clock, value: t("res3_b"), label: t("res3_b_label") },
      ],
      description: t("res3_desc"),
      features: [t("res3_feature1"), t("res3_feature2"), t("res3_feature3")],
    },
  ], [t]);

  // Оптимизированный фон
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Статический градиент */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(249,115,22,.2) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(20,184,166,.15) 0%, transparent 50%),
                       radial-gradient(circle at 40% 10%, rgba(139,92,246,.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Упрощенные анимированные точки */}
      {FLOATING_POSITIONS.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-teal-400/20"
          style={position}
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      <BackgroundElements />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Оптимизированный заголовок */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 dark:from-teal-500/10 dark:to-emerald-500/10 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-4"
          >
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("results_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-4"
          >
            {t("results_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("results_subtitle")}
          </motion.p>
        </motion.div>

        {/* Оптимизированные карточки */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => (
            <OptimizedResultsCard key={index} card={card} index={index} />
          ))}
        </motion.div>

        {/* Упрощенная CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-3"
          >
            <span className="flex items-center gap-2">
              {t("results_cta")}
              <Zap className="w-4 h-4" />
            </span>
          </motion.button>

          <p className="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {t("results_hint")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Оптимизированный компонент карточки
const OptimizedResultsCard = ({ card, index }: { card: any; index: number }) => {
  return (
    <motion.div
      variants={fade}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      {/* Основная карточка */}
      <div
        className={`relative rounded-xl ${card.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
      >
        {/* Верхний акцент */}
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent} rounded-t-xl`}
        />

        {/* Заголовок */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${card.accent} shadow-md`}>
            <card.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {card.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {card.description}
            </p>
          </div>
        </div>

        {/* Метрики */}
        <div className="space-y-2 mb-4">
          {card.metrics.map((metric: any, i: number) => (
            <Metric
              key={i}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              delay={i * 0.05}
              accent={card.accent}
            />
          ))}
        </div>

        {/* Особенности */}
        <div className="mt-auto pt-4 border-t border-slate-200/30 dark:border-slate-700/30">
          <div className="space-y-2">
            {card.features.map((feature: string, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium"
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.accent} flex-shrink-0`} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Стрелка при наведении */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>
    </motion.div>
  );
};