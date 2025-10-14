// src/app/components/common/ThemeToggle.tsx
"use client";
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useI18n } from "@/providers/I18nProvider";
import { motion } from "framer-motion";
import { Sun, Moon, Palette } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();

  return (
    <motion.button
      onClick={toggle}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      title={theme === "dark" ? t("theme_light") : t("theme_dark")}
    >
      {/* Анимированная иконка */}
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative w-5 h-5"
      >
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === "dark" ? 0 : 1,
            scale: theme === "dark" ? 0.5 : 1
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Sun className="w-5 h-5 text-amber-500" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ 
            opacity: theme === "dark" ? 1 : 0,
            scale: theme === "dark" ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Moon className="w-5 h-5 text-indigo-400" />
        </motion.div>
      </motion.div>

      {/* Акцентная точка */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Тултип при наведении */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {theme === "dark" ? t("theme_light") : t("theme_dark")}
      </div>
    </motion.button>
  );
}