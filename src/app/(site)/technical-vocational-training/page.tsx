"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { departments } from "@/data/departments";

export default function TVETPage() {
  return (
    <>
      <PageHero
        title="Technical & Vocational Education Training"
        subtitle="Selam TVET College — empowering youth with industry-relevant skills across 11 departments."
        breadcrumbs={[{ label: "TVET College", href: "/technical-vocational-training" }]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center mb-14"
          >
            <p className="text-lg text-neutral-600 leading-relaxed">
              Selam TVET College is one of Ethiopia&apos;s leading vocational training institutions, offering industry-relevant programs across 11 departments. Our college combines theoretical knowledge with extensive practical training, preparing graduates for immediate employment in Ethiopia&apos;s growing economy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, i) => (
              <motion.div
                key={dept.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/technical-vocational-training/${dept.slug}`}
                  className="group block card-base hover-lift h-full"
                >
                  <div className="relative h-36 bg-gradient-to-br from-purple-50 to-violet-50 flex items-center justify-center">
                    <GraduationCap className="w-12 h-12 text-purple-200 group-hover:text-purple-400 transition-colors" />
                    <div className="absolute top-3 right-3 bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-medium">
                      TVET
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">
                      {dept.shortTitle}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{dept.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {dept.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-500">
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-brand-orange text-sm font-semibold">
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
