"use client";

import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TiltCard from "../components/TiltCard";
import { Award, ExternalLink, ArrowLeft } from "lucide-react";
import { certifications } from "@/lib/certifications";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

export default function CertificationsClient() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen pt-28 pb-20 relative overflow-hidden">
        {/* Background Ambient Lights */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
          <div
            className="w-full h-full rounded-full blur-[120px]"
            style={{ background: "radial-gradient(circle, #fc4a1f, transparent 70%)" }}
          />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] opacity-[0.02] pointer-events-none">
          <div
            className="w-full h-full rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, #ac0057, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary hover:text-accent transition-colors duration-300 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="h-[1px] w-12 bg-gradient-to-r from-accent to-transparent" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent">
                &#x2F;&#x2F; qualifications
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-primary"
            >
              My <span className="gradient-text">Certifications</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="text-secondary mt-4 max-w-xl text-base"
            >
              A collection of verified achievements, credentials, and specializations from leading academic institutions and global industry platforms.
            </motion.p>
          </div>

          {/* Grid of Certifications */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert) => (
              <motion.div
                key={cert.title}
                variants={cardVariants}
                className="h-full"
              >
                <TiltCard maxTilt={5} scale={1.02} glare={true} className="h-full">
                  <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full border border-border/50 hover:border-accent/30 transition-all duration-300 group">
                    <div>
                      {/* Badge / Icon */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                          <Award className="w-5 h-5 text-accent" />
                        </div>
                        <span className="text-[10px] font-mono text-accent/60 tracking-wider bg-accent/[0.04] border border-accent/5 px-2.5 py-0.5 rounded-full">
                          {cert.date}
                        </span>
                      </div>

                      {/* Info */}
                      <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300 leading-snug mb-3">
                        {cert.title}
                      </h3>
                      
                      <p className="text-sm text-secondary font-medium mb-1">
                        {cert.issuer}
                      </p>
                      
                      <p className="text-xs text-tertiary font-mono uppercase tracking-wider mb-6">
                        Platform: {cert.platform}
                      </p>
                    </div>

                    {/* Bottom verify link */}
                    {cert.url && (
                      <div className="mt-auto pt-4 border-t border-border/30">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent/60 hover:text-accent transition-colors duration-300 group/link"
                        >
                          Verify Credential
                          <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
                        </a>
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
