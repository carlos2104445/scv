"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const resourceLinks = [
  { title: "Publications", href: "/resources/publication", desc: "Reports, studies, and publications from Selam Children's Village." },
  { title: "Newsletter & Magazine", href: "/resources/newsletter-magazine", desc: "Our periodic newsletters and magazine issues." },
  { title: "Annual Report", href: "/resources/annual-report", desc: "Comprehensive annual reports detailing our activities and impact." },
  { title: "Audit Report", href: "/resources/audit-report", desc: "Financial audit reports ensuring transparency and accountability." },
  { title: "Policies & Guidelines", href: "/resources/policies-guidelines", desc: "Organizational policies, guidelines, and governance documents." },
];

export default function ResourcesPage() {
  return (
    <>
      <PageHero title="Resources" subtitle="Publications, reports, and organizational documents." breadcrumbs={[{ label: "Resources", href: "/resources" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resourceLinks.map((r, i) => (
              <motion.div key={r.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={r.href} className="group block card-base hover-lift p-6 h-full">
                  <FileText className="w-8 h-8 text-brand-orange mb-4" />
                  <h3 className="font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">{r.title}</h3>
                  <p className="mt-2 text-neutral-600">{r.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-brand-orange text-sm font-semibold">Browse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
