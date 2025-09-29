"use client";
import React, { useMemo,useState } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  Rocket,
  MousePointerClick,
  Boxes,
  MessageCircle,
  Bot,
  Zap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import ModernTryModal from "../modals/TryModal";

// Упрощенные варианты анимаций
const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
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

// Статические позиции для фоновых элементов
const FLOATING_POSITIONS = [
  { left: "10%", top: "20%" },
  { left: "85%", top: "30%" },
  { left: "15%", top: "70%" },
  { left: "90%", top: "60%" },
  { left: "50%", top: "15%" },
  { left: "75%", top: "80%" },
];

export default function OptimizedForBusiness() {
  const { t } = useI18n();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Используем useMemo для предотвращения ненужных ререндеров
  const items = useMemo(() => [
    {
      title: t("step1_title"),
      desc: t("step1_desc"),
      icon: Rocket,
      accent: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      features: [t("step1_feature1"), t("step1_feature2"), t("step1_feature3")],
    },
    {
      title: t("step2_title"),
      desc: t("step2_desc"),
      icon: MousePointerClick,
      accent: "from-teal-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      features: [t("step2_feature1"), t("step2_feature2"), t("step2_feature3")],
    },
    {
      title: t("step3_title"),
      desc: t("step3_desc"),
      icon: Boxes,
      accent: "from-purple-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      features: [t("step3_feature1"), t("step3_feature2"), t("step3_feature3")],
    },
  ], [t]);

  // Упрощенный фон компонент
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Статический градиентный фон */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(249,115,22,0.2) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(20,184,166,0.15) 0%, transparent 50%),
                       radial-gradient(circle at 40% 10%, rgba(139,92,246,0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Статические точки вместо анимированных */}
      {FLOATING_POSITIONS.map((position, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-teal-400/10"
          style={position}
        />
      ))}

      {/* Упрощенная сетка */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 122, 110, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 122, 110, 0.3) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <ModernTryModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );

  return (
    <section id="product" className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
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
            {t("business_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-4"
          >
            {t("next_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("next_lead")}
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
          {items.map((item, index) => (
            <OptimizedBusinessCard
              key={index}
              item={item}
              index={index}
            />
          ))}
        </motion.div>

        {/* Упрощенный CTA */}
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
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              {t("business_cta")}
              <ArrowRight className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Вынесенный оптимизированный компонент карточки
const OptimizedBusinessCard = ({ item, index }: { item: any; index: number }) => {
  return (
    <motion.div
      variants={fade}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      {/* Основная карточка */}
      <div
        className={`relative rounded-xl ${item.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
      >
        {/* Верхний акцент */}
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent} rounded-t-xl`}
        />

        {/* Иконка */}
        <motion.div
          className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} shadow-md mb-4`}
          whileHover={{ scale: 1.05 }}
        >
          <item.icon className="h-6 w-6 text-white" />
        </motion.div>

        {/* Заголовок */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          {item.title}
        </h3>

        {/* Описание */}
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 text-sm">
          {item.desc}
        </p>

        {/* Особенности */}
        <div className="space-y-2 mb-4 flex-1">
          {item.features.map((feature: string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.accent} flex-shrink-0`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Дополнительные элементы для третьей карточки */}
        {index === 2 && (
          <div className="flex -space-x-2 mt-2">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 border-2 border-white dark:border-slate-800 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-white dark:border-slate-800 flex items-center justify-center">
              <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-white dark:border-slate-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        )}

        {/* Стрелка при наведении */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>
      
    </motion.div>
  );
};