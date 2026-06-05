"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function CTABanner() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-[#FF7F6B] to-brand-orange overflow-hidden py-16 md:py-20 px-8 md:px-16 text-center"
      >
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/projects/campus.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-serif font-bold leading-tight max-w-2xl mx-auto">
            Together, We Can Make a Difference
          </h2>
          <p className="mt-4 text-white/80 text-lg max-w-xl mx-auto">
            Your support empowers us to provide essential resources and transform the lives of Ethiopia&apos;s most vulnerable children.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-involved/donate"
              className="inline-flex items-center gap-2 bg-white text-brand-dark px-7 py-4 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/get-involved/become-a-volunteer"
              className="inline-flex items-center gap-2 border-2 border-white text-white px-7 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
