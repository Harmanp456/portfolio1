import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Outfit } from "next/font/google";
import CursorGlow from "./components/CursorGlow";
import AnimatedBackground from "./components/AnimatedBackground";
import GradientOrbs from "./components/GradientOrbs";
import LenisProvider from "./components/LenisProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Harmanpreet Kaur | CS Student · AI/ML Aspirant · Full Stack Explorer",
  description:
    "Computer Science (AI & ML) student building strong foundations in programming, machine learning fundamentals, and full stack development. Explore projects, certifications, and skills.",
  keywords: [
    "Harmanpreet Kaur",
    "Portfolio",
    "Computer Science",
    "AI ML",
    "Machine Learning",
    "Full Stack",
    "Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "Mohali",
    "India",
    "AI Engineer",
    "Deep Learning",
  ],
  authors: [{ name: "Harmanpreet Kaur" }],
  creator: "Harmanpreet Kaur",
  metadataBase: new URL("https://hk-portfolio.vercel.app"),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Harmanpreet Kaur | AI/ML Aspirant & Full Stack Explorer",
    description:
      "CS student passionate about AI, machine learning fundamentals, and full stack development. Check out my projects and skills.",
    type: "website",
    url: "https://hk-portfolio.vercel.app",
    siteName: "Harmanpreet Kaur Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmanpreet Kaur  | Portfolio",
    description:
      "CS student passionate about AI/ML and full stack development.",
    creator: "@HarmanpreetKaur",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "theme-color": "#030303",
  },
};

/**
 * Viewport export — Next.js App Router way to set the mobile viewport meta tag.
 * width=device-width + initial-scale=1 + interactiveWidget prevents layout
 * shifts when the mobile keyboard opens.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#030303",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${outfit.variable}`}
    >
      <body className="font-sans antialiased bg-background text-primary">
        {/* Skip to content — accessibility */}
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-background focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <LenisProvider>
          <AnimatedBackground />
          <GradientOrbs />
          {children}
          <CursorGlow />
        </LenisProvider>
      </body>
    </html>
  );
}