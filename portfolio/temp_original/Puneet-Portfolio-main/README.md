# Puneet Shankar — Developer Portfolio

A modern, dark-themed developer portfolio built with Next.js 16, TypeScript, Tailwind CSS v4, and Framer Motion. Featuring buttery smooth scroll, **3D interactive effects**, neural-network particle field, and a premium design system.

## ✨ Features

### Core
- **Lenis smooth scroll** — silky 60fps scrolling with custom easing
- **Preloader** — animated percentage counter with split-screen reveal
- **Hero** — letter-by-letter name animation + TextScramble subtitle
- **Cursor glow** — dual-layer lerp-smoothed ambient cursor (desktop only)
- **Magnetic buttons** — hover-reactive CTA buttons
- **Contact form** — real email delivery via EmailJS
- **Scroll progress bar** — amber gradient progress indicator in navbar
- **Film grain overlay** — subtle noise texture via CSS
- **Glass morphism** — backdrop-blur card system
- **Animated borders** — conic-gradient spinning border on hover

### 3D & Motion
- **Neural-network particle field** — depth-layered particles with hub nodes, pulse rings, and mouse-reactive connections
- **3D CSS HoloCube** — wireframe rotating cube in the Hero (pure CSS `preserve-3d`, no WebGL)
- **Floating orbital rings** — 3D tilting concentric rings as Hero decorators
- **TiltCard** — reusable perspective tilt + glare component used on every card (rAF-throttled, touch-safe)
- **FeaturedCard depth** — cursor-tracked spotlight + glare overlay, `rotateX`/`rotateY` ±5° tilt
- **Scroll-driven 3D parallax** — Skills grid rotates on the X-axis as it enters the viewport
- **3D entrance animations** — `rotateX` flip-up on Project, Experience, and About stat cards
- **Depth-scan line** — amber horizontal sweep on project image placeholders
- **Animated counters** — stats count up on scroll-into-view

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion (`motion/react`) |
| 3D Effects | CSS `preserve-3d` + Canvas API |
| Smooth Scroll | Lenis |
| Email | EmailJS |
| Icons | Lucide React |
| Fonts | Syne + JetBrains Mono |
| Deploy | Vercel |

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/CodeWhizPuneet/Puneet-Portfolio.git
cd Puneet-Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your EmailJS credentials in .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📧 EmailJS Setup (Contact Form)

1. Sign up at [emailjs.com](https://www.emailjs.com/) (free)
2. Create an **Email Service** (connect your Gmail)
3. Create an **Email Template** with these variables:
   - `{{from_name}}` — sender's name
   - `{{from_email}}` — sender's email
   - `{{message}}` — the message
   - `{{to_name}}` — recipient name
4. Copy your credentials into `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

## 📁 Project Structure

```
app/
├── components/
│   ├── Hero.tsx            # Hero section + HoloCube + FloatingRings
│   ├── About.tsx           # About section + TiltCard stat cards
│   ├── Skills.tsx          # Skills grid + scroll-driven 3D parallax
│   ├── Projects.tsx        # Featured & small project cards with 3D tilt
│   ├── Experience.tsx      # Timeline with TiltCard + 3D entrances
│   ├── Contact.tsx         # Contact form (EmailJS)
│   ├── Navbar.tsx          # Sticky navbar with scroll progress
│   ├── Preloader.tsx       # Page preloader
│   ├── TiltCard.tsx        # Reusable 3D tilt + glare wrapper
│   ├── LenisProvider.tsx   # Lenis smooth scroll provider
│   ├── CursorGlow.tsx      # Custom cursor glow (desktop)
│   ├── ParticleField.tsx   # Neural-network canvas particle system
│   ├── GradientOrbs.tsx    # Ambient gradient orbs
│   ├── Parallax.tsx        # Scroll parallax utility
│   └── TextScramble.tsx    # Typewriter scramble effect
├── resume/                 # Resume viewer page
├── globals.css             # Design system, keyframes & 3D utilities
└── layout.tsx              # Root layout + metadata
lib/
├── data.ts                 # Projects, experience, skills data
└── certifications.ts       # Certifications data
types/
└── index.ts                # TypeScript interfaces
public/
└── resume.pdf              # Resume PDF
```

## 🎨 3D CSS Utilities (`globals.css`)

| Class | Purpose |
|---|---|
| `.tilt-wrap` | Establishes 3D stacking context + hover depth shadow |
| `.tilt-glare` | Angle-driven glare overlay (mix-blend-mode: overlay) |
| `.scene-3d` | Perspective container for child 3D elements |
| `.depth-shadow` | Four-layer ambient shadow stack |
| `.reveal-depth` | `rotateX` flip-up entrance keyframe |
| `.float-3d` | Idle floating animation with subtle 3D rotation |
| `.depth-scan` | Animated horizontal amber scan line (::after) |

## 🌐 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CodeWhizPuneet/Puneet-Portfolio)

Add your `NEXT_PUBLIC_EMAILJS_*` environment variables in Vercel dashboard → Settings → Environment Variables.

## 📄 License

MIT — feel free to use this as inspiration for your own portfolio.