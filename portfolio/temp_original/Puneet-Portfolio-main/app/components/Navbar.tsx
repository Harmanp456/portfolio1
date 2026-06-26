"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (currentY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section detection ── */
  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.querySelector(link.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  /* ── Resize handler ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Lock body scroll ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent-hot"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="relative z-50 group flex items-center gap-1">
            <span className="text-xl font-black text-primary tracking-tight transition-colors duration-300 group-hover:text-accent">
              PS
            </span>
            <span className="text-xl font-black text-accent">.</span>
            <span className="ml-2 h-4 w-[1px] bg-border hidden sm:block" />
            {/* "AI/ML" label positioned after the divider */}
            <span className="ml-2 text-[10px] font-mono text-tertiary uppercase tracking-widest hidden sm:block">
              AI/ML Student
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => {
              const isActive = activeSection === href;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`relative px-4 py-2 rounded-md text-xs font-mono uppercase tracking-[0.15em] transition-all duration-300 ${
                      isActive
                        ? "text-accent"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-md bg-accent/[0.08] border border-accent/20"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-md bg-accent/10 border border-accent/20 text-accent text-[11px] font-mono uppercase tracking-wider hover:bg-accent/20 transition-all duration-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            Let&apos;s Talk
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden relative z-50 w-8 h-6 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: 45, y: 10, backgroundColor: "#F59E0B" }
                  : { rotate: 0, y: 0, backgroundColor: "#f0f0f5" }
              }
              transition={{ duration: 0.3 }}
              className="block h-[2px] w-full rounded-full origin-center"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-full rounded-full bg-primary origin-center"
            />
            <motion.span
              animate={
                mobileOpen
                  ? { rotate: -45, y: -10, backgroundColor: "#F59E0B" }
                  : { rotate: 0, y: 0, backgroundColor: "#f0f0f5" }
              }
              transition={{ duration: 0.3 }}
              className="block h-[2px] w-full rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-3xl flex flex-col justify-center px-8 overflow-hidden"
          >
            {/* Background number */}
            <span className="absolute top-1/2 right-8 -translate-y-1/2 text-[20rem] font-black text-white/[0.015] leading-none select-none pointer-events-none">
              M
            </span>

            <nav className="flex flex-col gap-2">
              {navLinks.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex items-center gap-4"
                >
                  <span className="text-xs font-mono text-accent/50 w-6">
                    0{i + 1}
                  </span>
                  <span className="text-[clamp(1.25rem,7vw,3.5rem)] font-black uppercase tracking-tight text-primary transition-colors duration-200 group-hover:text-accent">
                    {label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-10 left-8 right-8 flex items-center justify-between"
            >
              <span className="font-mono text-[10px] text-tertiary tracking-widest uppercase">
                Navigation
              </span>
              <span className="font-mono text-[10px] text-tertiary tracking-widest uppercase">
                Puneet Shankar &copy; {new Date().getFullYear()}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
