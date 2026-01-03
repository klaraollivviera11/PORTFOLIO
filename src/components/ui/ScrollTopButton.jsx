"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();
    const observer = new MutationObserver(() => updateTheme());
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? "scroll-to-top-visible" : ""} ${
        isDark ? "scroll-to-top-dark" : "scroll-to-top-light"
      }`}
      onClick={handleClick}
      aria-label="Scroll back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollTopButton;
