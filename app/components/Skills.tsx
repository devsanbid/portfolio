"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSiteData, type SkillItem } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";

// ── Technology icons from react-icons ──
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiPython,
  SiNodedotjs,
  SiGit,
  SiDocker,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
  SiRust,
  SiGo,
  SiVuedotjs,
  SiAngular,
  SiSvelte,
  SiRedux,
  SiSass,
  SiFigma,
  SiLinux,
  SiNeovim,
  SiPandas,
  SiNumpy,
  SiTensorflow,
  SiScikitlearn,
  SiJupyter,
} from "react-icons/si";
import type { IconType } from "react-icons";

/**
 * Skills — Animated skill cards with tech icons and glowing progress indicators
 * All skills data is admin-editable via SiteData.
 */

// Map skill names (lowercase) → { icon, brandColor (hex for inline style) }
const techIconMap: Record<string, { icon: IconType; color: string }> = {
  react:          { icon: SiReact,       color: "#61DAFB" },
  "react.js":    { icon: SiReact,       color: "#61DAFB" },
  "next.js":     { icon: SiNextdotjs,   color: "#ffffff" },
  nextjs:        { icon: SiNextdotjs,   color: "#ffffff" },
  javascript:    { icon: SiJavascript,  color: "#F7DF1E" },
  typescript:    { icon: SiTypescript,  color: "#3178C6" },
  html:          { icon: SiHtml5,       color: "#E34F26" },
  html5:         { icon: SiHtml5,       color: "#E34F26" },
  css:           { icon: SiCss,         color: "#1572B6" },
  css3:          { icon: SiCss,         color: "#1572B6" },
  "tailwind css":{ icon: SiTailwindcss, color: "#06B6D4" },
  tailwindcss:   { icon: SiTailwindcss, color: "#06B6D4" },
  tailwind:      { icon: SiTailwindcss, color: "#06B6D4" },
  python:        { icon: SiPython,      color: "#3776AB" },
  "node.js":     { icon: SiNodedotjs,   color: "#339933" },
  nodejs:        { icon: SiNodedotjs,   color: "#339933" },
  git:           { icon: SiGit,         color: "#F05032" },
  docker:        { icon: SiDocker,      color: "#2496ED" },
  mongodb:       { icon: SiMongodb,     color: "#47A248" },
  postgresql:    { icon: SiPostgresql,  color: "#4169E1" },
  postgres:      { icon: SiPostgresql,  color: "#4169E1" },
  firebase:      { icon: SiFirebase,    color: "#FFCA28" },
  graphql:       { icon: SiGraphql,     color: "#E10098" },
  rust:          { icon: SiRust,        color: "#DEA584" },
  go:            { icon: SiGo,          color: "#00ADD8" },
  golang:        { icon: SiGo,          color: "#00ADD8" },
  "vue.js":      { icon: SiVuedotjs,    color: "#4FC08D" },
  vue:           { icon: SiVuedotjs,    color: "#4FC08D" },
  angular:       { icon: SiAngular,     color: "#DD0031" },
  svelte:        { icon: SiSvelte,      color: "#FF3E00" },
  redux:         { icon: SiRedux,       color: "#764ABC" },
  sass:          { icon: SiSass,        color: "#CC6699" },
  scss:          { icon: SiSass,        color: "#CC6699" },
  figma:         { icon: SiFigma,       color: "#F24E1E" },
  linux:         { icon: SiLinux,       color: "#FCC624" },
  neovim:        { icon: SiNeovim,      color: "#57A143" },
  pandas:        { icon: SiPandas,      color: "#150458" },
  numpy:         { icon: SiNumpy,       color: "#013243" },
  tensorflow:    { icon: SiTensorflow,  color: "#FF6F00" },
  "scikit-learn":{ icon: SiScikitlearn, color: "#F7931E" },
  "machine learning": { icon: SiTensorflow, color: "#FF6F00" },
  "data analysis":    { icon: SiPandas,     color: "#150458" },
  jupyter:       { icon: SiJupyter,     color: "#F37626" },
};

function getTechIcon(name: string): { icon: IconType; color: string } | null {
  return techIconMap[name.toLowerCase()] ?? null;
}

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const tech = getTechIcon(skill.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {tech && (
            <span className="text-lg transition-transform duration-300 group-hover:scale-110">
              <tech.icon style={{ color: tech.color }} />
            </span>
          )}
          <span className="text-sm font-semibold text-white">{skill.name}</span>
        </div>
        <span className="text-xs text-gray-500">{skill.level}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: "easeOut" }}
        />
      </div>

      {/* Glow on hover */}
      <motion.div
        className={`mt-2 h-[2px] rounded-full bg-gradient-to-r ${skill.color} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60`}
        style={{ width: `${skill.level}%` }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const { data } = useSiteData();
  const skills = data.skills;

  return (
    <SectionWrapper id="skills">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-400"
        >
          {skills.subtitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          {skills.title}
        </motion.h2>
      </div>

      {/* Frontend Skills */}
      {skills.frontend.length > 0 && (
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-lg font-semibold text-purple-300"
          >
            {skills.frontendLabel}
          </motion.h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.frontend.map((skill, i) => (
              <SkillCard key={skill.name + i} skill={skill} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Learning Skills */}
      {skills.learning.length > 0 && (
        <div className="mb-12">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-lg font-semibold text-cyan-300"
          >
            {skills.learningLabel}
          </motion.h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.learning.map((skill, i) => (
              <SkillCard key={skill.name + i} skill={skill} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Dev Tools & Environment */}
      {skills.tools && skills.tools.length > 0 && (
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-6 text-lg font-semibold text-amber-300"
          >
            {skills.toolsLabel || "Dev Tools & Environment"}
          </motion.h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.tools.map((skill, i) => (
              <SkillCard key={skill.name + i} skill={skill} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── "I use Neovim BTW" ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8"
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-green-900/20 via-emerald-900/10 to-blue-900/20 p-5 backdrop-blur-sm sm:p-8 md:p-10">
          {/* Subtle glow accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-green-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            {/* Neovim logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ rotate: [0, -3, 3, -3, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                <Image
                  src="/neovim.svg"
                  alt="Neovim"
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(87,189,71,0.3)]"
                />
              </div>
            </motion.div>

            {/* Text + icon flex */}
            <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
              <motion.p
                className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-green-400/80"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                You know the drill
              </motion.p>
              <motion.h3
                className="flex flex-wrap items-center justify-center gap-2 text-xl font-bold text-white sm:justify-start sm:gap-3 sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                I use
                <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Neovim
                </span>
                BTW
                <SiNeovim className="text-green-400" />
              </motion.h3>
              <motion.p
                className="mt-3 max-w-md text-sm text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Terminal-driven workflow, blazing-fast editing, and infinite customization.
                Once you go Neovim, you never go back.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
