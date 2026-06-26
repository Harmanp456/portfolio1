"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  /** Simulated depth: 0 = far, 1 = close */
  z: number;
  vx: number;
  vy: number;
  baseSize: number;
  baseOpacity: number;
  /** Hub nodes are larger, brighter, emit pulse rings */
  isHub: boolean;
  /** 0..1 pulsing animation progress for hub rings */
  pulse: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let mouseX = -9999;
    let mouseY = -9999;
    const particles: Particle[] = [];

    /* ── Counts scaled for device capability ── */
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT    = isMobile ? 40 : 95;
    const HUB_COUNT         = isMobile ?  3 :  9;   // Large "neural hub" nodes
    const CONNECTION_DIST   = isMobile ? 80 : 145;  // Shorter on mobile for perf
    const MOUSE_RADIUS      = isMobile ?  0 : 230;  // No hover on touch
    const MAX_SPEED         = 0.38;

    /* ── Resize canvas (DPR-aware) ── */
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width  = window.innerWidth  * dpr;
      canvas!.height = window.innerHeight * dpr;
      canvas!.style.width  = `${window.innerWidth}px`;
      canvas!.style.height = `${window.innerHeight}px`;
      ctx!.scale(dpr, dpr);
    }

    /* ── Spawn particles ── */
    function createParticles() {
      particles.length = 0;
      let hubsCreated = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const isHub = hubsCreated < HUB_COUNT && Math.random() < 0.14;
        if (isHub) hubsCreated++;
        particles.push({
          x:           Math.random() * window.innerWidth,
          y:           Math.random() * window.innerHeight,
          z:           Math.random(),                              // depth 0–1
          vx:          (Math.random() - 0.5) * 0.22,
          vy:          (Math.random() - 0.5) * 0.22,
          baseSize:    isHub ? 2.6 + Math.random() * 1.0 : 0.6 + Math.random() * 1.1,
          baseOpacity: isHub ? 0.65 + Math.random() * 0.2 : 0.12 + Math.random() * 0.3,
          isHub,
          pulse:       Math.random(),                              // staggered ring anim
        });
      }
    }

    /* ── Main render loop ── */
    function draw() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

      /* Painter's algorithm — draw far particles first */
      particles.sort((a, b) => a.z - b.z);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        /* ── Movement ── */
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges with a small padding so particles don't pop
        if (p.x < -12) p.x = window.innerWidth  + 12;
        if (p.x > window.innerWidth  + 12) p.x = -12;
        if (p.y < -12) p.y = window.innerHeight + 12;
        if (p.y > window.innerHeight + 12) p.y = -12;

        // Slowly breathe depth ("z drifting")
        p.z += (Math.random() - 0.5) * 0.0008;
        p.z  = Math.max(0.05, Math.min(1, p.z));

        // Advance hub pulse ring
        if (p.isHub) p.pulse = (p.pulse + 0.007) % 1;

        /* ── Mouse repulsion ── */
        const dx   = p.x - mouseX;
        const dy   = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nearMouse = dist < MOUSE_RADIUS && MOUSE_RADIUS > 0;

        if (nearMouse && dist > 0) {
          const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.016;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Clamp & dampen speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > MAX_SPEED) { p.vx = (p.vx / spd) * MAX_SPEED; p.vy = (p.vy / spd) * MAX_SPEED; }
        p.vx *= 0.996;
        p.vy *= 0.996;

        /* ── Depth-based visual scale ── */
        const depthFactor  = 0.28 + p.z * 0.72;
        const size         = p.baseSize    * depthFactor * (nearMouse ? 1.5 : 1);
        const opacity      = p.baseOpacity * depthFactor * (nearMouse ? 1.6 : 1);

        /* ── Hub pulse ring — drawn BEFORE particle so it's behind ── */
        if (p.isHub) {
          const ringR   = size + p.pulse * 20;
          const ringAlp = (1 - p.pulse) * 0.18 * depthFactor;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, ringR, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(245,158,11,${ringAlp})`;
          ctx!.lineWidth   = 0.8;
          ctx!.stroke();
        }

        /* ── Particle fill ── */
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, size, 0, Math.PI * 2);
        if (nearMouse || p.isHub) {
          ctx!.fillStyle = `rgba(245,158,11,${opacity})`;
        } else {
          // Far/dim particles shift slightly blue-white for depth contrast
          const dim = Math.round(160 + p.z * 60);
          ctx!.fillStyle = `rgba(${dim},${dim},${dim+30},${opacity})`;
        }
        ctx!.fill();

        /* ── Soft glow around hubs & near-mouse particles ── */
        if ((p.isHub || nearMouse) && size > 0) {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, size * 3.5, 0, Math.PI * 2);
          const grd = ctx!.createRadialGradient(p.x, p.y, size * 0.4, p.x, p.y, size * 3.5);
          grd.addColorStop(0, `rgba(245,158,11,${opacity * 0.35})`);
          grd.addColorStop(1, "rgba(245,158,11,0)");
          ctx!.fillStyle = grd;
          ctx!.fill();
        }

        /* ── Neural connections ── */
        if (CONNECTION_DIST > 0) {
          for (let j = i + 1; j < particles.length; j++) {
            const q   = particles[j];
            const cdx = p.x - q.x;
            const cdy = p.y - q.y;
            const cd  = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cd >= CONNECTION_DIST) continue;

            const proximity   = 1 - cd / CONNECTION_DIST;
            const avgDepth    = (p.z + q.z) * 0.5;
            const isHubEdge   = p.isHub || q.isHub;

            /* Boost opacity when either endpoint is near the mouse */
            const nearEither  =
              MOUSE_RADIUS > 0 &&
              (Math.sqrt((p.x - mouseX) ** 2 + (p.y - mouseY) ** 2) < MOUSE_RADIUS ||
               Math.sqrt((q.x - mouseX) ** 2 + (q.y - mouseY) ** 2) < MOUSE_RADIUS);

            const lineAlp = proximity * 0.11 * avgDepth * (nearEither ? 2.8 : 1) * (isHubEdge ? 1.7 : 1);

            ctx!.beginPath();
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.strokeStyle = `rgba(245,158,11,${lineAlp})`;
            ctx!.lineWidth   = isHubEdge ? 0.9 : 0.5;
            ctx!.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(draw);
    }

    /* ── Event handlers ── */
    function handleMouseMove(e: MouseEvent) { mouseX = e.clientX; mouseY = e.clientY; }
    function handleMouseLeave()             { mouseX = -9999;     mouseY = -9999;     }

    function handleResize() { resize(); createParticles(); }

    resize();
    createParticles();
    draw();

    window.addEventListener("resize",    handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize",    handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.72 }}
    />
  );
}
