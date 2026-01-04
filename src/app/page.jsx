"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experiences from "@/components/sections/Experiences";
import Contact from "@/components/sections/Contact";
import ScrollTopButton from "@/components/ui/ScrollTopButton";
import {
  heroContent,
  heroContentId,
  aboutContentEn,
  aboutContentId,
} from "@/lib/data";

export default function Home() {
  const [lang, setLang] = useState("EN");
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const heroData = lang === "EN" ? heroContent : heroContentId;

  const openNavigation = () => setIsNavigationOpen(true);
  const closeNavigation = () => setIsNavigationOpen(false);

  return (
    <>
        <Header
          lang={lang}
          onLangToggle={() => setLang((current) => (current === "EN" ? "ID" : "EN"))}
          isNavigationOpen={isNavigationOpen}
          onOpenNavigation={openNavigation}
          onCloseNavigation={closeNavigation}
        />
        <main className="flex flex-col gap-[clamp(2rem,3vw,3rem)]">
          <Hero content={heroData} lang={lang} />
          <About
            content={lang === "EN" ? aboutContentEn : aboutContentId}
            lang={lang}
          />
          <Skills lang={lang} />
          <Experiences lang={lang} />
          <Projects lang={lang} />
          <Contact lang={lang} />
        </main>
      {!isNavigationOpen && <ScrollTopButton />}
      <Footer />
    </>
  );
}
