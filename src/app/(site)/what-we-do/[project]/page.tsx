"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { use } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ArrowRight, BarChart3, Globe, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { ImpactCounter } from "@/components/blocks/SectionHeading";
import { projects } from "@/data/projects";

const sdgNames: Record<number, string> = {
  1: "No Poverty", 2: "Zero Hunger", 3: "Good Health", 4: "Quality Education",
  5: "Gender Equality", 6: "Clean Water", 8: "Decent Work", 10: "Reduced Inequalities",
  16: "Peace & Justice", 17: "Partnerships",
};

export default function ProjectDetailPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: slug } = use(params);
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const bodyParagraphs = [project.description, ...(project.additionalParagraphs || [])];
  const services = project.services || [];

  return (
    <>
      <PageHero
        title={project.title}
        subtitle={project.excerpt}
        breadcrumbs={[
          { label: "What We Do", href: "/what-we-do" },
          { label: project.title, href: `/what-we-do/${project.slug}` },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              >
                {/* Project image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>

                {bodyParagraphs.map((paragraph, idx) => (
                  <p key={idx} className="text-lg text-neutral-600 leading-relaxed mt-4 first:mt-0">
                    {paragraph}
                  </p>
                ))}

                {/* Services / Features Grid */}
                {services.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-brand-dark tracking-normal mb-6">Services Provided</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service, idx) => (
                        <div key={idx} className="p-5 rounded-xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-bold text-brand-dark">{service.title}</h4>
                              <p className="text-sm text-neutral-600 mt-1">{service.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* KPIs */}
                {project.kpis.length > 0 && (
                  <div className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                      <BarChart3 className="w-5 h-5 text-brand-orange" />
                      <h3 className="text-xl font-bold text-brand-dark tracking-normal">Our Impact</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {project.kpis.map((kpi) => (
                        <div key={kpi.label} className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                          <ImpactCounter end={kpi.value} suffix={kpi.suffix || ""} label={kpi.label} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SDGs */}
                {project.sdgs.length > 0 && (
                  <div className="mt-12">
                    <div className="flex items-center gap-2 mb-6">
                      <Globe className="w-5 h-5 text-brand-orange" />
                      <h3 className="text-xl font-bold text-brand-dark tracking-normal">SDG Alignment</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.sdgs.map((sdg) => (
                        <span key={sdg} className="px-3 py-1.5 rounded-full bg-brand-orange-50 text-brand-orange text-sm font-medium">
                          SDG {sdg}: {sdgNames[sdg] || ""}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="sticky top-28 space-y-6"
              >
                <div className="card-base p-6 bg-gradient-to-br from-brand-orange-50 to-white">
                  <h3 className="text-lg font-bold text-brand-dark tracking-normal">Support This Program</h3>
                  <p className="mt-2 text-sm text-neutral-600">Your donation directly supports this program and the lives it transforms.</p>
                  <Link href="/get-involved/donate" className="btn-primary w-full mt-4 text-center">
                    <Heart className="w-4 h-4" /> Donate Now
                  </Link>
                </div>

                <div className="card-base p-6">
                  <h3 className="text-lg font-bold text-brand-dark mb-4 tracking-normal">Related Programs</h3>
                  <div className="space-y-2">
                    {projects.slice(0, 5).filter(p => p.slug !== slug).map((p) => (
                      <Link
                        key={p.slug}
                        href={`/what-we-do/${p.slug}`}
                        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-brand-orange transition-colors group"
                      >
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
