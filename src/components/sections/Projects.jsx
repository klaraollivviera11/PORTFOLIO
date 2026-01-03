"use client";

import Image from "next/image";
import { ProjectEN, ProjectID } from "@/lib/data";
import ProjectDetail from "./ProjectDetail";
import { useEffect, useMemo, useRef, useState } from "react";

const isUnavailable = (value) => !value || value === "Not Available" || value === "Private";

export default function Projects({ lang = "EN" }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [galleryIndex, setGalleryIndex] = useState(0);
	const [hasAnimatedOnce, setHasAnimatedOnce] = useState(false);
	const sectionRef = useRef(null);

	const data = lang === "EN" ? ProjectEN : ProjectID;
	const detailLabel = data.buttons.find((button) => button.action === "popout")?.label ?? "Detail";
	const moreLabel = data.buttons.find((button) => button.action === "more")?.label ?? (lang === "EN" ? "See More" : "Lihat Lebih Banyak");
	const demoLabel = data.buttons.find((button) => button.action === "demo")?.label ?? "Demo";
	const codeLabel = data.buttons.find((button) => button.action === "code")?.label ?? (lang === "EN" ? "Code" : "Kode");
	const collapseLabel = lang === "EN" ? "Show Less" : "Sembunyikan";

	const displayedProjects = useMemo(() => {
		if (isExpanded) return data.content;
		return data.content.slice(0, 3);
	}, [data.content, isExpanded]);

	const handleToggleView = () => setIsExpanded((active) => !active);

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

	const openDetail = (project) => {
		setGalleryIndex(0);
		setSelectedProject(project);
	};

	const closeDetail = () => setSelectedProject(null);

	const handlePrevImage = () => {
		if (!selectedProject) return;
		setGalleryIndex((current) => (current - 1 + selectedProject.images.length) % selectedProject.images.length);
	};

	const handleNextImage = () => {
		if (!selectedProject) return;
		setGalleryIndex((current) => (current + 1) % selectedProject.images.length);
	};

	return (
		<section
			id="projects"
			ref={sectionRef}
			className={`projects-section${hasAnimatedOnce ? " animate-visible" : ""}`}
		>
			<div className="projects-panel">
				<div className="projects-heading">
					<h2 className="section-heading font-bold">{data.title}</h2>
				</div>
				<div className={`projects-grid ${isExpanded ? "projects-grid--expanded" : ""}`}>
					{displayedProjects.map((project) => (
						<article className="project-card" key={project.name}>
							<div className="project-image-frame">
								<Image
									src={`/images/${project.slug}/${project.images[0]}`}
									alt={`${project.name} showcase`}
									width={480}
									height={300}
									className="project-image"
									priority
								/>
							</div>
							<div className="project-copy">
								<h3 className="project-name">{project.name}</h3>
								<p className="project-description">{project.description}</p>
								<button type="button" className="project-detail-button" onClick={() => openDetail(project)}>
									{detailLabel}
								</button>
							</div>
						</article>
					))}
				</div>
				<div className="projects-actions">
					<button
						type="button"
						className={`project-see-more ${isExpanded ? "project-see-more--active" : ""}`}
						onClick={handleToggleView}
					>
						{isExpanded ? collapseLabel : moreLabel}
					</button>
				</div>
			</div>
			{selectedProject && (
				<ProjectDetail
					project={selectedProject}
					onClose={closeDetail}
					galleryIndex={galleryIndex}
					onPrevImage={handlePrevImage}
					onNextImage={handleNextImage}
					demoLabel={demoLabel}
					codeLabel={codeLabel}
					isUnavailable={isUnavailable}
				/>
			)}
		</section>
	);
}
