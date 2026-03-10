"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Zap, Star, Rocket, Heart } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";
import GlassCard from "./GlassCard";

/**
 * About — Journey section with admin-editable cards
 */
const cardIcons = [
  <Code2 key="code" size={28} className="text-purple-400" />,
  <Brain key="brain" size={28} className="text-cyan-400" />,
  <Zap key="zap" size={28} className="text-yellow-400" />,
  <Star key="star" size={28} className="text-green-400" />,
  <Rocket key="rocket" size={28} className="text-pink-400" />,
  <Heart key="heart" size={28} className="text-red-400" />,
];

const cardGradients = [
  "from-purple-500/20 to-blue-500/10",
  "from-cyan-500/20 to-green-500/10",
  "from-yellow-500/20 to-orange-500/10",
  "from-green-500/20 to-emerald-500/10",
  "from-pink-500/20 to-rose-500/10",
  "from-red-500/20 to-orange-500/10",
];

export default function About() {
  const { data } = useSiteData();
  const about = data.about;

  return (
    <SectionWrapper id="about">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-400"
        >
          {about.subtitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          {about.title}
        </motion.h2>
      </div>

      {/* Description — highlight college name */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mx-auto mb-6 max-w-3xl text-center text-base leading-relaxed text-gray-400 sm:mb-8 sm:text-lg"
      >
        {(() => {
          const keyword = "Softwarica College (affiliated with Coventry University)";
          const idx = about.description.indexOf(keyword);
          if (idx === -1) return about.description;
          const before = about.description.slice(0, idx);
          const after = about.description.slice(idx + keyword.length);
          return (
            <>
              {before}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text font-semibold text-transparent">
                {keyword}
              </span>
              {after}
            </>
          );
        })()}
      </motion.p>

      {/* Education badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        className="mx-auto mb-10 flex max-w-md items-center justify-center sm:mb-16"
      >
        <a
          href="https://softwarica.edu.np"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md transition-all hover:border-purple-500/30 hover:bg-white/10 sm:gap-4 sm:px-6 sm:py-3.5"
        >
          <img
            src="/softwarica-logo.svg"
            alt="Softwarica College"
            className="h-8 w-auto brightness-90 transition-all group-hover:brightness-110 sm:h-10"
          />
          <div className="border-l border-white/10 pl-3 sm:pl-4">
            <span className="block text-xs font-semibold text-white sm:text-sm">Softwarica College</span>
            <span className="block text-[10px] text-gray-500 sm:text-xs">Affiliated with Coventry University, UK</span>
          </div>
        </a>
      </motion.div>

      {/* Info Cards — dynamically from admin */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {about.cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
          >
            <GlassCard className="relative overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cardGradients[i % cardGradients.length]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative z-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5">
                  {cardIcons[i % cardIcons.length]}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">{card.title}</h3>
                <p className="leading-relaxed text-gray-400">{card.description}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
