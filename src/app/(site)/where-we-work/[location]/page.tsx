"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import { locations, getLocationBySlug } from "@/data/locations";

export default function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: slug } = use(params);
  const loc = getLocationBySlug(slug);

  if (!loc) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-dark">Location Not Found</h1>
          <p className="mt-2 text-neutral-600">The requested location does not exist.</p>
          <Link href="/where-we-work" className="btn-primary mt-6 inline-flex">
            View All Locations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={loc.name}
        subtitle={loc.region}
        breadcrumbs={[
          { label: "Where We Work", href: "/where-we-work" },
          { label: loc.name, href: `/where-we-work/${loc.slug}` },
        ]}
      />

      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-6 text-sm text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-orange" />
                  {loc.region}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-orange" />
                  Established {loc.established}
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-brand-dark mb-4">About This Location</h2>
              <p className="text-neutral-600 leading-relaxed">{loc.description}</p>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {loc.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                      <span className="text-neutral-600 text-sm">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-neutral-50">
        <div className="container-xl">
          <SectionHeading
            badge="Active Programs"
            title={`Programs at ${loc.name}`}
            subtitle="Explore the programs and services we offer at this location."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loc.programs.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-xl bg-white border border-neutral-100 px-5 py-4 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                <span className="text-sm font-medium text-brand-dark">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl">
          <SectionHeading
            badge="Explore More"
            title="Other Locations"
            subtitle="Learn about our work across Ethiopia."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations
              .filter((l) => l.slug !== loc.slug)
              .map((otherLoc, i) => (
                <motion.div
                  key={otherLoc.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/where-we-work/${otherLoc.slug}`}
                    className="group flex items-center gap-5 card-base hover-lift p-5"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={otherLoc.image}
                        alt={otherLoc.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal text-lg">
                        {otherLoc.name}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-1">{otherLoc.region}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-brand-orange text-sm font-semibold">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
