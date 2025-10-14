"use client";
import React, { useState } from "react";
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
  Phone, // Новый импорт
  Mail,
  Instagram, // Новый импорт
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import ModernTryModal from "../modals/TryModal";
import Link from "next/link";
import SITE from "@/lib/site"; // Импорт констант сайта

// --- Новые импорты для Dropdown Menu (предполагаем, что они доступны) ---
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
// ------------------------------------------------------------------------

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

// --- НОВЫЙ КОМПОНЕНТ: Dropdown для контактов ---
const ContactDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <motion.div
        className="cursor-pointer"
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          className="rounded-full px-4 py-2 text-sm font-medium bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group"
        >
          <Phone className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
          Контакты
          <ChevronDown className="ml-1 h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </motion.div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 dark:bg-slate-800 dark:border-slate-700 shadow-xl rounded-xl p-2 z-[60]">
      {/* Отдел продаж */}
      <DropdownMenuItem asChild>
        <a
          href={SITE.contacts.sales.tel}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-500/10 transition-colors"
        >
          <Phone className="h-4 w-4 text-teal-600 dark:text-teal-400" />
          <div>
            <p className="text-sm font-medium">{SITE.contacts.sales.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {SITE.contacts.sales.phone}
            </p>
          </div>
        </a>
      </DropdownMenuItem>

      {/* Поддержка */}
      <DropdownMenuItem asChild>
        <a
          href={SITE.contacts.support.tel}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-500/10 transition-colors"
        >
          <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-sm font-medium">{SITE.contacts.support.label}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {SITE.contacts.support.phone}
            </p>
          </div>
        </a>
      </DropdownMenuItem>

      <DropdownMenuSeparator className="dark:bg-slate-700" />

      {/* Email */}
      <DropdownMenuItem asChild>
        <a
          href={SITE.email}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-500/10 transition-colors"
        >
          <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <p className="text-sm font-medium">Email</p>
        </a>
      </DropdownMenuItem>

      {/* WhatsApp */}
      <DropdownMenuItem asChild>
        <a
          href={SITE.whatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-500/10 transition-colors"
        >
          {/* Заменяем на более подходящий значок для WhatsApp, если доступен. Пока используем Rocket, чтобы избежать ошибки импорта. Лучше использовать значок WhatsApp. */}
          <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <p className="text-sm font-medium">WhatsApp</p>
        </a>
      </DropdownMenuItem>

      {/* Instagram (Лучше использовать значок Instagram/Camera. Пока используем Sparkles.) */}
      <DropdownMenuItem asChild>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-500/10 transition-colors"
        >
          <Instagram className="h-4 w-4 text-fuchsia-600 dark:text-fuchsia-400" />
          <p className="text-sm font-medium">Instagram</p>
        </a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
// ---------------------------------------------------

export default function ModernHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
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

  // Массив контактов для мобильного меню
  const mobileContacts = [
    {
      href: SITE.contacts.sales.tel,
      icon: Phone,
      label: SITE.contacts.sales.label,
      subLabel: SITE.contacts.sales.phone,
      color: "text-teal-600 dark:text-teal-400",
    },
    {
      href: SITE.contacts.support.tel,
      icon: Phone,
      label: SITE.contacts.support.label,
      subLabel: SITE.contacts.support.phone,
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      href: SITE.email,
      icon: Mail,
      label: "Email",
      subLabel: "info@yourdomain.com",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      href: SITE.whatsApp,
      icon: MessageCircle,
      label: "WhatsApp",
      subLabel: "Напишите нам",
      color: "text-green-600 dark:text-green-400",
    },
    {
      href: SITE.instagram,
      icon: Sparkles, // В идеале иконка Instagram
      label: "Instagram",
      subLabel: "@raycon.kz",
      color: "text-fuchsia-600 dark:text-fuchsia-400",
    },
  ];

  return (
    <motion.header
      className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 transition-all duration-300"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`w-full  mx-auto px-4 md:px-6 py-3 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? "py-2" : "py-3"
        }`}
        animate={{
          boxShadow: isScrolled ? "0 4px 20px rgba(0, 122, 110, 0.1)" : "none",
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
          {/* НОВЫЙ КОМПОНЕНТ КОНТАКТОВ */}
          <ContactDropdown />
          {/* --------------------------- */}

          <LanguageSwitcher />
          <ThemeToggle />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="https://web.raycon.kz/ru/login"
              className="hidden lg:inline-flex gap-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 border border-slate-300 dark:border-slate-700 rounded-2xl transition-colors duration-200"
            >
              <Button
                variant="ghost"
                className="hidden lg:inline-flex gap-2 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 rounded-2xl"
              >
                <User className="h-4 w-4" />
                Войти
              </Button>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenModal(true)}
          >
            <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 group relative overflow-hidden">
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
            className="w-[85%] sm:w-[380px] overflow-y-auto overflow-x-hidden pb-5  dark:bg-slate-900 dark:text-slate-100 border-l border-slate-200 dark:border-slate-700"
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

            {/* Основная навигация */}
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
                  <ChevronDown className="h-4 w-4 ml-auto transform -rotate-90 text-slate-400" />
                </motion.a>
              ))}
            </div>

            {/* НОВЫЙ БЛОК КОНТАКТОВ В МОБИЛЬНОМ МЕНЮ */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-4 mb-3">
                Свяжитесь с нами
              </h3>
              <div className="space-y-1">
                {mobileContacts.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    target={contact.label === "Email" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-2 px-4 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                    whileHover={{ x: 3 }}
                  >
                    <div
                      className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 transition-colors`}
                    >
                      <contact.icon className={`h-5 w-5 ${contact.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{contact.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {contact.subLabel}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
            {/* КОНЕЦ НОВОГО БЛОКА КОНТАКТОВ */}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center gap-4 mb-6">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              <div className="space-y-3 mx-3">
                <Link
                  href="https://web.raycon.kz/ru/login"
                  className="w-full justify-center gap-2"
                >
                  <Button
                    variant="outline"
                    className="w-full justify-center gap-2 border-slate-300 dark:border-slate-600 hover:border-teal-400 dark:hover:border-teal-400 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Войти
                  </Button>
                </Link>

                <motion.div
                  className="mt-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOpenModal(true);
                    setOpen(false); // Закрыть мобильное меню при открытии модала
                  }}
                >
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t("hero_cta")}
                  </Button>
                </motion.div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
      <ModernTryModal open={openModal} onOpenChange={setOpenModal} />
    </motion.header>
  );
}
