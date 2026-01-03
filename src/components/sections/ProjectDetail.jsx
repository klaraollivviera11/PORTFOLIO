"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ProjectDetail({
	project,
	onClose,
	galleryIndex,
	onPrevImage,
	onNextImage,
	demoLabel,
	codeLabel,
	isUnavailable,
}) {
	const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);

	useEffect(() => {
		if (!project) {
			setHasAnimatedOnce(false);
			return;
		}

		let frame;
		setHasAnimatedOnce(false);
		frame = requestAnimationFrame(() => setHasAnimatedOnce(true));
		return () => cancelAnimationFrame(frame);
	}, [project]);

	useEffect(() => {
		if (!project) return undefined;
		const html = document.documentElement;
		const body = document.body;
		const previousHtmlOverflow = html.style.overflow;
		const previousBodyOverflow = body.style.overflow;
		body.classList.add("project-detail-open");
		html.style.overflow = "hidden";
		body.style.overflow = "hidden";

		return () => {
			body.classList.remove("project-detail-open");
			html.style.overflow = previousHtmlOverflow;
			body.style.overflow = previousBodyOverflow;
		};
	}, [project]);
	if (!project) return null;
	if (typeof document === "undefined") return null;

	const currentImage = project.images[galleryIndex];
	const showDemo = !isUnavailable(project.link.demo);
	const showCode = !isUnavailable(project.link.code);

	const overlayMarkup = (
		<div className="project-detail-overlay" onClick={onClose}>
			<div
				className={`project-detail-panel${hasAnimatedOnce ? " animate-visible" : ""}`}
				onClick={(event) => event.stopPropagation()}
			>
				<button type="button" className="project-detail-close" onClick={onClose} aria-label="Close project detail">
					<X size={20} strokeWidth={2.2} />
				</button>
				<div className="project-detail-inner">
					<div className="project-detail-gallery">
						<div className="project-detail-image-frame">
							<Image
								src={`/images/${project.slug}/${currentImage}`}
								alt={`${project.name} preview`}
								width={520}
								height={320}
								className="project-detail-image"
								sizes="(max-width: 768px) 100vw, 520px"
								priority
							/>
						</div>
						{project.images.length > 1 && (
							<>
								<button
									type="button"
									className="project-detail-arrow project-detail-arrow--left"
									onClick={(event) => {
										event.stopPropagation();
										onPrevImage();
									}}
									aria-label="Previous screenshot"
								>
									<ArrowLeft size={20} />
								</button>
								<button
									type="button"
									className="project-detail-arrow project-detail-arrow--right"
									onClick={(event) => {
										event.stopPropagation();
										onNextImage();
									}}
									aria-label="Next screenshot"
								>
									<ArrowRight size={20} />
								</button>
							</>
						)}
					</div>
					<div className="project-detail-copy">
						<h3 className="project-detail-title">{project.name}</h3>
						<p className="project-detail-description">{project.description}</p>
						<div className="project-tech-stack">
							{project.techStack.map((tech) => (
								<span key={tech} className="project-tech-pill">
									{tech}
								</span>
							))}
						</div>
						<div className="project-detail-footer">
							{showDemo && (
								<a
									className="project-detail-link"
									href={project.link.demo}
									target="_blank"
									rel="noreferrer"
								>
									{demoLabel}
								</a>
							)}
							{showCode && (
								<a
									className="project-detail-link project-detail-link--secondary"
									href={project.link.code}
									target="_blank"
									rel="noreferrer"
								>
									{codeLabel}
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	return createPortal(overlayMarkup, document.body);
}
