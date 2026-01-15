// src/app/components/sections/Hero.tsx
"use client";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
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
  Users,
  BarChart3,
  Settings,
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
    frame: "/frame/iMac1.png",
    icon: Monitor,
    aspect: "aspect-[16/10]",
    maxWidth: "max-w-[1000px]",
    scale: 0.9,
    contentStyle: "rounded-[0px] mb-23",
    type: "image",
  },
  {
    id: "macbook",
    name: "MacBook",
    frame: "/frame/MacBookPro1.png",
    icon: Laptop,
    aspect: "aspect-[16/10]",
    maxWidth: "max-w-[1000px]",
    scale: 0.85,
    contentStyle: "rounded-[0px] scale-[0.76]",
    type: "image",
  },
  {
    id: "ipad",
    name: "iPad Pro",
    frame: "/frame/iPadpro.png",
    icon: Tablet,
    aspect: "aspect-[14/10]",
    maxWidth: "max-w-[1000px]",
    scale: 0.8,
    contentStyle: "rounded-[10px]",
    type: "image",
  },
  {
    id: "phone",
    name: "Mobile",
    frame: "/frame/phone1.png",
    icon: Tablet,
    aspect: "aspect-[14/10]",
    maxWidth: "max-w-[1000px]",
    scale: 0.8,
    contentStyle: "rounded-[10px]",
    type: "image",
  },
];

function DeviceCarousel() {
  const [currentDevice, setCurrentDevice] = useState(0);

  const nextDevice = () => {
    setCurrentDevice((prev: number) => (prev + 1) % devices.length);
  };

  const prevDevice = () => {
    setCurrentDevice(
      (prev: number) => (prev - 1 + devices.length) % devices.length
    );
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
          className="absolute inset-0 pointer-events-none opacity-10"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)",
              "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(239,68,68,0.1) 50%, transparent 100%)",
              "linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(34,197,94,0.1) 50%, transparent 100%)",
              "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
            <div className="relative flex items-center justify-center w-full h-full">
              <Image
                src={currentDeviceConfig.frame}
                alt={currentDeviceConfig.name}
                width={600}
                height={400}
                className={`w-full h-full object-contain drop-shadow-2xl`}
              />
            </div>
          </motion.div>
        </div>

        {/* Навигационные кнопки */}
        <button
          onClick={prevDevice}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border-gray-100 backdrop-blur-md border  rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg z-20"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>

        <button
          onClick={nextDevice}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border-gray-100 backdrop-blur-md border rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg z-20"
        >
          <ChevronRight className="w-6 h-6 text-black" />
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
            className={`flex items-center gap-2 px-4 py-3 border-2 border-gray-600 text-gray-700 rounded-xl backdrop-blur-md transition-all duration-300 ${
              index === currentDevice
                ? "bg-white/20  text-green-300 shadow-lg border-green-300 border-2"
                : "border-2 border-gray-600 text-gray-700  backdrop-blur-md   hover:bg-white/10"
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

  // Функция для прокрутки к блоку с информацией о мультичате
  const scrollToMultichatInfo = () => {
    const element = document.getElementById("multichat-info");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });

      // Запускаем событие для активации выделения текста в Pricing компоненте
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("multichat-highlight"));
      }, 500); // Небольшая задержка для завершения прокрутки
    }
  };

  const bulletPoints = [
    { icon: Bot, text: t("hero_bul_1"), color: "from-blue-500 to-cyan-500" },
    { icon: Zap, text: t("hero_bul_2"), color: "from-amber-500 to-orange-500" },
    {
      icon: MessageCircle,
      text: t("hero_bul_3"),
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Settings,
      text: t("hero_bul_4"),
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: BarChart3,
      text: t("hero_bul_5"),
      color: "from-blue-500 to-purple-500",
    },
    {
      icon: Users,
      text: t("hero_bul_6"),
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      id="home"
    >
      <AnimatedBackground />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 mt-5">
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
              {t("hero_badge_text")}
              <div className="w-3 h-3 border border-teal-400 dark:border-teal-500 border-dashed rounded-full animate-spin-slow" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl md:text-3xl xl:text-4xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white mb-6"
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
              {bulletPoints.map((item, index: number) => {
                const isMultichatItem = item.text === t("hero_bul_2");
                const ItemComponent = isMultichatItem ? "button" : "div";

                return (
                  <ItemComponent
                    key={index}
                    onClick={
                      isMultichatItem ? scrollToMultichatInfo : undefined
                    }
                    className={`flex items-center gap-4 group ${
                      isMultichatItem
                        ? "cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg  transition-all"
                        : ""
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {isMultichatItem ? (
                        <>
                          <span className="text-teal-600 dark:text-teal-400 hover:underline">
                            Мультичат
                          </span>
                          {item.text.replace("Мультичат", "")}
                        </>
                      ) : (
                        item.text
                      )}
                    </span>
                  </ItemComponent>
                );
              })}
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
                <span className="relative   flex items-center">
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
               <a
                href="https://chat.raycon.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mb-4 flex items-center gap-2"
              >
                Мультичат
                <ArrowRight className="w-5 h-5" />
              </a>
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
