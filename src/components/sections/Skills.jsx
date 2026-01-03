"use client";

import { useEffect, useRef, useState } from "react";
import { Code, Layers, Wrench } from "lucide-react";
import { skillsEN, skillsID } from "@/lib/data";

const iconMap = {
  "Programming Languages": Code,
  "Bahasa Pemrograman": Code,
  "Development & Frameworks": Layers,
  "Pengembangan & Framework": Layers,
  "Tools & Platforms": Wrench,
  "Alat & Platform": Wrench,
};

const Skills = ({ lang = "EN" }) => {
  const sectionRef = useRef(null);
  const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
  const selectedSkills = lang === "EN" ? skillsEN : skillsID;
  const skillData = selectedSkills?.Content ?? [];
  const heading = selectedSkills?.title ?? "Skills";

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
      id="skills"
      ref={sectionRef}
      className={`skills-section${hasAnimatedOnce ? " animate-visible" : ""}`}
    >
      <div className="skills-panel">
        <h2 className="section-heading skills-heading font-bold">{heading}</h2>
        <div className="skills-grid">
          {skillData.map((category) => {
            const Icon = iconMap[category.category] || Code;
            return (
              <article key={category.category} className="skill-card font-semibold">
                <div className="skill-card-header">
                  <Icon size={18} />
                  <span>{category.category}</span>
                </div>
                <div className="skill-pill-stack">
                  {category.stack.map((pill) => (
                    <span key={pill} className="skill-pill">
                      {pill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
