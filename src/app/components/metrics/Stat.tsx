"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border p-6 text-center shadow-sm bg-white"
      style={{ borderColor: "#E2E8F0" }}
    >
      <div
        className="text-3xl font-extrabold text-[--primary]"
        style={{ "--primary": "#007A6E" } as React.CSSProperties}
      >
        {value}
      </div>
      <div className="text-slate-600 mt-2">{label}</div>
    </motion.div>
  );
}
