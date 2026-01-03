import Link from "next/link";

export default function Button({ href, children, className = "", ...props }) {
	const baseStyles =
		"rounded-full border border-white/30 bg-transparent px-8 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-[var(--text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--container)]";

	if (href) {
		const isExternal =
			/^(https?:|mailto:|tel:)/.test(href);

		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					className={`${baseStyles} ${className}`.trim()}
					{...props}
				>
					{children}
				</a>
			);
		}

		return (
			<Link href={href} className={`${baseStyles} ${className}`.trim()} {...props}>
				{children}
			</Link>
		);
	}

	return (
		<button className={`${baseStyles} ${className}`.trim()} {...props}>
			{children}
		</button>
	);
}
