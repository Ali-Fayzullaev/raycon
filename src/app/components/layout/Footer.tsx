"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  Instagram,
  Mail,
  Phone,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Shield,
  Globe,
  Star,
  CheckCircle2,
  MapPin,
  Clock,
} from "lucide-react";
import LanguageSwitcher from "../common/LanguageSwitcher";
import ThemeToggle from "../common/ThemeToggle";
import { Button } from "@/components/ui/button";

const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.1 * i },
  }),
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut" },
  },
};

export default function PremiumFooter() {
  const { t } = useI18n();

  const navigation = [
    { name: t("footer_nav_product"), href: "#product" },
    { name: t("footer_nav_features"), href: "#features" },
    { name: t("footer_nav_cases"), href: "#cases" },
    { name: t("footer_nav_pricing"), href: "#pricing" },
    { name: t("footer_nav_faq"), href: "#faq" },
  ];

  const contacts = [
    { icon: Phone, label: t("footer_contact_sales"), value: "+7 707 846 99 99", href: "tel:+77078469999" },
    { icon: HeartHandshake, label: t("footer_contact_support"), value: "+7 707 846 55 55", href: "tel:+77078465555" },
    { icon: Mail, label: t("footer_contact_email"), value: "support@raycon.kz", href: "mailto:support@raycon.kz" },
    { icon: MapPin, label: t("footer_contact_location"), value: "Казахстан, г. Алматы", href: "#" },
  ];

  const features = [
    { icon: CheckCircle2, text: t("footer_feature_quick") },
    { icon: Shield, text: t("footer_feature_secure") },
    { icon: Clock, text: t("footer_feature_support") },
    { icon: Star, text: t("footer_feature_fast") },
  ];

  return (
    <footer className="relative border-t overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50/60 dark:from-slate-950 dark:via-slate-950 dark:to-teal-950/20">
      {/* Верхняя тонкая фирменная линия */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#007A6E] via-[#19B69F] to-[#007A6E]" />

      {/* Деликатный анимированный фон — зелёные акценты */}
      <div className="absolute inset-0 pointer-events-none">
        {/* мягкие пятна */}
        <motion.div
          className="absolute inset-0 opacity-15"
          style={{
            background: `
              radial-gradient(40% 35% at 12% 82%, rgba(0,122,110,0.18) 0%, transparent 60%),
              radial-gradient(36% 32% at 88% 18%, rgba(51,202,183,0.14) 0%, transparent 60%)
            `,
          }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        {/* частицы */}
        {[...Array(14)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-teal-400/25 dark:bg-emerald-400/30"
            style={{ left: `${8 + i * 6}%`, top: `${18 + (i % 5) * 16}%` }}
            animate={{ y: [0, -18, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + (i % 2), repeat: Infinity, delay: i * 0.25 }}
          />
        ))}
      </div>

      {/* Контент */}
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid lg:grid-cols-4 gap-8"
        >
          {/* Бренд */}
          <motion.div variants={fade} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#007A6E] to-[#19B69F] flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-slate-900 to-teal-900 dark:from-white dark:to-emerald-300 bg-clip-text text-transparent">
                  Raycon
                </div>
                <div className="text-teal-700 dark:text-emerald-300 text-sm font-semibold">
                  {t("footer_tagline")}
                </div>
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {t("footer_description")}
            </p>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com/raycon.kz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md rounded-xl px-4 py-3 border border-emerald-200/60 dark:border-white/10 hover:border-emerald-300/60 hover:shadow-md transition-all duration-300 group w-fit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Instagram className="w-5 h-5 text-emerald-500" />
              <div className="flex-1">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">Instagram</div>
                <div className="text-xs text-slate-500">@raycon.kz</div>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          </motion.div>

          {/* Навигация */}
          <motion.nav variants={fade} custom={1} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
              {t("footer_navigation")}
            </h3>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <motion.li key={item.name} whileHover={{ x: 5 }}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all duration-300 group py-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#007A6E] to-[#19B69F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium">{item.name}</span>
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-emerald-500" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>

          {/* Контакты */}
          <motion.div variants={fade} custom={2} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-slate-900 dark:text-white">
              {t("footer_contacts")}
            </h3>
            <div className="space-y-4">
              {contacts.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  className="flex items-start gap-4 p-3 rounded-xl bg-white/80 dark:bg-white/[0.04] backdrop-blur-md border border-emerald-200/60 dark:border-white/10 hover:border-emerald-300/70 hover:shadow-md transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/10 to-emerald-500/10 flex items-center justify-center border border-emerald-400/30 group-hover:border-emerald-400/50">
                    <c.icon className="w-5 h-5 text-teal-700 dark:text-emerald-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-500 dark:text-slate-400">{c.label}</div>
                    <div className="text-slate-900 dark:text-white font-medium">{c.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* Переключатели */}
              <div className="flex items-center gap-3 mt-6 p-3 bg-white/70 dark:bg-white/[0.04] rounded-xl border border-emerald-200/60 dark:border-white/10 w-fit">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>

          {/* CTA в футере */}
          <motion.div variants={fade} custom={3} className="lg:col-span-1">
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/70 dark:from-white/[0.04] dark:to-white/[0.02] backdrop-blur-md rounded-2xl p-6 border border-emerald-200/60 dark:border-white/10 shadow">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-teal-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t("footer_cta_title")}
                  </h3>
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm mb-4">
                  {t("footer_cta_description")}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-teal-800 dark:text-emerald-300 font-medium">
                      <f.icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{f.text}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full text-white font-semibold py-3 rounded-xl shadow-lg hover:opacity-95 transition-all duration-300 group"
                  style={{ background: "linear-gradient(90deg, #007A6E 0%, #19B69F 100%)" }}
                >
                  <span className="flex items-center gap-2 justify-center">
                    {t("footer_cta_button")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Низ: гарантии + копирайт */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-emerald-200/60 dark:border-white/10"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 text-sm">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md rounded-full px-3 py-1 border border-emerald-200/60 dark:border-white/10">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span>{t("footer_guarantee_security")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg_white/[0.04] backdrop-blur-md rounded-full px-3 py-1 border border-emerald-200/60 dark:border-white/10">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>{t("footer_guarantee_availability")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-white/[0.04] backdrop-blur-md rounded-full px-3 py-1 border border-emerald-200/60 dark:border-white/10">
                <Star className="w-4 h-4 text-emerald-600" />
                <span>{t("footer_guarantee_quality")}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-600 dark:text-slate-400 text-sm">
              <span>© 2025 Raycon CRM. {t("footer_rights")}</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t("footer_privacy")}
                </a>
                <span>•</span>
                <a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                  {t("footer_terms")}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Нижний бегущий блик — фирменный зелёный */}
      <div className="relative h-1">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </footer>
  );
}