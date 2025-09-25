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

export default function PremiumFinalCTA() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const features = [
    { icon: Zap, text: "Настройка за 20 минут" },
    { icon: CheckCircle2, text: "14 дней бесплатно" },
    { icon: Rocket, text: "Запуск в тот же день" },
    { icon: Star, text: "Персональный менеджер" },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Градиентные волны */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(20, 184, 166, 0.4) 0%, transparent 50%),
                         radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
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
            className="absolute w-2 h-2 rounded-full bg-teal-400/20"
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
          className="absolute inset-0 opacity-5"
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              rgba(20, 184, 166, 0.3) 0deg,
              rgba(139, 92, 246, 0.2) 120deg,
              rgba(59, 130, 246, 0.2) 240deg,
              rgba(20, 184, 166, 0.3) 360deg
            )`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-md border border-teal-400/30 rounded-full px-6 py-3 text-sm font-medium text-white mb-8"
          >
            <Sparkles className="w-4 h-4 text-teal-300" />
            {t("final_cta_badge")}
          </motion.div>

          {/* Заголовок */}
          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6"
          >
            {t("final_cta_title")}
          </motion.h2>

          {/* Подзаголовок */}
          <motion.p
            variants={fade}
            custom={1}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            {t("final_cta_lead")}
          </motion.p>

          {/* Особенности */}
          <motion.div
            variants={fade}
            custom={2}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <feature.icon className="w-4 h-4 text-teal-300" />
                <span className="text-white text-sm font-medium">
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
                className="group relative inline-flex items-center gap-4 h-16 px-10 text-lg font-bold text-white rounded-2xl shadow-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
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

            {/* Дополнительная информация */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex items-center justify-center gap-4 text-slate-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Без кредитной карты</span>
              </div>
              <div className="w-px h-4 bg-slate-600" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Отмена в любой момент</span>
              </div>
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
              className="w-2 h-2 rounded-full bg-teal-400/30"
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
