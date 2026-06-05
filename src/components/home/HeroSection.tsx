"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-white pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-orange-100 border-2 border-white flex items-center justify-center text-xs font-bold text-brand-orange">S</div>
                <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold text-blue-600">C</div>
                <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-white flex items-center justify-center text-xs font-bold text-emerald-600">V</div>
              </div>
              <span className="text-sm font-medium text-neutral-500">
                1000+ Lives transformed since 1986
              </span>
            </div>

            <h1 className="text-brand-dark leading-[1.1]">
              Together for making a{" "}
              <span className="text-brand-orange">brighter future</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-neutral-600 leading-relaxed max-w-lg">
              Since 1986, Selam Children&apos;s Village has been providing
              comprehensive care, education, and vocational training to
              Ethiopia&apos;s most vulnerable children and youth.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/get-involved/donate" className="inline-flex items-center gap-2 bg-brand-dark text-white px-7 py-4 rounded-full font-semibold hover:bg-neutral-800 transition-colors">
                Donate Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 text-brand-dark font-semibold hover:text-brand-orange transition-colors">
                Learn More
              </Link>
            </div>

            {/* Partners strip */}
            <div className="mt-12 pt-8 border-t border-neutral-100">
              <p className="text-sm text-neutral-400 font-medium mb-4">Our most loved partners</p>
              <div className="flex items-center gap-6 opacity-50 grayscale">
                <Image src="/images/partners/Save-the-Children-800x164.png" alt="Save the Children" width={120} height={30} className="h-6 w-auto object-contain" />
                <Image src="/images/partners/Plan-International-400x154.png" alt="Plan International" width={100} height={30} className="h-6 w-auto object-contain" />
                <Image src="/images/partners/Woord-en-Daad.png" alt="Woord en Daad" width={100} height={30} className="h-6 w-auto object-contain" />
                <Image src="/images/partners/bfz.png" alt="bfz" width={60} height={30} className="h-6 w-auto object-contain hidden sm:block" />
              </div>
            </div>
          </motion.div>

          {/* Right — Hero image with floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-h-[600px]">
              <Image
                src="/images/hero/slide-1.png"
                alt="Children at Selam Village"
                fill
                className="object-cover"
                priority
              />
              {/* Floating quote card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-6 left-4 right-4 sm:right-auto sm:left-6 sm:max-w-[280px] bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange-50 flex-shrink-0 flex items-center justify-center">
                    <span className="text-brand-orange text-lg">&ldquo;</span>
                  </div>
                  <p className="text-sm text-brand-dark font-medium leading-snug">
                    &ldquo;Because of this organization, I was given hope and a second chance.&rdquo;
                  </p>
                </div>
              </motion.div>

              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute bottom-6 right-4 sm:right-6 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-4 shadow-lg"
              >
                <p className="text-sm font-semibold text-brand-dark">Dedicated team</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">
                  Providing essential resources and care to those in need.
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex -space-x-1.5">
                    <div className="w-7 h-7 rounded-full bg-brand-orange-100 border-2 border-white" />
                    <div className="w-7 h-7 rounded-full bg-blue-100 border-2 border-white" />
                    <div className="w-7 h-7 rounded-full bg-emerald-100 border-2 border-white" />
                  </div>
                  <span className="text-2xl font-bold text-brand-dark font-serif">1k</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
