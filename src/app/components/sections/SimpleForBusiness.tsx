"use client";
import React from "react";
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

// Исправленные типы для анимаций
const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut", // Исправлено: строка вместо массива чисел
      delay: 0.1 * i,
    },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut", // Добавлено easing
    },
  },
};

export default function SimpleForBusiness() {
  const { t } = useI18n();

  // Данные для карточек с поддержкой двух языков
  const items = [
    {
      title: t("step1_title"),
      desc: t("step1_desc"),
      icon: Rocket,
      accent: "from-orange-500 to-amber-500",
      gradient:
        "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      features: [t("step1_feature1"), t("step1_feature2"), t("step1_feature3")],
    },
    {
      title: t("step2_title"),
      desc: t("step2_desc"),
      icon: MousePointerClick,
      accent: "from-teal-500 to-emerald-500",
      gradient:
        "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      features: [t("step2_feature1"), t("step2_feature2"), t("step2_feature3")],
    },
    {
      title: t("step3_title"),
      desc: t("step3_desc"),
      icon: Boxes,
      accent: "from-purple-500 to-indigo-500",
      gradient:
        "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      features: [t("step3_feature1"), t("step3_feature2"), t("step3_feature3")],
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
        {/* Градиентные орбы */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              background: `linear-gradient(45deg, ${
                i === 0
                  ? "rgba(249, 115, 22, 0.3)"
                  : i === 1
                  ? "rgba(20, 184, 166, 0.2)"
                  : "rgba(139, 92, 246, 0.25)"
              }, transparent)`,
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15 + i * 5,
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
              linear-gradient(rgba(0, 122, 110, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 122, 110, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
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
            {t("business_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("next_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t("next_lead")}
          </motion.p>
        </motion.div>

        {/* Карточки */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={fade}
              custom={index + 2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
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
                className={`relative rounded-2xl ${item.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-8 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:border-slate-300/70 dark:group-hover:border-slate-600/70`}
              >
                {/* Верхний акцент */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent} rounded-t-2xl`}
                />

                {/* Иконка */}
                <motion.div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-lg mb-6`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <item.icon className="h-7 w-7 text-white" />
                </motion.div>

                {/* Заголовок */}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {item.title}
                </h3>

                {/* Описание */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Особенности */}
                <div className="space-y-2 mb-6">
                  {item.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.accent}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut",
                        }}
                      />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                {/* Дополнительные элементы для третьей карточки */}
                {index === 2 && (
                  <motion.div
                    className="flex -space-x-3 mt-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8, ease: "easeOut" }}
                  >
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-white dark:border-slate-800 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                  </motion.div>
                )}

                {/* Стрелка при наведении */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Нижний CTA */}
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
              {t("business_cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
