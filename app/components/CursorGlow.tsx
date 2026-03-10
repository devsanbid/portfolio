"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * CursorGlow — soft glowing circle that follows the mouse cursor
 */
export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Hide on mobile / touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[90] hidden md:block"
      animate={{
        x: mousePos.x - 200,
        y: mousePos.y - 200,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    >
      <div className="h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
    </motion.div>
  );
}
