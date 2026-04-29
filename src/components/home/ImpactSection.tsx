"use client";

import { motion } from "framer-motion";
import { ImpactCounter } from "@/components/blocks/SectionHeading";

const stats = [
  { end: 255, label: "Children in Care", suffix: "+" },
  { end: 40, label: "Years of Service", suffix: "" },
  { end: 11, label: "TVET Departments", suffix: "" },
  { end: 15, label: "Active Programs", suffix: "+" },
  { end: 3200, label: "Patients Annually", suffix: "+" },
  { end: 182, label: "Recent Graduates", suffix: "" },
];

export function ImpactSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-dark-light" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 container-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-semibold tracking-wide uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
            Our Impact
          </span>
          <h2 className="text-white">Making a Difference, Every Day</h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Numbers that represent real lives transformed through decades of
            dedicated service.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <ImpactCounter
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
