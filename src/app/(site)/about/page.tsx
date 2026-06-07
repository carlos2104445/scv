"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Users, GraduationCap, Building, Heart, Eye } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const highlights = [
  { icon: Calendar, label: "Founded", value: "1986", desc: "By Mrs. Tsehay Roschli" },
  { icon: Users, label: "Children", value: "255+", desc: "Currently in our care" },
  { icon: GraduationCap, label: "TVET Departments", value: "11", desc: "Vocational training" },
  { icon: Building, label: "Programs", value: "15+", desc: "Active initiatives" },
];

const sections = [
  {
    title: "Who We Are",
    content: "Selam Children's Village is an Ethiopian non-profit organization established in 1986 by the visionary social worker Mrs. Tsehay Roschli. Located in the Kotebe area of Addis Ababa, we provide comprehensive care, education, and vocational training to orphaned, abandoned, and vulnerable children and youth.",
    href: "/about/who-we-are",
    icon: Users,
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    title: "Our History",
    content: "For four decades, Selam Children's Village has grown from a small initiative into one of Ethiopia's leading child welfare organizations. From humble beginnings, we now operate a full-scale children's village, a TVET college with 11 departments, and multiple community support programs.",
    href: "/about/our-history",
    icon: Heart,
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200",
  },
  {
    title: "Vision, Mission & Core Values",
    content: "Our vision is to see a society where every child and youth is cared for, educated, and empowered. We are guided by our core values of integrity, compassion, excellence, teamwork, accountability, and innovation.",
    href: "/about/vision-mission-core-values",
    icon: Eye,
    color: "bg-brand-orange-50 text-brand-orange",
    borderColor: "border-brand-orange-100",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="About Our Organization"
        subtitle="Four decades of nurturing hope and transforming lives for Ethiopia's most vulnerable children."
      />

      {/* Impact Stats — Yellow Card */}
      <section className="py-12">
        <div className="container-xl">
          <div className="rounded-3xl bg-amber-100 py-10 px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-white/70 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-brand-dark" />
                  </div>
                  <p className="text-3xl font-bold text-brand-dark font-serif">{item.value}</p>
                  <p className="text-sm font-semibold text-brand-dark mt-1">{item.label}</p>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-brand-dark">Our Story</h2>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              Selam Children&apos;s Village was founded in 1986 by Mrs. Tsehay Roschli, a Swiss-Ethiopian social worker with a profound vision: to create a nurturing environment where Ethiopia&apos;s most vulnerable children could grow, learn, and thrive. What began as a small initiative has blossomed into one of the country&apos;s most comprehensive child welfare organizations, serving hundreds of children and youth through direct care, education, vocational training, and community support programs.
            </p>
            <p className="mt-4 text-lg text-neutral-600 leading-relaxed">
              Today, our campus in the Kotebe area of Addis Ababa is home to a children&apos;s village organized in family-style units, a fully accredited TVET college with 11 departments, a health clinic, and numerous support services. We believe that every child deserves a chance to reach their full potential, and we work tirelessly to make that belief a reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Cards — Kindoora Style */}
      <section className="section-padding bg-neutral-50">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={section.href}
                  className={`group block rounded-2xl border ${section.borderColor} bg-white p-6 h-full shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center mb-4`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed">
                    {section.content}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-brand-orange text-sm font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
