"use client";

import { useRef, useCallback, type MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. Default: 10 */
  maxTilt?: number;
  /** Scale factor when hovered. Default: 1.02 */
  scale?: number;
  /** Show glare / shine highlight. Default: true */
  glare?: boolean;
}

/**
 * TiltCard — adds a smooth 3D perspective tilt + glare effect on mouse hover.
 * Only activates on fine-pointer (mouse) devices; touch users get pass-through.
 * Uses rAF + inline styles for butter-smooth 60 fps with zero JS framework overhead.
 */
export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId    = useRef<number>(0);

  /* Detect once — avoids repeated matchMedia calls every mousemove */
  const isFinePtrRef = useRef<boolean | null>(null);
  const isFinePtr = () => {
    if (isFinePtrRef.current === null) {
      isFinePtrRef.current =
        typeof window !== "undefined"
          ? window.matchMedia("(pointer: fine)").matches
          : false;
    }
    return isFinePtrRef.current;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isFinePtr()) return;
      const el = wrapRef.current;
      if (!el) return;

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0 → 1
        const y = (e.clientY - rect.top)  / rect.height;  // 0 → 1

        /* rotateX: positive = top tilts BACK (cursor at top → front tilts up) */
        const rx = (0.5 - y) * maxTilt * 2;
        const ry = (x - 0.5) * maxTilt * 2;

        el.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(${scale},${scale},${scale})`;
        el.style.transition = "transform 0.08s linear";

        if (glare && glareRef.current) {
          const angleDeg = Math.atan2(y - 0.5, x - 0.5) * (180 / Math.PI) + 90;
          glareRef.current.style.background = `linear-gradient(${angleDeg}deg, rgba(245,158,11,0.14) 0%, transparent 55%)`;
          glareRef.current.style.opacity    = "1";
        }
      });
    },
    [maxTilt, scale, glare],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isFinePtr()) return;
    cancelAnimationFrame(rafId.current);
    const el = wrapRef.current;
    if (!el) return;
    el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
    if (glare && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, [glare]);

  return (
    <div
      ref={wrapRef}
      className={`tilt-wrap ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {glare && (
        <div
          ref={glareRef}
          className="tilt-glare"
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}
