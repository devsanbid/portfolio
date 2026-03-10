"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * FloatingShapes — Ambient animated background shapes for visual depth
 * Disabled on mobile for performance (blur + continuous animation is expensive).
 */
export default function FloatingShapes() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Skip all animations + blur on mobile
  if (isMobile) return null;

  const shapes = [
    { size: 300, x: "10%", y: "20%", delay: 0, color: "from-purple-500/20 to-blue-500/10" },
    { size: 200, x: "80%", y: "10%", delay: 2, color: "from-blue-500/15 to-cyan-500/10" },
    { size: 250, x: "70%", y: "60%", delay: 4, color: "from-violet-500/15 to-purple-500/10" },
    { size: 180, x: "20%", y: "70%", delay: 1, color: "from-cyan-500/15 to-blue-500/10" },
    { size: 220, x: "50%", y: "40%", delay: 3, color: "from-purple-600/10 to-indigo-500/10" },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-[80px]`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            willChange: "transform",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 20,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
