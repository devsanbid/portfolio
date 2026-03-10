"use client";

import { I18nProvider } from "@/app/lib/i18n";
import { SiteDataProvider } from "@/app/lib/siteData";
import ScrollProgress from "./components/ScrollProgress";
import CursorGlow from "./components/CursorGlow";
import FloatingShapes from "./components/FloatingShapes";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Websites from "./components/Websites";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * Home — Main portfolio page
 *
 * Wrapped in SiteDataProvider (admin-editable content) and I18nProvider.
 */
export default function Home() {
  return (
    <SiteDataProvider>
      <I18nProvider>
        {/* Global UI Effects */}
        <ScrollProgress />
        <CursorGlow />
        <FloatingShapes />

        {/* Navigation */}
        <Navbar />

        {/* Page Sections */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Websites />
          <Projects />
          <Experience />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </I18nProvider>
    </SiteDataProvider>
  );
}
