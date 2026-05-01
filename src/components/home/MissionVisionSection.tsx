"use client";

import { motion } from "framer-motion";
import { Eye, Target, Gem } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const iconMap = { "Our Vision": Eye, "Our Mission": Target, "Core Values": Gem };
const colorMap = {
  "Our Vision": { color: "from-blue-500 to-indigo-600", bg: "bg-blue-50" },
  "Our Mission": { color: "from-brand-orange to-brand-orange-dark", bg: "bg-brand-orange-50" },
  "Core Values": { color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
};

export function MissionVisionSection({ settings }: { settings?: Record<string, string> }) {
  const vision = settings?.vision || "To see a society where every child and youth is cared for, educated, and empowered to become a self-reliant and productive citizen.";
  const mission = settings?.mission || "To provide comprehensive and holistic care, education, and vocational training to orphaned, abandoned, and vulnerable children and youth, empowering them to become productive members of society.";

  let coreValuesText = "Integrity, Compassion, Excellence, Teamwork, Accountability, and Innovation guide everything we do as we serve Ethiopia's most vulnerable children.";
  if (settings?.core_values) {
    try {
      const arr = JSON.parse(settings.core_values);
      if (Array.isArray(arr)) coreValuesText = arr.join(", ") + " — these values guide everything we do as we serve Ethiopia's most vulnerable children.";
    } catch { /* use default */ }
  }

  const cards = [
    { title: "Our Vision" as const, description: vision },
    { title: "Our Mission" as const, description: mission },
    { title: "Core Values" as const, description: coreValuesText },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          badge="Who We Are"
          title="Building Brighter Futures Since 1986"
          subtitle="For four decades, we have been dedicated to transforming the lives of Ethiopia's most vulnerable children through comprehensive care and support."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = iconMap[card.title];
            const colors = colorMap[card.title];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative rounded-2xl p-8 bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${colors.bg} rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.color} flex items-center justify-center shadow-lg mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 tracking-normal">{card.title}</h3>
                  <p className="text-neutral-600 leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
