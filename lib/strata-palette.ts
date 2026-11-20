// Single source of truth for the strata colours.
// Shared by the SVG fallback (strata.tsx) and the Three.js scene (strata-scene.ts).
export const palette = {
	// Accent layer
	blue: "#1d4ed8",
	blueEdge: "#143fae",
	blueSide: "#123dab",
	blueInner: "#7d9df5",

	// Neutral layers (SVG)
	paper: "#f4f1ea",
	paperEdge: "#b7b3ab",
	paperSide: "#e1ddd4",
	paperInner: "#c6c1b7",
	dot: "#d9d4ca",
	axis: "#a1a1a1",

	// 3D scene
	plate: "#e9e5dc",
	plateEdgeBlue: "#88a8ff",
	plateEdgeNeutral: "#aaa69c",
	barBlue: "#7196ef",
	barNeutral: "#b8b2a5",
	nodeLight: "#c7d5ff",
	gridMajor: "#d8d2c7",
	gridMinor: "#e3ddd3",
} as const;
