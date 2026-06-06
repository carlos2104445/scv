"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export interface Person {
  id?: string;
  name: string;
  role: string;
  photo?: string | null;
}

export function PersonCard({ person, index }: { person: Person; index: number }) {
  const initials = person.name
    .replace(/^(Mr\.|Mrs\.|Dr\.|Prof\.|Eng\.|Cmdr\.)\s*/, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group text-center"
    >
      <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-200 flex items-center justify-center overflow-hidden mb-4 group-hover:shadow-lg group-hover:shadow-brand-orange/10 transition-all duration-300">
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
      <h4 className="text-base font-bold text-brand-dark tracking-normal">{person.name}</h4>
      <p className="text-xs text-neutral-500 mt-0.5">{person.role}</p>
    </motion.div>
  );
}

export function TeamGroup({
  title,
  people,
}: {
  title: string;
  people: Person[];
}) {
  if (!people || people.length === 0) return null;

  return (
    <div className="mb-14 last:mb-0">
      <h3 className="text-xl font-bold text-brand-dark mb-8 text-center tracking-normal">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-10">
        {people.map((person, i) => (
          <PersonCard key={person.name} person={person} index={i} />
        ))}
      </div>
    </div>
  );
}
