"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import { projects } from "@/data/projects";

const categoryColors: Record<string, string> = {
  cyc: "bg-blue-100 text-blue-700",
  community: "bg-emerald-100 text-emerald-700",
  tvet: "bg-purple-100 text-purple-700",
  project: "bg-amber-100 text-amber-700",
};

const categoryLabels: Record<string, string> = {
  cyc: "Child & Youth Care",
  community: "Community Support",
  tvet: "TVET",
  project: "Project",
};

export function ProjectsSection() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-xl">
        <SectionHeading
          badge="Our Programs"
          title="What We Do"
          subtitle="Comprehensive programs addressing the needs of children, youth, and communities across Ethiopia."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                href={`/what-we-do/${project.slug}`}
                className="group block card-base hover-lift h-full"
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                      <span className="text-3xl font-serif font-bold text-brand-orange/30">
                        {project.title[0]}
                      </span>
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        categoryColors[project.category]
                      }`}
                    >
                      {categoryLabels[project.category]}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                    {project.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-brand-orange text-sm font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/all-projects" className="btn-secondary">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
