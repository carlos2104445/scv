"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { HeroSlide } from "@/lib/api";

const fallbackSlides: HeroSlide[] = [
  { id: "1", image: "/images/hero/slide-1.png", title: "Transforming Lives.", subtitle: "Four Decades of Nurturing Hope.", description: "Since 1986, Selam Children's Village has been providing comprehensive care, education, and vocational training to Ethiopia's most vulnerable children and youth.", ctaLabel: "Learn More", ctaUrl: "/about", ctaSecLabel: "Donate Now", ctaSecUrl: "/get-involved/donate", gradient: "from-brand-dark/80 via-brand-dark/50 to-transparent", order: 0 },
];

export function HeroSection({ slides: propSlides }: { slides?: HeroSlide[] }) {
  const slides = propSlides && propSlides.length > 0 ? propSlides : fallbackSlides;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];

  return (
    <section
      className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slider"
    >
      {slides.map((s, i) => (
        <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute inset-0">
            <Image src={s.image} alt="" fill className={`object-cover transition-transform duration-[8000ms] ease-out ${i === current ? "scale-110" : "scale-100"}`} priority={i === 0} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark/30 z-[1]" />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient || "from-brand-dark/80 via-brand-dark/50 to-transparent"} z-[1]`} />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="container-xl">
          <motion.div key={current} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <h1 className="text-white leading-tight tracking-normal">
              <span className="block">{slide.title}</span>
              <span className="block text-brand-orange">{slide.subtitle}</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed">{slide.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {slide.ctaLabel && slide.ctaUrl && (
                <Link href={slide.ctaUrl} className="btn-primary text-base px-8 py-4">
                  {slide.ctaLabel} <ArrowRight className="w-5 h-5" />
                </Link>
              )}
              {slide.ctaSecLabel && slide.ctaSecUrl && (
                <Link href={slide.ctaSecUrl} className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all">
                  <Heart className="w-5 h-5" /> {slide.ctaSecLabel}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <button onClick={prev} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all" aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all" aria-label="Next slide">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-brand-orange" : "w-2 bg-white/40 hover:bg-white/60"}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
}
