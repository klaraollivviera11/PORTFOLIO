"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import ContactForm from "./ContactForm";
import {
	contactEN,
	contactID,
	contactformEN,
	contactformID,
} from "@/lib/data";

const socialLinks = [
	{ icon: Github, label: "GitHub", href: "https://github.com/klaraolliviera11" },
	{
		icon: Linkedin,
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/klara-olliviera-augustine-gunawan-77bb20244/",
	},
	{ icon: Instagram, label: "Instagram", href: "https://www.instagram.com/klaraolivierra/" },
];

const Contact = ({ lang = "EN" }) => {
	const sectionRef = useRef(null);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [isFormOpen, setIsFormOpen] = useState(false);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section || hasAnimated) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setHasAnimated(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 }
		);

		observer.observe(section);

		return () => observer.disconnect();
	}, [hasAnimated]);

	useEffect(() => {
		setHasAnimated(false);
	}, [lang]);

	const content = lang === "EN" ? contactEN : contactID;
	const formContent = lang === "EN" ? contactformEN : contactformID;

	return (
		<section
			id="contact"
			ref={sectionRef}
			className={`contact-section${hasAnimated ? " animate-visible" : ""}`}
		>
			<div className="contact-panel">
				<h2 className="section-heading contact-heading font-bold">{content.title}</h2>
				<div className="contact-card">
					<div className="contact-card-content">
						<h3 className="contact-subtitle">{content.subtitle}</h3>
						<p className="contact-description">{content.description}</p>
						<p className="contact-subdescription">{content.subdescription}</p>
					</div>
					<div className="contact-email-wrapper">
						<div className="contact-email-pill-outline">
							<button
								type="button"
								className="contact-email-pill"
								onClick={() => setIsFormOpen(true)}
								aria-label={`${content.subtitle} ${content.email}`}
							>
								<Mail size={20} />
								<span>{content.email}</span>
							</button>
						</div>
					</div>
					<div className="contact-social-row">
						<div className="contact-cta">Let&rsquo;s Connect</div>
						<div className="social-pill-outline contact-social-outline">
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
					</div>
				</div>
			</div>

			<ContactForm
				isOpen={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				recipient={content.email}
				formContent={formContent}
			/>
		</section>
	);
};

export default Contact;
