"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Abebe Tadesse",
    role: "Former SCV Resident, Now Software Engineer",
    quote:
      "Selam Children's Village gave me more than a home — it gave me a future. The education and love I received there shaped who I am today. I am forever grateful.",
  },
  {
    name: "Tigist Mengistu",
    role: "TVET Graduate, Small Business Owner",
    quote:
      "The vocational training I received at Selam's TVET College changed my life. I learned garment production and now run my own tailoring business, supporting my family.",
  },
  {
    name: "Dr. Martha Ayele",
    role: "Partner Organization Director",
    quote:
      "Working with Selam Children's Village has been an inspiring journey. Their holistic approach to child care and community development is truly a model for Ethiopia.",
  },
  {
    name: "Hans Mueller",
    role: "Selam Charity Switzerland, Board Member",
    quote:
      "The dedication of the team at Selam Children's Village is remarkable. Every visit shows us the tangible impact of our support — educated children becoming leaders.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % testimonials.length),
    []
  );

  const prev = useCallback(
    () =>
      setCurrent(
        (c) => (c - 1 + testimonials.length) % testimonials.length
      ),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-50 text-brand-orange text-xs font-semibold tracking-wide uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              Testimonials
            </span>
            <h2 className="text-brand-dark">Voices of Hope</h2>
          </motion.div>

          <div className="mt-12 relative">
            <Quote className="w-12 h-12 text-brand-orange/20 mx-auto mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-xl md:text-2xl text-neutral-700 font-serif italic leading-relaxed max-w-3xl mx-auto">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </blockquote>
                <div className="mt-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark mx-auto flex items-center justify-center text-white font-bold">
                    {testimonials[current].name[0]}
                  </div>
                  <p className="mt-3 font-bold text-brand-dark">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-brand-orange hover:border-brand-orange transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-brand-orange"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:text-brand-orange hover:border-brand-orange transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
