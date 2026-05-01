"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import type { Partner } from "@/lib/api";

export function PartnersSection({ partners }: { partners?: Partner[] }) {
  if (!partners || partners.length === 0) return null;

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-xl">
        <SectionHeading
          badge="Partners"
          title="Our Partners & Supporters"
          subtitle="We work together with leading organizations to maximize our impact for Ethiopia's children."
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group flex items-center justify-center h-24 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:border-brand-orange/20 transition-all duration-300 cursor-pointer"
            >
              <span className="text-sm font-semibold text-neutral-400 group-hover:text-brand-dark transition-colors text-center px-3">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
