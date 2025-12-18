"use client";
import React, { createContext, useContext, useMemo, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";

interface I18nCtx {
  lang: Lang;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  const value = useMemo<I18nCtx>(
    () => ({
      lang,
      setLang,
      t: (key: string) => dict[lang][key] ?? key,
    }),
    [lang]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) {
    // Возвращаем значения по умолчанию для SSR
    if (typeof window === "undefined") {
      return {
        lang: "ru" as Lang,
        t: (key: string) => key,
        setLang: () => {},
      };
    }
    throw new Error("useI18n must be used within I18nProvider");
  }
  return v;
}
