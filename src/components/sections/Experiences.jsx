"use client";

import { useEffect, useRef, useState } from "react";
import { experiencesEN, experiencesID } from "@/lib/data";

const Experiences = ({ lang = "EN" }) => {
  const sectionRef = useRef(null);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const selectedExperiences = lang === "EN" ? experiencesEN : experiencesID;
  const heading = selectedExperiences?.title ?? "Experiences";

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
      id="experiences"
      ref={sectionRef}
      className={`experiences-section${hasAnimatedOnce ? " animate-visible" : ""}`}
    >
      <div className="experiences-panel">
        <h2 className="section-heading skills-heading font-bold">{heading}</h2>
        <div className="experiences-card-stack">
          {selectedExperiences.sections?.map((section) => (
            <article key={section.key} className="experience-card">
              <h3 className="experience-section-heading font-semibold">{section.title}</h3>
              {section.items.map((entry) => (
                <div key={`${entry.company}-${entry.role}`} className="experience-row">
                  <div className="experience-details">
                    <div className="experience-header">
                      <p className="experience-company">{entry.company}</p>
                      <span className="experience-period">{entry.period}</span>
                    </div>
                    <h4 className="experience-role font-semibold">{entry.role}</h4>
                    <p className="experience-summary">{entry.summary}</p>
                  </div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;
