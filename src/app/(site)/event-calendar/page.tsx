"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const events = [
  { title: "Annual Fundraising Gala 2025", date: "2025-06-15", time: "6:00 PM", location: "Sheraton Addis", desc: "Join us for an elegant evening supporting the children of Selam." },
  { title: "TVET College Open Day", date: "2025-05-20", time: "9:00 AM", location: "SCV Campus, Kotebe", desc: "Explore our 11 departments and meet our students and instructors." },
  { title: "World Children's Day Celebration", date: "2025-11-20", time: "10:00 AM", location: "SCV Campus", desc: "Special activities and advocacy events for children's rights." },
];

export default function EventCalendarPage() {
  return (
    <>
      <PageHero title="Events" subtitle="Upcoming events and activities at Selam Children's Village." breadcrumbs={[{ label: "Events", href: "/event-calendar" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto space-y-6">
            {events.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card-base hover-lift p-6 flex gap-6">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-brand-orange flex flex-col items-center justify-center text-white">
                  <span className="text-xs font-medium">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="text-xl font-bold">{new Date(e.date).getDate()}</span>
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark tracking-normal">{e.title}</h3>
                  <p className="text-sm text-neutral-600 mt-1">{e.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(e.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
