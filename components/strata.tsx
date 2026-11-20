"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Mark } from "./icons";
import { palette } from "../lib/strata-palette";
import type { StrataScene } from "../lib/strata-scene";

function StaticStrata() {
	// useId can contain colons, which break url(#...) references
	const patternId = `dots-${useId().replace(/:/g, "")}`;
	return (
		<svg viewBox='0 0 460 340' className='strata-fallback' aria-hidden='true'>
			<defs>
				<pattern
					id={patternId}
					width='22'
					height='22'
					patternUnits='userSpaceOnUse'
				>
					<circle cx='1' cy='1' r='1' fill={palette.dot} />
				</pattern>
			</defs>
			<rect width='460' height='340' fill={`url(#${patternId})`} />
			{[190, 135, 80].map((y, i) => (
				<g key={y}>
					<path
						d={`M75 ${y + 10} 230 ${y - 68} 385 ${y + 10} 230 ${y + 88}Z`}
						fill={i === 1 ? palette.blue : palette.paper}
						stroke={i === 1 ? palette.blueEdge : palette.paperEdge}
						strokeWidth='1'
					/>
					<path
						d={`M75 ${y + 10}v14l155 78v-14m155-78v14l-155 78`}
						fill={i === 1 ? palette.blueSide : palette.paperSide}
						stroke={i === 1 ? palette.blueSide : palette.paperEdge}
					/>
					<path
						d={`M115 ${y + 10} 230 ${y - 48} 345 ${y + 10} 230 ${y + 68}Z`}
						fill='none'
						stroke={i === 1 ? palette.blueInner : palette.paperInner}
						strokeWidth='1'
					/>
				</g>
			))}
			<path d='M230 43v246' stroke={palette.axis} strokeDasharray='3 8' />
		</svg>
	);
}

export function Strata() {
	const mount = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<StrataScene | null>(null);
	const [enabled, setEnabled] = useState(false);
	const [ready, setReady] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [expanded, setExpanded] = useState(false);
	const [failed, setFailed] = useState(false);

	// Decide whether to auto-start 3D. Waits for an idle moment so Three.js
	// doesn't compete with the hero's first paint.
	useEffect(() => {
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");

		// Only ever turns 3D on: a manual "Explore in 3D" click must not be undone.
		const start = () => {
			if (!reduced.matches && desktop.matches) setEnabled(true);
		};
		const hasIdle = typeof window.requestIdleCallback === "function";
		const idleId = hasIdle
			? window.requestIdleCallback(start, { timeout: 2000 })
			: window.setTimeout(start, 800); // Safari has no requestIdleCallback

		const syncMotion = () => {
			if (reduced.matches) setPlaying(false);
		};
		syncMotion();
		reduced.addEventListener("change", syncMotion);

		return () => {
			if (hasIdle) window.cancelIdleCallback(idleId);
			else window.clearTimeout(idleId);
			reduced.removeEventListener("change", syncMotion);
		};
	}, []);

	// Create and tear down the 3D scene.
	useEffect(() => {
		if (!enabled || !mount.current) return;
		const host = mount.current;
		let cancelled = false;

		const canvas = document.createElement("canvas");
		const context = canvas.getContext("webgl2", {
			antialias: true,
			alpha: true,
			powerPreference: "low-power",
		});
		if (!context) {
			setFailed(true);
			setEnabled(false);
			return;
		}

		// Until the scene exists, cleanup just releases the context.
		let dispose = () => {
			context.getExtension("WEBGL_lose_context")?.loseContext();
		};

		import("../lib/strata-scene")
			.then(({ createStrataScene }) => {
				if (cancelled) return;
				const scene = createStrataScene({
					host,
					canvas,
					context,
					onContextLost: () => {
						setReady(false);
						setFailed(true);
						setEnabled(false); // triggers this effect's cleanup
					},
				});
				sceneRef.current = scene;
				dispose = () => {
					sceneRef.current = null;
					scene.dispose();
				};
				setReady(true);
			})
			.catch(() => {
				if (!cancelled) {
					setFailed(true);
					setEnabled(false);
				}
			});

		return () => {
			cancelled = true;
			dispose();
		};
	}, [enabled]);

	// Push React state into the scene. `ready` is a dependency so state set
	// before the scene existed (e.g. reduced motion) is applied once it does.
	useEffect(() => {
		sceneRef.current?.setPaused(!playing);
	}, [playing, ready]);

	useEffect(() => {
		sceneRef.current?.setExploded(expanded);
	}, [expanded, ready]);

	return (
		<figure className='strata-panel'>
			<div className='strata-head'>
				<span className='eyebrow'>System strata / 001</span>
				<Mark />
			</div>
			<div
				className='strata-stage'
				role='img'
				aria-label='Isometric illustration of three stacked layers: interface, application and data'
			>
				<div
					className={
						ready ? "strata-placeholder is-hidden" : "strata-placeholder"
					}
				>
					<StaticStrata />
				</div>
				<div className='strata-canvas' ref={mount} />
				<div className='layer-labels'>
					<span>01 · Interface</span>
					<span>02 · Application</span>
					<span>03 · Data</span>
				</div>
			</div>
			<figcaption className='strata-caption'>
				<span>Good software, layer by layer.</span>
				{ready ? (
					<div className='strata-controls'>
						<button
							onClick={() => setPlaying((p) => !p)}
							aria-label={playing ? "Pause 3D motion" : "Resume 3D motion"}
						>
							{playing ? "Pause" : "Play"}
						</button>
						{/* The label carries the state, so no aria-pressed (it would announce twice) */}
						<button onClick={() => setExpanded((e) => !e)}>
							{expanded ? "Assemble" : "Explode"}{" "}
							<span aria-hidden='true'>↗</span>
						</button>
					</div>
				) : (
					<button
						className='enable-3d'
						disabled={failed || enabled}
						onClick={() => {
							setEnabled(true);
							setPlaying(false); // manual start begins paused, as before
						}}
					>
						{failed
							? "Static view"
							: enabled
								? "Loading 3D…"
								: "Explore in 3D ↗"}
					</button>
				)}
			</figcaption>
		</figure>
	);
}
