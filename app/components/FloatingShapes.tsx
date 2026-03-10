"use client";

import { motion } from "framer-motion";

/**
 * FloatingShapes — Ambient animated background shapes for visual depth
 */
export default function FloatingShapes() {
  const shapes = [
    { size: 300, mobileSize: 150, x: "10%", y: "20%", delay: 0, color: "from-purple-500/20 to-blue-500/10", hideOnMobile: false },
    { size: 200, mobileSize: 100, x: "80%", y: "10%", delay: 2, color: "from-blue-500/15 to-cyan-500/10", hideOnMobile: false },
    { size: 250, mobileSize: 0, x: "70%", y: "60%", delay: 4, color: "from-violet-500/15 to-purple-500/10", hideOnMobile: true },
    { size: 180, mobileSize: 0, x: "20%", y: "70%", delay: 1, color: "from-cyan-500/15 to-blue-500/10", hideOnMobile: true },
    { size: 220, mobileSize: 0, x: "50%", y: "40%", delay: 3, color: "from-purple-600/10 to-indigo-500/10", hideOnMobile: true },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} blur-[80px] ${shape.hideOnMobile ? "hidden md:block" : ""}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
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
