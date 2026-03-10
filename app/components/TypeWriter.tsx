"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypeWriterProps {
  /** Array of strings to cycle through */
  words: string[];
  /** Typing speed in ms per character */
  typingSpeed?: number;
  /** Deleting speed in ms per character */
  deletingSpeed?: number;
  /** Pause duration after typing a word (ms) */
  pauseDuration?: number;
  /** CSS class for the text */
  className?: string;
  /** Whether to show blinking cursor */
  showCursor?: boolean;
}

/**
 * TypeWriter — Typing/deleting animation that cycles through an array of words.
 */
export default function TypeWriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className = "",
  showCursor = true,
}: TypeWriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex] || "";

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing
      setText(currentWord.slice(0, text.length + 1));
      if (text.length + 1 === currentWord.length) {
        // Finished typing — pause then start deleting
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      // Deleting
      setText(currentWord.slice(0, text.length - 1));
      if (text.length - 1 === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
    }
  }, [text, isDeleting, currentWord, words.length, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={text}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className="inline"
        >
          {text}
        </motion.span>
      </AnimatePresence>
      {showCursor && (
        <motion.span
          className="ml-0.5 inline-block w-[2px] bg-purple-400 sm:w-[3px]"
          style={{ height: "0.9em" }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </span>
  );
}
