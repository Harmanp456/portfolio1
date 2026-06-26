"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function RoomCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid setState directly during the effect's render phase.
    // React warns for setState in effect body; queue it instead.
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);


  if (!mounted) {
    return (
      <div className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] flex items-center justify-center bg-surface/30 rounded-3xl border border-accent/10 backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-secondary">Initializing 3D Space...</p>
        </div>
      </div>
    );
  }

  // NOTE: You can replace this scene URL with your own Spline scene export URL!
  const splineSceneUrl = "https://prod.spline.design/iKUiPpHUt7r4kyz9/scene.splinecode";

  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] relative select-none rounded-3xl overflow-hidden border border-accent/15 bg-surface/10 backdrop-blur-sm shadow-2xl">
      {/* Load Spline Viewer from the official unpkg CDN */}
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.21/build/spline-viewer.js"
        strategy="lazyOnload"
      />

      {/* Outer ambient glow matching layout themes */}
      <div className="absolute -inset-10 bg-gradient-to-tr from-accent/10 via-transparent to-accent-hot/5 rounded-full blur-3xl pointer-events-none" />

      {/* Spline 3D Scene custom element */}
      <div className="w-full h-full">
        <spline-viewer url={splineSceneUrl} />
      </div>

      {/* Stylized visual note overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-surface/75 backdrop-blur-md border border-accent/10 rounded-xl px-4 py-2.5 flex items-center justify-between text-[11px] font-mono z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-secondary">Interactive Spline 3D</span>
        </div>
        <span className="text-tertiary">Tilt & Rotate enabled</span>
      </div>
    </div>
  );
}
