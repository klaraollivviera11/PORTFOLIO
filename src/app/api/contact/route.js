import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const CONTACT_RECIPIENT_EMAIL =
	process.env.CONTACT_RECIPIENT_EMAIL ?? "klaraolivierra11@gmail.com";
const SENDGRID_FROM_EMAIL =
	process.env.SENDGRID_FROM_EMAIL ?? "no-reply@klara-portfolio.app";

if (SENDGRID_API_KEY) {
	sgMail.setApiKey(SENDGRID_API_KEY);
}

const escapeHtml = (value = "") =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");

export async function POST(req) {
	if (!SENDGRID_API_KEY) {
		return NextResponse.json(
			{ error: "Mail service is not configured." },
			{ status: 500 }
		);
	}

	let payload;
	try {
		payload = await req.json();
	} catch (error) {
		return NextResponse.json(
			{ error: "Invalid request payload." },
			{ status: 400 }
		);
	}

	const { name, email, subject, message } = payload ?? {};

	if (!name || !email || !message) {
		return NextResponse.json(
			{ error: "Name, email, and message are required." },
			{ status: 400 }
		);
	}

	const trimmedName = name.trim();
	const trimmedEmail = email.trim();
	const trimmedMessage = message.trim();
	const trimmedSubject = subject?.trim();
	const finalSubject = trimmedSubject
		? `[Portfolio] ${trimmedSubject}`
		: "[Portfolio] New contact message";

	const textBody = [
		`Name: ${trimmedName}`,
		`Email: ${trimmedEmail}`,
		"",
		trimmedMessage,
	].join("\n");

	const htmlBody = `<p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
<p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</p>`;

	try {
		await sgMail.send({
			to: CONTACT_RECIPIENT_EMAIL,
			from: SENDGRID_FROM_EMAIL,
			replyTo: trimmedEmail,
			subject: finalSubject,
			text: textBody,
			html: htmlBody,
		});

		return NextResponse.json({ status: "sent" });
	} catch (error) {
		console.error("Failed to send contact email", error);
		const errorMessage =
			error?.response?.body?.errors?.[0]?.message ||
			error?.message ||
			"Unable to deliver the message.";

		return NextResponse.json(
			{ error: errorMessage },
			{ status: 500 }
		);
	}
}
