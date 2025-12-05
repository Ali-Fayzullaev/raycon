import React, { useMemo, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  CalendarClock,
  Video,
  Rocket,
  Zap,
  CheckCircle,
  Play,
  Star,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  Lightbulb,
  LucideIcon,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

import { useI18n } from "@/providers/I18nProvider";
import SITE from "@/lib/site";

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: "easeOut" },
  },
};

// Типы для данных
interface Step {
  tag: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
  accent: string;
  darkAccent: string;
  gradient: string;
  duration: string;
  features: string[];
  progress: number;
}

interface MousePosition {
  x: number;
  y: number;
}

export default function CrazyRoadmap() {
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const { t, lang } = useI18n();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMounted]);

  const steps = useMemo<Step[]>(
    () => [
      {
        tag: t("roadmap_1_tag"),
        title: t("roadmap_1_title"),
        desc: t("roadmap_1_desc"),
        Icon: CalendarClock,
        accent: "from-emerald-500 to-green-500",
        darkAccent: "from-emerald-600 to-green-600",
        gradient:
          theme === "dark"
            ? "bg-gradient-to-br from-emerald-600/20 to-green-600/20"
            : "bg-gradient-to-br from-emerald-500/10 to-green-500/10",
        duration: lang === "ru" ? "15 минут" : "15 минут",
        features: [t("feature_1"), t("feature_2"), t("feature_3")],
        progress: 33,
      },
      {
        tag: t("roadmap_2_tag"),
        title: t("roadmap_2_title"),
        desc: t("roadmap_2_desc"),
        Icon: Video,
        accent: "from-teal-500 to-emerald-500",
        darkAccent: "from-teal-600 to-emerald-600",
        gradient:
          theme === "dark"
            ? "bg-gradient-to-br from-teal-600/20 to-emerald-600/20"
            : "bg-gradient-to-br from-teal-500/10 to-emerald-500/10",
        duration: lang === "ru" ? "20 минут" : "20 минут",
        features: [t("feature_4"), t("feature_5"), t("feature_6")],
        progress: 66,
      },
      {
        tag: t("roadmap_3_tag"),
        title: t("roadmap_3_title"),
        desc: t("roadmap_3_desc"),
        Icon: Rocket,
        accent: "from-green-500 to-lime-500",
        darkAccent: "from-green-600 to-lime-600",
        gradient:
          theme === "dark"
            ? "bg-gradient-to-br from-green-600/20 to-lime-600/20"
            : "bg-gradient-to-br from-green-500/10 to-lime-500/10",
        duration: lang === "ru" ? "Мгновенно" : "Дереу",
        features: [t("feature_7"), t("feature_8"), t("feature_9")],
        progress: 100,
      },
    ],
    [theme, lang, t]
  );

  // Цвета для разных тем
  const themeColors = {
    dark: {
      bg: "bg-slate-950",
      text: "text-white",
      cardBg: "bg-slate-900/50",
      border: "border-emerald-500/30",
      grid: "rgba(16,185,129,0.05)",
      blob1: "rgba(16, 185, 129, 0.4)",
      blob2: "rgba(34, 197, 94, 0.4)",
      cursor: "rgba(16, 185, 129, 0.3)",
      textMuted: "text-slate-300",
      textSecondary: "text-slate-400",
      progressBg: "bg-slate-700/30",
      badgeBg: "bg-slate-800/50",
    },
    light: {
      bg: "bg-white",
      text: "text-slate-900",
      cardBg: "bg-white/80",
      border: "border-emerald-400/30",
      grid: "rgba(16,185,129,0.03)",
      blob1: "rgba(16, 185, 129, 0.2)",
      blob2: "rgba(34, 197, 94, 0.2)",
      cursor: "rgba(16, 185, 129, 0.15)",
      textMuted: "text-slate-600",
      textSecondary: "text-slate-500",
      progressBg: "bg-slate-200/50",
      badgeBg: "bg-slate-100/50",
    },
  };

  const colors = themeColors[theme];

  if (!isMounted) {
    // Рендерим простую версию для SSR без анимаций
    return (
      <div
        className={`relative w-full overflow-hidden ${colors.bg} ${colors.text} transition-colors duration-300`}
      >
        <section className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border bg-emerald-500/10 border-emerald-500/30 text-emerald-700 mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {t("roadmap_badge")}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600">
                {t("roadmap_title")}
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-slate-600">
                {t("roadmap_subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`rounded-2xl backdrop-blur-xl border-2 p-8 ${step.gradient} ${colors.border} ${colors.cardBg}`}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.accent} flex items-center justify-center mb-6 shadow-xl`}
                    >
                      <step.Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold uppercase tracking-widest mb-2 text-emerald-600">
                        {step.tag}
                      </div>
                      <h3 className="text-2xl font-black mb-3">{step.title}</h3>
                      <p className="text-sm leading-relaxed mb-4 text-slate-600">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${colors.bg} ${colors.text} transition-colors duration-300`}
    >
      {/* Cursor Glow Effect - только на клиенте */}
      {isMounted && (
        <motion.div
          className="pointer-events-none fixed w-96 h-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.cursor} 0%, transparent 70%)`,
            left: mousePos.x - 192,
            top: mousePos.y - 192,
          }}
          transition={{ type: "tween", duration: 0.3 }}
        />
      )}

      {/* Animated Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(${colors.grid} 1px, transparent 1px),
          linear-gradient(90deg, ${colors.grid} 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Animated Blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.blob1} 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${colors.blob2} 0%, transparent 70%)`,
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Particles - только на клиенте */}
      {isMounted &&
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-emerald-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

      <section className="relative py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              variants={fade}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md border bg-emerald-500/10 border-emerald-500/30 ${
                theme === "dark" ? "text-emerald-300" : "text-emerald-700"
              } mb-6`}
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {t("roadmap_badge")}
              </span>
            </motion.div>

            <motion.h1
              variants={fade}
              className={`text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
                theme === "dark"
                  ? "from-emerald-400 via-green-400 to-emerald-400"
                  : "from-emerald-600 via-green-600 to-emerald-600"
              }`}
            >
              {t("roadmap_title")}
            </motion.h1>

            <motion.p
              variants={fade}
              className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${colors.textMuted}`}
            >
              {t("roadmap_subtitle")}
            </motion.p>
          </motion.div>

          {/* Desktop Crazy Layout */}
          <div className="hidden lg:block relative">
            <CrazyDesktopLayout steps={steps} colors={colors} />
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <CrazyMobileLayout steps={steps} colors={colors} />
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-20"
          >
           <a href={SITE.whatsAppFaq}>
             <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 mx-auto shadow-2xl transform transition-all bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-emerald-500/50"
            >
              <Sparkles className="w-5 h-5" />
              {t("roadmapbtn")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
           </a>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-8 mt-8"
            >
              <div
                className={`flex items-center gap-2 ${colors.textSecondary}`}
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">{t("roadmap_hint")}</span>
              </div>
              <div
                className={`flex items-center gap-2 ${colors.textSecondary}`}
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-sm">{t("roadmap_support")}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Пропсы для компонентов
interface CrazyDesktopLayoutProps {
  steps: Step[];
  colors: any;
}

interface CrazyStepCardProps {
  step: Step;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  colors: any;
}

interface CrazyMobileLayoutProps {
  steps: Step[];
  colors: any;
}

const CrazyDesktopLayout: React.FC<CrazyDesktopLayoutProps> = ({
  steps,
  colors,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={stagger}
      className="relative"
    >
      <div className="grid grid-cols-3 gap-8 mb-16">
        {steps.map((step, index) => (
          <CrazyStepCard
            key={index}
            step={step}
            index={index}
            isFirst={index === 0}
            isLast={index === steps.length - 1}
            colors={colors}
          />
        ))}
      </div>

      {/* Connection Lines with Animation */}
      <svg
        className="absolute top-40 left-0 right-0 w-full h-32 pointer-events-none"
        viewBox="0 0 1200 150"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#84cc16" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 75 Q 300 20 600 75 T 1200 75"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true }}
          strokeLinecap="round"
        />
      </svg>

      {/* Arrow Icons */}
      <motion.div
        className="absolute top-40 left-1/3 transform -translate-x-1/2 text-2xl text-emerald-400"
        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowRight />
      </motion.div>

      <motion.div
        className="absolute top-40 left-2/3 transform -translate-x-1/2 text-2xl text-emerald-400"
        animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      >
        <ArrowRight />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-1/4 text-4xl text-emerald-400/30"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        ★
      </motion.div>
      <motion.div
        className="absolute top-60 right-1/4 text-3xl text-green-400/30"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        ✦
      </motion.div>
    </motion.div>
  );
};

const CrazyStepCard: React.FC<CrazyStepCardProps> = ({
  step,
  index,
  isFirst,
  isLast,
  colors,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={fade}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${isHovered ? "z-10" : "z-0"}`}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 rounded-2xl opacity-0 blur-xl bg-gradient-to-r from-emerald-600/40 to-green-600/40"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <motion.div
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className={`relative rounded-2xl backdrop-blur-xl border-2 p-8 overflow-hidden group ${step.gradient} ${colors.border} ${colors.cardBg}`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(16,185,129,0.3)_1px,transparent_0)] bg-[length:20px_20px]" />
        </div>

        {/* Number Badge */}
        <motion.div
          className={`absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shadow-2xl bg-gradient-to-r ${step.accent}`}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white">{index + 1}</span>
        </motion.div>

        {/* Icon Container */}
        <motion.div
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.accent} flex items-center justify-center mb-6 shadow-xl relative`}
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <step.Icon className="w-8 h-8 text-white" />
          {/* Icon Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-current opacity-20 blur-md"
            animate={{ scale: isHovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <div className="mb-6 relative z-10">
          <motion.div
            className={`text-xs font-bold uppercase tracking-widest mb-2 ${
              colors.text === "text-white"
                ? "text-emerald-300"
                : "text-emerald-600"
            }`}
          >
            {step.tag}
          </motion.div>

          <h3 className={`text-2xl font-black mb-3 ${colors.text}`}>
            {step.title}
          </h3>

          <p className={`text-sm leading-relaxed mb-4 ${colors.textMuted}`}>
            {step.desc}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-2 mb-6 relative z-10">
          {step.features.map((feature: string, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-2 text-sm ${colors.textMuted}`}
            >
              <motion.div
                animate={{ scale: isHovered ? 1.2 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </motion.div>
              {feature}
            </motion.div>
          ))}
        </div>

        {/* Duration */}
        <motion.div
          className={`flex items-center gap-2 px-3 py-2 rounded-full w-fit mb-6 ${colors.badgeBg} ${colors.textMuted} relative z-10`}
        >
          <Clock className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold">{step.duration}</span>
        </motion.div>

        {/* Progress Bar */}
        <div
          className={`relative h-2 ${colors.progressBg} rounded-full overflow-hidden`}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${step.accent} rounded-full relative`}
            initial={{ width: 0 }}
            whileInView={{ width: `${step.progress}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Progress Bar Shine */}
            <motion.div
              className="absolute inset-0 bg-white/30 rounded-full"
              animate={{ x: isHovered ? ["0%", "100%"] : "0%" }}
              transition={{ duration: 1, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          }}
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 20px rgba(16, 185, 129, 0.3)"
              : "inset 0 0 0px rgba(16, 185, 129, 0)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating Particles inside card */}
        {isHovered && (
          <>
            <motion.div
              className="absolute top-4 left-4 w-1 h-1 bg-emerald-400 rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-4 right-4 w-1 h-1 bg-green-400 rounded-full"
              animate={{
                y: [0, 10, 0],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const CrazyMobileLayout: React.FC<CrazyMobileLayoutProps> = ({
  steps,
  colors,
}) => {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {steps.map((step: Step, index: number) => (
        <motion.div
          key={index}
          variants={fade}
          className={`relative rounded-2xl backdrop-blur-xl border-2 p-6 overflow-hidden ${step.gradient} ${colors.border} ${colors.cardBg}`}
        >
          {/* Number Badge */}
          <motion.div
            className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg shadow-xl bg-gradient-to-r ${step.accent}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-white">{index + 1}</span>
          </motion.div>

          <div className="flex gap-4">
            {/* Icon */}
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-r ${step.accent} flex items-center justify-center flex-shrink-0 shadow-lg relative`}
            >
              <step.Icon className="w-7 h-7 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                  colors.text === "text-white"
                    ? "text-emerald-300"
                    : "text-emerald-600"
                }`}
              >
                {step.tag}
              </motion.div>

              <h3 className={`text-lg font-black mb-2 ${colors.text}`}>
                {step.title}
              </h3>

              <p className={`text-xs mb-3 leading-relaxed ${colors.textMuted}`}>
                {step.desc}
              </p>

              {/* Features */}
              <div className="space-y-1 mb-3">
                {step.features.map((feature: string, i: number) => (
                  <div
                    key={i}
                    className={`flex items-center gap-1.5 text-xs ${colors.textMuted}`}
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Duration & Progress */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 text-xs ${colors.textSecondary}`}
                >
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{step.duration}</span>
                </div>
                <span className="text-xs font-bold text-emerald-400">
                  {step.progress}%
                </span>
              </div>

              <div
                className={`h-1.5 ${colors.progressBg} rounded-full mt-2 overflow-hidden`}
              >
                <motion.div
                  className={`h-full bg-gradient-to-r ${step.accent}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${step.progress}%` }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
