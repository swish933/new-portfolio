import type { CSSProperties } from "react";
export function Arrow({
	direction = "up-right",
	className = "",
}: {
	direction?: "up-right" | "right" | "down" | "left";
	className?: string;
}) {
	const rotations = { "up-right": 0, right: 45, down: 135, left: 225 };
	return (
		<svg
			className={className}
			width='18'
			height='18'
			viewBox='0 0 24 24'
			fill='none'
			aria-hidden='true'
			style={
				{
					"--rotate": `${rotations[direction]}deg`,
					transform: `rotate(${rotations[direction]}deg)`,
				} as CSSProperties
			}
		>
			<path d='M5 19 19 5M5 5h14v14' stroke='currentColor' strokeWidth='1.5' />
		</svg>
	);
}
export function Mark() {
	return (
		<svg
			viewBox='0 0 36 36'
			width='32'
			height='32'
			fill='none'
			aria-hidden='true'
		>
			<path
				d='m4 12 14-8 14 8-14 8L4 12Zm0 6 14 8 14-8M4 24l14 8 14-8'
				stroke='currentColor'
				strokeWidth='1.3'
			/>
		</svg>
	);
}
