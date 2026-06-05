"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Person {
  id?: string;
  name: string;
  role: string;
  photo?: string | null;
  bio?: string | null;
}

export function PersonSlider({ people }: { people: Person[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    loop: people.length > 3,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (people.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        No team members found.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <div className="flex items-center justify-end gap-2 mb-6">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slider */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {people.map((person) => {
            const initials = person.name
              .replace(/^(Mr\.|Mrs\.|Dr\.|Prof\.|Eng\.|Cmdr\.)\s*/, "")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2);

            return (
              <div
                key={person.id || person.name}
                className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] group"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 overflow-hidden mb-4 group-hover:shadow-xl group-hover:shadow-brand-orange/10 transition-all duration-500">
                  {person.photo ? (
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-serif font-bold text-neutral-300 group-hover:text-brand-orange transition-colors duration-300">
                        {initials}
                      </span>
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="text-center px-2">
                  <h3 className="text-lg font-bold text-brand-dark tracking-tight">
                    {person.name}
                  </h3>
                  <p className="text-sm text-brand-orange font-semibold mt-1">
                    {person.role}
                  </p>
                  {person.bio && (
                    <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-3">
                      {person.bio}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
