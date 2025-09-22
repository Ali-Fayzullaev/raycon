"use client";
import React, { useState } from "react";
import LogoMark from "../branding/LogoMark";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import { useI18n } from "@/providers/I18nProvider";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Rocket,
  PanelsTopLeft,
  Sparkles,
  BadgePercent,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavItem = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="relative inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200 hover:opacity-100"
  >
    <span className="opacity-90 hover:opacity-100 transition-opacity">
      {children}
    </span>
    {/* анимированная подчёркивающая линия */}
    <motion.span
      className="absolute left-0 -bottom-1 h-[2px] bg-[--primary]"
      style={{ ["--primary" as any]: "#007A6E", width: 0 }}
      whileHover={{ width: "100%" }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    />
  </a>
);

export default function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* ЛОГО */}
        <div className="flex items-center gap-3">
          <LogoMark />
        </div>
        {/* НАВИГАЦИЯ — десктоп */}
        <nav className="hidden md:flex items-center gap-7">
          <NavItem href="#product">
            <PanelsTopLeft className="h-4 w-4" /> Продукт
          </NavItem>
          <NavItem href="#features">
            <Sparkles className="h-4 w-4" /> Функции
          </NavItem>
          <NavItem href="#cases">
            <Rocket className="h-4 w-4" /> Кейсы
          </NavItem>
          <NavItem href="#pricing">
            <BadgePercent className="h-4 w-4" /> Тарифы
          </NavItem>
        </nav>

        {/* КНОПКИ / ПЕРЕКЛЮЧАТЕЛИ */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button variant="ghost" className="hidden lg:inline-flex">
            Войти
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="bg-[--primary] text-white shadow-lg shadow-teal-900/10"
              style={{ ["--primary" as any]: "#007A6E" }}
            >
              {t("hero_cta")}
            </Button>
          </motion.div>
        </div>

        {/* Мобильное меню */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden inline-flex items-center p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85%] sm:w-[380px] dark:bg-slate-900 dark:text-slate-100"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <LogoMark />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-6 grid gap-4 text-base">
              <a
                href="#product"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2"
              >
                <PanelsTopLeft className="h-5 w-5" />
                Продукт
              </a>
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2"
              >
                <Sparkles className="h-5 w-5" />
                Функции
              </a>
              <a
                href="#cases"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2"
              >
                <Rocket className="h-5 w-5" />
                Кейсы
              </a>
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2"
              >
                <BadgePercent className="h-5 w-5" />
                Тарифы
              </a>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <div className="mt-6 grid gap-3">
              <Button variant="ghost" className="justify-start">
                Войти
              </Button>
              <Button
                className="bg-[--primary]"
                style={{ ["--primary" as any]: "#007A6E" }}
              >
                {t("hero_cta")}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
