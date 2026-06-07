"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import React from "react";

/**
 * A reusable client wrapper that applies Framer Motion whileInView animations.
 * Use this to wrap content in server components so the page itself remains
 * a server component (for SSR / SEO) while still getting entrance animations.
 */

interface AnimatedSectionProps {
  children: React.ReactNode;
  /** Animation delay in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** HTML tag to render (defaults to div) */
  as?: "div" | "section" | "article" | "li" | "span";
  /** Animation variant */
  variant?: "fadeUp" | "fadeIn" | "slideRight" | "scaleIn";
}

const variants = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  },
  slideRight: {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
  },
};

export function AnimatedSection({
  children,
  delay = 0,
  className = "",
  as = "div",
  variant = "fadeUp",
}: AnimatedSectionProps) {
  const Component = motion[as] as React.ComponentType<HTMLMotionProps<typeof as>>;
  const v = variants[variant];

  return (
    <Component
      initial={v.initial}
      whileInView={v.whileInView}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </Component>
  );
}

/**
 * Client wrapper for staggered grid items.
 * Pass the index to automatically calculate delay.
 */
export function AnimatedItem({
  children,
  index = 0,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * staggerDelay, duration: 0.4 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
