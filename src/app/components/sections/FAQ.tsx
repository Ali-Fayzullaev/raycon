"use client";
import React, { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useI18n } from "@/providers/I18nProvider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Mail,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
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
      ease: "easeOut",
    },
  },
};

const pulse: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function PremiumFAQ() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      q: t("faq_q1"),
      a: t("faq_a1"),
      category: "implementation",
      featured: true,
    },
    {
      q: t("faq_q2"),
      a: t("faq_a2"),
      category: "technical",
    },
    {
      q: t("faq_q3"),
      a: t("faq_a3"),
      category: "features",
      featured: true,
    },
    {
      q: t("faq_q4"),
      a: t("faq_a4"),
      category: "integration",
    },
    {
      q: t("faq_q5"),
      a: t("faq_a5"),
      category: "pricing",
      featured: true,
    },
    {
      q: t("faq_q6"),
      a: t("faq_a6"),
      category: "security",
    },
    {
      q: t("faq_q7"),
      a: t("faq_a7"),
      category: "trial",
      featured: true,
    },
    {
      q: t("faq_q8"),
      a: t("faq_a8"),
      category: "support",
    },
    {
      q: t("faq_q9"),
      a: t("faq_a9"),
      category: "updates",
    },
    {
      q: t("faq_q10"),
      a: t("faq_a10"),
      category: "customization",
    },
    {
      q: t("faq_q11"),
      a: t("faq_a11"),
      category: "customization",
    },
    {
      q: t("faq_q12"),
      a: t("faq_a12"),
      category: "customization",
    },
    {
      q: t("faq_q13"),
      a: t("faq_a13"),
      category: "customization",
    },
  ];

  const FLOATING_POSITIONS = [
    { left: "10%", top: "20%" },
    { left: "85%", top: "30%" },
    { left: "15%", top: "70%" },
    { left: "90%", top: "60%" },
    { left: "50%", top: "15%" },
    { left: "25%", top: "40%" },
    { left: "75%", top: "80%" },
    { left: "40%", top: "25%" },
    { left: "60%", top: "65%" },
    { left: "20%", top: "85%" },
    { left: "80%", top: "45%" },
    { left: "35%", top: "55%" },
  ];

  const [activeCategory] = useState("all");

  // Фильтрация по поиску и категории
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Улучшенный анимированный фон */}
      {FLOATING_POSITIONS.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-teal-400/40 to-emerald-400/30 backdrop-blur-sm"
          style={position}
          animate={{
            y: [0, -40, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.9, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6 + (i % 4),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Добавляем сияющие элементы */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-300/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-emerald-300/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Заголовок с улучшенной анимацией */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={pulse}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 dark:from-teal-500/15 dark:to-emerald-500/15 backdrop-blur-lg border border-teal-200/40 dark:border-teal-500/30 rounded-2xl px-6 py-3 text-base font-semibold text-slate-700 dark:text-slate-300 mb-8 shadow-lg shadow-teal-500/10"
          >
            <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            {t("faq_badge")}
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-8 leading-tight"
          >
            {t("faq_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t("faq_subtitle")}
          </motion.p>
        </motion.div>
        
        {/* Аккордеон с улучшенным дизайном */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12"
        >
          <div className="bg-white/90 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl border-2 border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-200/30 dark:shadow-slate-900/30 overflow-hidden">
            <AnimatePresence mode="wait">
              {filteredItems.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="divide-y divide-slate-200/40 dark:divide-slate-700/40"
                >
                  {filteredItems.map((item, i) => (
                    <FAQItem key={i} item={item} index={i} />
                  ))}
                </Accordion>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20 px-8"
                >
                  <HelpCircle className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-slate-600 dark:text-slate-400 mb-4">
                    {t("faq_no_results")}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500 text-lg">
                    {t("faq_no_results_desc")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA секция с улучшенным дизайном */}
        <motion.div
          variants={fade}
          custom={4}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-teal-500/15 to-emerald-500/15 rounded-3xl p-12 backdrop-blur-2xl border-2 border-teal-200/40 dark:border-teal-500/30 relative overflow-hidden">
            {/* Декоративные элементы */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl"></div>
            
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 relative z-10">
              {t("faq_cta_title")}
            </h3>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
              {t("faq_cta_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-10 py-6 rounded-2xl shadow-2xl shadow-teal-500/30 hover:shadow-3xl hover:shadow-teal-500/40 transition-all duration-500 group text-lg font-semibold">
                <MessageCircle className="w-6 h-6 mr-3" />
                {t("faq_cta_chat")}
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                className="px-10 py-6 rounded-2xl border-2 border-slate-300 dark:border-slate-600 hover:bg-white/60 dark:hover:bg-slate-700/60 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-500 text-lg font-semibold backdrop-blur-sm"
              >
                <Mail className="w-6 h-6 mr-3" />
                {t("faq_cta_email")}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ item, index }: { item: any; index: number }) {
  return (
    <AccordionItem value={`item-${index}`} className="border-0">
      <motion.div variants={fade} className="group">
        <AccordionTrigger className="px-8 py-7 hover:no-underline hover:bg-slate-50/70 dark:hover:bg-slate-700/40 transition-all duration-500 group-data-[state=open]:bg-white/40 dark:group-data-[state=open]:bg-slate-700/30 group-data-[state=open]:shadow-inner">
          <div className="flex w-full items-center gap-6 text-left">
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-all duration-300">
              {item.featured ? (
                <Star className="w-6 h-6 text-white fill-white" />
              ) : (
                <HelpCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white text-left leading-relaxed group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors duration-300">
                  {item.q}
                </h3>
                {item.featured && (
                  <span className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/20">
                    <Star className="w-3 h-3 fill-amber-500" />
                    Важно
                  </span>
                )}
              </div>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-8 pb-7">
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed pl-18 text-lg font-light">
            {item.a}
          </div>
        </AccordionContent>
      </motion.div>
    </AccordionItem>
  );
}