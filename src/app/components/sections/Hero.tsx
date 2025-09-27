"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Zap, MessageCircle, Bot } from "lucide-react";
import { useI18n } from "@/providers/I18nProvider";
import ModernTryModal from "../modals/TryModal";
import "../../css/hero.css"

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

// --- Компоненты ---

// ИЗМЕНЕНИЕ: Компонент фона теперь управляет звёздами, авророй и орбами через CSS
const AnimatedBackground = React.memo(() => {
  // Генерируем звёзды для тёмной темы
  const stars = Array.from({ length: 100 }).map((_, i) => (
    <div
      key={i}
      className="star"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 2 + 1}px`,
        height: `${Math.random() * 2 + 1}px`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-black dark:to-blue-950">
      {/* --- Светлая тема --- */}
      <div className="absolute inset-0 block dark:hidden">
        <div className="light-orb orb-1" />
        <div className="light-orb orb-2" />
        <div className="light-orb orb-3" />
        <div className="absolute inset-0 opacity-[0.03] grid-pattern" />
      </div>
      
      {/* --- Тёмная тема (Ночное небо) --- */}
      <div className="absolute inset-0 hidden dark:block">
        {stars}
        <div className="aurora-orb orb-1" />
        <div className="aurora-orb orb-2" />
        <div className="aurora-orb orb-3" />
        <div className="absolute inset-0 opacity-[0.04] grid-pattern-dark" />
      </div>
    </div>
  );
});


function PhoneFrameVideo({
  src = "/demo.mp4",
  poster = "/demo-poster.jpg",
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
      <div className="absolute inset-0 translate-y-3 blur-lg opacity-40 rounded-[36px] bg-black/40" />
      <div className="relative aspect-[9/16] rounded-[34px] p-[10px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,.45)] border border-white/20 dark:border-white/10">
        <div className="relative h-full w-full rounded-[26px] p-[6px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border border-white/40 dark:border-white/10">
          <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-black">
            <div className="pointer-events-none absolute inset-0 rounded-[22px]" style={{ background: "linear-gradient(140deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.05) 45%, transparent 80%)" }} />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black/90 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,.05)_inset]" />
            <div className="absolute left-[-3px] top-[80px] h-10 w-[3px] rounded-r bg-slate-500/70 dark:bg-slate-700" />
            <div className="absolute right-[-3px] top-[120px] h-16 w-[3px] rounded-l bg-slate-500/70 dark:bg-slate-700" />
            <video src={src} poster={poster} autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full rounded-[22px] object-cover bg-black" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function ModernHero() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const bulletPoints = [
    { icon: Bot, text: t("hero_bul_1"), color: "from-blue-500 to-cyan-500" },
    { icon: Zap, text: t("hero_bul_2"), color: "from-amber-500 to-orange-500" },
    { icon: MessageCircle, text: t("hero_bul_3"), color: "from-emerald-500 to-teal-500" },
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
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
              
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 pt-2">
                <motion.div whileHover={{ scale: 1.1 }} className="w-6 h-6 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center">
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