"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileDown, ExternalLink } from "lucide-react";

/* Path to the PDF in the /public folder */
const RESUME_PATH = "/resume.pdf";

export default function ResumePage() {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  /* true on phones / tablets where PDF iframe doesn't render */
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;

    /* pointer: coarse = touchscreen; also catch narrow viewports */
    const mobile =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mobile);

    if (!mobile) {
      /* Desktop only: fetch as blob to bypass IDM (Internet Download Manager)
       * which intercepts direct PDF links on Windows */
      fetch(RESUME_PATH)
        .then((res) => res.blob())
        .then((blob) => {
          objectUrl = URL.createObjectURL(blob);
          setBlobUrl(objectUrl);
        })
        .catch(() => {
          /* If blob fetch fails, fall back to direct path */
          setBlobUrl(RESUME_PATH);
        });
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-background z-[200] flex flex-col">
      {/* ── Top bar ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-surface border-b border-border/50">
        <Link
          href="/"
          className="text-sm font-mono text-accent hover:text-accent-hover transition-colors"
        >
          &larr; Back
        </Link>
        <span className="text-xs font-mono text-secondary tracking-widest uppercase hidden sm:block">
          Puneet Shankar — Resume
        </span>
        {/* Use native <a download> — works on both desktop and mobile */}
        <a
          href={RESUME_PATH}
          download="Puneet_Shankar_Resume.pdf"
          className="px-4 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent/10 text-accent border border-accent/20 rounded hover:bg-accent/20 transition-all duration-300 inline-flex items-center gap-2"
        >
          <FileDown className="w-3.5 h-3.5" />
          Download
        </a>
      </div>

      {/* ── Mobile layout ──
          PDF <iframe> doesn't render in Android Chrome or iOS Safari.
          Show a clean action screen instead. */}
      {isMobile ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-8 text-center">
          <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <FileDown className="w-10 h-10 text-accent" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-primary mb-2 uppercase tracking-tight">
              Resume
            </h2>
            <p className="text-sm text-secondary leading-relaxed max-w-xs">
              PDF preview isn&apos;t supported in mobile browsers.
              Open or download below to view the full resume.
            </p>
          </div>

          <div className="flex flex-col w-full max-w-xs gap-3">
            {/* Open in browser's PDF viewer / new tab */}
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-accent text-background font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent-hover transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Open Resume
            </a>
            {/* Trigger native download */}
            <a
              href={RESUME_PATH}
              download="Puneet_Shankar_Resume.pdf"
              className="w-full py-4 rounded-xl border border-accent/30 text-accent font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-accent/10 transition-colors duration-300"
            >
              <FileDown className="w-4 h-4" />
              Download PDF
            </a>
          </div>
        </div>
      ) : (
        /* ── Desktop layout: embedded iframe ── */
        blobUrl ? (
          <iframe
            src={blobUrl}
            className="flex-1 w-full border-none"
            title="Puneet Shankar Resume"
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-sm font-mono text-secondary animate-pulse">
              Loading resume...
            </span>
          </div>
        )
      )}
    </div>
  );
}

