"use client";
import React, { useState } from "react";
import LogoMark from "../branding/LogoMark";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import { useI18n } from "@/providers/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Rocket,
  PanelsTopLeft,
  Sparkles,
  BadgePercent,
  MessageCircle,
  User,
  ChevronDown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const NavItem = ({
  href,
  children,
  icon: Icon,
}: {
  href: string;
  children: React.ReactNode;
  icon: React.ComponentType<any>;
}) => (
  <motion.a
    href={href}
    className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    <motion.div
      className="p-1.5 rounded-lg bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors"
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
    </motion.div>
    <span className="opacity-90 group-hover:opacity-100 transition-opacity">
      {children}
    </span>
    
    {/* Анимированная подчёркивающая линия */}
    <motion.span
      className="absolute inset-x-3 -bottom-1 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full"
      initial={{ width: 0, opacity: 0 }}
      whileHover={{ width: "calc(100% - 24px)", opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
    
    {/* Свечение при наведении */}
    <motion.div
      className="absolute inset-0 rounded-lg bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
      whileHover={{ scale: 1.05 }}
    />
  </motion.a>
);

export default function ModernHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Эффект для отслеживания скролла
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#product", icon: PanelsTopLeft, label: "Продукт" },
    { href: "#features", icon: Sparkles, label: "Функции" },
    { href: "#cases", icon: Rocket, label: "Кейсы" },
    { href: "#pricing", icon: BadgePercent, label: "Тарифы" },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`mx-auto max-w-7xl px-4 py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
        animate={{
          boxShadow: isScrolled
            ? "0 4px 20px rgba(0, 122, 110, 0.1)"
            : "none"
        }}
      >
        {/* ЛОГО */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
          >
            <Image
              src="/img/favicon.svg"
              width={40}
              height={40}
              alt="Raycon CRM"
            />
          </motion.div>
        </motion.div>

        {/* НАВИГАЦИЯ — десктоп */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <NavItem href={item.href} icon={item.icon}>
                {item.label}
              </NavItem>
            </motion.div>
          ))}
        </nav>

        {/* КНОПКИ / ПЕРЕКЛЮЧАТЕЛИ */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <LanguageSwitcher />
          <ThemeToggle />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className="hidden lg:inline-flex gap-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400"
            >
              <User className="h-4 w-4" />
              Войти
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Анимированный блеск */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <span className="relative flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {t("hero_cta")}
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Мобильное меню */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <motion.button
              className="md:hidden inline-flex items-center p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Menu className="h-5 w-5" />
            </motion.button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[85%] sm:w-[380px] dark:bg-slate-900 dark:text-slate-100 border-l border-slate-200 dark:border-slate-700"
          >
            <SheetHeader>
              <SheetTitle className="flex items-center gap-3">
                <Image
                  src="/img/favicon.svg"
                  alt="Raycon"
                  width={30}
                  height={30}
                />
                <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  Raycon CRM
                </span>
              </SheetTitle>
            </SheetHeader>
            
            <div className="mt-8 space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 rounded-lg bg-teal-500/10 group-hover:bg-teal-500/20 transition-colors">
                    <item.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  <ChevronDown className="h-4 w-4 ml-auto transform rotate-270 text-slate-400" />
                </motion.a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center gap-4 mb-6">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2 border-slate-300 dark:border-slate-600"
                >
                  <User className="h-4 w-4" />
                  Войти
                </Button>
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("hero_cta")}
                  </Button>
                </motion.div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </motion.header>
  );
}