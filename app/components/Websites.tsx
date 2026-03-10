"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";
import GlassCard from "./GlassCard";

/**
 * Websites — Showcase of live production websites / apps.
 * Data is fully admin-editable via useSiteData().
 */
export default function Websites() {
  const { data } = useSiteData();
  const { title, subtitle, items } = data.websites;

  if (!items || items.length === 0) return null;

  return (
    <SectionWrapper id="websites">
      {/* ── Section header ── */}
      <motion.div
        className="mb-12 text-center sm:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="mb-4 inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-purple-300 uppercase">
          {subtitle}
        </span>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </motion.div>

      {/* ── Website cards grid ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((site, i) => (
          <motion.div
            key={site.url}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <GlassCard className="flex h-full flex-col justify-between p-6 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5">
                {/* Top: icon + external link */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-400">
                      <Globe size={20} />
                    </div>
                    <ExternalLink
                      size={16}
                      className="text-gray-500 transition-colors group-hover:text-purple-400"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                    {site.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-gray-400">
                    {site.description}
                  </p>
                </div>

                {/* Tags */}
                {site.tags && site.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {site.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* URL preview */}
                <p className="mt-4 truncate text-xs text-purple-400/60 transition-colors group-hover:text-purple-400">
                  {site.url.replace(/^https?:\/\//, "")}
                </p>
              </GlassCard>
            </a>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
