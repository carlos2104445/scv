"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, Building2, GraduationCap, Heart, Mail } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const partnershipTypes = [
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description:
      "Partner with SCV through corporate social responsibility initiatives, employee engagement programs, or strategic philanthropic investments that align with your company's mission.",
    examples: [
      "Sponsor a child's education",
      "Fund vocational training programs",
      "Employee volunteer matching",
      "In-kind donations of materials and equipment",
    ],
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
  },
  {
    icon: GraduationCap,
    title: "Academic & Training Partnerships",
    description:
      "Collaborate with our TVET College to develop curricula, provide internship opportunities, or conduct joint research projects that enhance the quality of vocational education.",
    examples: [
      "Curriculum development support",
      "Internship and apprenticeship placements",
      "Faculty exchange programs",
      "Joint certification programs",
    ],
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
  },
  {
    icon: Handshake,
    title: "NGO & Development Partnerships",
    description:
      "Join forces with SCV to implement community development projects, share resources and expertise, or co-design programs addressing child welfare and youth empowerment.",
    examples: [
      "Joint project implementation",
      "Technical assistance and capacity building",
      "Resource sharing and co-funding",
      "Advocacy and awareness campaigns",
    ],
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Heart,
    title: "Individual Champions",
    description:
      "Become a long-term supporter or ambassador for SCV. Individual champions help raise awareness, mobilize resources, and advocate for the rights of vulnerable children.",
    examples: [
      "Monthly recurring donations",
      "Fundraising event organization",
      "Social media advocacy",
      "Mentorship for youth",
    ],
    color: "from-brand-orange to-brand-orange-dark",
    bg: "bg-brand-orange-50",
  },
];

const currentPartners = [
  "Save the Children",
  "Plan International Ethiopia",
  "Woord en Daad",
  "bfz (German Cooperation)",
  "SIDA (Swedish Development Agency)",
  "Swiss Friends of SCV",
  "Italian Friends of SCV",
];

export default function BeAPartnerPage() {
  return (
    <>
      <PageHero
        title="Be A Partner"
        subtitle="Join us in transforming lives. Together we can create lasting impact for Ethiopia's most vulnerable children and youth."
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved" },
          { label: "Be A Partner", href: "/get-involved/be-a-partner" },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-xl">
          <SectionHeading
            badge="Partnership Opportunities"
            title="Ways to Partner With Us"
            subtitle="We offer multiple partnership models tailored to your organization's goals and capacity."
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl p-8 bg-white border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${type.bg} rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg mb-6`}>
                    <type.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 tracking-normal">
                    {type.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">{type.description}</p>
                  <ul className="mt-4 space-y-2">
                    {type.examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-sm text-neutral-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-xl">
          <SectionHeading
            badge="Our Network"
            title="Current Partners"
            subtitle="We are proud to work alongside leading international organizations."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {currentPartners.map((partner, i) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 rounded-full bg-white border border-neutral-200 text-sm font-medium text-brand-dark shadow-sm"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-dark text-white">
        <div className="container-xl text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white">Ready to Partner?</h2>
            <p className="mt-4 text-white/70 text-lg leading-relaxed">
              We&apos;d love to discuss how we can work together. Reach out to our partnerships team to explore collaboration opportunities.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/get-involved/contact-us" className="btn-primary text-base px-8 py-4">
                <Mail className="w-5 h-5" />
                Contact Us
              </Link>
              <Link href="/get-involved/donate" className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
                <Heart className="w-5 h-5" />
                Donate Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
