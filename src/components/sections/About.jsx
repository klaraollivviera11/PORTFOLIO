"use client";

import { useEffect, useRef, useState } from "react";
import {
	MapPin,
	Phone,
	Mail,
	Github,
	Linkedin,
	Instagram,
	GraduationCap,
} from "lucide-react";
import { aboutContentEn } from "@/lib/data";

const contactDetails = [
	{ icon: MapPin, value: "Bandung, Indonesia" },
	{ icon: Phone, value: "+62 898-3838-629" },
	{ icon: Mail, value: "klaraoliviera11@gmail.com" },
];

const socialLinks = [
	{ icon: Github, label: "GitHub", href: "https://github.com/klaraollivviera11" },
	{ icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/klara-ollivviera-augustine-gunawan-77bb20244/" },
	{ icon: Instagram, label: "Instagram", href: "https://www.instagram.com/klaraolivierra/" },
];

const About = ({ content = aboutContentEn, lang = "EN" }) => {
	const sectionRef = useRef(null);
	const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

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
			id="about"
			ref={sectionRef}
			className={`about-section${hasAnimatedOnce ? " animate-visible" : ""}`}
		>
			<div className="about-panel">
				<h2 className="section-heading about-heading font-bold">{content.title}</h2>
				<div className="about-main-grid">
					<div className="description-column">
						<article className="about-description-card">
							<p>{content.description}</p>
						</article>
						<div className="secore-pills">
							{content.SeCore.map((item) => (
								<span key={item} className="secore-pill">
									{item}
								</span>
							))}
						</div>
					</div>
					<div className="about-side-column">
						<div className="about-education-stack">
							{content.education.map((item) => (
								<article className="edu-card" key={item.school}>
									<div className="edu-head">
										<GraduationCap size={18} />
										<span className="edu-period font-semibold">{item.period}</span>
									</div>
									<h3 className="edu-school">{item.school}</h3>
									<p className="edu-major">{item.major}</p>
									<p className="edu-gpa">
										{lang === "EN" ? "GPA" : "IPK"} {item.gpa}
									</p>
								</article>
							))}
						</div>
						<article className="about-contact-card">
							<div className="about-contact-grid">
								{contactDetails.map((item) => {
									const Icon = item.icon;
									return (
										<div className="contact-row" key={item.value}>
											<span className="contact-icon">
												<Icon size={18} />
											</span>
											<span className="contact-value">{item.value}</span>
										</div>
									);
								})}
							</div>
							<div className="about-cta-text">Let&rsquo;s Connect</div>
							<div className="social-pill-outline">
								<div className="social-pill-inner">
									{socialLinks.map((link) => {
										const Icon = link.icon;
										return (
											<a
												key={link.label}
												className="social-chip"
												href={link.href}
												target="_blank"
												rel="noreferrer"
												aria-label={link.label}
											>
												<Icon size={20} />
											</a>
										);
										})}
								</div>
							</div>
						</article>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
