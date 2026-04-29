"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { departments } from "@/data/departments";

export default function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const { department: slug } = use(params);
  const dept = departments.find((d) => d.slug === slug);

  if (!dept) notFound();

  return (
    <>
      <PageHero
        title={dept.title}
        subtitle={dept.description.slice(0, 120) + "..."}
        breadcrumbs={[
          { label: "TVET College", href: "/technical-vocational-training" },
          { label: dept.shortTitle, href: `/technical-vocational-training/${dept.slug}` },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <p className="text-lg text-neutral-600 leading-relaxed">{dept.description}</p>

              <h3 className="mt-10 text-xl font-bold text-brand-dark tracking-normal">Training Highlights</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {dept.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                    <span className="text-sm font-medium text-brand-dark">{h}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
