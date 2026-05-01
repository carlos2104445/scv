"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import type { Testimonial } from "@/lib/api";

export function TestimonialsSection({ testimonials }: { testimonials?: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          badge="Stories"
          title="What People Say About Us"
          subtitle="Hear from alumni, partners, and supporters whose lives have been touched by Selam Children's Village."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl text-brand-orange/30 font-serif leading-none mb-3">&ldquo;</div>
              <p className="text-neutral-600 leading-relaxed line-clamp-5">{t.quote}</p>
              <div className="mt-6 pt-4 border-t border-neutral-200">
                <h4 className="font-bold text-brand-dark">{t.name}</h4>
                {t.role && <p className="text-sm text-neutral-500 mt-0.5">{t.role}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
