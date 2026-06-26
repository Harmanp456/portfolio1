"use client";

import { motion } from "motion/react";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
import { LeetCodeIcon } from "./icons";
import { usePathname } from "next/navigation";

const links = [
  { label: "GitHub", href: "https://github.com/Harmanp456", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/harmanpreetkaur014", icon: Linkedin },
  { label: "LeetCode", href: "https://leetcode.com/u/iharmansaini/", icon: LeetCodeIcon },
  { label: "Email", href: "mailto:iharmansaini51@gmail.com", icon: Mail },
];

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "/certifications" },
  { label: "Education", href: "#education" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <footer className="relative overflow-hidden">
      {/* Top gradient line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full rounded-full blur-[80px]"
          style={{ background: "radial-gradient(ellipse, #fc4a1f, transparent)" }}
        />
      </div>

      <div className="w-full border-t border-accent/20 bg-white/[0.02] backdrop-blur-md relative overflow-hidden pt-10 pb-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/80 pointer-events-none" />
        <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
        {/* Top section — Logo + Back to top */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <a href={isHome ? "#" : "/"} className="text-3xl font-black text-primary tracking-tight">
              HK<span className="text-accent">.</span>
            </a>
            <p className="mt-2 text-sm text-tertiary max-w-xs">
              AI/ML Developer building intelligent, scalable systems and full-stack enterprise applications.
            </p>
          </div>

          {/* Back to top */}
          <motion.a
            href={isHome ? "#home" : "/#home"}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
              <ArrowUp className="w-4 h-4 text-secondary group-hover:text-accent transition-colors duration-300" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-tertiary group-hover:text-accent transition-colors duration-300">
              Top
            </span>
          </motion.a>
        </div>

        {/* Middle section — Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Navigation */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map(({ label, href }) => {
                const isHash = href.startsWith("#");
                const linkTarget = isHash ? (isHome ? href : `/${href}`) : href;
                return (
                  <li key={href}>
                    <a
                      href={linkTarget}
                      className="text-sm text-secondary hover:text-primary transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
              Built With
            </h4>
            <ul className="space-y-2 text-sm text-secondary">
              <li>Next.js 16</li>
              <li>Tailwind CSS 4</li>
              <li>Framer Motion</li>
              <li>TypeScript</li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
              Follow
            </h4>
            <div className="flex items-center gap-3">
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 mt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-tertiary tracking-wide">
            &copy; {new Date().getFullYear()} Harmanpreet Kaur. All rights reserved.
          </p>

          <p className="text-xs text-tertiary/60 font-mono flex items-center gap-1.5">
            Designed &amp; crafted with{" "}
            <Heart className="w-3 h-3 text-accent-hot fill-accent-hot inline" />
            by Harmanpreet Kaur
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
