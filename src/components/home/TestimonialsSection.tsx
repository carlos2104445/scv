"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const testimonials = [
  {
    id: "1",
    name: "Almaz Tadesse",
    role: "Alumni, Class of 2015",
    quote: "Growing up in Selam Village gave me the education and family I never had. Today I'm a university graduate, all thanks to their support.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Anderson",
    role: "Volunteer Partner",
    quote: "I've had the privilege to volunteer here, and seeing the difference we make in the children's lives is truly life-changing.",
    rating: 4,
  },
  {
    id: "3",
    name: "Dr. Sarah Chen",
    role: "International Donor",
    quote: "Their transparency inspires us to give more and make a bigger real impact together. Every donation is well-documented.",
    rating: 5,
  },
  {
    id: "4",
    name: "Biruk Mengistu",
    role: "TVET Graduate",
    quote: "The vocational training I received prepared me for a career. Now I run my own workshop and employ three people.",
    rating: 5,
  },
  {
    id: "5",
    name: "Emma Williams",
    role: "Corporate Partner",
    quote: "Knowing my company's contributions are supporting children's education gives me immense pride. The results are visible.",
    rating: 5,
  },
  {
    id: "6",
    name: "Tigist Haile",
    role: "Community Member",
    quote: "My children now have access to quality education and meals thanks to this organization. It has transformed our family.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          badge="Voices of Support"
          title="Hear from those who believe in our mission"
          subtitle="Together, we can make a real impact in communities across Ethiopia. Help us bring hope and support."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className={`w-5 h-5 ${si < t.rating ? "fill-amber-400 text-amber-400" : "fill-neutral-200 text-neutral-200"}`}
                  />
                ))}
              </div>

              <p className="text-brand-dark font-medium leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-orange-100 flex items-center justify-center text-sm font-bold text-brand-orange">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark text-sm">{t.name}</h4>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
