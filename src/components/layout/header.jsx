"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Menu,
  X,
  User,
  Code,
  Briefcase,
  Folder,
  Phone,
} from "lucide-react";

const NAV_LINKS = [
  { id: "about", en: "About", idn: "Tentang" },
  { id: "skills", en: "Skills", idn: "Skill" },
  { id: "experiences", en: "Experiences", idn: "Pengalaman" },
  { id: "projects", en: "Projects", idn: "Proyek" },
  { id: "contact", en: "Contact", idn: "Kontak" },
];

const MOBILE_NAV_ICONS = {
  about: User,
  skills: Code,
  experiences: Briefcase,
  projects: Folder,
  contact: Phone,
};

export default function Header({ lang, onLangToggle }) {
  const [darkMode, setDarkMode] = useState(true);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    setDarkMode((prev) => {
      const next = !prev;
      root.classList.toggle("dark", next);
      return next;
    });
  };

  const localizedLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => ({
        ...link,
        label: lang === "EN" ? link.en : link.idn,
      })),
    [lang]
  );

  const openNavigation = () => setIsNavigationOpen(true);
  const closeNavigation = () => setIsNavigationOpen(false);
  const handleLanguageButton = () => {
    onLangToggle();
    closeNavigation();
  };

  return (
    <>
      <header
        className={`pointer-events-none fixed inset-x-0 top-0 z-50 backdrop-blur-md ${
          darkMode ? "shadow-[0_15px_35px_rgba(255,255,255,0.45)]" : "shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        } ${darkMode ? "bg-black/75" : "bg-white/80"}`}
      >
        <div className="mx-auto relative flex w-[min(100%,calc(100vw-6vw))] max-w-[2000px] items-center justify-between gap-4 py-4">
          <div className="flex items-center justify-start">
            <span className="pointer-events-auto text-2xl font-semibold tracking-wide">
              {lang === "EN" ? "Portfolio" : "Portofolio"}
            </span>
          </div>

         <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
          className="desktop-nav-pill hidden md:flex pointer-events-auto justify-self-center rounded-full outline-ring px-1"
        >
          <div className="flex w-full items-center justify-center rounded-full bg-[var(--container)] px-4 py-2 text-2xl text-[var(--text)] shadow-[0_20px_55px_rgba(0,0,0,0.55)]">
            <nav className="hidden items-center gap-4 font-semibold tracking-tight md:flex text-2xl md:text-2xl pointer-events-auto">
              {localizedLinks.map((link) => {
                const highlightClass = darkMode ? "bg-[#5b5b5b]" : "bg-white";
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    className={`group relative inline-flex items-center justify-center rounded-full px-6 py-1 text-lg transition duration-200 pointer-events-auto ${
                      darkMode
                        ? "hover:shadow-[0_0_24px_rgba(255,255,255,0.6)]"
                        : "hover:shadow-[0_0_24px_rgba(0,0,0,0.6)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${highlightClass}`}
                    />
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </motion.div>

          <div className="desktop-control-panel hidden md:flex items-center justify-end gap-3 pointer-events-auto">
            <div className="outline-ring alternate pointer-events-auto flex items-center justify-center">
              <button
                type="button"
                onClick={onLangToggle}
                className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--container)] text-lg font-semibold text-[var(--text)] transition"
                aria-label="Toggle language"
              >
                {lang}
              </button>
            </div>

            <div className="outline-ring pointer-events-auto flex items-center justify-center">
              <motion.button
                type="button"
                onClick={toggleTheme}
                whileTap={{ scale: 0.95 }}
                className={`relative flex h-12 w-24 items-center rounded-full border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)] overflow-hidden ${
                  darkMode ? "bg-[#1e1e1e]" : "bg-[var(--container)]"
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-full ${
                    darkMode ? "bg-[#1e1e1e]" : "bg-gradient-to-r from-black/10 to-white/60"
                  }`}
                />
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--text)]"
                  style={{ x: darkMode ? 4 : 54 }}
                >
                  {darkMode ? <Moon size={15} /> : <Sun size={15} />}
                </motion.span>
              </motion.button>
            </div>
          </div>

          <div className="mobile-header-area pointer-events-auto">
            <div className="mobile-header-controls">
              <button
                type="button"
                onClick={handleLanguageButton}
                aria-label="Toggle language"
                className="mobile-header-control"
              >
                <span className="mobile-header-control-outline">
                  <span className="mobile-header-control-inner">{lang}</span>
                </span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="mobile-header-control"
              >
                <span className="mobile-header-control-outline">
                  <span className="mobile-header-control-inner">
                    {darkMode ? <Moon size={18} /> : <Sun size={18} />}
                  </span>
                </span>
              </button>

              <button
                type="button"
                onClick={openNavigation}
                aria-label="Open menu"
                aria-expanded={isNavigationOpen}
                className="mobile-header-control"
              >
                <span className="mobile-header-control-outline">
                  <span className="mobile-header-control-inner">
                    <Menu size={20} />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav-panel ${darkMode ? "mobile-nav-panel--dark" : "mobile-nav-panel--light"} ${isNavigationOpen ? "is-visible" : ""}`}
        aria-hidden={!isNavigationOpen}
      >
          <div className="mobile-nav-top">
            <span className="mobile-nav-top-label text-xl font-bold">Menu</span>
            <button
              type="button"
              onClick={closeNavigation}
              aria-label="Close menu"
              className="mobile-nav-top-close"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="mobile-nav-links">
            {localizedLinks.map((link) => {
              const Icon = MOBILE_NAV_ICONS[link.id];
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeNavigation}
                  className="mobile-nav-link"
                >
                  <span className="mobile-nav-icon-outline">
                    <span className="mobile-nav-icon-inner">
                      <Icon size={20} />
                    </span>
                  </span>
                  <span className="mobile-nav-link-label">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mobile-nav-footer">
            <span className="mobile-nav-footer-copy">
              © 2025 Klara Ollivviera Augustine Gunawan
            </span>
          </div>
        </div>
      </>
    );
}
