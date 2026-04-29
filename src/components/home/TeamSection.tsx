"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/blocks/SectionHeading";

interface Person {
  name: string;
  role: string;
}

const boardMembers: Person[] = [
  { name: "Mr. Olani Gizaw", role: "Chairperson" },
  { name: "Prof. Wondwosen Tesfaye", role: "Deputy Chairman" },
  { name: "Dr. Teshome Lemma", role: "Board Member" },
  { name: "Mr. Fasil Sisay", role: "Board Member" },
  { name: "Eng. Kassa Hailegiorgis", role: "Board Member" },
  { name: "Mr. Taye Nigatu", role: "Board Member" },
  { name: "Mr. Tesfaye Adege", role: "Board Member" },
];

const seniorManagement: Person[] = [
  { name: "Mr. Solomon Chali", role: "Executive Director" },
  { name: "Mr. Nigussie Eshetie", role: "CYC Director" },
  { name: "Mr. Tibebu Leta", role: "Dean, TVET College" },
];

const extendedManagement: Person[] = [
  { name: "Mr. Assefa G/medhin", role: "Manager" },
  { name: "Mr. Assefa Misganaw", role: "Manager" },
  { name: "Cmdr. Teshome Fekade", role: "Manager" },
  { name: "Mr. Getachew Alito", role: "Manager" },
  { name: "Mr. Girmay Moges", role: "Manager" },
  { name: "Mr. Leoulseged Kassahun", role: "Manager" },
  { name: "Mrs. Zufan G/egziabher", role: "Manager" },
];

function PersonCard({ person, index }: { person: Person; index: number }) {
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
        <span className="text-2xl font-serif font-bold text-neutral-400 group-hover:text-brand-orange transition-colors">
          {initials}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h4 className="text-sm font-bold text-brand-dark tracking-normal">{person.name}</h4>
      <p className="text-xs text-neutral-500 mt-0.5">{person.role}</p>
    </motion.div>
  );
}

function TeamGroup({
  title,
  people,
}: {
  title: string;
  people: Person[];
}) {
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

export function TeamSection() {
  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-xl">
        <SectionHeading
          badge="Our Team"
          title="Leadership & Management"
          subtitle="Dedicated leaders committed to our mission of transforming lives and nurturing hope."
        />

        <div className="mt-14">
          <TeamGroup title="Executive Board Members" people={boardMembers} />
          <TeamGroup title="Senior Management Team" people={seniorManagement} />
          <TeamGroup
            title="Extended Management Team"
            people={extendedManagement}
          />
        </div>
      </div>
    </section>
  );
}
