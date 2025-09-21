import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Zap,
  Bot,
  Sparkles,
  Cpu,
  Link as LinkIcon,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/**
 * Raycon CRM — Animated Landing
 * - Primary color: #007A6E (teal)
 * - Secondary: #0F172A (slate-900), #FFFFFF, accents: #FFC857 (amber), #E6FFFA (mint)
 * - Stack: React + Tailwind + shadcn/ui + Framer Motion
 * - All visuals are self-contained (inline SVG & CSS), safe to paste into a single-file playground.
 */

// Simple floating animation for decorative elements
const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
};

// Inline SVG "robot assistant" mascot that gently floats
const Robo = () => (
  <motion.svg
    variants={float}
    initial="initial"
    animate="animate"
    width="280"
    height="280"
    viewBox="0 0 280 280"
    role="img"
    aria-label="Raycon AI assistant"
  >
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#007A6E" />
        <stop offset="100%" stopColor="#33CAB7" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#E6FFFA" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#E6FFFA" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="140" cy="150" r="120" fill="url(#glow)" />
    <rect x="55" y="70" width="170" height="120" rx="24" fill="white" stroke="#007A6E" strokeWidth="3" />
    <rect x="90" y="50" width="100" height="40" rx="20" fill="url(#grad1)" />
    <circle cx="120" cy="70" r="8" fill="white" />
    <circle cx="160" cy="70" r="8" fill="white" />
    <rect x="75" y="105" width="130" height="50" rx="14" fill="#F1F5F9" />
    <circle cx="105" cy="130" r="10" fill="#007A6E" />
    <circle cx="145" cy="130" r="10" fill="#007A6E" />
    <circle cx="185" cy="130" r="10" fill="#FFC857" />
    <rect x="85" y="165" width="110" height="12" rx="6" fill="#94A3B8" />
    <rect x="100" y="185" width="80" height="12" rx="6" fill="#CBD5E1" />
    <path d="M70 200c20 20 120 20 140 0" stroke="#007A6E" strokeWidth="6" fill="none" />
  </motion.svg>
);

// Small reusable pill
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
    style={{ borderColor: "#007A6E", color: "#007A6E", background: "#E6FFFA" }}>
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

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
          <div className="rounded-xl p-2" style={{ background: "#E6FFFA" }}>
            <Icon className="h-5 w-5" style={{ color: "#007A6E" }} />
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

const Stat = ({ value, label }: { value: string; label: string }) => (
  <motion.div variants={fadeUp} className="rounded-2xl border p-6 text-center shadow-sm"
    style={{ borderColor: "#E2E8F0", background: "white" }}>
    <div className="text-3xl font-extrabold" style={{ color: "#007A6E" }}>{value}</div>
    <div className="text-slate-600 mt-2">{label}</div>
  </motion.div>
);

const LogoMark = () => (
  <div className="font-black tracking-tight text-xl" style={{ color: "#007A6E" }}>
    RAYCON<span className="font-extrabold" style={{ color: "#0F172A" }}>CRM</span>
  </div>
);

const FakeDashboard = () => (
  <motion.div variants={fadeUp} className="rounded-2xl border shadow-lg overflow-hidden bg-white">
    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border-b">
      <span className="h-3 w-3 rounded-full bg-red-400" />
      <span className="h-3 w-3 rounded-full bg-yellow-400" />
      <span className="h-3 w-3 rounded-full bg-green-400" />
      <span className="ml-3 text-xs text-slate-500">dashboard.raycon</span>
    </div>
    <div className="grid md:grid-cols-3 gap-4 p-4">
      <Card className="md:col-span-2 border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Pipeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-36 w-full rounded-lg bg-gradient-to-r from-slate-100 to-slate-200" />
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Leads","Opportunities","Won"].map((t,i)=> (
              <div key={i} className="rounded-lg border p-3">
                <div className="text-xs text-slate-500">{t}</div>
                <div className="text-xl font-bold" style={{ color: "#007A6E" }}>{[128,64,32][i]}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2"><Cpu className="h-4 w-4" /> AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["Суммируй звонок","Создай задачу","Предложи следующий шаг"].map((t,i)=> (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" style={{ color: "#007A6E" }} />
                <span className="text-sm">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Input placeholder="Спросите Raycon AI…" className="bg-slate-50" />
            <Button style={{ background: "#007A6E" }} className="hover:opacity-90">Отправить</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </motion.div>
);

export default function LandingClient() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
            <Pill>Новый сайт с анимациями</Pill>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#product" className="hover:opacity-70">Продукт</a>
            <a href="#features" className="hover:opacity-70">Функции</a>
            <a href="#cases" className="hover:opacity-70">Кейсы</a>
            <a href="#pricing" className="hover:opacity-70">Тарифы</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline-flex">Войти</Button>
            <Button style={{ background: "#007A6E" }} className="hover:opacity-90">
              Попробовать бесплатно <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 50% -10%, #E6FFFA 0%, rgba(230,255,250,0) 60%), radial-gradient(40% 30% at 80% 10%, #33CAB7 0%, rgba(51,202,183,0) 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black leading-tight">
                CRM, которая ускоряет продажи
                <span className="block" style={{ color: "#007A6E" }}>и работает как AI-ассистент</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-600 max-w-xl">
                Raycon помогает командам в Казахстане закрывать сделки быстрее: единый пайплайн, автоматизация, аналитика и встроенный AI.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button style={{ background: "#007A6E" }} className="h-12 px-6 text-base hover:opacity-90">
                  Запустить демо <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="h-12 px-6 text-base" style={{ borderColor: "#007A6E", color: "#007A6E" }}>
                  Смотреть видео-обзор
                </Button>
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8 flex items-center gap-2 text-sm text-slate-600">
                <Star className="h-4 w-4" style={{ color: "#FFC857" }} /> 4.9/5 по отзывам клиентов
              </motion.div>
            </motion.div>

            <div className="relative flex items-center justify-center">
              <div className="absolute -z-10 h-72 w-72 rounded-full blur-3xl opacity-50" style={{ background: "#E6FFFA" }} />
              <Robo />
            </div>
          </div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-14">
            <FakeDashboard />
          </motion.div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-wrap items-center justify-center gap-8 text-slate-500">
          {["Kaspi","Halyk","Air Astana","Freedom","Kolesa","Chocofamily"].map((b,i)=> (
            <div key={i} className="text-sm opacity-70">{b}</div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Pill>Что внутри</Pill>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Всё для команды продаж</h2>
            <p className="mt-3 text-slate-600 max-w-xl">Прозрачный пайплайн, автоматизация задач, омниканал, аналитика по менеджерам и сделкам. Подключения к вашим сервисам — в несколько кликов.</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              <Feature icon={Zap} title="Автоматизация" text="Робот назначает задачи, ставит напоминания и шлёт письма" />
              <Feature icon={ShieldCheck} title="Единая база" text="Клиенты, сделки и коммуникации — в одном окне" />
              <Feature icon={BarChart3} title="Аналитика" text="Дашборды, конверсия воронки, SLA и прогнозы" />
              <Feature icon={LinkIcon} title="Интеграции" text="Телефония, WhatsApp, 1C, платежи и др." />
            </div>
          </motion.div>
          <div className="grid gap-5">
            <Stat value="-32%" label="время до первого контакта" />
            <Stat value="+21%" label="рост конверсии по воронке" />
            <Stat value="2x" label="быстрее онбординг менеджеров" />
          </div>
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Pill>Результаты</Pill>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">Кейсы клиентов</h2>
            </div>
            <Button variant="outline" style={{ borderColor: "#007A6E", color: "#007A6E" }}>Все кейсы</Button>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {["EduTech","E-commerce","B2B услуги"].map((n,i)=> (
              <Card key={i} className="border-0 shadow-md rounded-2xl">
                <CardContent className="pt-6">
                  <div className="text-xs text-slate-500">{n}</div>
                  <div className="mt-2 text-xl font-semibold">Рост выручки на {i===0?"28%":i===1?"19%":"24%"}</div>
                  <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4" style={{ color: "#007A6E" }} /> Внедрение в 10 дней</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4" style={{ color: "#007A6E" }} /> Сквозная аналитика</li>
                    <li className="flex gap-2"><CheckCircle2 className="h-4 w-4" style={{ color: "#007A6E" }} /> Авто-напоминания менеджерам</li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <Pill>Просто и прозрачно</Pill>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold">Тарифы для любой команды</h2>
          <p className="mt-3 text-slate-600">Оплата помесячно, без скрытых платежей. Скидки при оплате за год.</p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {[
            { name: "Start", price: "5 900 ₸", features: ["Лиды и сделки","Контакты","Мобильное приложение"] },
            { name: "Pro", price: "11 900 ₸", features: ["Воронки","Автоматизация","Интеграции"] },
            { name: "AI", price: "18 900 ₸", features: ["AI-помощник","Конструктор ботов","Продвин. аналитика"] },
          ].map((p, i) => (
            <Card key={p.name} className={`rounded-2xl border ${i===1?"shadow-2xl scale-[1.02]":"shadow-md"}`} style={i===1?{ borderColor: "#007A6E" }:undefined}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{p.name}</span>
                  {i===1 && <span className="text-xs font-semibold" style={{ color: "#007A6E" }}>Рекомендовано</span>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold" style={{ color: i===1?"#007A6E":"#0F172A" }}>{p.price}<span className="text-base font-normal text-slate-500"> / место</span></div>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.features.map(f => (
                    <li key={f} className="flex gap-2"><CheckCircle2 className="h-4 w-4" style={{ color: "#007A6E" }} /> {f}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" style={{ background: "#007A6E" }}>Выбрать тариф</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60" style={{ background: "linear-gradient(135deg, #E6FFFA, #FFFFFF)" }} />
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Готовы ускорить продажи с Raycon?</h3>
              <p className="mt-3 text-slate-600">Оставьте контакты — пришлём доступ к демо и поможем перенести данные.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Input placeholder="Имя" className="h-12 bg-white" />
              <Input placeholder="E-mail" className="h-12 bg-white" />
              <Button className="h-12" style={{ background: "#007A6E" }}>Получить демо</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} Raycon. Все права защищены.</div>
          </div>
          <div className="flex md:justify-end gap-4 text-sm">
            <a className="hover:opacity-70" href="#">Политика</a>
            <a className="hover:opacity-70" href="#">Документы</a>
            <a className="hover:opacity-70" href="#">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
