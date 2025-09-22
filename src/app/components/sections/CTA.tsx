"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CTA() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ background: "linear-gradient(135deg, #E6FFFA, #FFFFFF)" }}
      />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold">
              Готовы ускорить продажи с Raycon?
            </h3>
            <p className="mt-3 text-slate-600">
              Оставьте контакты — пришлём доступ к демо и поможем перенести
              данные.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Input placeholder="Имя" className="h-12 bg-white" />
            <Input placeholder="E-mail" className="h-12 bg-white" />
            <Button
              className="h-12 bg-[--primary]"
              style={{ ["--primary" as any]: "#007A6E" }}
            >
              Получить демо
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
