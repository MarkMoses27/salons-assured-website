"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const distance = 36;

  const initial = {
    opacity: 0,
    y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    filter: "blur(10px)",
  };

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 1 } : initial}
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}