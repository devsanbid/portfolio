"use client";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

/**
 * GlassCard — Reusable glassmorphism card component
 */
export default function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl border border-white/10 bg-white/5 p-6
        shadow-lg shadow-black/5 backdrop-blur-xl
        ${hover ? "transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-purple-500/10 hover:scale-[1.02]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
