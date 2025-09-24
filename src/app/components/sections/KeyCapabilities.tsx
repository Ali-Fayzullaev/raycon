"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  MessagesSquare,
  MessageCircle,
  Bot,
  LayoutGrid,
  BarChart3,
  TrendingUp,
  PieChart,
  Zap,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Users,
} from "lucide-react";

const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.1 * i },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
    },
  },
};

const Chip = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.span
    className="inline-flex items-center gap-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-teal-300/50 dark:hover:border-teal-500/50 transition-all duration-300 group"
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
  >
    {children}
  </motion.span>
);

export default function ModernKeyCapabilities() {
  const { t } = useI18n();

  const cards = [
    {
      title: t("cap1_title"),
      description: t("cap1_desc"),
      accent: "from-orange-500 to-amber-500",
      gradient:
        "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      icon: MessagesSquare,
      features: [t("cap1_feature1"), t("cap1_feature2"), t("cap1_feature3")],
      chips: [
        { icon: MessageCircle, text: t("cap1_a"), color: "text-orange-500" },
        { icon: LayoutGrid, text: t("cap1_b"), color: "text-amber-500" },
        { icon: Users, text: t("cap1_c"), color: "text-orange-600" },
      ],
      stats: { value: "95%", label: t("cap1_stat") },
    },
    {
      title: t("cap2_title"),
      description: t("cap2_desc"),
      accent: "from-teal-500 to-emerald-500",
      gradient:
        "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      icon: Bot,
      features: [t("cap2_feature1"), t("cap2_feature2"), t("cap2_feature3")],
      chips: [
        { icon: Bot, text: t("cap2_a"), color: "text-teal-500" },
        { icon: Shield, text: t("cap2_b"), color: "text-emerald-500" },
        { icon: Zap, text: t("cap2_c"), color: "text-teal-600" },
      ],
      stats: { value: "24/7", label: t("cap2_stat") },
    },
    {
      title: t("cap3_title"),
      description: t("cap3_desc"),
      accent: "from-purple-500 to-indigo-500",
      gradient:
        "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      icon: BarChart3,
      features: [t("cap3_feature1"), t("cap3_feature2"), t("cap3_feature3")],
      chips: [
        { icon: BarChart3, text: t("cap3_a"), color: "text-purple-500" },
        { icon: TrendingUp, text: t("cap3_b"), color: "text-indigo-500" },
        { icon: PieChart, text: t("cap3_c"), color: "text-purple-600" },
      ],
      stats: { value: "+45%", label: t("cap3_stat") },
    },
  ];

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

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
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
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Плавающие градиентные орбы */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10 blur-3xl"
            style={{
              background: `linear-gradient(45deg, ${
                i % 3 === 0
                  ? "rgba(249, 115, 22, 0.3)"
                  : i % 3 === 1
                  ? "rgba(20, 184, 166, 0.2)"
                  : "rgba(139, 92, 246, 0.25)"
              }, transparent)`,
              width: `${200 + i * 60}px`,
              height: `${200 + i * 60}px`,
              left: `${i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Сетка */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.01]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 122, 110, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 122, 110, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
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
            <Zap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("capabilities_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("capabilities_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t("capabilities_subtitle")}
          </motion.p>
        </motion.div>

        {/* Карточки возможностей */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <CapabilityCard key={index} card={card} index={index} />
          ))}
        </motion.div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{ x: "200%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <span className="relative flex items-center gap-3">
              {t("capabilities_cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function CapabilityCard({ card, index }: { card: any; index: number }) {
  return (
    <motion.div
      variants={fade}
      custom={index + 2}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      {/* Внешнее свечение */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(45deg, 
            ${
              index === 0
                ? "rgba(249, 115, 22, 0.1)"
                : index === 1
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(139, 92, 246, 0.1)"
            }, 
            transparent)`,
          filter: "blur(20px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Основная карточка */}
      <div
        className={`relative rounded-2xl ${card.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-slate-300/70 dark:group-hover:border-slate-600/70 h-full flex flex-col`}
      >
        {/* Верхний акцент */}
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent} rounded-t-2xl`}
        />

        {/* Заголовок с иконкой */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} shadow-lg`}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.2 },
              }}
            >
              <card.icon className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm">
                {card.description}
              </p>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <motion.div
          className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          <div
            className={`text-2xl font-black bg-gradient-to-br ${card.accent} bg-clip-text text-transparent`}
          >
            {card.stats.value}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {card.stats.label}
          </div>
        </motion.div>

        {/* Особенности */}
        <div className="space-y-3 mb-6 flex-1">
          {card.features.map((feature: string, i: number) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 + i * 0.1 }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.accent}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              />
              <span className="font-medium">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Чипы */}
        <div className="flex flex-wrap gap-2">
          {card.chips.map((chip: any, i: number) => (
            <Chip key={i} delay={index * 0.1 + i * 0.05}>
              <chip.icon className={`h-4 w-4 ${chip.color}`} />
              {chip.text}
            </Chip>
          ))}
        </div>

        {/* Стрелка при наведении */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 3 }}
        >
          <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </div>
    </motion.div>
  );
}
