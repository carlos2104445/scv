"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { projects } from "@/data/projects";

const cycPrograms = projects.filter((p) => p.category === "cyc" || p.category === "community");

export default function CYCSupportPage() {
  return (
    <>
      <PageHero
        title="Children, Youth & Community Support"
        subtitle="Our core programs providing holistic care, education, and community development services."
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: "CYC Support", href: "/what-we-do/children-youth-community-support" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-lg text-neutral-600 leading-relaxed max-w-3xl mx-auto text-center mb-14"
          >
            Our Children, Youth &amp; Community Support programs form the foundation of Selam Children&apos;s Village. From direct child care in our family-model homes to community outreach initiatives, we address the diverse needs of Ethiopia&apos;s most vulnerable populations.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cycPrograms.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/what-we-do/${project.slug}`}
                  className="group block card-base hover-lift h-full"
                >
                  <div className="relative h-40 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-brand-orange/20">{project.title[0]}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{project.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-brand-orange text-sm font-semibold">
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
