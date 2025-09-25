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

export default function PremiumFAQ() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      q: t("faq_q1"),
      a: t("faq_a1"),
      category: "implementation",
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

  const [activeCategory, setActiveCategory] = useState("all");

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
    <section  id="faq" className="relative py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {FLOATING_POSITIONS.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-teal-400/30 to-emerald-400/20"
          style={position}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
      <div className="relative mx-auto max-w-4xl px-4">
        {/* Заголовок */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            variants={fade}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/15 to-emerald-500/15 dark:from-teal-500/10 dark:to-emerald-500/10 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-6"
          >
            <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            {t("faq_badge")}
          </motion.div>

          <motion.h2
            variants={fade}
            className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent mb-6"
          >
            {t("faq_title")}
          </motion.h2>

          <motion.p
            variants={fade}
            custom={1}
            className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t("faq_subtitle")}
          </motion.p>
        </motion.div>
        {/* Аккордеон */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg overflow-hidden">
            <AnimatePresence mode="wait">
              {filteredItems.length > 0 ? (
                <Accordion
                  type="single"
                  collapsible
                  className="divide-y divide-slate-200/30 dark:divide-slate-700/30"
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
                  className="text-center py-16 px-8"
                >
                  <HelpCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    {t("faq_no_results")}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500">
                    {t("faq_no_results_desc")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA секция */}
        <motion.div
          variants={fade}
          custom={4}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl p-8 backdrop-blur-md border border-teal-200/30 dark:border-teal-500/20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {t("faq_cta_title")}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              {t("faq_cta_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t("faq_cta_chat")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-3 rounded-xl border-slate-300 dark:border-slate-600 hover:bg-white/50 dark:hover:bg-slate-700/50"
              >
                <Mail className="w-4 h-4 mr-2" />
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
        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors duration-300 group-data-[state=open]:bg-white/30 dark:group-data-[state=open]:bg-slate-700/20">
          <div className="flex w-full items-center gap-4 text-left">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center">
              <HelpCircle className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white text-left leading-relaxed group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {item.q}
              </h3>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 pb-5">
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed pl-12">
            {item.a}
          </div>
        </AccordionContent>
      </motion.div>
    </AccordionItem>
  );
}
