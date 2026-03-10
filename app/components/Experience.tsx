"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";

/**
 * Experience — Animated vertical timeline showing learning journey
 * Timeline entries are admin-editable via SiteData.
 */
const icons = [
  <Rocket key="rocket" size={20} className="text-purple-400" />,
  <Briefcase key="briefcase" size={20} className="text-blue-400" />,
  <GraduationCap key="grad" size={20} className="text-cyan-400" />,
];

export default function Experience() {
  const { data } = useSiteData();
  const exp = data.experience;

  return (
    <SectionWrapper id="experience">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm font-medium uppercase tracking-widest text-purple-400"
        >
          {exp.subtitle}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          {exp.title}
        </motion.h2>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-2xl">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent sm:left-6 md:left-1/2 md:-translate-x-px" />

        {exp.timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className={`relative mb-10 flex items-start gap-4 sm:mb-12 sm:gap-6 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/80 shadow-lg shadow-purple-500/10 backdrop-blur-sm sm:h-12 sm:w-12 md:absolute md:left-1/2 md:-translate-x-1/2">
              {icons[i % icons.length]}
            </div>

            {/* Content card */}
            <div
              className={`flex-1 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/8 sm:p-6 ${
                i % 2 === 0 ? "md:mr-auto md:pr-12 md:text-right" : "md:ml-auto md:pl-12 md:text-left"
              } md:w-[calc(50%-3rem)]`}
            >
              <span className="mb-2 inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300">
                {item.year}
              </span>
              <h3 className="mb-2 text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
