"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";
import SectionWrapper from "./SectionWrapper";
import GlassCard from "./GlassCard";

/**
 * Websites — Showcase of live production websites / apps.
 * Uses scaled-down iframes as live mini-previews.
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
              <GlassCard className="flex h-full flex-col overflow-hidden p-0 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
                {/* ── Live iframe preview ── */}
                <div className="relative h-44 w-full overflow-hidden border-b border-white/5 bg-[#0a0a1a] sm:h-48">
                  {/* Browser dots */}
                  <div className="absolute left-3 top-2.5 z-10 flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  </div>
                  {/* URL bar */}
                  <div className="absolute left-20 right-3 top-1.5 z-10 flex items-center rounded-md bg-white/5 px-2.5 py-1">
                    <span className="truncate text-[10px] text-gray-500">
                      {site.url.replace(/^https?:\/\//, "")}
                    </span>
                  </div>
                  {/* Scaled iframe */}
                  <div className="absolute inset-0 top-8 origin-top-left scale-[0.25] sm:scale-[0.28]" style={{ width: "400%", height: "400%" }}>
                    <iframe
                      src={site.url}
                      title={site.name}
                      className="h-full w-full border-0"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                      tabIndex={-1}
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                    <span className="flex items-center gap-2 rounded-full bg-purple-600/90 px-4 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
                      <ExternalLink size={13} /> Visit Site
                    </span>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="mb-1.5 text-base font-semibold text-white transition-colors group-hover:text-purple-300 sm:text-lg">
                      {site.name}
                    </h3>
                    <p className="mb-3 text-xs leading-relaxed text-gray-400 sm:text-sm">
                      {site.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {site.tags && site.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {site.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/5 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-gray-300 sm:text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </a>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
