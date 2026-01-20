"use client";
import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import Image from "next/image";
import ModernTryModal from "../modals/TryModal";
import {
  CheckCircle2,
  Crown,
  Zap,
  Star,
  Gem,
  ArrowRight,
  Shield,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Упрощенные варианты анимаций
const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
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

// Статические данные для точек (без анимации)
const DOTS = [
  { left: "12%", top: "22%" },
  { left: "28%", top: "68%" },
  { left: "46%", top: "35%" },
  { left: "63%", top: "12%" },
  { left: "77%", top: "52%" },
  { left: "84%", top: "18%" },
  { left: "35%", top: "82%" },
  { left: "68%", top: "74%" },
];

function Feature({
  children,
  popular = false,
}: {
  children: React.ReactNode;
  popular?: boolean;
}) {
  return (
    <motion.li
      className="flex items-start gap-3 p-2 rounded-lg"
      whileHover={{ x: 2 }}
      transition={{ duration: 0.2 }}
    >
      {popular ? (
        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
          <Star className="w-3 h-3 text-white" />
        </div>
      ) : (
        <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600 dark:text-emerald-400 flex-shrink-0" />
      )}
      <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">
        {children}
      </span>
    </motion.li>
  );
}

export default function OptimizedPricing() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isMultichatHighlighted, setIsMultichatHighlighted] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "monthly" | "halfyear" | "yearly"
  >("monthly");

  // Эффект для прослушивания событий выделения мультичата
  React.useEffect(() => {
    const handleMultichatHighlight = () => {
      setIsMultichatHighlighted(true);
      // Убираем выделение через 3 секунды
      setTimeout(() => {
        setIsMultichatHighlighted(false);
      }, 3000);
    };

    // Слушаем кастомное событие от Hero компонента
    window.addEventListener("multichat-highlight", handleMultichatHighlight);

    return () => {
      window.removeEventListener(
        "multichat-highlight",
        handleMultichatHighlight
      );
    };
  }, []);

  // Обработчик закрытия модального окна по ESC
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsImageOpen(false);
      }
    };

    if (isImageOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isImageOpen]);

  // Используем useMemo для предотвращения ненужных ререндеров
  const plans = useMemo(() => {
    // Определяем цены и скидки по периодам
    const pricingPeriods = {
      monthly: {
        standard: {
          price: "35 000 ₸",
          period: t("pricing_period_monthly").toLowerCase(),
          dailyPriceDiscounted: "1 166 ₸",
          dailyExample: lang === "ru" ? "По цене чашки кофе ☕" : "Кофе бір шыны бағасы ☕",
        },
        pro: {
          price: "49 000 ₸",
          period: t("pricing_period_monthly").toLowerCase(),
          dailyPriceDiscounted: "1 633 ₸",
          dailyExample: lang === "ru" ? "Лёгкий завтрак 🥐" : "Жеңіл таңғы ас 🥐",
        },
        business: { price: t("pricing_by_request"), period: "" },
      },
      halfyear: {
        standard: {
          price: "189 000 ₸",
          originalPrice: "210 000 ₸",
          period: t("pricing_period_halfyear").toLowerCase(),
          discount: "10%",
          dailyPrice: "1 166 ₸",
          dailyPriceDiscounted: "1 050 ₸",
          savings: "21 000 ₸",
          dailyExample: lang === "ru" ? "70 литров АИ-95 (полный бак) ⛽" : "70 литр АИ-95 (толық бак) ⛽",
        },
        pro: {
          price: "264 599 ₸",
          originalPrice: "294 000 ₸",
          period: t("pricing_period_halfyear").toLowerCase(),
          discount: "10%",
          dailyPrice: "1 633 ₸",
          dailyPriceDiscounted: "1 470 ₸",
          savings: "29 400 ₸",
          dailyExample: lang === "ru" ? "Бизнес-ланч на троих 🍽️" : "Үшеуге бизнес-ланч 🍽️",
        },
        business: { price: t("pricing_by_request"), period: "" },
      },
      yearly: {
        standard: {
          price: "336 000 ₸",
          originalPrice: "420 000 ₸",
          period: t("pricing_period_yearly").toLowerCase(),
          discount: "20%",
          dailyPrice: "1 166 ₸",
          dailyPriceDiscounted: "933 ₸",
          savings: "84 000 ₸",
          dailyExample: lang === "ru" ? "Месяц безлимита в FitnessBlitz 💪" : "FitnessBlitz-те бір ай шексіз 💪",
        },
        pro: {
          price: "470 399 ₸",
          originalPrice: "588 000 ₸",
          period: t("pricing_period_yearly").toLowerCase(),
          discount: "20%",
          dailyPrice: "1 633 ₸",
          dailyPriceDiscounted: "1 306 ₸",
          savings: "117 600 ₸",
          dailyExample: lang === "ru" ? "Apple Watch SE ⌚" : "Apple Watch SE ⌚",
        },
        business: { price: t("pricing_by_request"), period: "" },
      },
    };

    return [
      {
        key: "standard",
        title: t("pricing_standard_title"),
        desc: t("pricing_standard_desc"),
        pricing: pricingPeriods[selectedPeriod].standard,
        cta: t("pricing_select_plan"),
        popular: false,
        accent: "from-slate-500 to-gray-600",
        gradient:
          "bg-gradient-to-br from-slate-500/10 to-gray-600/10 dark:from-slate-500/5 dark:to-gray-600/5",
        icon: Shield,
        features: [
          t("pricing_standard_f1"),
          t("pricing_standard_f2"),
          t("pricing_standard_f3"),
          t("pricing_standard_f4"),
          t("pricing_standard_f5"),
          t("pricing_standard_f6"),
          t("pricing_standard_f7"),
        ],
        result: t("pricing_standard_result"),
        target: t("pricing_standard_target"),
      },
      {
        key: "pro",
        title: t("pricing_pro_title"),
        desc: t("pricing_pro_desc"),
        pricing: pricingPeriods[selectedPeriod].pro,
        cta: t("pricing_select_plan"),
        popular: true,
        accent: "from-red-500 to-rose-500",
        gradient:
          "border border-red-500 border-2 bg-gradient-to-br from-red-500/15 to-rose-500/15 dark:from-red-500/10 dark:to-rose-500/10",
        icon: Crown,
        features: [
          t("pricing_pro_f1"),
          t("pricing_pro_f2"),
          t("pricing_pro_f3"),
          t("pricing_pro_f4"),
          t("pricing_pro_f5"),
          t("pricing_pro_f6"),
          t("pricing_pro_f7"),
        ],
        result: t("pricing_pro_result"),
        target: t("pricing_pro_target"),
        badge: t("pricing_pro_badge"),
      },
      {
        key: "business",
        title: t("pricing_business_title"),
        desc: t("pricing_business_desc"),
        pricing: pricingPeriods[selectedPeriod].business,
        cta: t("pricing_contact_us"),
        popular: false,
        accent: "from-purple-500 to-indigo-500",
        gradient:
          "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5",
        icon: Gem,
        features: [
          t("pricing_business_f1"),
          t("pricing_business_f2"),
          t("pricing_business_f3"),
          t("pricing_business_f4"),
          t("pricing_business_f5"),
          t("pricing_business_f6"),
          t("pricing_business_f7"),
        ],
        result: t("pricing_business_result"),
        target: t("pricing_business_target"),
      },
    ];
  }, [selectedPeriod, lang]);

  const handlePlanSelect = (planKey: string) => {
    setSelectedPlan(planKey);
    setOpen(true);
  };

  // Упрощенный фон
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Статический градиентный фон */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(20,184,166,0.3) 0%, transparent 50%),
                       radial-gradient(circle at 80% 70%, rgba(139,92,246,0.2) 0%, transparent 50%),
                       radial-gradient(circle at 40% 10%, rgba(59,130,246,0.2) 0%, transparent 50%)`,
        }}
      />

      {/* Статические точки вместо анимированных */}
      {DOTS.map((p, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-teal-400/10"
          style={{ left: p.left, top: p.top }}
        />
      ))}
    </div>
  );

  return (
    <section
      id="pricing"
      className="relative py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden"
    >
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
            {t("pricing_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-4"
          >
            {t("pricing_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("pricing_subtitle")}
          </motion.p>
        </motion.div>

        <div className="relative mb-3 h-8 sm:h-7 flex items-center">
          {/* Всегда строго по центру */}
          <span
            className="absolute left-1/2 -translate-x-1/2
      text-[11px] sm:text-sm
      text-slate-500 dark:text-slate-400
      whitespace-nowrap"
          >
            {t("pricing_save_up_to")}
          </span>

          {/* Управляемый сдвиг вправо */}
          <span
            className="
            absolute left-1/2
            translate-x-20 sm:translate-x-42
            bg-gradient-to-r from-yellow-500 to-yellow-400
            text-white px-1 py-1
            text-[8px] sm:text-sm
            font-bold shadow-lg whitespace-nowrap
            border-dotted border-2
          "
          >
            {t("pricing_savings_yearly")}
          </span>
        </div>

        {/* Переключатель периода */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative flex justify-center mb-8 sm:mb-12"
        >
          <div className=" bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl p-0.5 sm:p-1 shadow-lg border border-slate-200 dark:border-slate-700 relative">
            <div className="flex">
              {[
                {
                  key: "monthly",
                  label: t("pricing_period_monthly"),
                  discount: null,
                  savings: null,
                },
                {
                  key: "halfyear",
                  label: t("pricing_period_halfyear"),
                  discount: t("pricing_discount_halfyear"),
                  savings: null,
                },
                {
                  key: "yearly",
                  label: t("pricing_period_yearly"),
                  discount: t("pricing_discount_yearly"),
                  savings: "Выгоднее на 20%",
                },
              ].map((period) => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key as any)}
                  className={`relative px-3 sm:px-8 py-2 sm:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    selectedPeriod === period.key
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                    <span className="text-xs sm:text-base">{period.label}</span>
                    {period.discount && (
                      <span
                        className={`text-[10px] sm:text-xs ${
                          selectedPeriod === period.key
                            ? "text-white/80"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {period.discount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src="/subtract.png"
              alt="Arrow"
              width={130}
              height={50} // реальное соотношение сторон
              sizes="(max-width: 640px) 40px,
          (max-width: 768px) 50px,
          (max-width: 1024px) 80px,
          90px"
              className="
          w-[50px] sm:w-[60px] md:w-[80px] lg:w-[90px]
          filter
          invert
          sepia saturate-[400%]
          brightness-110 contrast-110
        "
            />
          </div>
        </motion.div>

        {/* Тарифы - Desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="hidden lg:flex items-end gap-6 justify-center"
        >
          {plans.map((plan, index) => (
            <OptimizedPricingCard
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
          viewport={{ once: true, margin: "-30px" }}
          className="lg:hidden space-y-6"
        >
          {plans.map((plan, index) => (
            <OptimizedMobilePricingCard
              key={plan.key}
              plan={plan}
              index={index}
              onSelect={handlePlanSelect}
            />
          ))}
        </motion.div>
        {/* Упрощенная дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 mb-0"
        >
          <div className="inline-flex flex-wrap justify-center gap-4 bg-white/50 dark:bg-slate-800/30 rounded-xl backdrop-blur-sm">
            {[
              t("pricing_feature1"),
              t("pricing_feature2"),
              t("pricing_feature3"),
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center mt-0 p-0">
          <CheckCircle2 className="inline-block  w-2 h-2 mt-0 text-emerald-500" />
          <span className="text-[10px] mt-0 p-0">{t("pricing_feature4")}</span>
        </div>
        {/* Сравнительная таблица тарифов */}
        <p className="text-center text-lg font-medium text-slate-700 dark:text-slate-300 mt-16 mb-6">
          {t("pricing_comparison_title")}
        </p>
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Таблица */}
            <div className="overflow-x-auto" id="table">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                      {t("pricing_table_features")}
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                      {t("pricing_standard_title")}
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-emerald-600 dark:text-emerald-400 relative">
                      {t("pricing_pro_title")} ⭐
                      <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        {t("pricing_table_bestseller")}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                      {t("pricing_business_title")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {/* Интеграция CRM */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {t("pricing_table_crm_integration")}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400">
                      {t("pricing_table_free")}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400">
                      {t("pricing_table_free")}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400">
                      {t("pricing_table_free")}
                    </td>
                  </tr>

                  {/* Функции с галочками */}
                  {[
                    { key: "f2", text: t("pricing_standard_f2") },
                    { key: "f1", text: t("pricing_standard_f1") },
                    { key: "f3_analytics", text: t("pricing_standard_f3") },
                    { key: "f3_stats", text: t("pricing_stats_deals") },
                    { key: "f4", text: t("pricing_standard_f4") },
                    {
                      key: "f5_bot",
                      text: t("pricing_standard_f5").includes("и")
                        ? t("pricing_standard_f5").split(" и ")[0]
                        : t("pricing_standard_f5").split(" және ")[0],
                    },
                    {
                      key: "f5_auto",
                      text: t("pricing_standard_f5").includes("и")
                        ? t("pricing_standard_f5").split(" и ")[1] ||
                          t("pricing_standard_f5")
                        : t("pricing_standard_f5").split(" және ")[1] ||
                          t("pricing_standard_f5"),
                    },
                    { key: "f6", text: t("pricing_standard_f6") },
                  ].map((item) => (
                    <tr
                      key={item.key}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {item.text}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                      </td>
                    </tr>
                  ))}

                  {/* Мультичат */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {t("pricing_multichat")}
                    </td>
                    <td className="px-6 py-4 text-center text-red-500 dark:text-red-400">
                      <Minus className="w-5 h-5 mx-auto bg-slate-300 text-slate-600 rounded-full p-0.5" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>
                          (
                          {t("pricing_period_monthly") === "Месяц"
                            ? "максимальная скорость"
                            : "максималды жылдамдық"}
                          )
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* WhatsApp в CRM */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {t("pricing_standard_f4")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>({t("pricing_accelerated")})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>({t("pricing_most_stable")})</span>
                      </div>
                    </td>
                  </tr>

                  {/* Мультичат WhatsApp */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {t("pricing_pro_f3")}
                    </td>
                    <td className="px-6 py-4 text-center text-red-500 dark:text-red-400">
                      <Minus className="w-5 h-5 mx-auto bg-slate-300 text-slate-600 rounded-full p-0.5" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>
                          {t("pricing_business_f2").replace("Мультичат ", "")}
                          <br />({t("pricing_max_speed")})
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Облако хранения файлов */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {t("pricing_cloud_storage")}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Minus className="w-5 h-5 mx-auto bg-slate-300 text-slate-600 rounded-full p-0.5" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>({t("pricing_business_f5")})</span>
                      </div>
                    </td>
                  </tr>

                  {/* Характеристики производительности */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-slate-100 dark:bg-slate-800">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {t("pricing_reliability")}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      {t("pricing_basic")}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">
                      {t("pricing_enhanced")}
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 font-medium">
                      {t("pricing_maximum")}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {t("pricing_speed")}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      {t("pricing_standard_level")}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">
                      {t("pricing_high_level")}
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 font-medium">
                      {t("pricing_priority_level")}
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {t("pricing_recommended")}
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400 text-sm">
                      {t("pricing_standard_target").split(",")[0]}
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      {t("pricing_pro_target").split(",")[0]}
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {t("pricing_business_target")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div> 
        {/* Дополнительная информация - Мультичат */}
        <motion.div
          id="multichat-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-12 relative overflow-hidden rounded-2xl border transition-all duration-500 scroll-mt-20 ${
            isMultichatHighlighted
              ? "border-amber-400 dark:border-amber-500 shadow-lg shadow-amber-500/20"
              : "border-slate-200 dark:border-slate-700"
          }`}
        >
          {/* Фоновый градиент */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-emerald-500/5 to-cyan-500/5 dark:from-teal-500/10 dark:via-emerald-500/10 dark:to-cyan-500/10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-teal-400/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-400/10 to-transparent rounded-full blur-3xl" />
          
          <div className="relative p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Текстовая часть */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mb-4"
                >
                  <h3
                    className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                      isMultichatHighlighted
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                      {t("pricing_multichat")}
                    </span>
                    <span className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-300 ml-2">
                      — {t("pricing_multichat_info")}
                    </span>
                  </h3>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed max-w-xl"
                >
                  {lang === "ru" 
                    ? "Объедините все мессенджеры в одном окне и общайтесь с клиентами без переключения между приложениями"
                    : "Барлық мессенджерлерді бір терезеде біріктіріп, қосымшалар арасында ауыспай клиенттермен сөйлесіңіз"
                  }
                </motion.p>
                
                
              </div>
              
              {/* Изображение */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex-1 max-w-md lg:max-w-lg"
              >
                <div
                  onClick={() => setIsImageOpen(true)}
                  className="relative group cursor-pointer"
                >
                  {/* Декоративная рамка */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
                  
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-white/50 dark:border-slate-700/50">
                    <Image
                      src="/articles/multiChat.jpeg"
                      alt="Multichat Interface"
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Оверлей при наведении */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-slate-900/90 rounded-full p-4 shadow-lg">
                        <svg
                          className="w-8 h-8 text-slate-800 dark:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Подпись */}
                  <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-3">
                    {lang === "ru" ? "Нажмите для увеличения" : "Үлкейту үшін басыңыз"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Модальное окно для просмотра изображения */}
        {isImageOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Кнопка закрытия */}
              <button
                onClick={() => setIsImageOpen(false)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <Image
                src="/articles/multiChat.jpeg"
                alt="Multichat Interface - Full Screen"
                width={1920}
                height={1080}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
                priority
              />
              
              {/* Подсказка */}
              <p className="text-center text-white/60 text-sm mt-4">
                {lang === "ru" ? "Нажмите ESC или на фон для закрытия" : "Жабу үшін ESC немесе фонға басыңыз"}
              </p>
            </motion.div>
          </motion.div>
        )}
        {/* Кнопка Мультичат */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8"
        >
          <motion.a
            href="https://chat.raycon.kz/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
            <span className="relative flex items-center gap-2">
              Мультичат
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
          </motion.a>
        </motion.div>
      </div>

      <ModernTryModal open={open} onOpenChange={setOpen} />
    </section>
  );
}

// Оптимизированный компонент карточки для десктопа
const OptimizedPricingCard = ({
  plan,
  index,
  onSelect,
}: {
  plan: any;
  index: number;
  onSelect: (key: string) => void;
}) => {
  const { t } = useI18n();
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={fade}
      whileHover={{ y: isPopular ? -8 : -4, scale: isPopular ? 1.02 : 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative flex-1 max-w-sm${isPopular ? " z-10" : ""}`}
    >
      <div
        className={`relative rounded-xl ${
          plan.gradient
        }bb dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
          isPopular ? "border-red-500/30 ring-1 ring-red-500/20" : ""
        }`}
      >
        {/* Бейдж популярного тарифа */}
        {isPopular && plan.badge && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2"
          >
            <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              <Crown className="w-3 h-3" />
              {plan.badge}
            </div>
          </motion.div>
        )}

        {/* Заголовок */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-md`}
            >
              <plan.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {plan.title}
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
            {plan.desc}
          </p>
        </div>

        {/* Цена */}
        <div className="mb-6">
          {/* Ежедневная цена - для Standard и Pro */}
          {plan.pricing.dailyPriceDiscounted ? (
            <div className="text-center">
              {/* Зачёркнутая цена - только если есть скидка */}
              {plan.pricing.dailyPrice && (
                <div className="mb-1">
                  <span className="text-slate-400 dark:text-slate-500 line-through text-lg">
                    {plan.pricing.dailyPrice}
                  </span>
                </div>
              )}
              
              {/* Основная цена */}
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-4xl font-black ${isPopular ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} bg-clip-text text-transparent`}>
                  {plan.pricing.dailyPriceDiscounted}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                  /{t("pricing_period_monthly") === "Месяц" ? "день" : "күн"}
                </span>
              </div>
              
              {/* Выгода */}
              {plan.pricing.savings && (
                <div className="mt-2">
                  <span className={`inline-flex items-center gap-1 ${isPopular ? 'bg-red-300 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'} text-sm font-semibold px-3 py-1 rounded-full`}>
                    🎁 {t("pricing_period_monthly") === "Месяц" ? "Выгода" : "Үнемдеу"} {plan.pricing.savings}
                  </span>
                </div>
              )}
              
              {/* Пример */}
              <div className="mt-2 text-slate-500 dark:text-slate-400 text-sm">
                {plan.pricing.dailyExample}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-2">
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {plan.pricing.price}
                </div>
                {plan.pricing.period && (
                  <span className="text-slate-600 dark:text-slate-400">
                    / {plan.pricing.period}
                  </span>
                )}
              </div>
              {plan.pricing.originalPrice && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-slate-500 line-through text-sm">
                    {plan.pricing.originalPrice}
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-xs font-medium">
                    {t("pricing_discount_label")} {plan.pricing.discount}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Особенности */}
        <div className="space-y-4 mb-6 flex-1">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              {t("pricing_included_label")}
            </h4>
            <ul className="space-y-1">
              {plan.features.map((feature: string, i: number) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              {t("pricing_result_label")}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {plan.result}
            </p>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
              {t("pricing_suitable_label")}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {plan.target}
            </p>
          </div>
        </div>

        {/* Кнопка */}
        <Button
          onClick={() => onSelect(plan.key)}
          className={`w-full py-3 text-sm font-semibold rounded-lg transition-all duration-200 ${
            isPopular
              ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600"
              : "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          }`}
        >
          <span className="flex items-center gap-2 justify-center">
            {plan.cta}
            <ArrowRight className="w-4 h-4" />
          </span>
        </Button>
      </div>
    </motion.div>
  );
};

// Оптимизированный мобильный компонент
const OptimizedMobilePricingCard = ({
  plan,
  index,
  onSelect,
}: {
  plan: any;
  index: number;
  onSelect: (key: string) => void;
}) => {
  const { t } = useI18n();
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={fade}
      className={`relative rounded-xl ${
        plan.gradient
      }  dark:border-slate-700/50 backdrop-blur-sm p-5 shadow-lg ${
        isPopular ? " ring-1 ring-red-500/20" : ""
      }`}
    >
      {isPopular && plan.badge && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-rose-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Crown className="w-3 h-3" />
            {plan.badge}
          </div>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center gap-3 mb-2">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-sm`}
          >
            <plan.icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {plan.title}
          </h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          {plan.desc}
        </p>
      </div>

      <div className="mb-4">
        {/* Ежедневная цена - для Standard и Pro (Mobile) */}
        {plan.pricing.dailyPriceDiscounted ? (
          <div className="text-center">
            {/* Зачёркнутая цена - только если есть скидка */}
            {plan.pricing.dailyPrice && (
              <div className="mb-0.5">
                <span className="text-slate-400 dark:text-slate-500 line-through text-base">
                  {plan.pricing.dailyPrice}
                </span>
              </div>
            )}
            
            {/* Основная цена */}
            <div className="flex items-baseline justify-center gap-1">
              <span className={`text-4xl font-black ${isPopular ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'} bg-clip-text text-transparent`}>
                {plan.pricing.dailyPriceDiscounted}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
                /{t("pricing_period_monthly") === "Месяц" ? "день" : "күн"}
              </span>
            </div>
            
            {/* Выгода */}
            {plan.pricing.savings && (
              <div className="mt-1.5">
                <span className={`inline-flex items-center gap-1 ${isPopular ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'} text-xs font-semibold px-2 py-0.5 rounded-full`}>
                  🎁 {t("pricing_period_monthly") === "Месяц" ? "Выгода" : "Үнемдеу"} {plan.pricing.savings}
                </span>
              </div>
            )}
            
            {/* Пример */}
            <div className="mt-1.5 text-slate-500 dark:text-slate-400 text-xs">
              {plan.pricing.dailyExample}
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {plan.pricing.price}
              </div>
              {plan.pricing.period && (
                <span className="text-slate-600 dark:text-slate-400 text-sm">
                  / {plan.pricing.period}
                </span>
              )}
            </div>
            {plan.pricing.originalPrice && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-slate-500 line-through text-xs">
                  {plan.pricing.originalPrice}
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full text-xs font-medium">
                  -{plan.pricing.discount}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
            {t("pricing_key_functions")}
          </h4>
          <ul className="space-y-1">
            {plan.features.slice(0, 4).map((feature: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            {t("pricing_for_label")} {plan.target}
          </p>
        </div>
      </div>

      <Button
        onClick={() => onSelect(plan.key)}
        className={`w-full py-2.5 text-sm font-semibold rounded-lg ${
          isPopular
            ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white"
            : "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
        }`}
      >
        {plan.cta}
      </Button>
    </motion.div>
  );
};
