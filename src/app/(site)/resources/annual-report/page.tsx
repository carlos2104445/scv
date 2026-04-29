"use client";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const items = [
  { title: "Annual Report 2024", year: 2024 },
  { title: "Annual Report 2023", year: 2023 },
  { title: "Annual Report 2022", year: 2022 },
  { title: "Annual Report 2021", year: 2021 },
];

export default function AnnualReportPage() {
  return (
    <>
      <PageHero title="Annual Reports" subtitle="Comprehensive yearly reports of our activities and impact." breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Annual Report", href: "/resources/annual-report" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto space-y-4">
            {items.map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="card-base hover-lift p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center"><FileText className="w-5 h-5 text-brand-orange" /></div>
                  <div><h3 className="font-bold text-brand-dark tracking-normal">{item.title}</h3><p className="text-xs text-neutral-500">{item.year}</p></div>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-100 text-sm font-medium text-neutral-600 hover:bg-brand-orange hover:text-white transition-all"><Download className="w-4 h-4" />PDF</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
