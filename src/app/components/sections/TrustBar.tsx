"use client";
import React from "react";

export default function TrustBar() {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-wrap items-center justify-center gap-8 text-slate-500">
        {[
          "Kaspi",
          "Halyk",
          "Air Astana",
          "Freedom",
          "Kolesa",
          "Chocofamily",
        ].map((b, i) => (
          <div key={i} className="text-sm opacity-70">
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}
