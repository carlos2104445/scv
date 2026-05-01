"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";

const upcomingEvents = [
  {
    id: "tvet-graduation-2025",
    title: "Annual TVET Graduation Ceremony",
    date: "2025-07-15",
    time: "09:00 AM - 12:30 PM",
    location: "Selam Main Campus, Addis Ababa",
    excerpt: "Join us in celebrating the hard work and achievements of our TVET graduates as they prepare to enter the professional workforce.",
  },
  {
    id: "fundraising-gala",
    title: "Harvest in Generation Fundraising Gala",
    date: "2025-08-20",
    time: "06:00 PM - 10:00 PM",
    location: "Skylight Hotel, Addis Ababa",
    excerpt: "An elegant evening dedicated to raising funds for our new School Feeding program expansion. Dinner, auction, and inspiring stories.",
  },
  {
    id: "alumni-meetup",
    title: "SCV Alumni Network Gathering",
    date: "2025-09-05",
    time: "02:00 PM - 05:00 PM",
    location: "Kotebe Campus",
    excerpt: "Calling all former Selam children and graduates! Come reconnect, share your journey, and mentor the next generation.",
  },
];

export function EventsSection() {
  return (
    <section className="section-padding bg-neutral-50 border-t border-neutral-100">
      <div className="container-xl">
        <SectionHeading
          badge="Join Us"
          title="Upcoming Events"
          subtitle="Be a part of our community. Attend our upcoming events, graduations, and fundraisers."
        />

        <div className="mt-14 max-w-4xl mx-auto space-y-4">
          {upcomingEvents.map((event, i) => {
            const dateObj = new Date(event.date);
            const month = dateObj.toLocaleDateString("en-US", { month: "short" });
            const day = dateObj.toLocaleDateString("en-US", { day: "2-digit" });

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group bg-white rounded-2xl border border-neutral-100 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6 items-start sm:items-center"
              >
                {/* Date Calendar Box */}
                <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br from-brand-orange-50 to-orange-50 border border-brand-orange-100 flex flex-col items-center justify-center text-center">
                  <span className="text-sm font-bold text-brand-orange uppercase">{month}</span>
                  <span className="text-2xl font-black text-brand-dark">{day}</span>
                </div>

                {/* Event Details */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-orange transition-colors">
                    {event.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-neutral-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-orange/70" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-orange/70" />
                      {event.location}
                    </div>
                  </div>
                  <p className="mt-3 text-neutral-600 line-clamp-2 leading-relaxed">
                    {event.excerpt}
                  </p>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0 sm:ml-4">
                  <Link
                    href={`/event-calendar`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-50 text-neutral-600 group-hover:bg-brand-orange group-hover:text-white transition-colors"
                    aria-label="View event details"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/event-calendar" className="btn-secondary">
            View All Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
