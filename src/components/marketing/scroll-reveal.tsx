"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const revealSpring = {
  type: "spring" as const,
  stiffness: 80,
  damping: 18,
};

type ScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

export function ScrollReveal({
  children,
  delay = 0,
  y = 32,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...revealSpring, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
