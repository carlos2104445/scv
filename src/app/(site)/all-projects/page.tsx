"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { projects, majorProjects } from "@/data/projects";

const allProjects = [...projects, ...majorProjects];

const categories = [
  { value: "all", label: "All Programs" },
  { value: "cyc", label: "Child & Youth Care" },
  { value: "community", label: "Community Support" },
  { value: "project", label: "Projects" },
];

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

export default function AllProjectsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        title="All Projects & Programs"
        subtitle="Explore our comprehensive range of programs and development initiatives."
        breadcrumbs={[{ label: "All Projects", href: "/all-projects" }]}
      />
      <section className="section-padding">
        <div className="container-xl">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-10 flex-wrap">
            <Filter className="w-4 h-4 text-neutral-400" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat.value
                    ? "bg-brand-orange text-white shadow-md"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                <Link href={`/what-we-do/${project.slug}`} className="group block card-base hover-lift h-full">
                  <div className="relative h-44 bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 flex items-center justify-center">
                    <span className="text-4xl font-serif font-bold text-brand-orange/20">{project.title[0]}</span>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}>
                        {categoryLabels[project.category]}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">{project.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{project.excerpt}</p>
                    <div className="mt-4 flex items-center gap-1 text-brand-orange text-sm font-semibold">
                      View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
