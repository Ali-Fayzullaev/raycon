"use client";
import React, { useEffect, useState } from "react";

type Star = {
  top: string;
  left: string;
  width: string;
  height: string;
  duration: string;
  delay: string;
};

function makeStar(): Star {
  return {
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${(Math.random() * 2 + 1).toFixed(2)}px`,
    height: `${(Math.random() * 2 + 1).toFixed(2)}px`,
    duration: `${(Math.random() * 5 + 5).toFixed(2)}s`,
    delay: `${(Math.random() * 5).toFixed(2)}s`,
  };
}

export default function AnimatedBackground() {
  const [stars, setStars] = useState<Star[] | null>(null);

  useEffect(() => {
    // Генерируем звёзды ТОЛЬКО в браузере после монтирования
    const N = 60; // можно уменьшить для производительности
    const s: Star[] = Array.from({ length: N }, () => makeStar());
    setStars(s);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-black dark:to-blue-950">
      {/* --- Светлая тема (детерминировано, SSR-safe) --- */}
      <div className="absolute inset-0 block dark:hidden" aria-hidden>
        <div className="light-orb orb-1" />
        <div className="light-orb orb-2" />
        <div className="light-orb orb-3" />
        <div className="absolute inset-0 opacity-[0.03] grid-pattern" />
      </div>

      {/* --- Тёмная тема: рендерим звёзды только после монтирования --- */}
      <div className="absolute inset-0 hidden dark:block" aria-hidden>
        {stars
          ? stars.map((s, i) => (
              <div
                key={i}
                className="star"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.width,
                  height: s.height,
                  animationDuration: s.duration,
                  animationDelay: s.delay,
                }}
              />
            ))
          : /* Placeholder: небольшой детерминированный набор, чтобы сервер и клиент имели одно и то же до mount */
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`ph-${i}`}
                className="star opacity-40"
                style={{
                  top: `${10 + i * 12}%`,
                  left: `${6 + i * 14}%`,
                  width: `${1.5 + (i % 2)}px`,
                  height: `${1.5 + (i % 2)}px`,
                  animationDuration: `8s`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
        <div className="aurora-orb orb-1" />
        <div className="aurora-orb orb-2" />
        <div className="aurora-orb orb-3" />
        <div className="absolute inset-0 opacity-[0.04] grid-pattern-dark" />
      </div>
    </div>
  );
}
