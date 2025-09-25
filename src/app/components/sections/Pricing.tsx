"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import ModernTryModal from "../modals/TryModal";
import {
  CheckCircle2,
  Crown,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Gem,
  BadgeCheck,
  ArrowRight,
  Users,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fade: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.1 * i },
  }),
};

const DOTS = [
  { left: "12%", top: "22%", dur: 4.4, delay: 0.2 },
  { left: "28%", top: "68%", dur: 4.8, delay: 0.6 },
  { left: "46%", top: "35%", dur: 5.2, delay: 0.1 },
  { left: "63%", top: "12%", dur: 5.6, delay: 0.9 },
  { left: "77%", top: "52%", dur: 4.6, delay: 0.3 },
  { left: "84%", top: "18%", dur: 5.0, delay: 0.7 },
  { left: "35%", top: "82%", dur: 5.4, delay: 0.5 },
  { left: "68%", top: "74%", dur: 4.2, delay: 0.4 },
];

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

function Feature({
  children,
  popular = false,
}: {
  children: React.ReactNode;
  popular?: boolean;
}) {
  return (
    <motion.li
      className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/30 transition-colors"
      whileHover={{ x: 2 }}
    >
      {popular ? (
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
          <Star className="w-3 h-3 text-white" />
        </div>
      ) : (
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600 dark:text-emerald-400 flex-shrink-0" />
      )}
      <span className="text-slate-700 dark:text-slate-300 font-medium">
        {children}
      </span>
    </motion.li>
  );
}

export default function ModernPricing() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const plans = [
    {
      key: "pro",
      title: t("plan_pro"),
      desc: t("plan_pro_desc"),
      price: t("plan_pro_price"),
      originalPrice: "59 000 ₸", // числовые можно не локализовать
      cta: t("plan_pro_cta"),
      popular: false,
      accent: "from-blue-500 to-cyan-500",
      gradient:
        "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5",
      icon: Rocket,
      features: [
        t("plan_pro_f1"), // До 20 менеджеров / 20 менеджерге дейін
        t("plan_pro_f2"), // Все мессенджеры / Барлық мессенджерлер
        t("plan_pro_f3"), // Расширенная аналитика / Кеңейтілген аналитика
        t("plan_pro_f4"), // Приоритетная поддержка / Басым қолдау
        t("plan_pro_f5"), // Интеграции с CRM / CRM интеграциялары
      ],
      stats: [
        { icon: Users, value: "20", label: t("plan_stat_managers") },
        { icon: Clock, value: "24/7", label: t("plan_stat_support") },
      ],
    },
    {
      key: "mini",
      title: t("plan_mini"),
      desc: t("plan_mini_desc"),
      price: t("plan_mini_price"),
      originalPrice: "45 000 ₸",
      cta: t("plan_mini_cta"),
      popular: true,
      accent: "from-teal-500 to-emerald-500",
      gradient:
        "bg-gradient-to-br from-teal-500/15 to-emerald-500/15 dark:from-teal-500/10 dark:to-emerald-500/10",
      icon: Crown,
      features: [
        t("plan_mini_f1"), // До 10 менеджеров
        t("plan_mini_f2"), // WhatsApp + Telegram
        t("plan_mini_f3"), // Базовая аналитика
        t("plan_mini_f4"), // Стандартная поддержка
        t("plan_mini_f5"), // Готовые шаблоны
        t("plan_mini_f6"), // AI-помощник
      ],
      stats: [
        { icon: Users, value: "10", label: t("plan_stat_managers") },
        {
          icon: Zap,
          value: t("plan_stat_implement_value"),
          label: t("plan_stat_implement_label"),
        },
      ],
      badge: t("plan_mini_popular"),
    },
    {
      key: "enterprise",
      title: t("plan_enterprise"),
      desc: t("plan_enterprise_desc"),
      price: t("plan_enterprise_price"),
      cta: t("plan_enterprise_cta"),
      popular: false,
      accent: "from-purple-500 to-indigo-500",
      gradient:
        "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
      icon: Gem,
      features: [
        t("plan_ent_f1"), // Неограниченно менеджеров
        t("plan_ent_f2"), // Все каналы связи
        t("plan_ent_f3"), // Кастомная разработка
        t("plan_ent_f4"), // Dedicated менеджер
        t("plan_ent_f5"), // Обучение команды
        t("plan_ent_f6"), // API доступ
      ],
      stats: [
        { icon: Shield, value: "99.9%", label: t("plan_stat_uptime") },
        { icon: BadgeCheck, value: "SLA", label: t("plan_stat_sla") },
      ],
    },
  ];

  const handlePlanSelect = (planKey: string) => {
    setSelectedPlan(planKey);
    setOpen(true);
  };

  return (
    <section id="pricing" className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Градиентные волны — ок, тут нет рандома */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(20,184,166,0.4) 0%, transparent 50%),
                   radial-gradient(circle at 80% 70%, rgba(139,92,246,0.3) 0%, transparent 50%),
                   radial-gradient(circle at 40% 10%, rgba(59,130,246,0.3) 0%, transparent 50%)`,
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Плавающие элементы — без Math.random() */}
        {DOTS.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-teal-400/20"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: p.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
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
            {t("pricing_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("pricing_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            {t("pricing_subtitle")}
          </motion.p>
        </motion.div>

        {/* Тарифы - Desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden lg:flex items-end gap-8 justify-center"
        >
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.key}
              plan={plan}
              index={index}
              onSelect={handlePlanSelect}
            />
          ))}
        </motion.div>

        {/* Тарифы - Mobile */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:hidden space-y-6"
        >
          {plans.map((plan, index) => (
            <MobilePricingCard
              key={plan.key}
              plan={plan}
              index={index}
              onSelect={handlePlanSelect}
            />
          ))}
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-wrap justify-center gap-6 bg-white/50 dark:bg-slate-800/30 rounded-2xl p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">{t("pricing_feature1")}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">{t("pricing_feature2")}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">{t("pricing_feature3")}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <ModernTryModal open={open} onOpenChange={setOpen} />
    </section>
  );
}

function PricingCard({
  plan,
  index,
  onSelect,
}: {
  plan: any;
  index: number;
  onSelect: (key: string) => void;
}) {
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={fade}
      custom={index + 2}
      whileHover={{
        y: isPopular ? -12 : -8,
        scale: isPopular ? 1.03 : 1.01,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative flex-1 max-w-md ${
        isPopular ? "z-10 scale-105" : "scale-95"
      }`}
    >
      {/* Внешнее свечение для популярного тарифа */}
      {isPopular && (
        <motion.div
          className="absolute -inset-4 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(45deg, rgba(20, 184, 166, 0.15), transparent)`,
            filter: "blur(20px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div
        className={`relative rounded-2xl ${
          plan.gradient
        } border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-8 shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col ${
          isPopular
            ? "border-teal-500/30 dark:border-teal-500/30 ring-2 ring-teal-500/20"
            : ""
        }`}
      >
        {/* Бейдж популярного тарифа */}
        {isPopular && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              <Crown className="w-4 h-4" />
              {plan.badge}
            </div>
          </motion.div>
        )}

        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-lg`}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <plan.icon className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {plan.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {plan.desc}
            </p>
          </div>
        </div>

        {/* Цена */}
        <div className="mb-6">
          <div className="text-4xl font-black bg-gradient-to-br from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            {plan.price}
          </div>
          {plan.originalPrice && (
            <div className="text-sm text-slate-500 line-through">
              {plan.originalPrice}
            </div>
          )}
        </div>

        {/* Статистика */}
        <div className="flex gap-4 mb-6">
          {plan.stats.map((stat: any, i: number) => (
            <motion.div
              key={i}
              className="flex-1 text-center p-3 rounded-xl bg-white/50 dark:bg-slate-800/30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + i * 0.1 }}
            >
              <stat.icon className="w-6 h-6 mx-auto mb-1 text-teal-500" />
              <div className="font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Особенности */}
        <ul className="space-y-2 mb-8 flex-1">
          {plan.features.map((feature: string, i: number) => (
            <Feature key={i} popular={isPopular && i < 2}>
              {feature}
            </Feature>
          ))}
        </ul>

        {/* Кнопка */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => onSelect(plan.key)}
            className={`w-full py-4 text-base font-semibold rounded-xl transition-all duration-300 ${
              isPopular
                ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl hover:from-teal-600 hover:to-emerald-600"
                : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            }`}
          >
            <span className="flex items-center gap-2">
              {plan.cta}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MobilePricingCard({
  plan,
  index,
  onSelect,
}: {
  plan: any;
  index: number;
  onSelect: (key: string) => void;
}) {
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={fade}
      custom={index}
      className={`relative rounded-2xl ${
        plan.gradient
      } border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md p-6 shadow-lg ${
        isPopular ? "border-teal-500/30 ring-2 ring-teal-500/20" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            <Crown className="w-3 h-3" />
            {plan.badge}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-md`}
        >
          <plan.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {plan.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {plan.desc}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {plan.price}
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        {plan.features.slice(0, 3).map((feature: string, i: number) => (
          <Feature key={i} popular={isPopular && i === 0}>
            {feature}
          </Feature>
        ))}
      </ul>

      <Button
        onClick={() => onSelect(plan.key)}
        className={`w-full py-3 text-sm font-semibold rounded-xl ${
          isPopular
            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
            : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        }`}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
}
