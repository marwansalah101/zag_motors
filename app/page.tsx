import { BrandBand } from "@/components/sections/BrandBand";
import { Branches } from "@/components/sections/Branches";
import { Consultation } from "@/components/sections/Consultation";
import { Catalog } from "@/components/sections/Catalog";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { MobileWhatsApp } from "@/components/sections/MobileWhatsApp";
import { Reels } from "@/components/sections/Reels";
import { Sold } from "@/components/sections/Sold";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <BrandBand />
        <Catalog />
        <Reels />
        <Sold />
        <Branches />
        <Consultation />
      </main>
      <Footer />
      <MobileWhatsApp />
    </>
  );
}
