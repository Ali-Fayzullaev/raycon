"use client";
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useI18n } from "@/providers/I18nProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button
      onClick={toggle}
      className="text-xs px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? t("theme_light") : t("theme_dark")}
    </button>
  );
}
