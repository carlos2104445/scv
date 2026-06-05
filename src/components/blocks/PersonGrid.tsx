"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Person {
  id?: string;
  name: string;
  role: string;
  photo?: string | null;
  bio?: string | null;
}

export function PersonGrid({ people }: { people: Person[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {people.map((person, i) => {
        const initials = person.name
          .replace(/^(Mr\.|Mrs\.|Dr\.|Prof\.|Eng\.|Cmdr\.)\s*/, "")
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2);

        return (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group card-base hover-lift p-6 text-center"
          >
            <div className="relative w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 flex items-center justify-center overflow-hidden mb-4 group-hover:shadow-lg group-hover:shadow-brand-orange/10 transition-all duration-300">
              {person.photo ? (
                <Image 
                  src={person.photo}
                  alt={person.name} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              ) : (
                <span className="text-2xl font-serif font-bold text-neutral-400 group-hover:text-brand-orange transition-colors relative z-10">
                  {initials}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20" />
            </div>
            <h3 className="text-base font-bold text-brand-dark tracking-normal">{person.name}</h3>
            <p className="text-sm text-brand-orange font-medium mt-1">{person.role}</p>
            {person.bio && (
              <p className="mt-3 text-xs text-neutral-500 leading-relaxed line-clamp-3">
                {person.bio}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
