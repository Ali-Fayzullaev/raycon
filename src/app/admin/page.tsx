"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Проверяем, авторизован ли уже пользователь
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/admin/check", { 
          method: "GET",
          credentials: "include" 
        });
        if (res.ok) {
          router.push("/admin/articles");
          return;
        }
      } catch {
        // Не авторизован
      }
      setChecking(false);
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin/articles");
      } else {
        setError(data.error || "Ошибка авторизации");
      }
    } catch {
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-teal-500/10 rounded-full mb-4">
              <Lock className="h-8 w-8 text-teal-500" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Админ-панель
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Введите пароль для входа
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-slate-100 dark:bg-slate-700 border-0"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-medium"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Войти"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
