"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/providers/I18nProvider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageCircle,
  Send,
  CalendarDays
} from "lucide-react";

export default function ModernTryModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t } = useI18n();
  const [tab, setTab] = useState<"form" | "schedule">("form");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const TabButton = ({ value, icon: Icon, children }: { value: typeof tab, icon: any, children: React.ReactNode }) => (
    <motion.button
      onClick={() => setTab(value)}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
        tab === value
          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25"
          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4" />
      {children}
    </motion.button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-transparent">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Верхний градиентный акцент */}
          <motion.div
            className="h-2 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400"
            initial={{ backgroundPosition: "0% 50%" }}
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />

          {/* Кнопка закрытия */}
          <motion.button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </motion.button>

          <div className="p-6">
            <DialogHeader className="text-center mb-6">
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="flex justify-center mb-3"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                {t("modal_title")}
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 mt-2">
                {tab === "form" ? t("modal_hint_form") : t("modal_hint_schedule")}
              </DialogDescription>
            </DialogHeader>

            {/* Табы */}
            <motion.div
              className="flex gap-3 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TabButton value="form" icon={Send}>
                {t("modal_tab_form")}
              </TabButton>
              <TabButton value="schedule" icon={CalendarDays}>
                {t("modal_tab_schedule")}
              </TabButton>
            </motion.div>

            <AnimatePresence mode="wait">
              {tab === "form" ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder={t("name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder={t("phone")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder={t("date")}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder={t("time")}
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder={t("name")}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder={t("phone")}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <DialogFooter className="mt-6">
              <motion.div 
                className="w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 relative overflow-hidden group"
                  size="lg"
                >
                  {/* Анимированный блеск */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    {tab === "form" ? t("ok") : t("book")}
                    <Send className="w-4 h-4" />
                  </span>
                </Button>
              </motion.div>
            </DialogFooter>
          </div>

          {/* Декоративные элементы */}
          <motion.div
            className="absolute -bottom-4 -left-4 w-20 h-20 bg-teal-400/10 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-400/10 rounded-full blur-xl"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
