"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let outerX = 0;
    let outerY = 0;
    let innerX = 0;
    let innerY = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = false;
    let frame: number;

    function lerp(start: number, end: number, factor: number) {
      return start + (end - start) * factor;
    }

    function loop() {
      // Outer follows slowly (ambient glow)
      outerX = lerp(outerX, targetX, 0.04);
      outerY = lerp(outerY, targetY, 0.04);
      outer!.style.left = `${outerX}px`;
      outer!.style.top = `${outerY}px`;

      // Inner follows faster (focused glow)
      innerX = lerp(innerX, targetX, 0.12);
      innerY = lerp(innerY, targetY, 0.12);
      inner!.style.left = `${innerX}px`;
      inner!.style.top = `${innerY}px`;

      frame = requestAnimationFrame(loop);
    }

    function handleMouseMove(e: MouseEvent) {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        visible = true;
        outer!.style.opacity = "1";
        inner!.style.opacity = "1";
      }
    }

    function handleMouseLeave() {
      visible = false;
      outer!.style.opacity = "0";
      inner!.style.opacity = "0";
    }

    // Only show on devices with fine pointers (not touch)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) {
      outer.style.display = "none";
      inner.style.display = "none";
      return;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-glow" style={{ opacity: 0 }} />
      <div ref={innerRef} className="cursor-glow-inner" style={{ opacity: 0 }} />
    </>
  );
}
