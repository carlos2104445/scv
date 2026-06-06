"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const activities = [
  {
    title: "Annual General Assembly Meeting",
    date: "2025-05-20",
    location: "SCV Main Campus, Addis Ababa",
    description: "The Annual General Assembly brings together all stakeholders to review the year's achievements, approve financial reports, and set strategic direction for the coming year.",
    category: "Governance",
  },
  {
    title: "Girls Be Ambitious Project Graduation",
    date: "2025-04-15",
    location: "Selam TVET College Hall",
    description: "Celebrating the graduation of young women from our skills training program, marking their transition to economic independence.",
    category: "Graduation",
  },
  {
    title: "BEYEPP Youth Graduation Ceremony",
    date: "2025-03-15",
    location: "Selam TVET College",
    description: "182 youth graduating from the Building Ethiopian Youth Employment Program — a milestone in our vocational training mission.",
    category: "Graduation",
  },
  {
    title: "International Women's Day Celebration",
    date: "2025-03-08",
    location: "SCV Community Center",
    description: "Honoring the women in our community — mothers, staff, and youth — with special events, awards, and performances.",
    category: "Celebration",
  },
  {
    title: "Water Well Drilling Campaign Launch",
    date: "2025-02-20",
    location: "Kotebe Campus",
    description: "Launching a fundraising campaign to bring clean water to the community surrounding Selam Children's Village through a new water well.",
    category: "Campaign",
  },
  {
    title: "Annual Christmas Celebration",
    date: "2024-12-25",
    location: "SCV Main Campus",
    description: "A joyful celebration bringing together children, staff, donors, and community supporters for a festive day of food, music, and gratitude.",
    category: "Celebration",
  },
  {
    title: "World Children's Day Activities",
    date: "2024-11-20",
    location: "Multiple Locations",
    description: "Commemorating World Children's Day with awareness events, art exhibitions by children, and advocacy for children's rights.",
    category: "Advocacy",
  },
  {
    title: "Executive Board Strategic Retreat",
    date: "2024-10-10",
    location: "Addis Ababa",
    description: "The Executive Board meets to review organizational performance and set the strategic priorities for 2025-2027.",
    category: "Governance",
  },
];

const categoryColors: Record<string, string> = {
  Governance: "bg-blue-100 text-blue-700",
  Graduation: "bg-purple-100 text-purple-700",
  Celebration: "bg-amber-100 text-amber-700",
  Campaign: "bg-emerald-100 text-emerald-700",
  Advocacy: "bg-rose-100 text-rose-700",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHero
        badge="Recent Activities"
        title="Activities"
        subtitle="Events, celebrations, and milestones from across Selam Children's Village."
      />

      <section className="section-padding">
        <div className="container-xl">
          <SectionHeading
            badge="Recent Activities"
            title="What's Happening at SCV"
            subtitle="Stay up to date with our events, programs, and community activities."
          />

          <div className="mt-14 space-y-6">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col md:flex-row gap-6 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
              >
                <div className="md:w-28 shrink-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-serif font-bold text-brand-orange">
                    {new Date(activity.date).getDate()}
                  </span>
                  <span className="text-sm text-neutral-500 uppercase tracking-wide">
                    {new Date(activity.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[activity.category] || "bg-neutral-100 text-neutral-600"}`}>
                      {activity.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-400">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark tracking-normal">
                    {activity.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/news-updates" className="btn-secondary">
              View All News & Updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
