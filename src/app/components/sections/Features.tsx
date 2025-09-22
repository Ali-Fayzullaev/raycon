"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Link as LinkIcon, ShieldCheck, Zap } from "lucide-react";
import Stat from "../metrics/Stat";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Feature = ({
  icon: Icon,
  title,
  text,
}: {
  icon: any;
  title: string;
  text: string;
}) => (
  <motion.div variants={fadeUp} className="group">
    <Card className="border-0 shadow-md rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className="rounded-xl p-2 bg-[--mint]"
            style={{ ["--mint" as any]: "#E6FFFA" }}
          >
            <Icon
              className="h-5 w-5 text-[--primary]"
              style={{ ["--primary" as any]: "#007A6E" }}
            />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{text}</p>
      </CardContent>
    </Card>
  </motion.div>
);
export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span
            className="inline-block rounded-full border px-3 py-1 text-xs font-medium text-[--primary]"
            style={{ ["--primary" as any]: "#007A6E" }}
          >
            Что внутри
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">
            Всё для команды продаж
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl">
            Прозрачный пайплайн, автоматизация задач, омниканал, аналитика и
            прогнозы.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-5">
            <Feature
              icon={Zap}
              title="Автоматизация"
              text="Робот назначает задачи и шлёт письма"
            />
            <Feature
              icon={ShieldCheck}
              title="Единая база"
              text="Клиенты, сделки и коммуникации — в одном окне"
            />
            <Feature
              icon={BarChart3}
              title="Аналитика"
              text="Дашборды, конверсия воронки, SLA и прогнозы"
            />
            <Feature
              icon={LinkIcon}
              title="Интеграции"
              text="Телефония, WhatsApp, 1C, платежи и др."
            />
          </div>
        </motion.div>
        <div className="grid gap-5">
          <Stat value="-32%" label="время до первого контакта" />
          <Stat value="+21%" label="рост конверсии по воронке" />
          <Stat value="2x" label="быстрее онбординг менеджеров" />
        </div>
      </div>
    </section>
  );
}
