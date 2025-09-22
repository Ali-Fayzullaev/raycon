"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Pricing() {
  const plans = [
    {
      name: "Start",
      price: "5 900 ₸",
      features: ["Лиды и сделки", "Контакты", "Мобильное приложение"],
    },
    {
      name: "Pro",
      price: "11 900 ₸",
      features: ["Воронки", "Автоматизация", "Интеграции"],
    },
    {
      name: "AI",
      price: "18 900 ₸",
      features: ["AI-помощник", "Конструктор ботов", "Продв. аналитика"],
    },
  ];

  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center max-w-2xl mx-auto">
        <span
          className="inline-block rounded-full border px-3 py-1 text-xs font-medium text-[--primary]"
          style={{ ["--primary" as any]: "#007A6E" }}
        >
          Просто и прозрачно
        </span>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">
          Тарифы для любой команды
        </h2>
        <p className="mt-3 text-slate-600">
          Оплата помесячно, без скрытых платежей. Скидки при оплате за год.
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <Card
            key={p.name}
            className={`rounded-2xl border ${
              i === 1 ? "shadow-2xl scale-[1.02]" : "shadow-md"
            }`}
            style={i === 1 ? { borderColor: "#007A6E" } : undefined}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{p.name}</span>
                {i === 1 && (
                  <span
                    className="text-xs font-semibold text-[--primary]"
                    style={{ ["--primary" as any]: "#007A6E" }}
                  >
                    Рекомендовано
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`text-3xl font-extrabold ${
                  i === 1 ? "text-[--primary]" : ""
                }`}
                style={{ ["--primary" as any]: "#007A6E" }}
              >
                {p.price}
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  / место
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    • {f}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full bg-[--primary]"
                style={{ ["--primary" as any]: "#007A6E" }}
              >
                Выбрать тариф
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
