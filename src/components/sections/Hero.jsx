"use client";

import Image from "next/image";
import { heroContent } from "@/lib/data";
import { useEffect, useRef, useState } from "react";

const Hero = ({ content = heroContent, lang = "EN" }) => {
  const sectionRef = useRef(null);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const { greeting, name, description, cta } = content;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || hasAnimatedOnce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimatedOnce(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasAnimatedOnce]);

  useEffect(() => {
    setHasAnimatedOnce(false);
  }, [lang]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className={`hero-section${hasAnimatedOnce ? " animate-visible" : ""}`}
    >
      <div className="hero-panel">
        <div className="hero-copy">
          <p className="hero-greeting font-semibold">{greeting}</p>
          <h1 className="hero-name font-semibold">{name}</h1>
          <p className="hero-description">{description}</p>
          <a href="#about" className="hero-cta">
            <span className="hero-cta-label">{cta}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="hero-portrait-wrapper">
          <div className="hero-portrait-glow" />
          <div className="hero-portrait">
            <Image
              src="/images/photo_profile.png"
              alt="Klara Ollivviera Augustine Gunawan"
              width={280}
              height={280}
              className="hero-portrait-image"
              priority
            />
          </div>
          <div className="hero-spark hero-spark-top" />
          <div className="hero-spark hero-spark-bottom" />
        </div>
      </div>
    </section>
  );
};

export default Hero;