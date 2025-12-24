"use client";
import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./sections/Hero";
import Pricing from "./sections/Pricing";
import { I18nProvider } from "@/providers/I18nProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import SimpleForBusiness from "./sections/SimpleForBusiness";
import ForWhom from "./sections/ForWhom";
import OnboardingRoadmap from "./sections/OnboardingRoadmap";
import KeyCapabilities from "./sections/KeyCapabilities";
import ClientResults from "./sections/ClientResults";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import WhoWe from "./sections/WhoWe";


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
          <KeyCapabilities/>
          <Pricing />
          <ClientResults/>
          <WhoWe/>
          <FAQ/>
          <FinalCTA />
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
