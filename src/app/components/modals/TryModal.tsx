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
  CalendarDays,
  Loader2,
  CheckCircle2,
  AlertCircle
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Функция для форматирования номера телефона в реальном времени
  const formatPhoneInput = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, '');
    
    // Форматируем ввод
    if (cleaned.length <= 1) return `+7 ${cleaned}`;
    if (cleaned.length <= 4) return `+7 ${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    return `+7 ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  // Функция для получения минимальной даты (сегодня)
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Функция проверки даты
  const validateDate = (selectedDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    return selected >= today;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate && !validateDate(selectedDate)) {
      setErrorMessage("Нельзя выбрать прошедшую дату");
    } else {
      setErrorMessage("");
    }
    setDate(selectedDate);
  };

  const handleSubmit = async () => {
    // Сбрасываем статус
    setSubmitStatus("idle");
    setErrorMessage("");

    // Базовая валидация
    if (!name.trim()) {
      setErrorMessage("Введите ваше имя");
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 11) {
      setErrorMessage("Введите корректный номер телефона");
      return;
    }

    if (tab === "schedule") {
      if (!date) {
        setErrorMessage("Выберите дату созвона");
        return;
      }
      if (!time) {
        setErrorMessage("Выберите время созвона");
        return;
      }
      if (!validateDate(date)) {
        setErrorMessage("Нельзя выбрать прошедшую дату");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: tab,
          name: name.trim(),
          phone: phone.trim(),
          date: tab === 'schedule' ? date : undefined,
          time: tab === 'schedule' ? time : undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Очищаем форму после успешной отправки
        setTimeout(() => {
          setName("");
          setPhone("");
          setDate("");
          setTime("");
          setSubmitStatus("idle");
          onOpenChange(false);
        }, 2000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.message || "Произошла ошибка при отправке");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Ошибка сети. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const TabButton = ({ value, icon: Icon, children }: { value: typeof tab, icon: any, children: React.ReactNode }) => (
    <motion.button
      onClick={() => {
        setTab(value);
        setErrorMessage("");
        setSubmitStatus("idle");
      }}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
        tab === value
          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25"
          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
      }`}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      disabled={isSubmitting}
    >
      <Icon className="w-4 h-4" />
      {children}
    </motion.button>
  );

  return (
    <Dialog open={open} onOpenChange={(v) => {
      if (!isSubmitting) {
        onOpenChange(v);
        // Сбрасываем форму при закрытии
        if (!v) {
          setName("");
          setPhone("");
          setDate("");
          setTime("");
          setErrorMessage("");
          setSubmitStatus("idle");
        }
      }
    }}>
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
            onClick={() => !isSubmitting && onOpenChange(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors z-10 disabled:opacity-50"
            whileHover={!isSubmitting ? { scale: 1.1, rotate: 90 } : {}}
            whileTap={!isSubmitting ? { scale: 0.9 } : {}}
            disabled={isSubmitting}
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
                {submitStatus === "success" ? "Успешно!" : t("modal_title")}
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 mt-2">
                {submitStatus === "success" 
                  ? "Мы свяжемся с вами в ближайшее время!" 
                  : tab === "form" ? t("modal_hint_form") : t("modal_hint_schedule")
                }
              </DialogDescription>
            </DialogHeader>

            {/* Сообщение об успехе/ошибке */}
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 text-sm">
                    Заявка успешно отправлена!
                  </span>
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <span className="text-red-700 dark:text-red-300 text-sm">
                    {errorMessage}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {submitStatus !== "success" && (
              <>
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
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="+7 777 123 45 67"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                            disabled={isSubmitting}
                            maxLength={18} // +7 777 123 45 67
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
                            type="date"
                            onChange={handleDateChange}
                            className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                            disabled={isSubmitting}
                            min={getTodayDate()}
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder={t("time")}
                            value={time}
                            type="time"
                            onChange={(e) => setTime(e.target.value)}
                            className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <Input
                            placeholder="+7 777 123 45 67"
                            value={phone}
                            onChange={handlePhoneChange}
                            className="pl-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 focus:border-teal-500"
                            disabled={isSubmitting}
                            maxLength={18}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <DialogFooter className="mt-6">
                  <motion.div 
                    className="w-full"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white py-3 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {/* Анимированный блеск */}
                      {!isSubmitting && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        />
                      )}
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            {tab === "form" ? t("ok") : t("book")}
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </span>
                    </Button>
                  </motion.div>
                </DialogFooter>
              </>
            )}
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