"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useSiteData } from "@/app/lib/siteData";

/**
 * Footer — Minimal modern footer
 */
export default function Footer() {
  const { data } = useSiteData();
  const footer = data.footer;

  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500"
          >
            {footer.copyright}
          </motion.p>

          {/* Made with */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1.5 text-sm text-gray-500"
          >
            {footer.madeWith}{" "}
            <Heart size={14} className="text-purple-500" fill="currentColor" />
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
