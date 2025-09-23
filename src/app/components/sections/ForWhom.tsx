"use client";
import React from "react";
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
      ease: "easeOut"
    }
  }
};

export default function ForWhom() {
  const { t } = useI18n();

  const groups = [
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
        { icon: Home, text: t("for_group_b_4") },
      ].slice(0, 3),
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
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Градиентные орбы */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-15 blur-3xl"
            style={{
              background: `linear-gradient(45deg, ${
                i === 0 ? 'rgba(249, 115, 22, 0.25)' :
                i === 1 ? 'rgba(20, 184, 166, 0.2)' :
                'rgba(139, 92, 246, 0.2)'
              }, transparent)`,
              width: `${250 + i * 80}px`,
              height: `${250 + i * 80}px`,
              left: `${10 + i * 25}%`,
              top: `${15 + i * 15}%`,
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12 + i * 4,
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
            backgroundSize: '40px 40px'
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
            <Target className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("for_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("for_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t("for_subtitle")}
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
          {groups.map((group, index) => (
            <motion.div
              key={index}
              variants={fade}
              custom={index + 2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              whileHover={{ 
                y: -6,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative"
            >
              {/* Внешнее свечение */}
              <motion.div
                className="absolute -inset-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(45deg, 
                    ${index === 0 ? 'rgba(249, 115, 22, 0.08)' : 
                      index === 1 ? 'rgba(20, 184, 166, 0.08)' : 
                      'rgba(139, 92, 246, 0.08)'}, 
                    transparent)`,
                  filter: 'blur(15px)'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Основная карточка */}
              <div className={`relative rounded-2xl ${group.gradient} border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-8 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-slate-300/70 dark:group-hover:border-slate-600/70 h-full flex flex-col`}>
                
                {/* Верхний акцент */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${group.accent} rounded-t-2xl`} />

                {/* Заголовок с иконкой */}
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${group.accent} shadow-lg`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <group.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {group.title}
                  </h3>
                </div>

                {/* Список элементов */}
                <ul className="space-y-4 flex-1">
                  {group.items.map(({ icon: Icon, text }, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/30 backdrop-blur-sm border border-slate-200/30 dark:border-slate-700/30"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, ease: "easeOut" }}
                      whileHover={{ x: 2 }}
                    >
                      <motion.div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${group.accent} flex items-center justify-center shadow-md`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Стрелка при наведении */}
                <motion.div
                  className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 3 }}
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
              {t("for_cta")}
              <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}