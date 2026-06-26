"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/* ─────────────────────────────────────────────
   AnimatedGirlCard
   A glassmorphism card containing a GSAP-animated
   SVG illustration of a girl coding at her laptop.
   Animations:
     • Whole figure: gentle float up / down
     • Hair: subtle sway left / right
     • Laptop screen: soft glow pulse
     • Blinking cursor on screen
     • Typing hand micro-bounce
     • Sparkle particles: staggered appear / vanish
   ───────────────────────────────────────────── */
export default function AnimatedGirlCard() {
  const containerRef   = useRef<HTMLDivElement>(null);
  const figureRef      = useRef<SVGGElement>(null);
  const hairRef        = useRef<SVGGElement>(null);
  const screenGlowRef  = useRef<SVGRectElement>(null);
  const cursorRef      = useRef<SVGRectElement>(null);
  const handsRef       = useRef<SVGGElement>(null);
  const sparklesRef    = useRef<SVGGElement>(null);
  const earringLRef    = useRef<SVGCircleElement>(null);
  const earringRRef    = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1 ── Whole figure floats */
      gsap.to(figureRef.current, {
        y: -11,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* 2 ── Hair sways */
      gsap.to(hairRef.current, {
        skewX: 1.4,
        x: 3,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center top",
      });

      /* 3 ── Screen glow breathes */
      gsap.to(screenGlowRef.current, {
        opacity: 0.88,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* 4 ── Cursor blinks */
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.52,
        repeat: -1,
        yoyo: true,
        ease: "none",
      });

      /* 5 ── Hands type */
      gsap.to(handsRef.current, {
        y: -2.5,
        duration: 0.28,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      /* 6 ── Earrings dangle with the float */
      [earringLRef.current, earringRRef.current].forEach((el, i) => {
        gsap.to(el, {
          y: -3,
          x: i === 0 ? -1 : 1,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.15,
        });
      });

      /* 7 ── Sparkles stagger */
      if (sparklesRef.current) {
        const sparks = sparklesRef.current.querySelectorAll(".spark");
        gsap.fromTo(
          sparks,
          { scale: 0, opacity: 0, transformOrigin: "center center" },
          {
            scale: 1,
            opacity: 1,
            duration: 0.75,
            stagger: { each: 0.45, from: "random" },
            repeat: -1,
            yoyo: true,
            ease: "power2.out",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative select-none">
      {/* Outer ambient glow */}
      <div className="absolute -inset-8 bg-gradient-to-br from-accent/10 via-transparent to-accent-hot/6 rounded-3xl blur-3xl pointer-events-none" />

      {/* Glass card */}
      <div className="relative glass-card rounded-3xl border border-accent/12 overflow-hidden">
        {/* Top shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        {/* Bottom shimmer line */}
        <div className="absolute bottom-[72px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

        {/* ── SVG Illustration ── */}
        <div className="px-4 pt-5 pb-0">
          <svg
            viewBox="0 0 380 405"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-label="Animated girl coding at laptop"
          >
            <defs>
              {/* Screen glow gradient */}
              <radialGradient id="sg" cx="50%" cy="40%" r="55%">
                <stop offset="0%"   stopColor="#fc4a1f" stopOpacity="0.55" />
                <stop offset="45%"  stopColor="#ac0057" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0c0a1a" stopOpacity="0.95" />
              </radialGradient>
              {/* Bottom scene glow */}
              <radialGradient id="bg" cx="50%" cy="100%" r="55%">
                <stop offset="0%"   stopColor="#fc4a1f" stopOpacity="0.07" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
              {/* Soft drop shadow filter */}
              <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Stronger glow for screen */}
              <filter id="screen-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Scene ambient */}
            <rect x="0" y="0" width="380" height="405" fill="url(#bg)" />
            <ellipse cx="190" cy="398" rx="145" ry="14" fill="#fc4a1f" opacity="0.07" />

            {/* ══ FIGURE GROUP — GSAP float target ══ */}
            <g ref={figureRef}>

              {/* ── Desk ── */}
              <rect x="28" y="315" width="324" height="14" rx="4" fill="#16122a" />
              <rect x="34" y="329" width="312" height="6"  rx="3" fill="#0e0b1f" />

              {/* ── Laptop base ── */}
              <path d="M105,300 L275,300 L283,316 L97,316 Z" fill="#1e1b35" />
              <rect x="97"  y="296" width="186" height="6" rx="2" fill="#252040" />

              {/* ── Laptop screen shell ── */}
              <path
                d="M110,155 C108,155 105,157 105,160 L99,300 L281,300 L277,160 C277,157 274,155 272,155 Z"
                fill="#1a1630"
              />
              {/* Bezel */}
              <path d="M115,159 L269,159 L265,295 L119,295 Z" fill="#0c0a1a" />

              {/* ── Screen content ── */}
              {/* Glow overlay — GSAP target */}
              <rect
                ref={screenGlowRef}
                x="121" y="164" width="138" height="126"
                rx="2" fill="url(#sg)" opacity="0.52"
                filter="url(#screen-glow)"
              />
              {/* Code line bars */}
              {[
                { x:128, y:176, w:50,  c:"#fc4a1f", o:0.9 },
                { x:133, y:185, w:82,  c:"#ac0057", o:0.7 },
                { x:133, y:194, w:63,  c:"#7b4fa8", o:0.6 },
                { x:128, y:203, w:36,  c:"#fc4a1f", o:0.5 },
                { x:133, y:212, w:91,  c:"#ac0057", o:0.65 },
                { x:133, y:221, w:47,  c:"#4a9eff", o:0.5 },
                { x:128, y:230, w:70,  c:"#7b4fa8", o:0.7 },
                { x:133, y:239, w:85,  c:"#ac0057", o:0.5 },
                { x:133, y:248, w:44,  c:"#fc4a1f", o:0.75 },
                { x:128, y:257, w:57,  c:"#4a9eff", o:0.6 },
                { x:133, y:266, w:76,  c:"#7b4fa8", o:0.55 },
              ].map((l, i) => (
                <rect key={i} x={l.x} y={l.y} width={l.w} height="2.5" rx="1.25" fill={l.c} opacity={l.o} />
              ))}
              {/* Blinking cursor — GSAP target */}
              <rect ref={cursorRef} x="128" y="278" width="7" height="9" rx="1" fill="#fc4a1f" opacity="1" />

              {/* ── Hands / keyboard ── */}
              <g ref={handsRef}>
                <ellipse cx="120" cy="302" rx="23" ry="11" fill="#FDBCB4" />
                <ellipse cx="106" cy="297" rx="13" ry="9"  fill="#FDBCB4" />
                <ellipse cx="260" cy="302" rx="23" ry="11" fill="#FDBCB4" />
                <ellipse cx="274" cy="297" rx="13" ry="9"  fill="#FDBCB4" />
              </g>

              {/* ── Body / hoodie ── */}
              <path
                d="M88,272 C93,238 130,217 190,215 C250,217 287,238 292,272 L287,317 L93,317 Z"
                fill="#1a0f2e"
              />
              {/* Pocket */}
              <path
                d="M163,263 C166,278 177,286 190,286 C203,286 214,278 217,263 C212,270 203,275 190,275 C177,275 168,270 163,263 Z"
                fill="#120a20" opacity="0.8"
              />
              {/* Accent stripes on sleeves */}
              <path d="M108,242 L88,315" stroke="#fc4a1f" strokeWidth="1.5" strokeOpacity="0.18" strokeLinecap="round" />
              <path d="M272,242 L292,315" stroke="#fc4a1f" strokeWidth="1.5" strokeOpacity="0.18" strokeLinecap="round" />
              {/* HK text */}
              <text x="183" y="248" fontFamily="monospace" fontSize="11" fill="#fc4a1f" opacity="0.45" fontWeight="bold">HK</text>

              {/* ── Back hair (behind head) ── */}
              <g ref={hairRef}>
                <path d="M130,180 C116,234 110,298 113,350 C124,368 147,362 157,334 C149,284 144,237 146,196 Z" fill="#3d1c52" />
                <path d="M250,180 C264,234 270,298 267,350 C256,368 233,362 223,334 C231,284 236,237 234,196 Z" fill="#3d1c52" />
              </g>

              {/* ── Neck ── */}
              <rect x="179" y="211" width="22" height="27" rx="11" fill="#FDBCB4" />

              {/* ── Head ── */}
              <ellipse cx="190" cy="170" rx="61" ry="66" fill="#FDBCB4" />

              {/* Cheek blush */}
              <ellipse cx="147" cy="186" rx="18" ry="11" fill="#e89090" opacity="0.28" />
              <ellipse cx="233" cy="186" rx="18" ry="11" fill="#e89090" opacity="0.28" />

              {/* ── Front hair + bangs ── */}
              <path d="M130,177 C133,122 154,95 190,92 C226,95 247,122 250,177 C242,147 224,127 190,124 C156,127 138,147 130,177 Z" fill="#3d1c52" />
              <path d="M130,177 C123,194 125,218 128,233 C125,218 127,194 136,186 Z" fill="#3d1c52" />
              <path d="M250,177 C257,194 255,218 252,233 C255,218 253,194 244,186 Z" fill="#3d1c52" />
              {/* Bangs */}
              <path d="M145,174 C148,192 158,204 169,201 C164,195 155,185 152,174 Z" fill="#3d1c52" />
              <path d="M235,174 C232,192 222,204 211,201 C216,195 225,185 228,174 Z" fill="#3d1c52" />
              <path d="M161,172 C164,190 176,200 190,198 C204,200 216,190 219,172 C212,180 204,185 190,185 C176,185 168,180 161,172 Z" fill="#3d1c52" />
              {/* Hair shine */}
              <path d="M162,100 C171,94 182,91 190,92 C187,94 178,97 169,103 Z" fill="#7040a0" opacity="0.48" />

              {/* ── Left eye ── */}
              <ellipse cx="165" cy="175" rx="14" ry="12" fill="#2d1540" />
              <ellipse cx="165" cy="175" rx="10" ry="9"  fill="#1a0a28" />
              <ellipse cx="165" cy="175" rx="5.5" ry="6" fill="#3a1a60" />
              <circle  cx="168.5" cy="171.5" r="3.5" fill="white" opacity="0.92" />
              <circle  cx="162"   cy="179"   r="1.5" fill="white" opacity="0.4" />
              <path d="M151,161 C156,157 167,156 174,160" stroke="#2d1540" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M151,177 C153,173 155,171 158,169" stroke="#1a0a28" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* ── Right eye ── */}
              <ellipse cx="215" cy="175" rx="14" ry="12" fill="#2d1540" />
              <ellipse cx="215" cy="175" rx="10" ry="9"  fill="#1a0a28" />
              <ellipse cx="215" cy="175" rx="5.5" ry="6" fill="#3a1a60" />
              <circle  cx="218.5" cy="171.5" r="3.5" fill="white" opacity="0.92" />
              <circle  cx="212"   cy="179"   r="1.5" fill="white" opacity="0.4" />
              <path d="M206,160 C213,156 224,157 229,161" stroke="#2d1540" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M229,177 C227,173 225,171 222,169" stroke="#1a0a28" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Nose */}
              <path d="M186,191 C187,197 190,200 194,191" stroke="#d4988a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

              {/* Lips */}
              <path d="M175,205 C180,202 187,201 190,201.5 C193,201 200,202 205,205 C202,210 198,213 190,213 C182,213 178,210 175,205 Z" fill="#e07090" />
              <path d="M175,205 C179,203 185,202 190,202 C195,202 201,203 205,205" stroke="#c05070" strokeWidth="1" fill="none" strokeLinecap="round" />

              {/* ── Earrings ── */}
              <circle ref={earringLRef} cx="130" cy="181" r="4" fill="#fc4a1f" filter="url(#soft-glow)" opacity="0.85" />
              <circle cx="130" cy="188" r="2.5" fill="#ac0057" opacity="0.7" />
              <circle ref={earringRRef} cx="250" cy="181" r="4" fill="#fc4a1f" filter="url(#soft-glow)" opacity="0.85" />
              <circle cx="250" cy="188" r="2.5" fill="#ac0057" opacity="0.7" />
            </g>

            {/* ══ SPARKLES — independent GSAP targets ══ */}
            <g ref={sparklesRef}>
              {/* 4-point stars */}
              <g className="spark" transform="translate(42,78)">
                <path d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2 Z" fill="#fc4a1f" opacity="0.8" />
              </g>
              <g className="spark" transform="translate(325,55)">
                <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#ac0057" opacity="0.75" />
              </g>
              <g className="spark" transform="translate(345,155)">
                <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#fc4a1f" opacity="0.6" />
              </g>
              <g className="spark" transform="translate(28,185)">
                <path d="M0,-7 L1.7,-1.7 L7,0 L1.7,1.7 L0,7 L-1.7,1.7 L-7,0 L-1.7,-1.7 Z" fill="#ac0057" opacity="0.5" />
              </g>
              <g className="spark" transform="translate(358,255)">
                <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#fc4a1f" opacity="0.65" />
              </g>
              <g className="spark" transform="translate(22,295)">
                <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#ac0057" opacity="0.6" />
              </g>
              {/* Dot sparkles */}
              <circle className="spark" cx="58"  cy="132" r="3.5" fill="#fc4a1f" opacity="0.55" />
              <circle className="spark" cx="315" cy="108" r="3"   fill="#ac0057" opacity="0.6" />
              <circle className="spark" cx="352" cy="205" r="2.5" fill="#fc4a1f" opacity="0.7" />
              <circle className="spark" cx="26"  cy="248" r="3"   fill="#ac0057" opacity="0.45" />
              <circle className="spark" cx="340" cy="95"  r="2"   fill="#fc4a1f" opacity="0.5" />
              <circle className="spark" cx="48"  cy="340" r="2"   fill="#ac0057" opacity="0.4" />
              {/* Floating code labels */}
              <text className="spark" x="15"  y="118" fontFamily="monospace" fontSize="10" fill="#fc4a1f" opacity="0.38">&lt;AI/&gt;</text>
              <text className="spark" x="306" y="82"  fontFamily="monospace" fontSize="9"  fill="#ac0057" opacity="0.4">npm i</text>
              <text className="spark" x="10"  y="325" fontFamily="monospace" fontSize="9"  fill="#fc4a1f" opacity="0.35">const hk</text>
              <text className="spark" x="308" y="308" fontFamily="monospace" fontSize="10" fill="#ac0057" opacity="0.38">ML ✨</text>
            </g>
          </svg>
        </div>

        {/* ── Card footer ── */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-primary leading-tight">Harmanpreet Kaur</p>
              <p className="text-[11px] font-mono text-accent mt-0.5">Software Intern @ Trigunasoft</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-400/10 border border-green-400/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-[9px] font-mono text-green-400 uppercase tracking-wider">Available</span>
              </div>
              <p className="text-[9px] font-mono text-tertiary">Mohali, Punjab, India</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
