"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/button";
import ModernTryModal from "../modals/TryModal";
import {
  ArrowRight,
  Zap,
  Sparkles,
  CheckCircle2,
  Star,
  Rocket,
  Target,
  Clock,
  Users,
  Shield,
} from "lucide-react";

const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.1 * i },
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

export default function AdaptiveFinalCTA() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const features = [
    { icon: Zap, text: t("final_feature_quick") },
    { icon: CheckCircle2, text: t("final_feature_trial") },
    { icon: Rocket, text: t("final_feature_fast") },
    { icon: Users, text: t("final_feature_support") },
  ];

  const guarantees = [
    { icon: Shield, text: t("final_guarantee_security") },
    { icon: Clock, text: t("final_guarantee_cancel") },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Градиентные волны для light/dark */}
        <motion.div
          className="absolute inset-0 opacity-10 dark:opacity-15"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)`,
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Плавающие элементы */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400/20 dark:bg-blue-400/30"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Световые лучи */}
        <motion.div
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              rgba(59, 130, 246, 0.2) 0deg,
              rgba(139, 92, 246, 0.15) 120deg,
              rgba(99, 102, 241, 0.15) 240deg,
              rgba(59, 130, 246, 0.2) 360deg
            )`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Декоративные формы */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 rounded-full bg-blue-200/20 dark:bg-blue-600/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-indigo-200/20 dark:bg-indigo-600/10 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Бейдж */}
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 dark:from-blue-500/20 dark:to-indigo-500/20 backdrop-blur-md border border-blue-200/50 dark:border-blue-400/30 rounded-full px-6 py-3 text-sm font-medium text-blue-700 dark:text-blue-200 mb-8"
          >
            <Target className="w-4 h-4 text-blue-600 dark:text-blue-300" />
            {t("final_cta_badge")}
          </motion.div>

          {/* Заголовок */}
          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-200 dark:to-white bg-clip-text text-transparent mb-6"
          >
            {t("final_cta_title")}
          </motion.h2>

          {/* Подзаголовок */}
          <motion.p
            variants={fade}
            custom={1}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            {t("final_cta_lead")}
          </motion.p>

          {/* Особенности */}
          <motion.div
            variants={fade}
            custom={2}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-full px-4 py-3 border border-slate-200/60 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA кнопка */}
          <motion.div variants={fade} custom={3} className="relative">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => setOpen(true)}
                className="group relative inline-flex items-center gap-4 h-16 px-10 text-lg font-bold text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
                }}
              >
                {/* Блестящий эффект */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />

                {/* Внутреннее свечение */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-transparent opacity-50" />

                <Zap className="w-5 h-5 relative z-10" />
                <span className="relative z-10">{t("final_cta_button")}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Гарантии */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-500 dark:text-slate-400 text-sm"
            >
              {guarantees.map((guarantee, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/30 rounded-full px-3 py-1">
                  <guarantee.icon className="w-3 h-3 text-blue-500" />
                  <span>{guarantee.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Декоративные элементы внизу */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex justify-center gap-8 opacity-60"
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-400/40 dark:bg-blue-400/60"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Модальное окно */}
      <ModernTryModal open={open} onOpenChange={setOpen} />
    </section>
  );
}