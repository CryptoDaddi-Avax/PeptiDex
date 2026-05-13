'use client';
import { useEffect, useRef } from 'react';
import { peptides } from '@/data/peptides';
import { stacks } from '@/data/stacks';
import './Hero.css';

const PEPTIDE_COUNT = peptides.length;
const STUDY_COUNT = peptides.reduce((sum, p) => sum + p.key_studies.length, 0);
const STACK_COUNT = stacks.length;

interface HeroProps {
  onSearchOpen?: () => void;
}

export default function Hero({ onSearchOpen }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let animId: number;
    let isVisible = true;
    let cleanupResize: (() => void) | undefined;
    let cleanupVisibility: (() => void) | undefined;
    let scriptInjected = false;

    // ── PERFORMANCE FIX: defer Three.js load until canvas is near the viewport.
    // Previously the script was injected immediately on mount, landing in the
    // LCP window and causing 750ms TBT. Now it only loads when the user is
    // about to actually see the helix — or on low-end devices that took longer
    // to render above-the-fold content.
    const loadObserver = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || scriptInjected) return;
        scriptInjected = true;
        loadObserver.disconnect();

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
          const THREE = (window as any).THREE;
          if (!THREE) return;

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
          camera.position.z = 30;

          const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

          const ambient = new THREE.AmbientLight(0xffffff, 0.3);
          scene.add(ambient);
          const keyLight = new THREE.DirectionalLight(0xc9a961, 1.2);
          keyLight.position.set(5, 8, 10);
          scene.add(keyLight);
          const fillLight = new THREE.DirectionalLight(0x4a9eff, 0.3);
          fillLight.position.set(-8, -4, 4);
          scene.add(fillLight);
          const rimLight = new THREE.PointLight(0xe8c987, 2, 30);
          rimLight.position.set(-5, 3, -8);
          scene.add(rimLight);

          const molecule = new THREE.Group();
          scene.add(molecule);

          const numResidues = 12;
          const helixRadius = 2.7;
          const helixPitch = 0.72;
          const residuesPerTurn = 4;

          const colors = { alpha: 0xe8c987, nitrogen: 0x4a9eff, oxygen: 0xd4832a, carbon: 0xd8d2c2 };
          const atomData: any[] = [];

          for (let i = 0; i < numResidues; i++) {
            const t = i / residuesPerTurn;
            const angle = t * Math.PI * 2;
            const y = (i - numResidues / 2) * helixPitch;
            const x = Math.cos(angle) * helixRadius;
            const z = Math.sin(angle) * helixRadius;

            const alpha = new THREE.Mesh(
              new THREE.SphereGeometry(0.28, 24, 24),
              new THREE.MeshPhongMaterial({ color: colors.alpha, shininess: 80, emissive: 0xc9a961, emissiveIntensity: 0.15 })
            );
            alpha.position.set(x, y, z);
            molecule.add(alpha);

            const n = new THREE.Mesh(
              new THREE.SphereGeometry(0.2, 20, 20),
              new THREE.MeshPhongMaterial({ color: colors.nitrogen, shininess: 90, emissive: 0x1a3a66, emissiveIntensity: 0.2 })
            );
            const nAngle = angle - 0.3;
            n.position.set(Math.cos(nAngle) * (helixRadius + 0.6), y + 0.2, Math.sin(nAngle) * (helixRadius + 0.6));
            molecule.add(n);

            const o = new THREE.Mesh(
              new THREE.SphereGeometry(0.19, 20, 20),
              new THREE.MeshPhongMaterial({ color: colors.oxygen, shininess: 100, emissive: 0x6b3f14, emissiveIntensity: 0.3 })
            );
            const oAngle = angle + 0.3;
            o.position.set(Math.cos(oAngle) * (helixRadius + 0.5), y - 0.15, Math.sin(oAngle) * (helixRadius + 0.5));
            molecule.add(o);

            const side = new THREE.Mesh(
              new THREE.SphereGeometry(0.17, 18, 18),
              new THREE.MeshPhongMaterial({ color: colors.carbon, shininess: 60, emissive: 0x2a2a28, emissiveIntensity: 0.2 })
            );
            side.position.set(Math.cos(angle + 0.8) * (helixRadius - 1.4), y + 0.4, Math.sin(angle + 0.8) * (helixRadius - 1.4));
            molecule.add(side);

            atomData.push({ alpha, n, o, side });
          }

          // Bonds
          function makeBond(a: any, b: any, color = 0xa8a196, radius = 0.06) {
            const dir = new THREE.Vector3().subVectors(b.position, a.position);
            const len = dir.length();
            const geo = new THREE.CylinderGeometry(radius, radius, len, 8);
            const mat = new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.7 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.copy(a.position).add(b.position).multiplyScalar(0.5);
            mesh.lookAt(b.position);
            mesh.rotateX(Math.PI / 2);
            molecule.add(mesh);
          }
          for (let i = 0; i < atomData.length - 1; i++) makeBond(atomData[i].alpha, atomData[i + 1].alpha, 0xc9a961, 0.065);
          for (let i = 0; i < atomData.length; i++) {
            makeBond(atomData[i].alpha, atomData[i].n, 0x6b6860, 0.04);
            makeBond(atomData[i].alpha, atomData[i].o, 0x6b6860, 0.04);
            makeBond(atomData[i].alpha, atomData[i].side, 0x6b6860, 0.03);
          }

          // Particles
          const pGeo = new THREE.BufferGeometry();
          const pPos = new Float32Array(80 * 3);
          for (let i = 0; i < 80; i++) { pPos[i*3]=(Math.random()-0.5)*30; pPos[i*3+1]=(Math.random()-0.5)*20; pPos[i*3+2]=(Math.random()-0.5)*30; }
          pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
          const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xc9a961, size: 0.04, transparent: true, opacity: 0.6, sizeAttenuation: true }));
          scene.add(particles);

          molecule.scale.set(0.01, 0.01, 0.01);
          let entryProgress = 0;
          const clock = new THREE.Clock();

          const onResize = () => {
            const w = canvas.clientWidth, h = canvas.clientHeight;
            if (w === 0 || h === 0) return;
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            if (window.innerWidth <= 480) {
              camera.position.z = 16;
            } else if (window.innerWidth <= 768) {
              camera.position.z = 18;
            } else {
              camera.position.z = 30;
            }
            camera.updateProjectionMatrix();
          };
          window.addEventListener('resize', onResize);
          cleanupResize = () => window.removeEventListener('resize', onResize);
          onResize();

          // Pause/resume animation when hero scrolls off-screen
          const visibilityObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                  clock.start();
                  animId = requestAnimationFrame(animate);
                }
              });
            },
            { threshold: 0 }
          );
          visibilityObserver.observe(container);
          cleanupVisibility = () => visibilityObserver.disconnect();

          function animate() {
            if (!isVisible) return;
            animId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            if (entryProgress < 1) {
              entryProgress += 0.012;
              const eased = 1 - Math.pow(1 - Math.min(1, entryProgress), 3);
              molecule.scale.set(eased, eased, eased);
            }
            molecule.rotation.y += 0.003;
            if (entryProgress >= 1) {
              const breathe = Math.sin(t * 0.6) * 0.015 + 1;
              molecule.scale.setScalar(breathe);
            }
            particles.rotation.y += 0.0008;
            rimLight.intensity = 2 + Math.sin(t * 1.2) * 0.4;
            renderer.render(scene, camera);
          }
          animate();
        };
        document.head.appendChild(script);
      },
      // 200px rootMargin: begin loading slightly before the canvas enters the viewport
      { rootMargin: '200px', threshold: 0 }
    );
    loadObserver.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      loadObserver.disconnect();
      cleanupResize?.();
      cleanupVisibility?.();
    };
  }, []);

  return (
    <header className="hero">
      {/* Background effects — grid + radial gradients */}
      <div className="hero-bg">
        <div className="hero-grid" />
      </div>

      {/* Desktop molecule labels — positioned absolutely over the canvas area */}
      <div className="molecule-label tl">
        Backbone chain<br />
        <span>C₆₂H₉₈N₁₆O₂₂</span>
      </div>
      <div className="molecule-label br">
        BPC-157 — research peptide<br />
        <span>Tissue repair · Angiogenesis</span>
      </div>

      {/* Main layout container */}
      <div className="hero-layout">
        {/* Top row: on mobile this becomes a 2-column grid (headline | helix) */}
        <div className="hero-top">
          <div className="hero-text-col">
            <div className="hero-eyebrow">
              <span className="dot" />
              Research Index · Est. 2026
            </div>
            <h1>
              The reference<br />
              for <em>peptide</em><br />
              research.
            </h1>
            <h2 className="hero-kicker">
              Research peptides indexed: BPC-157, Tesamorelin, Semaglutide, Tirzepatide, and {PEPTIDE_COUNT - 4} more
            </h2>
          </div>

          {/* Three.js canvas — grid cell on mobile, absolute on desktop */}
          <div className="hero-molecule" ref={containerRef}>
            <canvas ref={canvasRef} id="molecule-canvas" />
          </div>
        </div>

        {/* Below the top row: paragraph + CTAs — always full width, never overlapped */}
        <div className="hero-bottom">
          <p className="hero-sub">
            An independent index of {PEPTIDE_COUNT} research peptides, {STACK_COUNT} curated stacks, and {STUDY_COUNT}+ peer-reviewed studies — verified against third-party Certificates of Analysis. Built for those who read the data, not the hype.
          </p>
          <div className="hero-ctas">
            <a href="/library" className="btn-primary">
              <span>Enter the library</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M9 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <button className="btn-ghost" onClick={onSearchOpen}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: -4 }}>
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              Search the index
            </button>
          </div>

        </div>
      </div>

      <div className="hero-meta">
        <div>
          <div>Vol. I · Edition 2026</div>
          <div style={{ marginTop: 6, color: 'var(--gold)' }}>Independent · Evidence-based</div>
        </div>
        <div className="scroll-hint">
          <div>Scroll</div>
          <div className="scroll-line" />
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Peer-reviewed index</div>
          <div style={{ marginTop: 6 }}>COA-verified sourcing</div>
        </div>
      </div>
    </header>
  );
}
