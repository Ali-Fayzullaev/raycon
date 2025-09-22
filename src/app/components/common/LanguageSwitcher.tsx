"use client";
import React from "react";
import { useI18n } from "@/providers/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Languages, Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: "ru", label: t("lang_ru"), flag: "🇷🇺" },
    { code: "kk", label: t("lang_kk"), flag: "🇰🇿" }
  ];

  const currentLang = languages.find(l => l.code === lang);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Globe className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </motion.div>
        
        <motion.span
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {currentLang?.flag} {currentLang?.label}
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
          >
            <div className="p-2 space-y-1">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => {
                    setLang(language.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                    lang === language.code
                      ? "bg-teal-500/10 text-teal-700 dark:text-teal-300"
                      : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-base">{language.flag}</span>
                  <span className="font-medium">{language.label}</span>
                  
                  {lang === language.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto w-2 h-2 rounded-full bg-teal-500"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Декоративный элемент */}
            <motion.div
              className="absolute -top-1 right-4 w-2 h-2 bg-white dark:bg-slate-800 rotate-45 border-t border-l border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Затемнение фона при открытом меню */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}