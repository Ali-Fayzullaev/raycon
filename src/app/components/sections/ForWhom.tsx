"use client";
import React, { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  Briefcase,
  UsersRound,
  PlugZap,
  MessageCircle,
  Building2,
  ShoppingBag,
  Landmark as Bank,
  Home,
  Bot,
  Sparkles,
  Target,
  Zap,
  ArrowRight,
  ChartBar,
} from "lucide-react";
import ModernTryModal from "../modals/TryModal";

// Оптимизированные варианты анимаций
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
      ease: "easeOut"
    }
  }
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

export default function OptimizedForWhom() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false)

  // Используем useMemo для оптимизации
  const groups = useMemo(() => [
    {
      title: t("for_group_a_title"),
      icon: Briefcase,
      accent: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      items: [
        { icon: UsersRound, text: t("for_group_a_1") },
        { icon: PlugZap, text: t("for_group_a_2") },
        { icon: MessageCircle, text: t("for_group_a_3") },
      ],
    },
    {
      title: t("for_group_b_title"),
      icon: Building2,
      accent: "from-teal-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      items: [
        { icon: Building2, text: t("for_group_b_1") },
        { icon: ShoppingBag, text: t("for_group_b_2") },
        { icon: Bank, text: t("for_group_b_3") },
        { icon: ChartBar, text: t("for_group_b_4") },
      ].slice(0, 4),
    },
    {
      title: t("for_group_c_title"),
      icon: Target,
      accent: "from-purple-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      items: [
        { icon: MessageCircle, text: t("for_group_c_1") },
        { icon: Bot, text: t("for_group_c_2") },
        { icon: Sparkles, text: t("for_group_c_3") },
      ],
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
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + (i % 2),
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
          backgroundSize: '60px 60px'
        }}
      />
      <ModernTryModal open={open} onOpenChange={setOpen}/>
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
            {t("for_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-4"
          >
            {t("for_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("for_subtitle")}
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
          {groups.map((group, index) => (
            <OptimizedGroupCard
              key={index}
              group={group}
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
          onClick={() => setOpen(true)}
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              {t("for_cta")}
              <Zap className="w-4 h-4" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

// Вынесенный оптимизированный компонент карточки
const OptimizedGroupCard = ({ group, index }: { group: any; index: number }) => {
  return (
    <motion.div
      variants={fade}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      {/* Основная карточка */}
      <div className={`relative rounded-xl ${group.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
        
        {/* Верхний акцент */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${group.accent} rounded-t-xl`} />

        {/* Заголовок с иконкой */}
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${group.accent} shadow-md`}
            whileHover={{ scale: 1.05 }}
          >
            <group.icon className="h-5 w-5 text-white" />
          </motion.div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {group.title}
          </h3>
        </div>

        {/* Список элементов */}
        <ul className="space-y-3 flex-1">
          {group.items.map(({ icon: Icon, text }: any, i: number) => (
            <motion.li 
              key={i}
              className="flex items-start gap-3 p-2 rounded-lg bg-white/50 dark:bg-slate-800/30 border border-slate-200/30 dark:border-slate-700/30"
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              whileHover={{ x: 1 }}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-md bg-gradient-to-br ${group.accent} flex items-center justify-center shadow-sm`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                {text}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Стрелка при наведении */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>
      </div>
      
    </motion.div>
  );
};