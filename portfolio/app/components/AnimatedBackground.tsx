"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;

    type VantaInstance = { destroy: () => void } | undefined;
    let vantaEffect: VantaInstance;

    const w = window as unknown as {
      THREE?: unknown;
      VANTA?: { NET?: (opts: unknown) => VantaInstance };
    };



    const initVanta = () => {
      const THREE = w.THREE;
      const VANTA = w.VANTA;



      if (THREE && VANTA && containerRef.current && !vantaEffect) {
        try {
          const netFn = VANTA.NET as ((opts: unknown) => VantaInstance) | undefined;
          vantaEffect = netFn?.({
            el: containerRef.current,
            THREE: THREE,

            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xfc4a1f,            // Accent Coral/Orange
            // Make the background a bit lighter so the animation is not too dark
            backgroundColor: 0x111111,  // was 0x030303
            points: 12.00,
            maxDistance: 20.00,
            spacing: 16.00
          });
        } catch (err) {
          console.error("Vanta.NET failed to initialize:", err);
        }
      }
    };

    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };

    const startLoading = () => {
      const THREE = w.THREE;
      const VANTA = w.VANTA;



      if (!THREE) {
        script1 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js", () => {
          if (!VANTA) {
            script2 = loadScript("https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js", () => {
              initVanta();
            });
          } else {
            initVanta();
          }
        });
      } else if (!VANTA) {
        script2 = loadScript("https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js", () => {
          initVanta();
        });
      } else {
        initVanta();
      }
    };

    // Delay initialization slightly to ensure window variables bind correctly
    const t = setTimeout(startLoading, 50);

    return () => {
      clearTimeout(t);
      if (vantaEffect) {
        try {
          vantaEffect.destroy();
        } catch (err) {
          console.error("Vanta.NET destroy/init error:", err);
        }

      }
      if (script1 && document.body.contains(script1)) {
        try {
          document.body.removeChild(script1);
        } catch {
          // ignore
        }
      }
      if (script2 && document.body.contains(script2)) {
        try {
          document.body.removeChild(script2);
        } catch {
          // ignore
        }
      }

    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  );
}
