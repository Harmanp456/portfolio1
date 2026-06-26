import { Project, Experience, Stat } from "@/types";
import { certifications } from "@/lib/certifications";

export const projects: Project[] = [
  {
    title: "Terminal Police",
    description:
      "A VS Code extension that plays an instant audio alert whenever terminal commands fail or errors appear. Features real-time error detection, custom sound support, smart debouncing, cross-platform compatibility, and Command Palette integration. Published on the VS Code Marketplace.",
    techStack: ["TypeScript", "VS Code API", "Node.js"],
    github: "https://github.com/CodeWhizPuneet/Terminal-Police",
    live: "https://marketplace.visualstudio.com/items?itemName=CodeWhizPuneet.terminal-police",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated developer portfolio built from scratch with Next.js. Features interactive particle fields, glass-morphism design, smooth scroll animations, cursor glow effects, and a dark theme with amber accents.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/CodeWhizPuneet/Puneet-Portfolio",
    live: "https://puneet-portfolio-lime.vercel.app",
    featured: true,
  },
];

export const experience: Experience[] = [
  {
    role: "Started Computer Science",
    company: "Apex Institute of Technology, Mohali",
    period: "2024",
    description:
      "Joined B.E. Computer Science specializing in AI & ML. Picked up C, C++ and Python, started exploring programming fundamentals and core problem-solving concepts.",
    techStack: ["C", "C++", "Python", "Programming Fundamentals"],
  },
  {
    role: "Programming Foundations",
    company: "Self-Directed",
    period: "2025",
    description:
      "Deepened understanding of Data Structures and Algorithms, OOP principles, and core CS concepts through consistent practice and coursework.",
    techStack: ["DSA", "OOP", "Algorithms", "Python", "Java"],
  },
  {
    role: "First Developer Projects",
    company: "Self-Directed",
    period: "2026",
    description:
      "Built a fully animated developer portfolio with Next.js and created Terminal Police — a VS Code extension now published on the Marketplace. First real-world end-to-end projects shipped.",
    techStack: ["Next.js", "TypeScript", "VS Code API", "Node.js", "Framer Motion"],
  },
  {
    role: "Current Focus — AI & ML",
    company: "Now",
    period: "2026 — Present",
    description:
      "Learning DBMS, SQL, and backend fundamentals. Studying Python for Machine Learning — NumPy, Pandas, and ML algorithms. Preparing to build production AI/ML projects.",
    techStack: ["Python", "DBMS", "SQL", "NumPy", "Pandas", "Machine Learning"],
  },
];

export const stats: Stat[] = [
  { value: "6", label: "Languages Learned", suffix: "+" },
  { value: String(projects.length), label: "Projects Built", suffix: "+" },
  { value: String(certifications.length), label: "Certifications", suffix: "" },
  { value: "1", label: "Extensions Published", suffix: "" },
];

export const skills = {
  languages: ["C", "C++", "Python", "Java", "JavaScript", "SQL"],
  core: [
    "Data Structures",
    "Algorithms",
    "Object-Oriented Programming",
    "DBMS",
    "Problem Solving",
    "Analytical Thinking",
  ],
  tools: [
    "Git & GitHub",
    "VS Code",
    "Next.js",
    "Node.js",
    "MongoDB",
    "MySQL",
  ],
  /* AI/ML track — technologies actively being studied */
  aiml: [
    "Machine Learning (fundamentals)",
    "Neural Networks",
    "Google Gemini API",
    "Retrieval-Augmented Generation",
    "Prompt Engineering",
    "NumPy & Pandas",
  ],
};