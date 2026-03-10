"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * ScrollProgress — fixed top bar showing page scroll progress
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress(totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[100] h-[3px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  );
}
