"use client";

import { useEffect, useState } from "react";
import { Mail, X } from "lucide-react";
import { createPortal } from "react-dom";

const initialState = {
	name: "",
	email: "",
	subject: "",
	message: "",
};

const ContactForm = ({ isOpen, onClose, recipient, formContent }) => {
	const [values, setValues] = useState(initialState);
	const [submissionStatus, setSubmissionStatus] = useState("idle");
	const [statusMessage, setStatusMessage] = useState("");

	useEffect(() => {
		if (!isOpen) return;
		setValues(initialState);
		setSubmissionStatus("idle");
		setStatusMessage("");
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return undefined;
		const html = document.documentElement;
		const body = document.body;
		const previousHtmlOverflow = html.style.overflow;
		const previousBodyOverflow = body.style.overflow;
		body.classList.add("contact-form-open");
		html.style.overflow = "hidden";
		body.style.overflow = "hidden";

		return () => {
			body.classList.remove("contact-form-open");
			html.style.overflow = previousHtmlOverflow;
			body.style.overflow = previousBodyOverflow;
		};
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const handleEscape = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	const handleChange = (key) => (event) => {
		setValues((prev) => ({ ...prev, [key]: event.target.value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!recipient) return;
		setSubmissionStatus("loading");
		setStatusMessage("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: values.name.trim(),
					email: values.email.trim(),
					subject: values.subject.trim(),
					message: values.message.trim(),
					recipient,
				}),
			});

			const payload = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(payload?.error || "Unable to send your message now.");
			}

			setSubmissionStatus("success");
			setStatusMessage("Message sent! I will respond soon.");
			setValues(initialState);
		} catch (error) {
			console.error("Contact form error", error);
			setSubmissionStatus("error");
			setStatusMessage(error?.message || "Something went wrong. Please try again.");
		}
	};

	const isSubmitting = submissionStatus === "loading";
	const statusText = submissionStatus === "loading" ? "Sending your message..." : statusMessage;

	if (!isOpen) return null;
	if (typeof document === "undefined") return null;

	const overlayMarkup = (
		<div
			className="contact-form-modal"
			role="dialog"
			aria-modal="true"
			aria-labelledby="contact-form-title"
			onClick={(event) => {
				if (event.target === event.currentTarget) {
					onClose();
				}
			}}
		>
			<div className="contact-form-card">
				<header className="contact-form-header">
					<div className="contact-form-title" id="contact-form-title">
						<Mail size={20} />
						<span>{formContent.title}</span>
					</div>
					<button
						type="button"
						className="contact-form-close"
						onClick={onClose}
						aria-label="Close contact form"
					>
						<X size={20} />
					</button>
				</header>
				<form className="contact-form-body" onSubmit={handleSubmit} aria-busy={isSubmitting}>
					{[
						{ key: "name", type: "text" },
						{ key: "email", type: "email" },
						{ key: "subject", type: "text" },
					].map((field) => (
						<div className="contact-form-field" key={field.key}>
							<label htmlFor={`contact-${field.key}`}>{formContent[field.key].label}</label>
							<input
								id={`contact-${field.key}`}
								name={field.key}
								type={field.type}
								placeholder={formContent[field.key].placeholder}
								value={values[field.key]}
								onChange={handleChange(field.key)}
								required
								disabled={isSubmitting}
							/>
						</div>
					))}
					<div className="contact-form-field">
						<label htmlFor="contact-message">{formContent.message.label}</label>
						<textarea
							id="contact-message"
							name="message"
							placeholder={formContent.message.placeholder}
							value={values.message}
							onChange={handleChange("message")}
							rows={4}
							required
							disabled={isSubmitting}
						/>
					</div>
					<div className="contact-form-buttons">
						{formContent.buttons.map((button) => {
							const isSend = button.action === "send";
							return (
								<button
									key={button.label}
									type={isSend ? "submit" : "button"}
									className={`contact-form-button ${
										isSend ? "contact-form-button--primary" : "contact-form-button--ghost"
									}`}
									onClick={isSend ? undefined : onClose}
									disabled={isSend && isSubmitting}
								>
									{button.label}
								</button>
							);
						})}
					</div>
				</form>
				{submissionStatus !== "idle" && (
					<p className={`contact-form-status contact-form-status--${submissionStatus}`} aria-live="polite">
						{statusText}
					</p>
				)}
				<div className="contact-form-note">{formContent.note}</div>
			</div>
		</div>
	);

	return createPortal(overlayMarkup, document.body);
};

export default ContactForm;
