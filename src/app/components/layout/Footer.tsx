"use client";
import React from "react";
import LogoMark from "../branding/LogoMark";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} Raycon. Все права защищены.
          </div>
        </div>
        <div className="flex md:justify-end gap-4 text-sm">
          <a className="hover:opacity-70" href="#">
            Политика
          </a>
          <a className="hover:opacity-70" href="#">
            Документы
          </a>
          <a className="hover:opacity-70" href="#">
            Контакты
          </a>
        </div>
      </div>
    </footer>
  );
}
