import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raycon CRM — аналог Wazzup для бизнеса | Установка CRM для WhatsApp от 35 000 ₸",
  description: "Raycon CRM — адаптированная для продаж альтернатива Wazzup. Мультичат WhatsApp, автораспределение заявок, аналитика в одной CRM. Установка за 20 минут. Тарифы от 35 000₸/мес. Бесплатный тест 3 дня. ☎ +7 (707) 846-99-99",
  keywords: "CRM система, CRM Казахстан, система управления клиентами, WhatsApp CRM, мультичат, автоматизация продаж, CRM для малого бизнеса",
  authors: [{ name: "Raycon" }],
  robots: "index, follow",
  openGraph: {
    title: "RAYCON CRM - CRM система для бизнеса в Казахстане",
    description: "Простая CRM для управления клиентами с WhatsApp интеграцией. Мультичат, автоматизация, аналитика. Тест-драйв 14 дней бесплатно.",
    url: "https://www.raycon.kz",
    siteName: "Raycon CRM",
    images: [
      {
        url: "https://www.raycon.kz/logo.png",
        width: 1200,
        height: 630,
        alt: "Raycon CRM - Система управления клиентами",
      },
    ],
    locale: "ru_KZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RAYCON CRM - CRM система для бизнеса",
    description: "Простая CRM с WhatsApp интеграцией для малого бизнеса в Казахстане",
    images: ["https://www.raycon.kz/logo.png"],
  },
  alternates: {
    canonical: "https://www.raycon.kz",
    languages: {
      "ru-KZ": "https://www.raycon.kz/",
      "kk-KZ": "https://www.raycon.kz/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="yandex-verification" content="6813c810bb2e6620" />
        <meta name="google-site-verification" content="M37kNvo52Qu7OcZpRWfeXpsTKF3aoc9Tfh9dRIsV9Ew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://www.raycon.kz" />
        <link rel="alternate" hrefLang="ru-kz" href="https://www.raycon.kz/" />
        <link rel="alternate" hrefLang="kk-kz" href="https://www.raycon.kz/" />
        
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T77P85GS');
            `,
          }}
        />
        
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z6QYLQ4C27"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z6QYLQ4C27');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T77P85GS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Raycon CRM",
              "description": "CRM система для управления клиентами, заявками и продажами с интеграцией WhatsApp и мультичат функциями",
              "url": "https://www.raycon.kz",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "KZT",
                "priceValidUntil": "2025-12-31",
                "availability": "https://schema.org/InStock",
                "name": "Бесплатный тест-драйв 14 дней"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Raycon",
                "url": "https://www.raycon.kz",
                "logo": "https://www.raycon.kz/img/favicon.svg"
              },
              "screenshot": "https://www.raycon.kz/big-screeen.png",
              "featureList": [
                "WhatsApp интеграция",
                "Мультичат",
                "Управление клиентами",
                "Автоматизация продаж",
                "Аналитика и отчеты",
                "Чат-боты"
              ],
              "inLanguage": ["ru", "kk"],
              "targetRegion": "KZ"
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
