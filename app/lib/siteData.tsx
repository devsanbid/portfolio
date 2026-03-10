"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

/* ============================================================
   SiteData — Central store for ALL configurable portfolio content.
   Persisted to localStorage so admin changes survive reloads.
   ============================================================ */

// ── Skill shape ──
export interface SkillItem {
  name: string;
  level: number; // 0–100
  color: string; // Tailwind gradient classes, e.g. "from-blue-400 to-cyan-400"
}

// ── Timeline entry ──
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

// ── Social link ──
export interface SocialLink {
  platform: string; // "github" | "linkedin" | "email" | custom
  url: string;
  label: string;
}

// ── Website / live project ──
export interface WebsiteItem {
  name: string;
  url: string;
  description: string;
  tags: string[];
}

// ── Full site data shape ──
export interface SiteData {
  hero: {
    avatar: string;
    badge: string;
    greeting: string;
    name: string;
    role: string;
    description: string;
    cta: string;
    resumeCta: string;
  };
  about: {
    subtitle: string;
    title: string;
    description: string;
    cards: Array<{ title: string; description: string }>;
  };
  skills: {
    title: string;
    subtitle: string;
    frontendLabel: string;
    learningLabel: string;
    toolsLabel: string;
    frontend: SkillItem[];
    learning: SkillItem[];
    tools: SkillItem[];
  };
  websites: {
    title: string;
    subtitle: string;
    items: WebsiteItem[];
  };
  projects: {
    title: string;
    subtitle: string;
    githubUsername: string;
  };
  experience: {
    title: string;
    subtitle: string;
    timeline: TimelineEntry[];
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
  };
  social: SocialLink[];
  footer: {
    copyright: string;
    madeWith: string;
  };
}

// ── Default values ──
export const defaultSiteData: SiteData = {
  hero: {
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sandesh&accessories=prescription02&accessoriesProbability=100&facialHairProbability=0&clothing=blazerAndShirt&clothesColor=65c9ff&top=shortFlat&eyes=default&eyebrows=defaultNatural&mouth=smile&skinColor=ffdbb4&hairColor=2c1b18&backgroundColor=transparent",
    badge: "Available for new projects",
    greeting: "Hello, I'm",
    name: "Sandesh Shahi",
    role: "Web Developer | Future Data Scientist",
    description:
      "I build modern web experiences with React, Next.js, and cutting-edge technologies. Currently exploring the world of Data Science.",
    cta: "View My Work",
    resumeCta: "Get In Touch",
  },
  about: {
    subtitle: "My Journey",
    title: "About Me",
    description:
      "I am a developer focused on web development with strong experience in React, Next.js, and Vanilla JavaScript. Currently studying at Softwarica College (affiliated with Coventry University), I am expanding my knowledge into data science and working towards becoming a Data Scientist.",
    cards: [
      {
        title: "Web Developer",
        description:
          "Building modern, responsive, and performant web applications using React, Next.js, and cutting-edge frontend technologies.",
      },
      {
        title: "Aspiring Data Scientist",
        description:
          "Currently learning data analysis, Python, and machine learning fundamentals to transition into the data science field.",
      },
      {
        title: "Passionate Builder",
        description:
          "Driven by the desire to create elegant solutions that combine beautiful design with powerful functionality.",
      },
    ],
  },
  skills: {
    title: "Skills & Technologies",
    subtitle: "What I Work With",
    frontendLabel: "Frontend",
    learningLabel: "Currently Learning",
    toolsLabel: "Dev Tools & Environment",
    frontend: [
      { name: "React", level: 90, color: "from-blue-400 to-cyan-400" },
      { name: "Next.js", level: 85, color: "from-purple-400 to-pink-400" },
      { name: "JavaScript", level: 92, color: "from-yellow-400 to-orange-400" },
      { name: "HTML", level: 95, color: "from-orange-400 to-red-400" },
      { name: "CSS", level: 90, color: "from-blue-500 to-purple-500" },
      { name: "Tailwind CSS", level: 88, color: "from-cyan-400 to-blue-400" },
    ],
    learning: [
      { name: "Data Analysis", level: 40, color: "from-green-400 to-emerald-400" },
      { name: "Python", level: 50, color: "from-blue-400 to-green-400" },
      { name: "Machine Learning", level: 25, color: "from-violet-400 to-purple-400" },
    ],
    tools: [
      { name: "Linux", level: 92, color: "from-yellow-400 to-amber-500" },
      { name: "Git", level: 95, color: "from-orange-500 to-red-500" },
      { name: "Neovim", level: 88, color: "from-green-400 to-emerald-400" },
      { name: "Docker", level: 60, color: "from-blue-400 to-cyan-400" },
    ],
  },
  websites: {
    title: "Live Websites",
    subtitle: "Projects in Production",
    items: [
      {
        name: "Nepal Premium League",
        url: "https://npl.sanbid.dev",
        description: "Nepal Premium League Cricket — live scores, teams, and match updates.",
        tags: ["Next.js", "Cricket", "Sports"],
      },
      {
        name: "VoteNP",
        url: "https://votenp.sanbid.app",
        description: "Voting of Nepal Current Election 2083 — real-time election data and results.",
        tags: ["React", "Election", "Nepal"],
      },
      {
        name: "Instagram Chat AI",
        url: "https://instagram.sanbid.dev",
        description: "Instagram Chat AI Girlfriend — AI-powered conversational experience.",
        tags: ["AI", "Chat", "Full-Stack"],
      },
    ],
  },
  projects: {
    title: "My Projects",
    subtitle: "GitHub Repositories",
    githubUsername: "devsanbid",
  },
  experience: {
    title: "My Journey",
    subtitle: "Experience & Learning",
    timeline: [
      {
        year: "2026",
        title: "Learning Data Science",
        description:
          "Exploring data analysis, Python, and machine learning fundamentals. Building a strong foundation in data science.",
      },
      {
        year: "2025",
        title: "Advanced Web Development",
        description:
          "Mastering React, Next.js, and modern frontend frameworks. Building production-ready web applications.",
      },
      {
        year: "2024",
        title: "Web Development Journey",
        description:
          "Started learning HTML, CSS, JavaScript, and React. Built foundational projects and discovered passion for web development.",
      },
    ],
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's Work Together",
    description:
      "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.",
  },
  social: [
    { platform: "github", url: "https://github.com/devsanbid", label: "GitHub" },
    { platform: "linkedin", url: "https://linkedin.com/in/sandesh-shahi", label: "LinkedIn" },
    { platform: "email", url: "mailto:contact@sandeshshahi.com", label: "Email" },
  ],
  footer: {
    copyright: "© 2026 Sandesh Shahi. All rights reserved.",
    madeWith: "Made with passion and code",
  },
};

// ── localStorage key ──
const STORAGE_KEY = "portfolio_site_data";

// ── Context ──
interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: SiteData) => void;
  resetData: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SiteData>;
        // Deep merge with defaults to handle new fields added later
        setData({ ...defaultSiteData, ...parsed });
      }
    } catch {
      // If parse fails, stick with defaults
    }
    setHydrated(true);
  }, []);

  const updateData = useCallback((newData: SiteData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch {
      // localStorage full or unavailable
    }
  }, []);

  const resetData = useCallback(() => {
    setData(defaultSiteData);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Don't render children until hydrated to avoid flash
  if (!hydrated) {
    return null;
  }

  return (
    <SiteDataContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
}
