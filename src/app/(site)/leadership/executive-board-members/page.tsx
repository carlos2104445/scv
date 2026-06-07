"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHero } from "@/components/blocks/PageHero";
import { getPeopleByCategory, Person } from "@/data/people";
import { Shield, Users, Briefcase } from "lucide-react";

function getInitials(name: string) {
  return name
    .replace(/^(Prof\.|Dr\.|Eng\.|Cmdr\.|Mr\.|Mrs\.|W\/ro|Ato)\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function PersonCard({ person, index }: { person: Person; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="group"
    >
      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Photo */}
        <div className="relative w-full aspect-[4/5] bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 border-2 border-brand-orange/30 flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-brand-orange">
                  {getInitials(person.name)}
                </span>
              </div>
            </div>
          )}
          {/* Role badge overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
            <p className="text-sm font-medium text-white/90">{person.role}</p>
          </div>
        </div>
        {/* Info */}
        <div className="p-5">
          <h3 className="text-lg font-serif font-bold text-brand-dark">{person.name}</h3>
          {person.bio && (
            <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-3">
              {person.bio}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  accentColor,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  accentColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <div
        className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${accentColor} mb-4`}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">{title}</h2>
      <p className="mt-3 text-neutral-500 max-w-2xl mx-auto text-lg">{subtitle}</p>
    </motion.div>
  );
}

export default function LeadershipPage() {
  const board = getPeopleByCategory("BOARD");
  const senior = getPeopleByCategory("SENIOR");
  const extended = getPeopleByCategory("EXTENDED");

  return (
    <>
      <PageHero
        badge="Leadership"
        title="Our Leadership"
        subtitle="Meet the dedicated leaders who guide Selam Children's Village — from our Executive Board to our management team on the ground."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Leadership", href: "/leadership/executive-board-members" },
        ]}
      />

      {/* Executive Board */}
      <section className="section-padding">
        <div className="container-xl">
          <SectionHeader
            icon={Shield}
            title="Executive Board"
            subtitle="Our board members provide strategic direction, governance, and oversight for the organization."
            accentColor="bg-brand-orange/10 text-brand-orange"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {board.map((p, i) => (
              <PersonCard key={p.id} person={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Senior Management */}
      <section className="py-16 bg-amber-50/50">
        <div className="container-xl">
          <SectionHeader
            icon={Briefcase}
            title="Senior Management"
            subtitle="Leading the day-to-day operations and strategic implementation of our programs."
            accentColor="bg-blue-50 text-blue-600 border border-blue-200"
          />
          <div className="max-w-md mx-auto">
            {senior.map((p, i) => (
              <PersonCard key={p.id} person={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Extended Management */}
      <section className="section-padding">
        <div className="container-xl">
          <SectionHeader
            icon={Users}
            title="Extended Management Team"
            subtitle="Our dedicated managers who oversee programs and services across all Selam centers."
            accentColor="bg-emerald-50 text-emerald-600 border border-emerald-200"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {extended.map((p, i) => (
              <PersonCard key={p.id} person={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Governance Note */}
      <section className="py-12 bg-neutral-50">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-amber-100 p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">Our Governance</h3>
            <p className="text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Selam Children&apos;s Village is governed by an Executive Board that provides strategic
              direction and oversight. Our management team, led by the Executive Director, implements
              programs across our three locations — ensuring every child receives the care, education,
              and support they deserve.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
