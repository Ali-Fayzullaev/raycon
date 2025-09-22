"use client";
import React from "react";
import { useI18n } from "@/providers/I18nProvider";

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="flex items-center gap-2 text-xs">
      <button
        onClick={() => setLang("ru")}
        className={`px-2 py-1 rounded ${
          lang === "ru"
            ? "bg-slate-200 dark:bg-slate-700"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        {t("lang_ru")}
      </button>
      <button
        onClick={() => setLang("kk")}
        className={`px-2 py-1 rounded ${
          lang === "kk"
            ? "bg-slate-200 dark:bg-slate-700"
            : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        {t("lang_kk")}
      </button>
    </div>
  );
}
