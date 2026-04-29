"use client";

import { motion } from "framer-motion";
import { Eye, Target, Gem, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const coreValues = [
  "Integrity", "Compassion", "Excellence", "Teamwork", "Accountability", "Innovation",
];

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        title="Vision, Mission & Core Values"
        subtitle="The guiding principles that drive everything we do."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Vision, Mission & Core Values", href: "/about/vision-mission-core-values" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark">Our Vision</h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                To see a society where every child and youth is cared for, educated, and empowered to become a self-reliant and productive citizen contributing positively to their community and nation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-brand-orange-50 to-orange-50 border border-brand-orange-100"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark">Our Mission</h2>
              <p className="mt-4 text-neutral-600 leading-relaxed">
                To provide comprehensive and holistic care, education, and vocational training to orphaned, abandoned, and vulnerable children and youth, empowering them to become productive members of society and agents of positive change.
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6">
              <Gem className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-brand-dark">Core Values</h2>
            <p className="mt-4 text-neutral-600 leading-relaxed mb-8">
              These values define who we are and guide every decision we make in service of Ethiopia&apos;s children.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {coreValues.map((value, i) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="font-semibold text-brand-dark">{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
