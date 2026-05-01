"use client";

import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import type { Department } from "@/lib/api";

const API = process.env.NEXT_PUBLIC_ADMIN_API_URL || "https://dashboard.kitchen251.tech/api/v1";

export default function DepartmentPage({ params }: { params: Promise<{ department: string }> }) {
  const { department: slug } = use(params);
  const [dept, setDept] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/departments`).then(r => r.json()).then(res => {
      const found = (res.data as Department[]).find((d) => d.slug === slug);
      setDept(found || null);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" /></div>;
  if (!dept) notFound();

  return (
    <>
      <PageHero
        title={dept.name}
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
                      alt={dept.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <p className="text-lg text-neutral-600 leading-relaxed mb-6">{dept.description}</p>

                {dept.body && dept.body !== dept.description && (
                  <div className="space-y-4 mb-10">
                    {dept.body.split("\n\n").filter(Boolean).map((para, idx) => (
                      <p key={idx} className="text-lg text-neutral-600 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {dept.services && Array.isArray(dept.services) && (dept.services as { title: string; description: string }[]).length > 0 && (
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
