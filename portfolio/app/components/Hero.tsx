"use client";

import { useRef, useCallback, useState, useEffect, type MouseEvent } from "react";
import { motion } from "motion/react";
import Script from "next/script";

import TextScramble from "./TextScramble";
import { ArrowRight, Github, ChevronDown, FileDown, Linkedin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

function stagger(i: number) {
  return { duration: 0.8, delay: 0.4 + i * 0.15, ease };
}

/* ── Pulsing availability badge ── */
function StatusBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.8, ease }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/80 bg-surface/60 backdrop-blur-sm"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
      </span>
      <span className="text-xs font-mono text-secondary">Available for opportunities</span>
    </motion.div>
  );
}

/* ── Magnetic hover wrapper ── */
function Magnetic({
  children,
  className,
  href,
  target,
  rel,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    setTimeout(() => {
      if (el) el.style.transition = "";
    }, 400);
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION
   Two-column layout:
   Left  — Name + subtitle + bio + CTAs
   Right — Glassmorphic Profile Card
   ═══════════════════════════════════════════ */
export default function Hero() {
  const [showScramble, setShowScramble] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowScramble(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden animate-fade-in"
    >
      {/* ── Background ambient glows ── */}
      <div
        className="absolute top-[-8%] left-[18%] w-[700px] h-[700px] opacity-[0.03] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full blur-[150px]"
          style={{ background: "radial-gradient(ellipse, #fc4a1f, transparent 70%)" }}
        />
      </div>
      <div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] opacity-[0.02] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full rounded-full blur-[120px]"
          style={{ background: "radial-gradient(ellipse, #ac0057, transparent 70%)" }}
        />
      </div>

      {/* ── Giant watermark ── */}
      <div
        className="absolute inset-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-10"
        aria-hidden="true"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.3 }}
          className="text-[13rem] md:text-[19rem] font-black text-white/[0.012] leading-none tracking-tighter"
        >
          HK
        </motion.span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[90rem] mx-auto w-full px-6 md:px-12 py-28 md:py-32 flex justify-center">
        <div className="w-full flex flex-col items-start justify-center">

          {/* ══ HERO CONTENT ══ */}
          <div className="w-full bg-white/[0.02] backdrop-blur-md border border-accent/20 rounded-[2.5rem] p-8 md:p-14 lg:p-16 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
            
            <Script
              src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
              strategy="lazyOnload"
            />

            <div className="relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Hero Texts */}
              <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start w-full">

                {/* Name — clean, fast animation */}
                <h1
                  className="font-bold leading-[0.9] tracking-tight text-primary uppercase"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
                >
                  <motion.span
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5, ease }}
                    className="block"
                  >
                    Harmanpreet
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.65, ease }}
                    className="block gradient-text"
                  >
                    Kaur
                  </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(3)}
                  className="mt-7 flex items-center gap-3"
                >
                  <div className="h-6 w-[3px] bg-gradient-to-b from-accent to-accent-hot rounded-full" />
                  <div className="text-sm md:text-base lg:text-lg font-mono overflow-hidden">
                    <TextScramble
                      text="AI/ML Developer · Full-Stack Developer · Intern @ Trigunasoft"
                      className="text-accent"
                      delay={1600}
                      speed={25}
                    />
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="ml-1 text-accent"
                    >
                      _
                    </motion.span>
                  </div>
                </motion.div>

                {/* Bio */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(4)}
                  className="mt-6 text-sm md:text-base leading-relaxed text-secondary max-w-xl"
                >
                  B.E. CSE (AI &amp; ML) student at Chandigarh University with{" "}
                  <span className="text-accent font-semibold">8.35 CGPA</span>.
                  Currently interning at Trigunasoft, building AI-driven enterprise
                  products with Angular, FastAPI &amp; Next.js — passionate about
                  intelligent, scalable applications.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={stagger(5)}
                  className="mt-10 flex flex-col gap-5 w-full"
                >
                  <StatusBadge />

                  <div className="flex flex-col gap-3">
                    {/* Primary buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Magnetic
                        href="#projects"
                        className="glow-button group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-accent text-white font-bold text-sm uppercase tracking-wider hover:bg-accent-hover transition-all duration-300"
                      >
                        <span>View Projects</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Magnetic>

                      <Magnetic
                        href="/resume"
                        className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-accent/35 text-accent font-bold text-sm uppercase tracking-wider hover:bg-accent/10 hover:border-accent/60 backdrop-blur-sm transition-all duration-300"
                      >
                        <FileDown className="w-4 h-4" />
                        <span>Resume</span>
                      </Magnetic>
                    </div>

                    {/* Social buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <Magnetic
                        href="https://github.com/Harmanp456"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border/60 text-secondary font-semibold text-sm hover:border-accent/40 hover:text-primary backdrop-blur-sm transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        <span>GitHub</span>
                      </Magnetic>

                      <Magnetic
                        href="https://linkedin.com/in/harmanpreetkaur014"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-border/60 text-secondary font-semibold text-sm hover:border-accent/40 hover:text-primary backdrop-blur-sm transition-all duration-300"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </Magnetic>
                    </div>
                  </div>
                </motion.div>

                {/* Scramble footer tag */}
                {showScramble && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mt-10 font-mono text-xs text-tertiary tracking-wider break-words w-full"
                  >
                    <TextScramble
                      text="// 8.35 CGPA · Angular · FastAPI · Next.js · Groq AI · building real products"
                      delay={200}
                      speed={15}
                    />
                  </motion.div>
                )}
              </div>

              {/* Right Column: Lottie Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease }}
                className="lg:col-span-5 xl:col-span-6 w-full flex justify-center items-center relative"
              >
                <div className="absolute -inset-10 bg-gradient-to-tr from-accent/15 via-transparent to-accent-hot/10 rounded-full blur-3xl pointer-events-none" />
                <div className="w-full max-w-[320px] sm:max-w-[440px] md:max-w-[480px] lg:max-w-[550px] xl:max-w-[620px] aspect-square relative z-10">
                  <lottie-player
                    src="/Female Employee Working on Data Security.json"
                    background="transparent"
                    speed="1"
                    style={{ width: "100%", height: "100%" }}
                    loop
                    autoplay
                  />
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-tertiary">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-accent/50" />
        </motion.div>
      </motion.div>

    </section>
  );
}
