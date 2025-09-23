"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import { CalendarClock, Video, Rocket, Zap, ArrowRight, CheckCircle, Play, Star, Clock, Users, Settings } from "lucide-react";

const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.15 * i },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      ease: "easeOut"
    }
  }
};

export default function EnhancedOnboardingRoadmap() {
  const { t } = useI18n();

  const steps = [
    {
      tag: t("roadmap_1_tag"),
      title: t("roadmap_1_title"),
      desc: t("roadmap_1_desc"),
      Icon: CalendarClock,
      accent: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-500/10 to-amber-500/10 dark:from-orange-500/5 dark:to-amber-500/5",
      duration: "15 минут",
      features: ["Бесплатная консультация", "Анализ потребностей", "Подбор решения"],
      progress: 33
    },
    {
      tag: t("roadmap_2_tag"),
      title: t("roadmap_2_title"),
      desc: t("roadmap_2_desc"),
      Icon: Video,
      accent: "from-teal-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5",
      duration: "20 минут", 
      features: ["Живая демонстрация", "Ответы на вопросы", "Практические примеры"],
      progress: 66
    },
    {
      tag: t("roadmap_3_tag"),
      title: t("roadmap_3_title"),
      desc: t("roadmap_3_desc"),
      Icon: Rocket,
      accent: "from-purple-500 to-indigo-500",
      gradient: "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      duration: "Мгновенно",
      features: ["Тестовый доступ", "Персональная настройка", "Обучение команды"],
      progress: 100
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Анимированный фон с градиентными волнами */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
                              radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
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
            {t("roadmap_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("roadmap_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t("roadmap_subtitle")}
          </motion.p>
        </motion.div>

        {/* Основная дорожка - Desktop */}
        <div className="hidden lg:block">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="relative"
          >
            {/* Центральная линия прогресса */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-orange-500 via-teal-500 to-purple-500 rounded-full"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Анимированные точки на линии */}
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-current"
                  style={{
                    top: `${(index + 0.5) * (100 / steps.length)}%`,
                    color: index === 0 ? '#f97316' : index === 1 ? '#14b8a6' : '#8b5cf6'
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Шаги дорожки */}
            <div className="relative space-y-32 py-20">
              {steps.map((step, index) => (
                <RoadmapStep
                  key={index}
                  step={step}
                  index={index}
                  position={index % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Мобильная версия */}
        <div className="lg:hidden">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            {/* Вертикальная линия для мобильной версии */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-purple-500">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute -left-2 w-5 h-5 rounded-full bg-white border-2 border-current"
                  style={{
                    top: `${(index + 0.5) * (100 / steps.length)}%`,
                    color: index === 0 ? '#f97316' : index === 1 ? '#14b8a6' : '#8b5cf6'
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                />
              ))}
            </div>

            <div className="space-y-8 pl-12">
              {steps.map((step, index) => (
                <MobileStepCard
                  key={index}
                  step={step}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA секция */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
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
                {t("roadmap_cta")}
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 rounded-full px-3 py-1">
                <Clock className="w-4 h-4 text-teal-500" />
                <span className="text-sm font-medium">{t("roadmap_time")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 rounded-full px-3 py-1">
                <Users className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium">{t("roadmap_support")}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function RoadmapStep({ step, index, position }: { step: any; index: number; position: 'left' | 'right' }) {
  return (
    <motion.div
      variants={fade}
      custom={index}
      className={`flex items-center justify-between ${position === 'left' ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Карточка */}
      <motion.div
        whileHover={{ 
          y: -5,
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
        className={`relative ${position === 'left' ? 'mr-12' : 'ml-12'} w-96`}
      >
        {/* Соединительная линия */}
        <motion.div
          className={`absolute top-1/2 w-12 h-0.5 bg-gradient-to-r ${
            position === 'left' 
              ? 'left-full from-teal-500/50 to-transparent' 
              : 'right-full from-transparent to-purple-500/50'
          }`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: index * 0.3 + 0.3, duration: 0.6 }}
        />

        <div className={`relative rounded-2xl ${step.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-6 shadow-lg hover:shadow-xl transition-all duration-500`}>
          
          {/* Номер шага */}
          <motion.div
            className={`absolute -top-4 ${
              position === 'left' ? '-left-4' : '-right-4'
            } w-12 h-12 rounded-2xl bg-gradient-to-br ${step.accent} shadow-lg flex items-center justify-center text-white font-bold text-lg`}
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {index + 1}
          </motion.div>

          {/* Заголовок */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-md`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <step.Icon className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {step.tag}
              </span>
              <div className="text-sm text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {step.duration}
              </div>
            </div>
          </div>

          {/* Контент */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            {step.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {step.desc}
          </p>

          {/* Особенности */}
          <div className="space-y-2 mb-4">
            {step.features.map((feature: string, i: number) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                initial={{ opacity: 0, x: position === 'left' ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 + i * 0.1 }}
              >
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {feature}
              </motion.div>
            ))}
          </div>

          {/* Прогресс бар */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${step.accent} rounded-full`}
                initial={{ width: 0 }}
                whileInView={{ width: `${step.progress}%` }}
                transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {step.progress}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Декоративный элемент напротив карточки */}
      <motion.div
        className={`flex-1 ${position === 'left' ? 'text-right' : 'text-left'}`}
        initial={{ opacity: 0, x: position === 'left' ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.3 + 0.2 }}
      >
        <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 rounded-full px-4 py-2">
          <Star className="w-4 h-4 text-amber-500" />
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Шаг {index + 1} из 3
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileStepCard({ step, index }: { step: any; index: number }) {
  return (
    <motion.div
      variants={fade}
      custom={index}
      className="group relative"
    >
      <div className={`relative rounded-2xl ${step.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-6 shadow-lg`}>
        
        {/* Номер шага */}
        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${step.accent} shadow-lg flex items-center justify-center text-white font-bold`}>
          {index + 1}
        </div>

        <div className="flex items-start gap-4">
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-md flex-shrink-0`}
            whileHover={{ scale: 1.05 }}
          >
            <step.Icon className="w-6 h-6 text-white" />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                {step.tag}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {step.duration}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {step.title}
            </h3>
            
            <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">
              {step.desc}
            </p>

            <div className="space-y-1 mb-3">
              {step.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Прогресс бар для мобильной версии */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${step.accent} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${step.progress}%` }}
                  transition={{ delay: index * 0.2, duration: 1 }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                {step.progress}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}