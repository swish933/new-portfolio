import * as THREE from "three";
import { palette } from "../lib/strata-palette";

export interface StrataScene {
	setPaused: (paused: boolean) => void;
	setExploded: (exploded: boolean) => void;
	dispose: () => void;
}

interface StrataSceneOptions {
	host: HTMLElement;
	canvas: HTMLCanvasElement;
	context: WebGL2RenderingContext;
	onContextLost: () => void;
}

const FRAME_MS = 32; // ~30fps cap
const EASE_RATE = 7; // higher = snappier easing
const GAP_ASSEMBLED = 0.85;
const GAP_EXPLODED = 1.35;
const LAYER_COUNT = 3;

export function createStrataScene({
	host,
	canvas,
	context,
	onContextLost,
}: StrataSceneOptions): StrataScene {
	const renderer = new THREE.WebGLRenderer({
		canvas,
		context,
		antialias: true,
		alpha: true,
		powerPreference: "low-power",
	});
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
	renderer.setClearColor(0x000000, 0);
	canvas.setAttribute("aria-hidden", "true");
	host.appendChild(canvas);

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
	camera.position.set(6, 5.2, 7);
	camera.lookAt(0, 0, 0);

	scene.add(new THREE.AmbientLight(0xffffff, 2.4));
	const light = new THREE.DirectionalLight(0xffffff, 3);
	light.position.set(3, 8, 5);
	scene.add(light);

	// ---- Resource tracking (everything here is disposed in dispose()) ----
	const disposables: { dispose: () => void }[] = [];
	const own = <T extends { dispose: () => void }>(resource: T): T => {
		disposables.push(resource);
		return resource;
	};

	// Materials are cached by colour so ~30 meshes share ~6 materials.
	const materials = new Map<string, THREE.MeshStandardMaterial>();
	const material = (color: string) => {
		let m = materials.get(color);
		if (!m) {
			m = own(
				new THREE.MeshStandardMaterial({
					color,
					roughness: 0.6,
					metalness: 0.12,
				}),
			);
			materials.set(color, m);
		}
		return m;
	};

	const lineMaterials = new Map<string, THREE.LineBasicMaterial>();
	const lineMaterial = (color: string) => {
		let m = lineMaterials.get(color);
		if (!m) {
			m = own(
				new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 }),
			);
			lineMaterials.set(color, m);
		}
		return m;
	};

	// Geometries are shared across all plates.
	const plateGeo = own(new THREE.BoxGeometry(3.15, 0.12, 2.5));
	const edgesGeo = own(new THREE.EdgesGeometry(plateGeo));
	const railGeo = own(new THREE.BoxGeometry(2.55, 0.025, 0.045));
	const tickGeo = own(new THREE.BoxGeometry(0.38, 0.025, 0.045));
	const nodeGeo = own(new THREE.BoxGeometry(0.16, 0.07, 0.16));

	// ---- Plates ----
	const group = new THREE.Group();
	scene.add(group);
	const plates: THREE.Group[] = [];

	for (let i = 0; i < LAYER_COUNT; i++) {
		const accent = i === 1;
		const plate = new THREE.Group();

		plate.add(
			new THREE.Mesh(plateGeo, material(accent ? palette.blue : palette.plate)),
		);
		plate.add(
			new THREE.LineSegments(
				edgesGeo,
				lineMaterial(accent ? palette.plateEdgeBlue : palette.plateEdgeNeutral),
			),
		);

		const barGeo = i === 2 ? tickGeo : railGeo;
		const barMat = material(accent ? palette.barBlue : palette.barNeutral);
		for (let j = 0; j < 5; j++) {
			const bar = new THREE.Mesh(barGeo, barMat);
			bar.position.set(
				i === 2 ? (j - 2) * 0.51 : 0,
				0.08,
				i === 2 ? 0 : (j - 2) * 0.36,
			);
			plate.add(bar);
		}

		const nodeMat = material(accent ? palette.nodeLight : palette.blue);
		for (const x of [-1.35, 1.35]) {
			for (const z of [-1, 1]) {
				const node = new THREE.Mesh(nodeGeo, nodeMat);
				node.position.set(x, 0.1, z);
				plate.add(node);
			}
		}

		plate.position.y = (1 - i) * GAP_ASSEMBLED;
		group.add(plate);
		plates.push(plate);
	}

	const grid = new THREE.GridHelper(
		7,
		18,
		palette.gridMajor,
		palette.gridMinor,
	);
	grid.position.y = -1.15;
	scene.add(grid);
	disposables.push(
		grid.geometry,
		...(Array.isArray(grid.material) ? grid.material : [grid.material]),
	);

	// ---- State ----
	let paused = false;
	let exploded = false;
	let needsRender = true;
	let visible = true;
	let phase = 0;
	let last = 0;
	let raf = 0;
	const pointer = { x: 0, y: 0 };

	// ---- Sizing / visibility / pointer ----
	const resize = () => {
		const width = host.clientWidth;
		const height = host.clientHeight;
		renderer.setSize(width, height);
		camera.aspect = width / Math.max(height, 1);
		camera.updateProjectionMatrix();
		renderer.render(scene, camera);
	};
	const resizeObserver = new ResizeObserver(resize);
	resizeObserver.observe(host);
	resize();

	const intersection = new IntersectionObserver(([entry]) => {
		visible = entry.isIntersecting;
		if (visible) needsRender = true;
	});
	intersection.observe(host);

	const onMove = (event: PointerEvent) => {
		const r = host.getBoundingClientRect();
		pointer.x = ((event.clientX - r.left) / r.width - 0.5) * 0.3;
		pointer.y = ((event.clientY - r.top) / r.height - 0.5) * 0.12;
	};
	const onLeave = () => {
		pointer.x = 0;
		pointer.y = 0;
	};
	host.addEventListener("pointermove", onMove);
	host.addEventListener("pointerleave", onLeave);

	const onLost = (event: Event) => {
		event.preventDefault();
		onContextLost();
	};
	canvas.addEventListener("webglcontextlost", onLost);

	// ---- Render loop: only draws when something actually changed ----
	const frame = (time: number) => {
		raf = requestAnimationFrame(frame);
		if (!visible || document.hidden || time - last < FRAME_MS) return;

		const dt = Math.min((time - last) / 1000, 0.05);
		last = time;
		const k = 1 - Math.exp(-dt * EASE_RATE); // frame-rate independent easing
		let dirty = needsRender;
		needsRender = false;

		if (!paused) {
			phase += dt * 0.12;
			group.rotation.y +=
				(Math.sin(phase) * 0.15 + pointer.x - group.rotation.y) * k;
			group.rotation.x += (pointer.y - group.rotation.x) * k;
			dirty = true;
		}

		const gap = exploded ? GAP_EXPLODED : GAP_ASSEMBLED;
		for (let i = 0; i < plates.length; i++) {
			const delta = (1 - i) * gap - plates[i].position.y;
			if (Math.abs(delta) > 0.0005) {
				plates[i].position.y += delta * k;
				dirty = true;
			}
		}

		if (dirty) renderer.render(scene, camera);
	};
	raf = requestAnimationFrame(frame);

	return {
		setPaused(value) {
			paused = value;
		},
		setExploded(value) {
			exploded = value;
			needsRender = true;
		},
		dispose() {
			cancelAnimationFrame(raf);
			resizeObserver.disconnect();
			intersection.disconnect();
			host.removeEventListener("pointermove", onMove);
			host.removeEventListener("pointerleave", onLeave);
			canvas.removeEventListener("webglcontextlost", onLost);
			disposables.forEach((d) => d.dispose());
			renderer.dispose();
			renderer.forceContextLoss(); // release the GL context (browsers cap them)
			canvas.remove();
		},
	};
}
