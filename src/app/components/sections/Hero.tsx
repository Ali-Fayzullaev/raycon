"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  MessageCircle,
  Bot,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Tablet,
  Laptop,
  Watch,
  Smartphone,
} from "lucide-react";
import { useI18n } from "@/providers/I18nProvider";
import ModernTryModal from "../modals/TryModal";
import "../../css/hero.css";
import AnimatedBackground from "../Animated/AnimatedBackground.client";

// --- Варианты анимаций для Framer Motion ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Конфигурация устройств
const devices = [
  {
    id: "imac",
    name: "iMac",
    frame: "/frame/iMac.png",
    content: "/logo.png", // Заменим на логотип
    icon: Monitor,
    aspect: "aspect-[16/10]",
    maxWidth: "max-w-[600px]",
    scale: 0.9,
    contentStyle: "rounded-[8px] scale-[0.78]",
    type: "image"
  },
  {
    id: "macbook",
    name: "MacBook Pro",
    frame: "/frame/MacBookPro.png",
    content: "/logo.png",
    icon: Laptop,
    aspect: "aspect-[16/10]",
    maxWidth: "max-w-[500px]",
    scale: 0.85,
    contentStyle: "rounded-[6px] scale-[0.76]",
    type: "image"
  },
  {
    id: "ipad",
    name: "iPad Pro",
    frame: "/frame/iPadpro12.png",
    content: "/logo.png",
    icon: Tablet,
    aspect: "aspect-[4/3]",
    maxWidth: "max-w-[400px]",
    scale: 0.8,
    contentStyle: "rounded-[12px] scale-[0.82]",
    type: "image"
  },
  {
    id: "iphone",
    name: "iPhone 14 Pro",
    frame: "/frame/iPhone14pro.png",
    content: "/logo.png",
    icon: Smartphone,
    aspect: "aspect-[9/19.5]",
    maxWidth: "max-w-[200px]",
    scale: 0.75,
    contentStyle: "rounded-[178px] scale-[0.93]",
    type: "image"
  },
  {
    id: "watch",
    name: "Apple Watch",
    frame: "/frame/iWatch.png",
    content: "/logo.png",
    icon: Watch,
    aspect: "aspect-[1/1]",
    maxWidth: "max-w-[200px]",
    scale: 0.7,
    contentStyle: "rounded-[32px] scale-[0.78]",
    type: "image"
  },
];

function DeviceCarousel() {
  const [currentDevice, setCurrentDevice] = useState(0);

  const nextDevice = () => {
    setCurrentDevice((prev: number) => (prev + 1) % devices.length);
  };

  const prevDevice = () => {
    setCurrentDevice((prev: number) => (prev - 1 + devices.length) % devices.length);
  };

  const selectDevice = (index: number) => {
    setCurrentDevice(index);
  };

  const currentDeviceConfig = devices[currentDevice];

  return (
    <motion.div
      variants={itemVariants}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Основной контейнер устройства */}
      <div className="relative">
        {/* Анимированная подсветка фона */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 30% 30%, rgba(120,119,198,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 70%, rgba(255,119,198,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 20%, rgba(120,219,255,0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 30%, rgba(120,119,198,0.3) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Контейнер устройства */}
        <div className={`relative mx-auto ${currentDeviceConfig.maxWidth}`}>
          <motion.div
            key={currentDeviceConfig.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`relative ${currentDeviceConfig.aspect} ${currentDeviceConfig.maxWidth} mx-auto`}
          >
            {/* Рамка устройства */}
            <div className="relative w-full h-full">
              <img
                src={currentDeviceConfig.frame}
                alt={currentDeviceConfig.name}
                className="w-full h-full object-contain drop-shadow-2xl"
              />
              
              {/* Контент (логотип) */}
              <div className={`absolute inset-0 flex items-center justify-center ${currentDeviceConfig.contentStyle}`}>
                <img
                  src={currentDeviceConfig.content}
                  alt="Raycon CRM"
                  className="w-full h-full object-contain bg-gradient-to-br from-slate-50 to-slate-100"
                />
                
                {/* Градиент поверх контента */}
                <motion.div
                  className="absolute inset-0 pointer-events-none opacity-10"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)",
                      "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(239,68,68,0.1) 50%, transparent 100%)",
                      "linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
                      "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Навигационные кнопки */}
        <button
          onClick={prevDevice}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextDevice}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Индикаторы устройств */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {devices.map((device, index: number) => (
          <motion.button
            key={device.id}
            onClick={() => selectDevice(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-md border transition-all duration-300 ${
              index === currentDevice
                ? "bg-white/20 border-white/30 text-white shadow-lg"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
            }`}
          >
            <device.icon className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:block">
              {device.name}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Индикатор прогресса */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {devices.map((_, index: number) => (
          <button
            key={index}
            onClick={() => selectDevice(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentDevice
                ? "w-6 bg-white"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Ваш основной компонент ModernHero
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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >
          {/* Левая колонка с контентом */}
          <div className="relative z-20">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 dark:from-teal-400/10 dark:to-cyan-400/10 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 mb-8"
            >
              <Sparkles className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              Новое поколение CRM-систем
              <div className="w-3 h-3 border border-teal-400 dark:border-teal-500 border-dashed rounded-full animate-spin-slow" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl xl:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6"
            >
              {t("hero_title_1")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              {t("hero_title_2")}
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-4 mb-10">
              {bulletPoints.map((item, index: number) => (
                <div key={index} className="flex items-center gap-4 group">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5 items-start"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(true)}
                className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
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

              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 pt-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-6 h-6 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </motion.div>
                {t("hero_trial_note")}
              </div>
            </motion.div>
          </div>

          {/* Правая колонка - Карусель устройств */}
          <DeviceCarousel />
        </motion.div>

        <ModernTryModal open={open} onOpenChange={setOpen} />
      </div>
    </section>
  );
}