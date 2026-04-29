"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/blocks/PageHero";

const timeline = [
  { year: "1986", title: "Foundation", desc: "Mrs. Tsehay Roschli establishes Selam Children's Village in Addis Ababa to care for orphaned and vulnerable children." },
  { year: "1990", title: "First Family Homes", desc: "Construction of the first family-model homes begins, creating a nurturing environment for children in small family units." },
  { year: "1998", title: "TVET College Launch", desc: "Selam Technical & Vocational Education Training College is established, beginning with 3 departments." },
  { year: "2005", title: "Expansion", desc: "TVET College expands to 8 departments. Community support programs are launched for surrounding neighborhoods." },
  { year: "2010", title: "Youth Programs", desc: "Youth Support Program is launched to help grown children transition to independent, productive lives." },
  { year: "2015", title: "11 TVET Departments", desc: "College reaches full capacity with 11 departments, becoming one of Ethiopia's leading vocational training institutions." },
  { year: "2020", title: "Community Outreach", desc: "Major expansion of community programs including elderly women support, hygiene kit distribution, and women's economic empowerment." },
  { year: "2025", title: "40 Years of Service", desc: "Celebrating four decades of transforming lives, with over 255 children in care and thousands of TVET graduates." },
];

export default function OurHistoryPage() {
  return (
    <>
      <PageHero
        title="Our History"
        subtitle="Four decades of transforming lives — from a small initiative to one of Ethiopia's leading child welfare organizations."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Our History", href: "/about/our-history" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            {/* Founder Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center mb-4">
                <span className="text-3xl font-serif font-bold text-white">TR</span>
              </div>
              <h2 className="text-2xl">Our Founder</h2>
              <p className="mt-2 text-brand-orange font-semibold">Mrs. Tsehay Roschli</p>
              <p className="mt-4 text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                A Swiss-Ethiopian social worker with a profound vision for Ethiopia&apos;s children. Her compassion and determination laid the foundation for what would become one of the country&apos;s most impactful child welfare organizations.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 md:-translate-x-px" />
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`relative flex items-start gap-6 mb-10 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-brand-orange border-2 border-white shadow-md -translate-x-1.5 md:-translate-x-1.5 mt-2 z-10" />
                  
                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-orange text-white text-sm font-bold mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-brand-dark tracking-normal">{item.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
