"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle2, Cpu } from "lucide-react";

export default function FakeDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border shadow-lg overflow-hidden bg-white"
    >
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-slate-500">dashboard.raycon</span>
      </div>
      <div className="grid md:grid-cols-3 gap-4 p-4">
        <Card className="md:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-36 w-full rounded-lg bg-gradient-to-r from-slate-100 to-slate-200" />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["Leads", "Opportunities", "Won"].map((t, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="text-xs text-slate-500">{t}</div>
                  <div
                    className="text-xl font-bold text-[--primary]"
                    style={{ ["--primary" as any]: "#007A6E" }}
                  >
                    {[128, 64, 32][i]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Cpu className="h-4 w-4" /> AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                "Суммируй звонок",
                "Создай задачу",
                "Предложи следующий шаг",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4 text-[--primary]"
                    style={{ ["--primary" as any]: "#007A6E" }}
                  />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
