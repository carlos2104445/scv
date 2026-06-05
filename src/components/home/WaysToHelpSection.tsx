"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Handshake, Briefcase, Mail, Gift } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const ways = [
  {
    icon: Heart,
    title: "Donate",
    description: "Your financial contribution directly supports children's care, education, and vocational training.",
    href: "/get-involved/donate",
    cta: "Donate Now",
    color: "bg-brand-orange-50",
    iconColor: "text-brand-orange",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Share your time and skills to make a tangible impact in the lives of vulnerable children.",
    href: "/get-involved/become-a-volunteer",
    cta: "Join Us",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Handshake,
    title: "Be A Partner",
    description: "Collaborate with us through corporate, academic, or NGO partnerships for lasting change.",
    href: "/get-involved/be-a-partner",
    cta: "Partner",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: Briefcase,
    title: "Careers",
    description: "Join our dedicated team and build your career while transforming lives.",
    href: "/job-openings",
    cta: "View Jobs",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: "Have questions or ideas? Reach out to our team — we'd love to hear from you.",
    href: "/get-involved/contact-us",
    cta: "Get in Touch",
    color: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Gift,
    title: "Sponsor a Child",
    description: "Provide direct support for a child's education, health, and overall well-being.",
    href: "/get-involved/donate",
    cta: "Sponsor",
    color: "bg-rose-50",
    iconColor: "text-rose-600",
  },
];

export function WaysToHelpSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          badge="How You Can Help"
          title="Ways You Can Make a Difference"
          subtitle="Together, we can create lasting impact for Ethiopia's most vulnerable children and communities."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ways.map((way, i) => (
            <motion.div
              key={way.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link
                href={way.href}
                className="group block rounded-2xl bg-white border border-neutral-100 p-6 hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className={`w-12 h-12 rounded-xl ${way.color} flex items-center justify-center mb-4`}>
                  <way.icon className={`w-6 h-6 ${way.iconColor}`} />
                </div>
                <h4 className="text-lg font-bold text-brand-dark tracking-normal">{way.title}</h4>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {way.description}
                </p>
                <div className="mt-4 inline-flex items-center px-4 py-2 rounded-lg border border-neutral-200 text-sm font-medium text-brand-dark group-hover:bg-brand-orange group-hover:text-white group-hover:border-brand-orange transition-all duration-300">
                  {way.cta}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
