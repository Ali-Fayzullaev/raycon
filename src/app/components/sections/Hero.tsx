"use client";
import React, { useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  MessageCircle,
  Bot,
} from "lucide-react";
import { useI18n } from "@/providers/I18nProvider";
import ModernTryModal from "../modals/TryModal";

// Анимированный фон с частицами
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Градиентный фон */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 40%, rgba(0, 122, 110, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 85% 25%, rgba(51, 202, 183, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 45% 85%, rgba(230, 255, 250, 0.18) 0%, transparent 50%),
            linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
          `,
        }}
      />

      {/* Анимированные орбы */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl opacity-70"
          style={{
            background: `linear-gradient(45deg, ${
              i % 4 === 0
                ? "rgba(0, 122, 110, 0.25)"
                : i % 4 === 1
                ? "rgba(51, 202, 183, 0.2)"
                : i % 4 === 2
                ? "rgba(0, 180, 160, 0.18)"
                : "rgba(230, 255, 250, 0.3)"
            }, transparent)`,
            width: `${40 + i * 15}px`,
            height: `${40 + i * 15}px`,
            left: `${5 + i * 12}%`,
            top: `${15 + i * 8}%`,
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.7,
          }}
        />
      ))}

      {/* Сетчатый паттерн */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 122, 110, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 122, 110, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};

function PhoneFrameVideo({
  src = "/demo.mp4",
  poster = "/demo-poster.jpg",
  className = "",
  fill = "contain", // 'contain' (не режет) или 'cover' (заполняет, может чуть обрезать)
}: {
  src?: string;
  poster?: string;
  className?: string;
  fill?: "contain" | "cover";
}) {
  return (
    <div
      className={`relative w-full max-w-[360px] md:max-w-[400px] mx-auto ${className}`}
    >
      {/* внешняя тень */}
      <div className="absolute inset-0 translate-y-3 blur-lg opacity-40 rounded-[36px] bg-black/40" />

      {/* корпус телефона */}
      <div className="relative aspect-[9/16] rounded-[34px] p-[10px] bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 shadow-[0_20px_60px_-20px_rgba(0,0,0,.45)] border border-white/20 dark:border-white/10">
        {/* ободок-безель */}
        <div className="relative h-full w-full rounded-[26px] p-[6px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 border border-white/40 dark:border-white/10">
          {/* экран */}
          <div className="relative h-full w-full rounded-[22px] overflow-hidden bg-black">
            {/* статичный стеклянный блик */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[22px]"
              style={{
                background:
                  "linear-gradient(140deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,.05) 45%, transparent 80%)",
              }}
            />
            {/* «вырез» под камеру */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black/90 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,.05)_inset]" />
            {/* боковые кнопки (декор) */}
            <div className="absolute left-[-3px] top-[80px] h-10 w-[3px] rounded-r bg-slate-500/70" />
            <div className="absolute right-[-3px] top-[120px] h-16 w-[3px] rounded-l bg-slate-500/70" />

            {/* видео */}
            <video
              src={src}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full rounded-[22px] object-${fill} bg-black`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Главный компонент Hero
export default function ModernHero() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const bulletPoints = [
    { icon: Bot, text: t("hero_bul_1"), color: "from-blue-500 to-cyan-500" },
    { icon: Zap, text: t("hero_bul_2"), color: "from-amber-500 to-orange-500" },
    {
      icon: MessageCircle,
      text: t("hero_bul_3"),
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Левая колонка с контентом */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-20"
          >
            {/* Бейдж */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 backdrop-blur-md border border-teal-200/30 rounded-full px-4 py-2 text-sm font-medium text-slate-700 mb-8"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              Новое поколение CRM-систем
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border border-teal-400 border-dashed rounded-full"
              />
            </motion.div>

            {/* Заголовок */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 mb-6"
            >
              {t("hero_title_1")}
            </motion.h1>

            {/* Подзаголовок */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-lg"
            >
              {t("hero_title_2")}
            </motion.p>

            {/* Список преимуществ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="space-y-4 mb-10"
            >
              {bulletPoints.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA блок */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 items-start"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(true)}
                className="group  relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
               
              >
                {/* Анимированный блеск */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                  initial={{ x: "-100%" }}
                  animate={{ x: "200%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative flex items-center gap-3">
                  {t("hero_cta")}
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
              </motion.button>

              <div className="flex items-center gap-3 text-sm text-slate-600 pt-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </motion.div>
                {t("hero_trial_note")}
              </div>
            </motion.div>
          </motion.div>

          {/* Правая колонка - Видеоблок */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{
              delay: 0.4,
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative"
          >
            <PhoneFrameVideo src="/demo.mp4" poster="/demo-poster.jpg" />
          </motion.div>
        </div>
        <ModernTryModal open={open} onOpenChange={setOpen} />
      </div>
    </section>
  );
}
