"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import UserSection from "@/components/UserSection";
import MarketSection from "@/components/MarketSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <main className="container">
        <FeatureSection />
        <UserSection />
        <MarketSection />
        <FAQSection />
        <ContactSection />
      </main>
    </>
  );
}