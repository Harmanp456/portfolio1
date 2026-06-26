import { Project, Experience, Stat } from "@/types";
import { certifications } from "@/lib/certifications";

export const projects: Project[] = [
  {
    title: "Lost & Found AI Platform",
    description:
      "A modern, AI-powered lost and found platform that helps reunite people with their lost belongings using intelligent matching algorithms, image recognition, and real-time notifications.",
    techStack: ["Next.js", "FastAPI", "Python", "MongoDB", "Tailwind CSS", "JWT", "Hugging Face", "Gemini API", "scikit-learn"],
    github: "https://github.com/Harmanp456/lf",
    featured: true,
  },
  {
    title: "Pet Adoption Platform",
    description:
      "A comprehensive full-stack team project designed to streamline pet adoption processes and connect pet lovers with their ideal companions. Features role-based access control, specialized veterinary dashboards, and 24/7 AI-powered support.",
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Supabase", "Groq AI API", "JWT", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gitika-dhingra/pet-adoption",
    featured: true,
  },
  {
    title: "CineMind",
    description:
      "A modern movie discovery and recommendation platform combining a custom TF-IDF cosine similarity recommendation engine computed locally with real-time TMDB live search and discovery services.",
    techStack: ["FastAPI", "Streamlit", "Python", "scikit-learn", "Pandas", "TMDB API", "TF-IDF", "NLP"],
    github: "https://github.com/Harmanp456/cinemind",
    featured: false,
  },
  {
    title: "Image Caption Generator",
    description:
      "A modern, deep-learning-powered web application that generates descriptive captions for uploaded images and reads them aloud using text-to-speech. Built with Streamlit, Keras/TensorFlow (VGG16 & LSTM) trained on the Kaggle Flickr8k dataset, and gTTS.",
    techStack: ["Python", "Streamlit", "TensorFlow", "Keras", "VGG16", "LSTM", "gTTS", "Computer Vision", "NLP"],
    github: "https://github.com/Harmanp456/image-captioning",
    featured: false,
  },
  {
    title: "Next Word Predictor",
    description:
      "A deep learning-based web application that predicts the next word in a sequence of text. The underlying model is built using a Long Short-Term Memory (LSTM) neural network with TensorFlow/Keras, and the interactive web interface is built using Streamlit.",
    techStack: ["Python", "TensorFlow", "Keras", "LSTM", "Streamlit", "NLP"],
    github: "https://github.com/Harmanp456/Next-word-predictor",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, animated developer portfolio built with Next.js. Features interactive particle fields, glass-morphism design, smooth scroll animations, cursor glow effects, and a dark theme with amber accents.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Harmanp456/Portfolio",
    live: "https://hk-portfolio.vercel.app",
    featured: false,
  },
];

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Trigunasoft (Remote)",
    period: "July 2025 – Present",
    description:
      "Developing responsive UI components using Angular and TypeScript for AI-driven enterprise products. Integrating frontend interfaces with backend APIs, significantly improving UX and system responsiveness. Collaborating in an Agile team environment with daily stand-ups and modular code reviews.",
    techStack: ["Angular", "TypeScript", "FastAPI", "REST APIs", "Agile", "CI/CD"],
  },
  {
    role: "First Developer Projects",
    company: "Self-Directed",
    period: "2025 – 2026",
    description:
      "Built a full-stack AI-powered Pet Adoption Platform with RBAC, Groq AI chat, and Vet Dashboard. Developed an AI Lost & Found Platform with ML matching algorithms and JWT authentication. Shipped this portfolio with premium animations and glass-morphism design.",
    techStack: ["Next.js", "Node.js", "MongoDB", "FastAPI", "Groq AI", "React.js"],
  },
  {
    role: "Programming Foundations",
    company: "Self-Directed",
    period: "2024 – 2025",
    description:
      "Deepened understanding of Data Structures and Algorithms, OOP principles, and core CS concepts. Earned 10+ advanced AI certifications from top institutions including Imperial College London (98%) and Vanderbilt University (100%).",
    techStack: ["Python", "C++", "DSA", "OOP", "Algorithms", "SQL"],
  },
  {
    role: "Started B.E. CSE (AI & ML)",
    company: "Chandigarh University, Mohali",
    period: "2024",
    description:
      "Joined B.E. Computer Science specialising in AI & Machine Learning. Currently maintaining an 8.44 CGPA. Began exploring Python, C++, and core programming fundamentals while diving into Machine Learning concepts.",
    techStack: ["C++", "Python", "Java", "AI & ML", "DBMS", "Mathematics"],
  },
];

export const stats: Stat[] = [
  { value: "8.44", label: "CGPA", suffix: "" },
  { value: String(projects.length), label: "Projects Built", suffix: "+" },
  { value: String(certifications.length), label: "Certifications", suffix: "+" },
  { value: "1", label: "Internship", suffix: "" },
];

export const skills = {
  languages: ["Python (Advanced)", "C++", "TypeScript", "JavaScript", "SQL", "Java"],
  core: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "REST API Design",
    "Role-Based Access Control",
    "JWT Authentication",
    "DBMS",
    "Agile Workflow",
  ],
  tools: [
    "Angular",
    "Next.js",
    "FastAPI",
    "React.js",
    "Node.js (Express)",
    "Tailwind CSS",
    "shadcn/ui",
    "Git & GitHub",
    "Supabase",
    "MongoDB Atlas",
    "Figma",
    "Postman",
    "Vercel",
  ],
  aiml: [
    "Generative AI",
    "Prompt Engineering",
    "Transformers",
    "Deep Learning",
    "Statistics",
    "Groq AI API",
    "Machine Learning",
    "LLMs & RAG",
  ],
};