'use client';
import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;

    // Dynamically load Three.js and init molecule
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
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = window.innerWidth <= 768 ? 34 : 30;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);
      onResize();

      function animate() {
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

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <header className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <canvas ref={canvasRef} id="molecule-canvas" />
        <div className="molecule-label tl">
          Backbone chain<br />
          <span>C₆₂H₉₈N₁₆O₂₂</span>
        </div>
        <div className="molecule-label br">
          BPC-157 — research peptide<br />
          <span>Tissue repair · Angiogenesis</span>
        </div>
      </div>

      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="dot" />
          Research Index · Est. 2026
        </div>
        <h1>
          The reference<br />
          for <em>peptide</em><br />
          research.
        </h1>
        <p className="hero-sub">
          An independent index of 33 research peptides, 12 curated stacks, and 140+ peer-reviewed studies — verified against third-party Certificates of Analysis. Built for those who read the data, not the hype.
        </p>
        <div className="hero-ctas">
          <a href="#library" className="btn-primary">
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
