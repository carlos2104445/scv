"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, CheckCircle2, BarChart3 } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { ImpactCounter } from "@/components/blocks/SectionHeading";
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
            className="max-w-4xl mx-auto mb-16"
          >
            <p className="text-lg text-neutral-600 leading-relaxed mb-6 text-center">
              Selam Technical and Vocational College is an extension of Selam Children's Village that provides Technical and Vocational Training to children who grow up in the organization, and applicants from the communities at subsidized cost-sharing and scholarship schemes.
            </p>
            
            {/* KPIs */}
            <div className="mt-12 mb-16">
              <div className="flex items-center justify-center gap-2 mb-8">
                <BarChart3 className="w-6 h-6 text-brand-orange" />
                <h3 className="text-2xl font-bold text-brand-dark tracking-normal">Our Impact</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
                  <ImpactCounter end={1295} label="Youth Trained" />
                </div>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
                  <ImpactCounter end={62} suffix="%" label="COC Pass Rate" />
                </div>
                <div className="p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm">
                  <ImpactCounter end={222} label="Graduates Employed" />
                </div>
              </div>
            </div>

            {/* Reasons Grid */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-brand-dark tracking-normal mb-8 text-center">Top Reasons to Choose Our Program</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { title: "High-Quality Instruction", desc: "Rigorous training with 70-90% of the curriculum consisting of practical, hands-on learning." },
                  { title: "Expert Faculty", desc: "Learn from experienced professionals dedicated to helping you succeed in modern manufacturing." },
                  { title: "State-of-the-Art Facilities", desc: "Train in our modern machine shop, equipped with CNC machines and Virtual Reality Welding." },
                  { title: "Hands-On Experience", desc: "Gain practical, real-world experience working on a wide range of machines and equipment." },
                  { title: "Practical Integration", desc: "Our approach is uniquely integrated with a practical metal manufacturing center." },
                  { title: "Industry Connections", desc: "Benefit from our strong network of industry partners to secure valuable internships." },
                  { title: "Incubation Center", desc: "Utilize resources to showcase your skills and increase chances of career success." },
                  { title: "Saving & Credit", desc: "Access to a micro-finance program to help you practice saving and secure loans." },
                  { title: "Flexible Learning", desc: "Choose full-time and Extension options to fit your busy schedule." },
                  { title: "Digitalization", desc: "Access our digital learning management system to track your progress effectively." }
                ].map((reason, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-neutral-50 border border-neutral-100 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-brand-dark">{reason.title}</h4>
                      <p className="text-sm text-neutral-600 mt-1">{reason.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-brand-dark tracking-normal">Our Departments</h3>
            <p className="text-neutral-600 mt-2">Explore our 11 specialized departments offering regular and extension programs.</p>
          </div>

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
