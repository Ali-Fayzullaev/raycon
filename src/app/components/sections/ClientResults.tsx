"use client";
import React from "react";
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

/** ✅ единые кривые без строк */
const EASE = {
  linear: [0, 0, 1, 1] as const,
  out: [0, 0, 0.2, 1] as const, // easeOut
  inOut: [0.42, 0, 0.58, 1] as const, // easeInOut
};

const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE.out, delay: 0.1 * i }, // ⬅️ было "easeOut"
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: EASE.out, // ⬅️ было "easeOut"
    },
  },
};

// Детерминированные позиции для избежания hydration errors
const FLOATING_POSITIONS = [
  { left: "10%", top: "20%" },
  { left: "85%", top: "30%" },
  { left: "15%", top: "70%" },
  { left: "90%", top: "60%" },
  { left: "50%", top: "15%" },
  { left: "25%", top: "40%" },
  { left: "75%", top: "80%" },
  { left: "40%", top: "25%" },
  { left: "60%", top: "65%" },
  { left: "20%", top: "85%" },
  { left: "80%", top: "45%" },
  { left: "35%", top: "55%" },
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
      className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30 hover:border-teal-300/50 dark:hover:border-teal-500/50 transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2, scale: 1.02 }}
    >
      <motion.div
        className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      <div className="flex-1 min-w-0">
        <div className="text-2xl font-black bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
          {label}
        </div>
      </div>
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ x: 3 }}
      >
        <ArrowRight className="w-4 h-4 text-slate-400" />
      </motion.div>
    </motion.div>
  );
}

export default function FantasticClientResults() {
  const { t } = useI18n();

  const cards = [
    {
      title: t("res1_title"),
      icon: TrendingUp,
      accent: "from-orange-500 to-amber-500",
      gradient:
        "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      metrics: [
        { icon: BarChart3, value: t("res1_a"), label: t("res1_a_label") },
        { icon: Gauge, value: t("res1_b"), label: t("res1_b_label") },
      ],
      description: t("res1_desc"),
      features: [t("res1_feature1"), t("res1_feature2"), t("res1_feature3")],
      animation: "pulse" as const,
    },
    {
      title: t("res2_title"),
      icon: Timer,
      accent: "from-teal-500 to-emerald-500",
      gradient:
        "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      metrics: [
        { icon: Rocket, value: t("res2_a"), label: t("res2_a_label") },
        { icon: Sparkles, value: t("res2_b"), label: t("res2_b_label") },
      ],
      description: t("res2_desc"),
      features: [t("res2_feature1"), t("res2_feature2"), t("res2_feature3")],
      animation: "bounce" as const,
    },
    {
      title: t("res3_title"),
      icon: Smile,
      accent: "from-purple-500 to-indigo-500",
      gradient:
        "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      metrics: [
        { icon: Users, value: t("res3_a"), label: t("res3_a_label") },
        { icon: Clock, value: t("res3_b"), label: t("res3_b_label") },
      ],
      description: t("res3_desc"),
      features: [t("res3_feature1"), t("res3_feature2"), t("res3_feature3")],
      animation: "float" as const,
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Движущиеся элементы - фиксированные позиции */}
        {FLOATING_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-teal-400/30 to-emerald-400/20"
            style={position}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Градиентные волны */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(249,115,22,.3) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(20,184,166,.2) 0%, transparent 50%),
                         radial-gradient(circle at 40% 10%, rgba(139,92,246,.2) 0%, transparent 50%)`,
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: EASE.linear }} // ⬅️ было "linear"
        />

        {/* Световые лучи */}
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            background: `conic-gradient(from 0deg at 50% 50%,
              rgba(249,115,22,.1) 0deg, rgba(20,184,166,.1) 120deg,
              rgba(139,92,246,.1) 240deg, rgba(249,115,22,.1) 360deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: EASE.linear }} // ⬅️ было "linear"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Заголовок */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 dark:from-teal-500/10 dark:to-emerald-500/10 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-6"
          >
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("results_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("results_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t("results_subtitle")}
          </motion.p>
        </motion.div>

        {/* Карточки с результатами */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <FantasticResultsCard key={index} card={card} index={index} />
          ))}
        </motion.div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, ease: EASE.out }} // ⬅️ было "easeOut"
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { ease: EASE.inOut, duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 1.5, ease: EASE.inOut }} // ⬅️ было "easeInOut"
            />
            <span className="relative flex items-center gap-3">
              {t("results_cta")}
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </span>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-slate-600 dark:text-slate-400 mt-4 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            {t("results_hint")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function FantasticResultsCard({ card, index }: { card: any; index: number }) {
  const getAnimation = () => {
    switch (card.animation) {
      case "pulse":
        return {
          animate: { scale: [1, 1.05, 1], y: [0, -5, 0] },
          transition: { duration: 3, repeat: Infinity, ease: EASE.inOut }, // ⬅️
        };
      case "bounce":
        return {
          animate: { y: [0, -10, 0] },
          transition: { duration: 2, repeat: Infinity, ease: EASE.inOut }, // ⬅️
        };
      case "float":
        return {
          animate: { y: [0, -8, 0], rotate: [0, 1, 0, -1, 0] },
          transition: { duration: 4, repeat: Infinity, ease: EASE.inOut }, // ⬅️
        };
      default:
        return {};
    }
  };
  return (
    <motion.div
      variants={fade}
      custom={index + 2}
      whileHover={{
        y: -12,
        scale: 1.03,
        transition: { duration: 0.3, ease: EASE.inOut },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
      {...getAnimation()}
    >
      {/* внешнее свечение */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, ${
            index === 0
              ? "rgba(249,115,22,.15)"
              : index === 1
              ? "rgba(20,184,166,.15)"
              : "rgba(139,92,246,.15)"
          }, transparent)`,
          filter: "blur(25px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: EASE.linear }} // ⬅️
      />

      {/* Основная карточка */}
      <div
        className={`relative rounded-2xl ${card.gradient} border-2 border-slate-200/30 dark:border-slate-700/30 backdrop-blur-md p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:border-slate-300/50 dark:group-hover:border-slate-600/50 h-full flex flex-col overflow-hidden`}
      >
        {/* Верхний акцент */}
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent} rounded-t-2xl`}
        />

        {/* блёстки на карточке */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: EASE.linear }} // ⬅️
        >
          <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-white/10 to-transparent rounded-full blur-xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-transparent to-white/5 rounded-full blur-lg" />
        </motion.div>

        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <motion.div
            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} shadow-2xl`}
            whileHover={{
              scale: 1.15,
              rotate: 10,
              transition: { duration: 0.2, ease: EASE.inOut },
            }}
          >
            <card.icon className="h-7 w-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
              {card.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
              {card.description}
            </p>
          </div>
        </div>

        {/* Метрики */}
        <div className="space-y-3 mb-6 relative z-10">
          {card.metrics.map((metric: any, i: number) => (
            <Metric
              key={i}
              icon={metric.icon}
              value={metric.value}
              label={metric.label}
              delay={index * 0.2 + i * 0.1}
              accent={card.accent}
            />
          ))}
        </div>

        {/* Особенности */}
        <div className="mt-auto pt-6 border-t border-slate-200/30 dark:border-slate-700/30 relative z-10">
          <div className="space-y-3">
            {card.features.map((feature: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium p-2 rounded-lg hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.2 + i * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ x: 3 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.accent}`}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: [0.42, 0, 0.58, 1],
                    delay: i * 0.5,
                  }}
                />
                <span className="drop-shadow-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Стрелка при наведении */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          whileHover={{
            x: 5,
            scale: 1.1,
            transition: { ease: [0.42, 0, 0.58, 1], duration: 0.2 },
          }}
        >
          <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </div>
    </motion.div>
  );
}
