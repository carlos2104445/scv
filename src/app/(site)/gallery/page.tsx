"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { PageHero } from "@/components/blocks/PageHero";

const galleries = [
  { slug: "family-model-village", title: "Family Model Village", count: 24, image: "/images/projects/family-model-real.jpg" },
  { slug: "tvet-college-activities", title: "TVET College Activities", count: 18, image: "/images/tvet/metal-manufacturing.jpg" },
  { slug: "community-programs", title: "Community Programs", count: 12, image: "/images/projects/women-empowerment-real.jpg" },
  { slug: "graduation-ceremonies", title: "Graduation Ceremonies", count: 20, image: "/images/projects/youth-real.jpg" },
  { slug: "campus-life", title: "Campus Life", count: 15, image: "/images/projects/campus-real.jpg" },
  { slug: "special-events", title: "Special Events", count: 22, image: "/images/hero/real-hero-2.jpg" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Photo Gallery" subtitle="Visual stories of hope, growth, and transformation." breadcrumbs={[{ label: "Gallery", href: "/gallery" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleries.map((g, i) => (
              <motion.div key={g.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group cursor-pointer card-base hover-lift overflow-hidden">
                <div className="relative h-56 overflow-hidden">
                  <Image src={g.image} alt={g.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-all flex items-center justify-center"><span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">View Gallery</span></div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal">{g.title}</h3>
                  <p className="text-sm text-neutral-500 mt-1">{g.count} photos</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
