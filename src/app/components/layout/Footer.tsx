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
  Zap,
  Sparkles,
  MessageCircle,
  Rocket,
  Shield,
  Globe,
  Star,
  CheckCircle2,
  MapPin,
  Clock
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
    transition: {
      staggerChildren: 0.1,
      ease: "easeOut"
    }
  }
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
    { 
      icon: Phone, 
      label: t("footer_contact_sales"), 
      value: "+7 707 846 99 99",
      href: "tel:+77078469999"
    },
    { 
      icon: HeartHandshake, 
      label: t("footer_contact_support"), 
      value: "+7 707 846 55 55",
      href: "tel:+77078465555"
    },
    { 
      icon: Mail, 
      label: t("footer_contact_email"), 
      value: "support@raycon.kz",
      href: "mailto:support@raycon.kz"
    },
    { 
      icon: MapPin, 
      label: t("footer_contact_location"), 
      value: "Казахстан, г. Алматы",
      href: "#"
    },
  ];

  const features = [
    { icon: Zap, text: t("footer_feature_quick") },
    { icon: Shield, text: t("footer_feature_secure") },
    { icon: Rocket, text: t("footer_feature_fast") },
    { icon: Clock, text: t("footer_feature_support") },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/raycon.kz",
      color: "text-pink-500"
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-t border-blue-200/60 overflow-hidden">
      {/* Верхний градиентный акцент - СИНИЙ */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400" />
      
      {/* Анимированный фон с частицами - СИНИЕ */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/20"
            style={{
              left: `${10 + i * 6}%`,
              top: `${20 + (i % 5) * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 2),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Световые градиенты - СИНИЕ */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Основное содержимое */}
      <div className="relative mx-auto max-w-7xl px-4 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid lg:grid-cols-4 gap-8"
        >
          {/* Бренд и описание */}
          <motion.div variants={fade} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                  Raycon
                </div>
                <div className="text-blue-600 text-sm font-semibold">
                  {t("footer_tagline")}
                </div>
              </div>
            </div>

            <p className="text-slate-600 leading-relaxed mb-6">
              {t("footer_description")}
            </p>

            {/* Соцсети */}
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-xl px-4 py-3 border border-blue-200/60 hover:border-blue-300/50 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <social.icon className={`w-5 h-5 ${social.color}`} />
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-slate-900">{social.name}</div>
                    <div className="text-xs text-slate-500">@{social.name.toLowerCase()}.raycon</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Навигация */}
          <motion.div variants={fade} custom={1} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-slate-900">
              {t("footer_navigation")}
            </h3>
            <ul className="space-y-3">
              {navigation.map((item, index) => (
                <motion.li key={item.name} whileHover={{ x: 5 }}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-all duration-300 group py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium">{item.name}</span>
                    <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 text-blue-500" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Контакты */}
          <motion.div variants={fade} custom={2} className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-slate-900">
              {t("footer_contacts")}
            </h3>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-start gap-4 p-3 rounded-xl bg-white/80 backdrop-blur-md border border-blue-200/60 hover:border-blue-300/50 hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ y: -2 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40">
                    <contact.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-slate-500">{contact.label}</div>
                    <div className="text-slate-900 font-medium">{contact.value}</div>
                  </div>
                </motion.a>
              ))}
              
              {/* Переключатели */}
              <div className="flex items-center gap-3 mt-6 p-3 bg-white/60 rounded-xl border border-blue-200/50">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>

          {/* CTA блок */}
          <motion.div variants={fade} custom={3} className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-md rounded-2xl p-6 border border-blue-200/60 shadow-lg relative overflow-hidden">
              {/* Декоративные элементы */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-slate-900">{t("footer_cta_title")}</h3>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">
                  {t("footer_cta_description")}
                </p>

                {/* Особенности */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-blue-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <span className="flex items-center gap-2 justify-center">
                    {t("footer_cta_button")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Дополнительная информация */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-blue-200/50"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Гарантии */}
            <div className="flex flex-wrap items-center gap-6 text-slate-500 text-sm">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1 border border-blue-200/50">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>{t("footer_guarantee_security")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1 border border-blue-200/50">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>{t("footer_guarantee_availability")}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full px-3 py-1 border border-blue-200/50">
                <Star className="w-4 h-4 text-blue-600" />
                <span>{t("footer_guarantee_quality")}</span>
              </div>
            </div>
            
            {/* Копирайт и ссылки */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-slate-500 text-sm">
              <span>© 2025 Raycon CRM. {t("footer_rights")}</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-blue-600 transition-colors">{t("footer_privacy")}</a>
                <span>•</span>
                <a href="#" className="hover:text-blue-600 transition-colors">{t("footer_terms")}</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Нижний анимированный акцент - СИНИЙ */}
      <div className="relative h-1">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </footer>
  );
}