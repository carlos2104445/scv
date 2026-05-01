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
        subtitle={dept.description}
        breadcrumbs={[
          { label: "TVET College", href: "/technical-vocational-training" },
          { label: dept.shortTitle, href: `/technical-vocational-training/${dept.slug}` },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                
                {dept.image && (
                  <div className="mb-8 rounded-2xl overflow-hidden aspect-[16/9] relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dept.image}
                      alt={dept.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <p className="text-lg text-neutral-600 leading-relaxed mb-6">{dept.description}</p>

                {dept.additionalParagraphs && dept.additionalParagraphs.length > 0 && (
                  <div className="space-y-4 mb-10">
                    {dept.additionalParagraphs.map((para, idx) => (
                      <p key={idx} className="text-lg text-neutral-600 leading-relaxed">{para}</p>
                    ))}
                  </div>
                )}

                {dept.services && dept.services.length > 0 && (
                  <div className="mt-12 mb-10">
                    <h3 className="text-xl font-bold text-brand-dark tracking-normal mb-6">Key Training Areas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {dept.services.map((service, idx) => (
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

                <h3 className="mt-10 text-xl font-bold text-brand-dark tracking-normal mb-6">Program Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dept.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                      <span className="text-sm font-medium text-brand-dark">{h}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
