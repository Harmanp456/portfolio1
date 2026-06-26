export interface Project {
  title: string;
  description: string;
  techStack: string[];
  github: string;
  live?: string;
  featured?: boolean;
  image?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  techStack?: string[];
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface Social {
  label: string;
  href: string;
  icon: string; // lucide icon name
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  platform: string;
  url?: string;
}
