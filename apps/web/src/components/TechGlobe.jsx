'use client';

/* 3D technology globe — the design's tech-globe.js as a React component.
   Tech names are drawn to canvas textures and placed on a Fibonacci sphere
   as sprites. Auto-rotates, drag to spin with inertia, labels fade with
   depth and lift on hover. Pauses off-screen and on hidden tabs, renders
   one still frame under prefers-reduced-motion, and renders nothing at all
   without WebGL. */
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// key: rendered in brand colour
const TECHS = [
  { t: 'React', key: 1 }, { t: 'Next.js', key: 1 }, { t: 'TypeScript', key: 1 },
  { t: 'Node.js', key: 1 }, { t: 'Vue 3', key: 0 }, { t: 'Angular', key: 0 },
  { t: 'Tailwind', key: 0 }, { t: 'Three.js', key: 1 }, { t: 'GraphQL', key: 0 },
  { t: 'NestJS', key: 0 }, { t: 'Python', key: 1 }, { t: 'Django', key: 0 },
  { t: 'Laravel', key: 0 }, { t: 'PHP', key: 0 }, { t: '.NET', key: 0 },
  { t: 'PostgreSQL', key: 1 }, { t: 'MongoDB', key: 0 }, { t: 'MySQL', key: 0 },
  { t: 'Redis', key: 0 }, { t: 'Docker', key: 1 }, { t: 'Kubernetes', key: 0 },
  { t: 'AWS', key: 1 }, { t: 'Azure', key: 0 }, { t: 'Vercel', key: 0 },
  { t: 'Firebase', key: 0 }, { t: 'React Native', key: 1 }, { t: 'Flutter', key: 0 },
  { t: 'Figma', key: 0 }, { t: 'Terraform', key: 0 }, { t: 'Prisma', key: 0 },
  { t: 'Astro', key: 0 }, { t: 'GSAP', key: 0 },
];

const THEMES = {
  dark: { text: '#e9ecf7', accent: '#a99dff', fill: 'rgba(255,255,255,0.055)', stroke: 'rgba(255,255,255,0.16)', accentFill: 'rgba(109,94,252,0.16)', accentStroke: 'rgba(139,125,255,0.5)' },
  light: { text: '#232c52', accent: '#5647e8', fill: 'rgba(12,16,40,0.04)', stroke: 'rgba(12,16,40,0.12)', accentFill: 'rgba(109,94,252,0.1)', accentStroke: 'rgba(109,94,252,0.4)' },
};
const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

const RADIUS = 5.9; // at 4.6 the 32 labels overlapped illegibly
const FONT = '600 46px Sora, Inter, system-ui, sans-serif';

function makeLabel(item) {
  const c = isLight() ? THEMES.light : THEMES.dark;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const padX = 34, padY = 22;

  const measure = document.createElement('canvas').getContext('2d');
  measure.font = FONT;
  const w = Math.ceil(measure.measureText(item.t).width + padX * 2);
  const h = Math.ceil(46 + padY * 2);

  const cv = document.createElement('canvas');
  cv.width = w * dpr;
  cv.height = h * dpr;
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.fillStyle = item.key ? c.accentFill : c.fill;
  ctx.strokeStyle = item.key ? c.accentStroke : c.stroke;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.roundRect(1, 1, w - 2, h - 2, h / 2);
  ctx.fill();
  ctx.stroke();
  ctx.font = FONT;
  ctx.fillStyle = item.key ? c.accent : c.text;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(item.t, w / 2, h / 2 + 1);

  const texture = new THREE.CanvasTexture(cv);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 4;
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, ratio: w / h };
}

function hasWebGL() {
  try {
    const probe = document.createElement('canvas');
    return Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function TechGlobe({ className, style, label = 'Technologies we work with' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !hasWebGL()) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 13.5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);

    const globe = new THREE.Group();
    scene.add(globe);

    const sprites = TECHS.map((item, i) => {
      const { texture, ratio } = makeLabel(item);
      // Fibonacci sphere — even spacing, no clustering at the poles
      const phi = Math.acos(1 - (2 * (i + 0.5)) / TECHS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false }));
      sp.position.set(RADIUS * Math.sin(phi) * Math.cos(theta), RADIUS * Math.cos(phi), RADIUS * Math.sin(phi) * Math.sin(theta));
      const base = 0.58;
      sp.scale.set(base * ratio, base, 1);
      sp.userData = { baseX: base * ratio, baseY: base, hover: 0, index: i };
      globe.add(sp);
      return sp;
    });

    // faint wire sphere behind the labels
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(RADIUS - 1.5, 1),
      new THREE.MeshBasicMaterial({ color: 0x6d5efc, wireframe: true, transparent: true, opacity: isLight() ? 0.09 : 0.07, depthWrite: false }),
    );
    globe.add(wire);

    /* ---- interaction */
    const vel = { x: 0.0009, y: 0.0028 }; // idle drift
    const last = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-2, -2);
    const world = new THREE.Vector3();
    let dragging = false;
    let hovered = null;

    const pointerPos = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: -(((e.clientY - r.top) / r.height) * 2 - 1) };
    };
    const onDown = (e) => {
      dragging = true;
      last.x = e.clientX;
      last.y = e.clientY;
      try { canvas.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
    };
    const onMove = (e) => {
      const p = pointerPos(e);
      mouse.set(p.x, p.y);
      if (!dragging) return;
      vel.y = (e.clientX - last.x) * 0.0016;
      vel.x = (e.clientY - last.y) * 0.0016;
      globe.rotation.y += vel.y;
      globe.rotation.x = Math.max(-1.1, Math.min(1.1, globe.rotation.x + vel.x));
      last.x = e.clientX;
      last.y = e.clientY;
      if (reduced) render();
    };
    const endDrag = () => { dragging = false; };
    const onLeave = () => { endDrag(); mouse.set(-2, -2); };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove, { passive: true });
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
    canvas.addEventListener('pointerleave', onLeave);

    /* ---- sizing */
    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.position.z = w < 480 ? 16.5 : w < 700 ? 14.6 : 13.5;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
    };
    const ro = new ResizeObserver(() => { resize(); if (!running) render(); });
    ro.observe(canvas);

    /* ---- render loop */
    function render() {
      for (const sp of sprites) {
        sp.getWorldPosition(world);
        const depth = (world.z + RADIUS) / (RADIUS * 2); // 0 = far, 1 = near
        sp.userData.hover += ((hovered === sp ? 1 : 0) - sp.userData.hover) * 0.18;
        sp.material.opacity = Math.max(0.16, Math.pow(depth, 1.25)) * (0.75 + sp.userData.hover * 0.25);
        const s = 0.85 + depth * 0.25 + sp.userData.hover * 0.18;
        sp.scale.set(sp.userData.baseX * s, sp.userData.baseY * s, 1);
      }
      renderer.render(scene, camera);
    }

    let visible = false, running = false, raf = 0;
    function frame() {
      if (!visible || document.hidden) { running = false; return; }
      running = true;
      raf = requestAnimationFrame(frame);
      if (!dragging) {
        // ease drag inertia back toward the idle drift
        vel.y += (0.0028 - vel.y) * 0.02;
        vel.x += (0 - vel.x) * 0.06;
        globe.rotation.y += vel.y;
        globe.rotation.x = Math.max(-1.1, Math.min(1.1, globe.rotation.x + vel.x));
      }
      wire.rotation.y -= 0.0012;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(sprites, false);
      hovered = hits.length ? hits[0].object : null;
      canvas.style.cursor = dragging ? 'grabbing' : hovered ? 'pointer' : 'grab';
      render();
    }
    const start = () => { if (!running && !reduced) frame(); };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) { resize(); if (reduced) render(); else start(); }
    }, { threshold: 0.05 });
    io.observe(canvas);

    const onVisibility = () => { if (!document.hidden && visible) start(); };
    document.addEventListener('visibilitychange', onVisibility);

    // Colours are baked into the label textures — redraw them on theme change.
    const onTheme = () => {
      for (const sp of sprites) {
        sp.material.map?.dispose();
        sp.material.map = makeLabel(TECHS[sp.userData.index]).texture;
        sp.material.needsUpdate = true;
      }
      wire.material.opacity = isLight() ? 0.09 : 0.07;
      render();
    };
    document.addEventListener('inovexia:theme', onTheme);

    resize();
    if (reduced) { globe.rotation.set(0.15, 0.6, 0); render(); }

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      visible = false;
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      document.removeEventListener('inovexia:theme', onTheme);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', endDrag);
      canvas.removeEventListener('pointercancel', endDrag);
      canvas.removeEventListener('pointerleave', onLeave);
      for (const sp of sprites) { sp.material.map?.dispose(); sp.material.dispose(); }
      wire.geometry.dispose();
      wire.material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={style} role="img" aria-label={label} />;
}
