"use client";
import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import FakeDashboard from "./sections/FakeDashboard";
import Features from "./sections/Features";
import Cases from "./sections/Cases";
import Pricing from "./sections/Pricing";
import CTA from "./sections/CTA";
import { I18nProvider } from "@/providers/I18nProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SimpleForBusiness from "./sections/SimpleForBusiness";
import ForWhom from "./sections/ForWhom";
import OnboardingRoadmap from "./sections/OnboardingRoadmap";


export default function LandingClient() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <Header />
          <Hero />
          <SimpleForBusiness/>
          <ForWhom/>
          <OnboardingRoadmap/>
          <Features />
          <Cases />
          <Pricing />
          <CTA />
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
