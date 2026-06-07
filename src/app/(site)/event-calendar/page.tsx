"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const events = [
  { title: "Annual Fundraising Gala 2025", date: "2025-06-15", time: "6:00 PM", location: "Sheraton Addis", desc: "Join us for an elegant evening supporting the children of Selam. Dinner, entertainment, and live auction to benefit our programs.", category: "Fundraising" },
  { title: "TVET College Open Day", date: "2025-05-20", time: "9:00 AM", location: "SCV Campus, Kotebe", desc: "Explore our 11 departments, meet our students and instructors, and see our workshops and training facilities.", category: "Education" },
  { title: "World Children's Day Celebration", date: "2025-11-20", time: "10:00 AM", location: "SCV Campus", desc: "Special activities and advocacy events for children's rights — performances, art exhibitions, and community dialogue.", category: "Celebration" },
  { title: "TVET Graduation Ceremony", date: "2025-07-10", time: "10:00 AM", location: "SCV Auditorium", desc: "Celebrating the achievements of our latest graduating class. Over 200 students receive their diplomas and certificates.", category: "Education" },
  { title: "Community Health Outreach", date: "2025-08-05", time: "8:00 AM", location: "Kotebe Community Center", desc: "Free health screenings, vaccinations, and health education for community members in partnership with local health centers.", category: "Community" },
  { title: "Annual Christmas Celebration", date: "2025-12-25", time: "11:00 AM", location: "SCV Campus", desc: "A joyful celebration bringing together children, staff, families, and community supporters for a day of festivity.", category: "Celebration" },
];

const categoryColors: Record<string, string> = {
  Fundraising: "bg-brand-orange",
  Education: "bg-blue-600",
  Celebration: "bg-emerald-600",
  Community: "bg-purple-600",
};

export default function EventCalendarPage() {
  return (
    <>
      <PageHero
        badge="Events"
        title="Events" subtitle="Upcoming events and activities at Selam Children's Village." breadcrumbs={[{ label: "Events", href: "/event-calendar" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((e, i) => (
              <motion.div key={e.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6 flex gap-6">
                <div className="shrink-0 w-20 h-20 rounded-2xl bg-brand-orange flex flex-col items-center justify-center text-white">
                  <span className="text-sm font-medium uppercase">{new Date(e.date).toLocaleDateString("en-US", { month: "short" })}</span>
                  <span className="text-2xl font-bold">{new Date(e.date).getDate()}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-brand-dark tracking-normal">{e.title}</h3>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-xs text-white font-medium ${categoryColors[e.category] || "bg-neutral-500"}`}>{e.category}</span>
                  </div>
                  <p className="text-neutral-600 mt-2 leading-relaxed">{e.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{new Date(e.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{e.time}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{e.location}</span>
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
