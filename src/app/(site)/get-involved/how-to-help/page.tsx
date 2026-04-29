"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Handshake, Gift, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const ways = [
  { icon: Heart, title: "Donate", desc: "Support our programs with a one-time or recurring donation via Chapa or bank transfer.", href: "/get-involved/donate", color: "from-brand-orange to-brand-orange-dark" },
  { icon: Users, title: "Volunteer", desc: "Share your skills and time to make a direct impact on the lives of children and youth.", href: "/get-involved/become-a-volunteer", color: "from-blue-500 to-indigo-600" },
  { icon: Handshake, title: "Partner With Us", desc: "Explore partnership opportunities for organizations and businesses.", href: "/get-involved/contact-us", color: "from-emerald-500 to-teal-600" },
  { icon: Gift, title: "Sponsor a Child", desc: "Provide long-term support for a child's education, healthcare, and wellbeing.", href: "/get-involved/donate", color: "from-purple-500 to-violet-600" },
];

export default function HowToHelpPage() {
  return (
    <>
      <PageHero title="How to Help" subtitle="Every contribution, big or small, helps us transform lives." breadcrumbs={[{ label: "Get Involved", href: "/get-involved/how-to-help" }, { label: "How to Help", href: "/get-involved/how-to-help" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ways.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={w.href} className="group block card-base hover-lift p-8 h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${w.color} flex items-center justify-center mb-5`}><w.icon className="w-7 h-7 text-white" /></div>
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">{w.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{w.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-brand-orange text-sm font-semibold">Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
