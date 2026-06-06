"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const partners = [
  { name: "Save the Children", logo: "/images/partners/Save-the-Children-800x164.png" },
  { name: "Plan International", logo: "/images/partners/Plan-International-400x154.png" },
  { name: "Woord en Daad", logo: "/images/partners/Woord-en-Daad.png" },
  { name: "bfz", logo: "/images/partners/bfz.png" },
  { name: "TRIAE", logo: "/images/partners/TRIAE-1.png" },
  { name: "EthioTelecom", logo: "/images/partners/ethiologo-600x136.png" },
  { name: "CBE", logo: "/images/partners/CBE.jpg" },
  { name: "COOP", logo: "/images/partners/COOP.jpg" },
  { name: "Abyssinia", logo: "/images/partners/Abyssinia.jpg" },
];

export function PartnersSection() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-xl">
        <SectionHeading
          badge="Partners"
          title="Our Partners & Supporters"
          subtitle="We work together with leading organizations to maximize our impact for Ethiopia's children."
        />

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group flex items-center justify-center h-24 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-md hover:border-brand-orange/20 transition-all duration-300 cursor-pointer overflow-hidden p-4"
              title={partner.name}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={60}
                className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
