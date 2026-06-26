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
      canvas!.height = window.innerHeigh
<truncated 5380 bytes>
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
