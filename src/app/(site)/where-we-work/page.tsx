import { AnimatedSection, AnimatedItem } from "@/components/global/AnimatedSection";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import { locations } from "@/data/locations";

export default function WhereWeWorkPage() {
  return (
    <>
      <PageHero
        badge="Our Locations"
        title="Where We Work"
        subtitle="Serving vulnerable children and communities across Ethiopia from three strategic locations."
      />

      <section className="section-padding bg-white">
        <div className="container-xl">
          <SectionHeading
            badge="Our Locations"
            title="Reaching Communities Across Ethiopia"
            subtitle="From our headquarters in Addis Ababa to our satellite sites, we are committed to bringing hope and support where it is needed most."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((loc, i) => (
              <AnimatedSection
                key={loc.slug}
              >
                <Link
                  href={`/where-we-work/${loc.slug}`}
                  className="group block rounded-2xl border border-neutral-200 bg-white h-full shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5 text-brand-orange" />
                      <span className="font-semibold text-lg">{loc.name}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-medium text-brand-orange uppercase tracking-wider mb-2">
                      Est. {loc.established} · {loc.region}
                    </p>
                    <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                      {loc.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {loc.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-full bg-neutral-100 text-xs text-neutral-600"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-1 text-brand-orange text-sm font-semibold">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
