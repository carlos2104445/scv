"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, Home, Stethoscope, Building2 } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { ImpactCounter } from "@/components/blocks/SectionHeading";

const highlights = [
  { icon: Home, title: "Family-Based Care", desc: "Children live in small family units guided by dedicated house mothers providing personalized care and emotional support.", color: "bg-rose-50 text-rose-600", borderColor: "border-rose-200" },
  { icon: GraduationCap, title: "Education & TVET", desc: "From primary school through vocational college — 11 TVET departments training the next generation of skilled professionals.", color: "bg-blue-50 text-blue-600", borderColor: "border-blue-200" },
  { icon: Stethoscope, title: "Healthcare", desc: "On-campus clinic providing comprehensive healthcare to children, staff, and surrounding community members.", color: "bg-emerald-50 text-emerald-600", borderColor: "border-emerald-200" },
  { icon: Users, title: "Community Programs", desc: "Women's economic empowerment, elderly support, hygiene kits for girls, and school feeding programs.", color: "bg-amber-50 text-amber-600", borderColor: "border-amber-200" },
  { icon: Heart, title: "Youth Transition", desc: "Supporting grown children as they transition to independent, productive lives with job placement and mentorship.", color: "bg-purple-50 text-purple-600", borderColor: "border-purple-200" },
  { icon: Building2, title: "Multi-Campus", desc: "Operating across Addis Ababa, Sheno, and Welayita Sodo to reach more vulnerable children and communities.", color: "bg-brand-orange-50 text-brand-orange", borderColor: "border-brand-orange-100" },
];

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        badge="About Us"
        title="Who We Are"
        subtitle="A comprehensive Ethiopian non-profit serving the most vulnerable children and youth since 1986."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Who We Are", href: "/about/who-we-are" },
        ]}
      />

      {/* Intro with Image */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Our Story</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Selam Children&apos;s Village (SCV) is a registered Ethiopian non-governmental, non-profit organization headquartered in Addis Ababa, Ethiopia. Founded in 1986 by Mrs. Tsehay Roschli, SCV is dedicated to providing holistic care, protection, education, and empowerment to orphaned, abandoned, and vulnerable children and youth.
                </p>
                <p>
                  We operate on a family-based model where children live in small family units, each guided by a dedicated house mother who provides personalized care and emotional support. This model ensures that every child experiences the warmth and stability of a family environment while receiving quality education and healthcare.
                </p>
                <p>
                  Our campus in the Kotebe area of Addis Ababa hosts a comprehensive range of facilities including residential family homes, a school, a TVET college with 11 departments, a clinic, recreational areas, and administrative offices.
                </p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/hero/real-hero-1.jpg" alt="Children at Selam Village" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers — Kindoora yellow card */}
      <section className="py-16">
        <div className="container-xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-50 border border-brand-orange-100 mb-4">
              <span className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              <span className="text-sm font-semibold text-brand-dark">Our Impacts</span>
            </span>
            <h2 className="text-brand-dark">Since our founding, Selam has made an extensive impact</h2>
          </div>
          <div className="rounded-3xl bg-amber-100 py-12 px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <ImpactCounter end={255} label="Children in Care" suffix="+" />
              <ImpactCounter end={4000} label="TVET Graduates" suffix="+" />
              <ImpactCounter end={40} label="Years of Service" suffix="+" />
              <ImpactCounter end={11} label="TVET Departments" />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Grid */}
      <section className="section-padding bg-neutral-50">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark">What Makes Us Different</h2>
            <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">A holistic approach to child welfare that combines family-based care, quality education, and community development.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`rounded-2xl border ${h.borderColor} bg-white p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-xl ${h.color} flex items-center justify-center mb-4`}>
                  <h.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{h.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Image Row */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/projects/campus-real.jpg" alt="SCV Campus" fill className="object-cover" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-brand-dark mb-6">Our Impact</h2>
              <div className="space-y-4 text-neutral-700 leading-relaxed">
                <p>
                  Over four decades, we have cared for thousands of children, graduated hundreds of skilled professionals from our TVET college, supported community women through economic empowerment programs, and provided healthcare to thousands of patients annually.
                </p>
                <p>
                  Our alumni are now contributing members of society — teachers, engineers, healthcare workers, and entrepreneurs. They are living proof that with the right support, every child can reach their full potential.
                </p>
                <p>
                  Today, Selam Children&apos;s Village continues to grow, reaching more communities and developing innovative programs to address the evolving needs of vulnerable children and youth in Ethiopia.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
