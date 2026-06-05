"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SectionHeading } from "@/components/blocks/SectionHeading";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (2 * 60);
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
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  {
    value: 255,
    suffix: "+",
    label: "Children in Care",
    description: "Providing family-based care for orphaned and vulnerable children across three locations.",
    bg: "bg-[#FF7F6B]",
    descColor: "text-white/80",
    image: "/images/projects/family-model-real.jpg",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Individuals Supported",
    description: "Training and empowering youth and communities through education and vocational programs.",
    bg: "bg-brand-dark",
    descColor: "text-white/80",
    image: "/images/projects/youth-real.jpg",
  },
  {
    value: 40,
    suffix: "+",
    label: "Years of Service",
    description: "Four decades of dedicated service building brighter futures for Ethiopia's children.",
    bg: "bg-[#FFD966]",
    descColor: "text-brand-dark/70",
    image: "/images/projects/campus-real.jpg",
  },
];

export function ImpactSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          badge="Impactful Metrics"
          title="Programs that change lives"
          subtitle="Together, we can make a real impact in communities across Ethiopia. Help us bring hope and support."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`relative rounded-3xl ${stat.bg} text-white p-8 overflow-hidden min-h-[300px] flex flex-col justify-between`}
            >
              <div className="relative z-10">
                <p className="text-5xl md:text-6xl font-bold font-serif leading-none">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-lg font-semibold mt-3">{stat.label}</p>
                <p className={`mt-3 text-sm leading-relaxed ${stat.descColor}`}>
                  {stat.description}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
                <Image src={stat.image} alt="" fill className="object-cover rounded-tl-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
