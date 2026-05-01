"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImpactCounter } from "@/components/blocks/SectionHeading";
import type { ImpactStat } from "@/lib/api";

const fallbackStats: ImpactStat[] = [
  { id: "1", label: "Children in Care", value: 255, suffix: "+", order: 0 },
  { id: "2", label: "Years of Service", value: 40, suffix: "", order: 1 },
  { id: "3", label: "TVET Departments", value: 11, suffix: "", order: 2 },
];

export function ImpactSection({ stats: propStats }: { stats?: ImpactStat[] }) {
  const stats = propStats && propStats.length > 0 ? propStats : fallbackStats;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/projects/campus.png" alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-brand-dark/85" />

      <div className="relative z-10 container-xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Our Impact
          </span>
          <h2 className="text-white">Making a Difference, Every Day</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Numbers that represent real lives transformed through decades of dedicated service.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <ImpactCounter end={stat.value} suffix={stat.suffix || ""} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
