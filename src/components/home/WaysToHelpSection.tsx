"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Handshake, Briefcase, Mail, Gift, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const ways = [
  {
    icon: Heart,
    title: "Donate",
    description: "Your financial contribution directly supports children's care, education, and vocational training.",
    href: "/get-involved/donate",
    bg: "bg-gradient-to-br from-rose-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Share your time and skills to make a tangible impact in the lives of vulnerable children.",
    href: "/get-involved/become-a-volunteer",
    bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    icon: Handshake,
    title: "Be A Partner",
    description: "Collaborate with us through corporate, academic, or NGO partnerships for lasting change.",
    href: "/get-involved/be-a-partner",
    bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    icon: Briefcase,
    title: "Careers",
    description: "Join our dedicated team and build your career while transforming lives.",
    href: "/job-openings",
    bg: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    icon: Mail,
    title: "Contact Us",
    description: "Have questions or ideas? Reach out to our team — we'd love to hear from you.",
    href: "/get-involved/contact-us",
    bg: "bg-gradient-to-br from-amber-500 to-orange-600",
  },
  {
    icon: Gift,
    title: "Sponsor a Child",
    description: "Provide direct support for a child's education, health, and overall well-being.",
    href: "/get-involved/donate",
    bg: "bg-gradient-to-br from-brand-orange to-red-500",
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
                className={`group block rounded-2xl ${way.bg} p-6 text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <way.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold tracking-normal">{way.title}</h4>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  {way.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
