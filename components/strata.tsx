"use client";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./icons";
function StaticStrata() {
  return (
    <svg viewBox="0 0 460 340" className="strata-fallback" aria-hidden="true">
      <defs>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#d9d4ca" />
        </pattern>
      </defs>
      <rect width="460" height="340" fill="url(#dots)" />
      {[190, 135, 80].map((y, i) => (
        <g key={y}>
          <path
            d={`M75 ${y + 10} 230 ${y - 68} 385 ${y + 10} 230 ${y + 88}Z`}
            fill={i === 1 ? "#1d4ed8" : "#f4f1ea"}
            stroke={i === 1 ? "#143fae" : "#b7b3ab"}
            strokeWidth="1"
          />
          <path
            d={`M75 ${y + 10}v14l155 78v-14m155-78v14l-155 78`}
            fill={i === 1 ? "#123dab" : "#e1ddd4"}
            stroke={i === 1 ? "#123dab" : "#b7b3ab"}
          />
          <path
            d={`M115 ${y + 10} 230 ${y - 48} 345 ${y + 10} 230 ${y + 68}Z`}
            fill="none"
            stroke={i === 1 ? "#7d9df5" : "#c6c1b7"}
            strokeWidth="1"
          />
        </g>
      ))}
      <path d="M230 43v246" stroke="#a1a1a1" strokeDasharray="3 8" />
    </svg>
  );
}
export function Strata() {
  const mount = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const explode = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    setEnabled(!reduced.matches && desktop.matches);
    const change = () => {
      if (reduced.matches) {
        setPlaying(false);
        paused.current = true;
      }
    };
    reduced.addEventListener("change", change);
    return () => reduced.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (!enabled || !mount.current) return;
    const host = mount.current;
    let cleanup = () => {};
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
    cleanup = () => {
      context.getExtension("WEBGL_lose_context")?.loseContext();
    };
    import("three")
      .then((THREE) => {
        if (cancelled) return;
        let renderer: InstanceType<typeof THREE.WebGLRenderer>;
        try {
          renderer = new THREE.WebGLRenderer({
            canvas,
            context,
            antialias: true,
            alpha: true,
            powerPreference: "low-power",
          });
        } catch {
          setFailed(true);
          setEnabled(false);
          return;
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
        renderer.setClearColor(0x000000, 0);
        host.appendChild(renderer.domElement);
        renderer.domElement.setAttribute("aria-hidden", "true");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
        camera.position.set(6, 5.2, 7);
        camera.lookAt(0, 0, 0);
        scene.add(new THREE.AmbientLight(0xffffff, 2.4));
        const light = new THREE.DirectionalLight(0xffffff, 3);
        light.position.set(3, 8, 5);
        scene.add(light);
        const group = new THREE.Group();
        scene.add(group);
        const plates: InstanceType<typeof THREE.Group>[] = [];
        const resources: { dispose: () => void }[] = [];
        const material = (c: number) => {
          const m = new THREE.MeshStandardMaterial({
            color: c,
            roughness: 0.6,
            metalness: 0.12,
          });
          resources.push(m);
          return m;
        };
        for (let i = 0; i < 3; i++) {
          const plate = new THREE.Group();
          const geo = new THREE.BoxGeometry(3.15, 0.12, 2.5);
          resources.push(geo);
          const mesh = new THREE.Mesh(
            geo,
            material(i === 1 ? 0x1d4ed8 : 0xe9e5dc),
          );
          plate.add(mesh);
          const edges = new THREE.EdgesGeometry(geo);
          const lineMat = new THREE.LineBasicMaterial({
            color: i === 1 ? 0x88a8ff : 0xaaa69c,
            transparent: true,
            opacity: 0.7,
          });
          resources.push(edges, lineMat);
          plate.add(new THREE.LineSegments(edges, lineMat));
          for (let j = 0; j < 5; j++) {
            const barGeo = new THREE.BoxGeometry(
              i === 2 ? 0.38 : 2.55,
              0.025,
              0.045,
            );
            resources.push(barGeo);
            const bar = new THREE.Mesh(
              barGeo,
              material(i === 1 ? 0x7196ef : 0xb8b2a5),
            );
            bar.position.set(
              i === 2 ? (j - 2) * 0.51 : 0,
              0.08,
              i === 2 ? 0 : (j - 2) * 0.36,
            );
            plate.add(bar);
          }
          const nodeGeo = new THREE.BoxGeometry(0.16, 0.07, 0.16);
          resources.push(nodeGeo);
          for (const x of [-1.35, 1.35])
            for (const z of [-1, 1]) {
              const node = new THREE.Mesh(
                nodeGeo,
                material(i === 1 ? 0xc7d5ff : 0x1d4ed8),
              );
              node.position.set(x, 0.1, z);
              plate.add(node);
            }
          plate.position.y = (1 - i) * 0.85;
          group.add(plate);
          plates.push(plate);
        }
        const grid = new THREE.GridHelper(7, 18, 0xd8d2c7, 0xe3ddd3);
        grid.position.y = -1.15;
        scene.add(grid);
        resources.push(
          grid.geometry,
          ...(Array.isArray(grid.material) ? grid.material : [grid.material]),
        );
        let width = 0,
          height = 0;
        const resize = () => {
          width = host.clientWidth;
          height = host.clientHeight;
          renderer.setSize(width, height);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };
        const observer = new ResizeObserver(resize);
        observer.observe(host);
        resize();
        let visible = true;
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        intersection.observe(host);
        const pointer = { x: 0, y: 0 };
        const move = (event: PointerEvent) => {
          const r = host.getBoundingClientRect();
          pointer.x = ((event.clientX - r.left) / r.width - 0.5) * 0.3;
          pointer.y = ((event.clientY - r.top) / r.height - 0.5) * 0.12;
        };
        const leave = () => {
          pointer.x = 0;
          pointer.y = 0;
        };
        host.addEventListener("pointermove", move);
        host.addEventListener("pointerleave", leave);
        let frame = 0,
          last = 0,
          phase = 0;
        function render(time: number) {
          frame = requestAnimationFrame(render);
          if (!visible || document.hidden || time - last < 32) return;
          const dt = Math.min((time - last) / 1000, 0.05);
          last = time;
          if (!paused.current) {
            phase += dt * 0.12;
            group.rotation.y = Math.sin(phase) * 0.15 + pointer.x;
            group.rotation.x = pointer.y;
          }
          plates.forEach((plate, i) => {
            const target = (1 - i) * (explode.current ? 1.35 : 0.85);
            plate.position.y += (target - plate.position.y) * 0.12;
          });
          renderer.render(scene, camera);
        }
        frame = requestAnimationFrame(render);
        setReady(true);
        const lost = (event: Event) => {
          event.preventDefault();
          setReady(false);
          setFailed(true);
          setEnabled(false);
        };
        renderer.domElement.addEventListener("webglcontextlost", lost);
        cleanup = () => {
          cancelAnimationFrame(frame);
          observer.disconnect();
          intersection.disconnect();
          host.removeEventListener("pointermove", move);
          host.removeEventListener("pointerleave", leave);
          renderer.domElement.removeEventListener("webglcontextlost", lost);
          resources.forEach((r) => r.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setEnabled(false);
        }
      });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [enabled]);
  return (
    <figure className="strata-panel">
      <div className="strata-head">
        <span className="eyebrow">System strata / 001</span>
        <Mark />
      </div>
      <div className="strata-stage">
        <div
          className={
            ready ? "strata-placeholder is-hidden" : "strata-placeholder"
          }
        >
          <StaticStrata />
        </div>
        <div className="strata-canvas" ref={mount} />
        <div className="layer-labels">
          <span>01 · Interface</span>
          <span>02 · Application</span>
          <span>03 · Data</span>
        </div>
      </div>
      <figcaption className="strata-caption">
        <span>Good software, layer by layer.</span>
        {ready ? (
          <div className="strata-controls">
            <button
              onClick={() => {
                const next = !playing;
                paused.current = !next;
                setPlaying(next);
              }}
              aria-label={playing ? "Pause 3D motion" : "Resume 3D motion"}
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={() => {
                explode.current = !expanded;
                setExpanded(!expanded);
              }}
              aria-pressed={expanded}
            >
              {expanded ? "Assemble" : "Explode"}{" "}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <button
            className="enable-3d"
            disabled={failed || enabled}
            onClick={() => {
              setEnabled(true);
              setPlaying(false);
              paused.current = true;
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
