"use client";
import React, { useMemo, useState } from "react";
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
  ArrowRight,
  Shield,
  Users,
} from "lucide-react";
import ModernTryModal from "../modals/TryModal";

// Оптимизированные анимации
const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
    className="inline-flex items-center gap-2 rounded-full border border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-teal-300/50 transition-all duration-200 group"
    whileHover={{ scale: 1.02, y: -1 }}
    initial={{ opacity: 0, y: 5 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
  >
    {children}
  </motion.span>
);

// Упрощенные позиции для фона
const FLOATING_POSITIONS = [
  { left: "10%", top: "20%" },
  { left: "85%", top: "30%" },
  { left: "15%", top: "70%" },
  { left: "90%", top: "60%" },
  { left: "50%", top: "15%" },
  { left: "75%", top: "80%" },
];

export default function OptimizedKeyCapabilities() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false)
  // Используем useMemo для оптимизации
  const cards = useMemo(() => [
    {
      title: t("cap1_title"),
      description: t("cap1_desc"),
      accent: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
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
      gradient: "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
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
      gradient: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      icon: BarChart3,
      features: [t("cap3_feature1"), t("cap3_feature2"), t("cap3_feature3")],
      chips: [
        { icon: BarChart3, text: t("cap3_a"), color: "text-purple-500" },
        { icon: TrendingUp, text: t("cap3_b"), color: "text-indigo-500" },
        { icon: PieChart, text: t("cap3_c"), color: "text-purple-600" },
      ],
      stats: { value: "+45%", label: t("cap3_stat") },
    },
  ], [t]);

  // Оптимизированный фон
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Статический градиент */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(249,115,22,0.15) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(20,184,166,0.1) 0%, transparent 50%),
                       radial-gradient(circle at 40% 10%, rgba(139,92,246,0.1) 0%, transparent 50%)`,
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

      {/* Упрощенная сетка */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 122, 110, 0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 122, 110, 0.2) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );

  return (
    <section id="features" className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
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
            <Zap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("capabilities_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-4"
          >
            {t("capabilities_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("capabilities_subtitle")}
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
            <OptimizedCapabilityCard key={index} card={card} index={index} />
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
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => setOpen(true)}
          >
            <span className="flex items-center gap-2">
              {t("capabilities_cta")}
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      <ModernTryModal open={open} onOpenChange={setOpen}/>
    </section>
  );
}

// Оптимизированный компонент карточки
const OptimizedCapabilityCard = ({ card, index }: { card: any; index: number }) => {
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

        {/* Заголовок с иконкой */}
        <div className="flex items-start gap-3 mb-4">
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

        {/* Статистика */}
        <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-white/50 dark:bg-slate-800/30">
          <div
            className={`text-xl font-black bg-gradient-to-br ${card.accent} bg-clip-text text-transparent`}
          >
            {card.stats.value}
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {card.stats.label}
          </div>
        </div>

        {/* Особенности */}
        <div className="space-y-2 mb-4 flex-1">
          {card.features.map((feature: string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${card.accent} flex-shrink-0`} />
              <span className="font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Чипы */}
        <div className="flex flex-wrap gap-1">
          {card.chips.map((chip: any, i: number) => (
            <Chip key={i} delay={i * 0.05}>
              <chip.icon className={`h-3 w-3 ${chip.color}`} />
              {chip.text}
            </Chip>
          ))}
        </div>

        {/* Стрелка при наведении */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>
    </motion.div>
  );
};