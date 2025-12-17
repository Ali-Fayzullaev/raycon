"use client";
import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import ModernTryModal from "../modals/TryModal";
import {
  CheckCircle2,
  Crown,
  Zap,
  Star,
  Rocket,
  Gem,
  BadgeCheck,
  ArrowRight,
  Users,
  Clock,
  Shield,
  X
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
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isMultichatHighlighted, setIsMultichatHighlighted] = useState(false);

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
    window.addEventListener('multichat-highlight', handleMultichatHighlight);
    
    return () => {
      window.removeEventListener('multichat-highlight', handleMultichatHighlight);
    };
  }, []);

  // Используем useMemo для предотвращения ненужных ререндеров
  const plans = useMemo(
    () => [
      {
        key: "mini",
        title: t("plan_mini"),
        desc: t("plan_mini_desc"),
        price: t("plan_mini_price"),
        cta: t("plan_mini_cta"),
        popular: true,
        accent: "from-teal-500 to-emerald-500",
        gradient:
          "bg-gradient-to-br from-teal-500/15 to-emerald-500/15 dark:from-teal-500/10 dark:to-emerald-500/10",
        icon: Crown,
        features: [
          t("plan_mini_f1"),
          t("plan_mini_f2"),
          t("plan_mini_f3"),
          t("plan_mini_f4"),
          t("plan_mini_f5"),
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
        key: "pro",
        title: t("plan_pro"),
        desc: t("plan_pro_desc"),
        price: t("plan_pro_price"),
        cta: t("plan_pro_cta"),
        popular: false,
        accent: "from-blue-500 to-cyan-500",
        gradient:
          "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5",
        icon: Rocket,
        features: [
          t("plan_pro_f1"),
          t("plan_pro_f2"),
          t("plan_pro_f3"),
          t("plan_pro_f4"),
          t("plan_pro_f5"),
          t("plan_pro_f6"),
        ],
        stats: [
          { icon: Users, value: "20", label: t("plan_stat_managers") },
          { icon: Clock, value: "24/7", label: t("plan_stat_support") },
        ],
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
          t("plan_ent_f1"),
          t("plan_ent_f2"),
          t("plan_ent_f3"),
          t("plan_ent_f4"),
          t("plan_ent_f5"),
          t("plan_ent_f6"),
          t("plan_ent_f7"),
          t("plan_ent_f8"),
        ],
        stats: [
          { icon: Shield, value: "99.9%", label: t("plan_stat_uptime") },
          { icon: BadgeCheck, value: "SLA", label: t("plan_stat_sla") },
        ],
      },
    ],
    [t]
  );

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="inline-flex flex-wrap justify-center gap-4 bg-white/50 dark:bg-slate-800/30 rounded-xl p-4 backdrop-blur-sm">
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

        {/* Сравнительная таблица тарифов */}
        <p className="text-center text-lg font-medium text-slate-700 dark:text-slate-300 mt-16 mb-6">
          Чем отличаются
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left font-semibold text-slate-900 dark:text-white">
                      Функции / Тариф
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                      Standard
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-emerald-600 dark:text-emerald-400 relative">
                      Pro ⭐
                      <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        Бестселлер продаж
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-slate-900 dark:text-white">
                      Business
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {/* Интеграция CRM */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      Интеграция CRM
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400">
                      Бесплатно
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400">
                      Бесплатно
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400">
                      Бесплатно
                    </td>
                  </tr>

                  {/* Функции с галочками */}
                  {[
                    "Автораспределение заявок",
                    "Воронка продаж",
                    "Аналитика и отчеты",
                    "Статистика по сделкам",
                    "Интеграция WhatsApp",
                    "Чат-бот",
                    "Автоматические ответы",
                    "Автоматизация процессов",
                  ].map((feature) => (
                    <tr
                      key={feature}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {feature}
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
                      Мультичат
                    </td>
                    <td className="px-6 py-4 text-center text-red-500 dark:text-red-400">
                        <X className="w-5 h-5 mx-auto  bg-red-500 text-white rounded-full p-0.5" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>(максимальная скорость)</span>
                      </div>
                    </td>
                  </tr>

                  {/* WhatsApp в CRM */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      WhatsApp в CRM
                    </td>
                    <td className="px-6 py-4 text-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>(ускоренный)</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>(самая стабильная и быстрая)</span>
                      </div>
                    </td>
                  </tr>

                  {/* Мультичат WhatsApp */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Мультичат WhatsApp
                    </td>
                    <td className="px-6 py-4 text-center text-red-500 dark:text-red-400">
                      <X className="w-5 h-5 mx-auto  bg-red-500 text-white rounded-full p-0.5" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>
                          WhatsApp+ Instagram
                      <br />
                      (максимальная скорость)
                        </span>
                      </div>
                    </td>
                  </tr>

                  {/* Облако хранения файлов */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      Облако хранения файлов
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="w-5 h-5 mx-auto  bg-red-500 text-white rounded-full p-0.5" />
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      <div className="flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>(хранение файлов без ограничения по времени)</span>
                      </div>
                    </td>
                  </tr>

                  {/* Характеристики производительности */}
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors bg-slate-100 dark:bg-slate-800">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      Надежность работы CRM
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      Базовая
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">
                      Повышенная
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 font-medium">
                      Максимальная
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      Скорость обработки сообщений
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400">
                      Стандарт
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">
                      Высокая
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 font-medium">
                      Приоритетная
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      Рекомендуется для
                    </td>
                    <td className="px-6 py-4 text-center text-slate-600 dark:text-slate-400 text-sm">
                      ИП, микробизнес
                    </td>
                    <td className="px-6 py-4 text-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      Отделы продаж
                    </td>
                    <td className="px-6 py-4 text-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                      Компании, команды, e-commerce
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
        {/* Дополнительная информация */}
        <motion.div
          id="multichat-info"
          initial={{ backgroundColor: "transparent" }}
          className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 px-6 py-4 border-t border-slate-200 dark:border-slate-700 transition-colors duration-500 scroll-mt-20"
        >
          <div className="text-center">
            <p className={`text-sm mt-2 transition-colors duration-300 ${
              isMultichatHighlighted 
                ? 'text-amber-600 dark:text-amber-400 font-medium' 
                : 'text-slate-700 dark:text-slate-300'
            }`}>
              <span className={`font-semibold ${
                isMultichatHighlighted 
                  ? 'text-amber-700 dark:text-amber-300'
                  : 'text-teal-600 dark:text-teal-400'
              }`}>Мультичат</span> — все сообщения клиентов из WhatsApp и Instagram в одном
              окне CRM.
              <br />
              Диалоги не теряются, история сохраняется, клиенты всегда получают
              ответ.
            </p>
          </div>
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
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={fade}
      whileHover={{ y: isPopular ? -8 : -4, scale: isPopular ? 1.02 : 1.01 }}
      transition={{ duration: 0.2 }}
      className={`relative flex-1 max-w-sm ${isPopular ? "z-10" : ""}`}
    >
      <div
        className={`relative rounded-xl ${
          plan.gradient
        } border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col ${
          isPopular ? "border-teal-500/30 ring-1 ring-teal-500/20" : ""
        }`}
      >
        {/* Бейдж популярного тарифа */}
        {isPopular && (
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2"
          >
            <div className="inline-flex items-center gap-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
              <Crown className="w-3 h-3" />
              {plan.badge}
            </div>
          </motion.div>
        )}

        {/* Заголовок */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-md`}
          >
            <plan.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {plan.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              {plan.desc}
            </p>
          </div>
        </div>

        {/* Цена */}
        <div className="mb-4">
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {plan.price}
          </div>
        </div>

        {/* Статистика */}
        <div className="flex gap-3 mb-4">
          {plan.stats.map((stat: any, i: number) => (
            <div
              key={i}
              className="flex-1 text-center p-2 rounded-lg bg-white/50 dark:bg-slate-800/30"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-1 text-teal-500" />
              <div className="font-bold text-slate-900 dark:text-white text-sm">
                {stat.value}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Особенности */}
        <ul className="space-y-1 mb-6 flex-1">
          {plan.features.map((feature: string, i: number) => (
            <Feature key={i} popular={isPopular && i < 2}>
              {feature}
            </Feature>
          ))}
        </ul>

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
  const isPopular = plan.popular;

  return (
    <motion.div
      variants={fade}
      className={`relative rounded-xl ${
        plan.gradient
      } border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm p-5 shadow-lg ${
        isPopular ? "border-teal-500/30 ring-1 ring-teal-500/20" : ""
      }`}
    >
      {isPopular && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Crown className="w-3 h-3" />
            {plan.badge}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${plan.accent} flex items-center justify-center shadow-sm`}
        >
          <plan.icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {plan.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs">
            {plan.desc}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-black text-slate-900 dark:text-white">
          {plan.price}
        </div>
      </div>

      <ul className="space-y-1 mb-4">
        {plan.features.slice(0, 3).map((feature: string, i: number) => (
          <Feature key={i} popular={isPopular && i === 0}>
            {feature}
          </Feature>
        ))}
      </ul>

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
