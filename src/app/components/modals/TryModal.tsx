"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/providers/I18nProvider";
import { motion } from "framer-motion";

export default function TryModal({
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg dark:bg-slate-900 dark:text-slate-100 overflow-hidden">
        {/* верхний акцент */}
        <motion.div
          className="absolute inset-x-0 -top-px h-1"
          initial={{ backgroundPosition: "0% 50%" }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" as any }}
          style={{
            background: "linear-gradient(90deg, #007A6E, rgba(0,122,110,0))",
          }}
        />

        <DialogHeader>
          <DialogTitle>{t("modal_title")}</DialogTitle>
        </DialogHeader>
        {/* табы */}
        <div className="flex items-center gap-2 text-sm">
          <motion.button
            whileTap={{ scale: 0.98 }}
            className={`px-3 py-1 rounded transition-colors ${
              tab === "form"
                ? "bg-slate-200 dark:bg-slate-700"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setTab("form")}
          >
            {t("modal_tab_form")}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            className={`px-3 py-1 rounded transition-colors ${
              tab === "schedule"
                ? "bg-slate-200 dark:bg-slate-700"
                : "hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            onClick={() => setTab("schedule")}
          >
            {t("modal_tab_schedule")}
          </motion.button>
        </div>
        {tab === "form" ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-3 mt-3"
          >
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {t("modal_hint_form")}
            </p>
            <Input
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder={t("phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-3 mt-3"
          >
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              {t("modal_hint_schedule")}
            </p>
            <Input
              placeholder={t("date")}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              placeholder={t("time")}
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <Input
              placeholder={t("name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder={t("phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </motion.div>
        )}

        <DialogFooter className="gap-2">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="bg-[--primary] shadow-md relative overflow-hidden"
              style={{ ["--primary" as any]: "#007A6E" }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                initial={{ x: "-120%" }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  background:
                    "linear-gradient(120deg, rgba(255,255,255,.2) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,.2) 60%, rgba(255,255,255,0) 100%)",
                }}
              />
              {tab === "form" ? t("ok") : t("book")}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
