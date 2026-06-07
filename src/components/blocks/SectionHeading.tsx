"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-50 text-brand-orange text-xs font-semibold tracking-wide uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
          {badge}
        </span>
      )}
      <h2
        className={`${
          light ? "text-white" : "text-brand-dark"
        } max-w-3xl ${align === "center" ? "mx-auto" : ""}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg md:text-xl max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-neutral-600"}`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ── Impact Counter ── */
interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function ImpactCounter({
  end,
  suffix = "",
  label,
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-brand-dark font-serif">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-neutral-700 font-medium">{label}</p>
    </div>
  );
}

/* ── Framer Motion Presets ── */
export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" as const },
  transition: { duration: 0.5 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};
