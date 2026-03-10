"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";
import GlassCard from "./GlassCard";
import TypeWriter from "./TypeWriter";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiGit,
  SiLinux,
  SiNeovim,
  SiDocker,
  SiRust,
  SiLua,
} from "react-icons/si";

// Tech icons displayed below CTA with brand colors
const heroTechIcons = [
  { icon: SiReact,      color: "#61DAFB", label: "React" },
  { icon: SiNextdotjs,  color: "#ffffff", label: "Next.js" },
  { icon: SiJavascript, color: "#F7DF1E", label: "JavaScript" },
  { icon: SiTypescript, color: "#3178C6", label: "TypeScript" },
  { icon: SiTailwindcss,color: "#06B6D4", label: "Tailwind" },
  { icon: SiPython,     color: "#3776AB", label: "Python" },
  { icon: SiLinux,      color: "#FCC624", label: "Linux" },
  { icon: SiGit,        color: "#F05032", label: "Git" },
  { icon: SiNeovim,     color: "#57A143", label: "Neovim" },
  { icon: SiDocker,     color: "#2496ED", label: "Docker" },
];

/**
 * Hero — Main landing section with animated gradient background
 * Reads all text from SiteData (admin-editable)
 */
export default function Hero() {
  const { data } = useSiteData();
  const hero = data.hero;

  const handleScroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      {/* Animated gradient orbs behind content */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/4 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[60px] sm:blur-[120px] sm:h-[500px] sm:w-[500px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="absolute left-1/3 top-1/2 h-[200px] w-[200px] rounded-full bg-blue-600/15 blur-[50px] sm:blur-[100px] sm:h-[400px] sm:w-[400px]"
          animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
        <motion.div
          className="hidden rounded-full bg-cyan-500/10 blur-[100px] sm:absolute sm:right-1/4 sm:top-1/3 sm:block sm:h-[350px] sm:w-[350px]"
          animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Avatar */}
        {hero.avatar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 150 }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-purple-500/30 bg-white/5 p-1 shadow-lg shadow-purple-500/20 sm:h-36 sm:w-36">
                <img
                  src={hero.avatar}
                  alt={hero.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              {/* Glow ring — desktop only */}
              <div className="absolute inset-0 hidden rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl md:block" />
            </div>
          </motion.div>
        )}

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs text-purple-300 backdrop-blur-sm sm:text-sm"
        >
          <Sparkles size={14} className="text-purple-400" />
          <span>{hero.badge}</span>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-4 text-lg text-gray-400 sm:text-xl"
        >
          {hero.greeting}
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            {hero.name}
          </span>
        </motion.h1>

        {/* Role — Typing animation */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-6 text-lg font-medium text-purple-300 sm:text-xl md:text-2xl"
        >
          <TypeWriter
            words={hero.role.includes("|") ? hero.role.split("|").map(s => s.trim()) : [hero.role]}
            typingSpeed={70}
            deletingSpeed={40}
            pauseDuration={2500}
          />
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-gray-400 sm:mb-10 sm:text-base md:text-lg"
        >
          {hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            onClick={() => handleScroll("#projects")}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 sm:px-8 sm:py-3.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{hero.cta}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => handleScroll("#contact")}
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-gray-300 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10 hover:text-white sm:px-8 sm:py-3.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {hero.resumeCta}
          </motion.button>
        </motion.div>

        {/* Tech Icons Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-10 sm:mt-12"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-500">
            Technologies I Work With
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {heroTechIcons.map((tech, i) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.05, type: "spring", stiffness: 200 }}
                className="group relative"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-white/20 hover:bg-white/10 sm:h-12 sm:w-12 sm:text-xl"
                >
                  <tech.icon style={{ color: tech.color }} />
                </div>
                {/* Tooltip */}
                <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-0.5 text-[10px] text-gray-300 opacity-0 transition-opacity group-hover:opacity-100">
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating glass cards (decorative) */}
        <div className="pointer-events-none mt-16 hidden items-center justify-center gap-5 md:flex">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <GlassCard hover={false} className="!p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <SiReact className="text-base" style={{ color: "#61DAFB" }} />
                <SiNextdotjs className="text-base" style={{ color: "#ffffff" }} />
                <span className="text-xs text-gray-400">React / Next.js</span>
              </div>
              <div className="h-2 w-32 rounded-full bg-gradient-to-r from-[#61DAFB] to-[#0070F3]" />
            </GlassCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            <GlassCard hover={false} className="!p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <SiPython className="text-base" style={{ color: "#3776AB" }} />
                <span className="text-xs text-gray-400">Data Science</span>
              </div>
              <div className="h-2 w-24 rounded-full bg-gradient-to-r from-[#3776AB] to-[#10B981]" />
            </GlassCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <GlassCard hover={false} className="!p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <SiRust className="text-base" style={{ color: "#DEA584" }} />
                <span className="text-xs text-gray-400">Rust</span>
              </div>
              <div className="h-2 w-28 rounded-full bg-gradient-to-r from-[#DEA584] to-[#B7410E]" />
            </GlassCard>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <GlassCard hover={false} className="!p-4 text-left">
              <div className="mb-2 flex items-center gap-2">
                <SiLua className="text-base" style={{ color: "#2C2D72" }} />
                <span className="text-xs text-gray-400">Lua</span>
              </div>
              <div className="h-2 w-24 rounded-full bg-gradient-to-r from-[#2C2D72] to-[#00007C]" />
            </GlassCard>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-10 flex justify-center sm:mt-16"
        >
          <motion.button
            onClick={() => handleScroll("#about")}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-500 hover:text-gray-300"
            aria-label="Scroll down"
          >
            <ArrowDown size={24} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
