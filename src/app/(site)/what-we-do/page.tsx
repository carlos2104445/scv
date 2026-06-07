import { AnimatedSection, AnimatedItem } from "@/components/global/AnimatedSection";
import Link from "next/link";
import { ArrowRight, Users, Building2, GraduationCap, Briefcase } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const programAreas = [
  {
    icon: Users,
    title: "Children, Youth & Community Support",
    description: "Comprehensive care programs for orphaned and vulnerable children, youth development, and community outreach.",
    href: "/what-we-do/children-youth-community-support",
    cardColor: "bg-blue-50 text-blue-600", borderColor: "border-blue-200",
    programs: ["Family Model Village", "Day Care", "Youth Support", "School Feeding", "Educational Support", "Selam Clinic"],
  },
  {
    icon: Building2,
    title: "Community Support Programs",
    description: "Empowering community members through economic development, health education, and social welfare programs.",
    href: "/what-we-do/children-youth-community-support",
    cardColor: "bg-emerald-50 text-emerald-600", borderColor: "border-emerald-200",
    programs: ["Elderly Women Support", "Hygiene Kit for Girls", "Women Economic Empowerment"],
  },
  {
    icon: GraduationCap,
    title: "Technical & Vocational Training",
    description: "Our TVET College offers industry-relevant vocational training across 11 departments.",
    href: "/technical-vocational-training",
    cardColor: "bg-purple-50 text-purple-600", borderColor: "border-purple-200",
    programs: ["11 Departments", "Industry Partnerships", "Practical Training", "Job Placement"],
  },
  {
    icon: Briefcase,
    title: "Development Projects",
    description: "Large-scale initiatives implemented in partnership with international development organizations.",
    href: "/all-projects",
    cardColor: "bg-brand-orange-50 text-brand-orange", borderColor: "border-brand-orange-100",
    programs: ["Li-Way Project", "BINA Project", "Bridge Project", "PaSeway Project", "EYE Project"],
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        badge="Our Programs"
        title="What We Do"
        subtitle="Comprehensive programs addressing the needs of children, youth, and communities across Ethiopia."
        breadcrumbs={[{ label: "What We Do", href: "/what-we-do" }]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programAreas.map((area, i) => (
              <AnimatedSection
                key={area.title}
              >
                <Link href={area.href} className={`group block rounded-2xl border ${area.borderColor} bg-white p-8 h-full shadow-sm hover:shadow-md transition-shadow`}>
                  <div className={`w-14 h-14 rounded-2xl ${area.cardColor} flex items-center justify-center mb-6`}>
                    <area.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">
                    {area.title}
                  </h3>
                  <p className="mt-3 text-neutral-600 leading-relaxed">{area.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {area.programs.map((p) => (
                      <span key={p} className="px-2.5 py-1 rounded-full bg-neutral-100 text-xs text-neutral-600 font-medium">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-1 text-brand-orange text-sm font-semibold">
                    Explore Programs
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
