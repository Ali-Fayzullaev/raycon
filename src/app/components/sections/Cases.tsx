"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Cases() {
  return (
    <section id="cases" className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span
              className="inline-block rounded-full border px-3 py-1 text-xs font-medium text-[--primary]"
              style={{ ["--primary" as any]: "#007A6E" }}
            >
              Результаты
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">
              Кейсы клиентов
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-[--primary] text-[--primary]"
            style={{ ["--primary" as any]: "#007A6E" }}
          >
            Все кейсы
          </Button>
        </div>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {["EduTech", "E-commerce", "B2B услуги"].map((n, i) => (
            <Card key={i} className="border-0 shadow-md rounded-2xl">
              <CardContent className="pt-6">
                <div className="text-xs text-slate-500">{n}</div>
                <div className="mt-2 text-xl font-semibold">
                  Рост выручки на {i === 0 ? "28%" : i === 1 ? "19%" : "24%"}
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-[--primary]"
                      style={{ ["--primary" as any]: "#007A6E" }}
                    />{" "}
                    Внедрение в 10 дней
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-[--primary]"
                      style={{ ["--primary" as any]: "#007A6E" }}
                    />{" "}
                    Сквозная аналитика
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2
                      className="h-4 w-4 text-[--primary]"
                      style={{ ["--primary" as any]: "#007A6E" }}
                    />{" "}
                    Авто-напоминания менеджерам
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
