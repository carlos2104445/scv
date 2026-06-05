"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const articles = [
  { slug: "182-youth-graduate-from-beyepp", title: "182 Youth Graduate from BEYEPP", excerpt: "A momentous occasion as 182 young men and women graduate from the Building Ethiopian Youth Employment Program.", date: "2025-03-15", category: "News", image: "/images/news-1.jpg" },
  { slug: "fundraising-for-water-well-drilling", title: "Fundraising for Water Well Drilling", excerpt: "Join our campaign to bring clean water to the community surrounding Selam Children's Village.", date: "2025-02-20", category: "Campaign", image: "/images/projects/campus-real.jpg" },
  { slug: "girls-be-ambitious-project-graduation", title: "Girls Be Ambitious Project Graduation", excerpt: "Celebrating the achievements of young women who completed our skills training program.", date: "2025-01-10", category: "Events", image: "/images/projects/women-empowerment-real.jpg" },
  { slug: "annual-christmas-celebration-2024", title: "Annual Christmas Celebration 2024", excerpt: "A joyful celebration bringing together children, staff, and community supporters.", date: "2024-12-25", category: "News", image: "/images/news-2.jpg" },
  { slug: "new-partnership-with-giz", title: "New Partnership with GIZ", excerpt: "Expanding our vocational training reach through a strategic partnership with GIZ.", date: "2024-11-15", category: "News", image: "/images/projects/education-real.jpg" },
  { slug: "world-childrens-day-2024", title: "World Children's Day 2024", excerpt: "Commemorating World Children's Day with special activities and advocacy events.", date: "2024-11-20", category: "Events", image: "/images/hero/real-hero-2.jpg" },
];

export default function NewsPage() {
  return (
    <>
      <PageHero title="News & Updates" subtitle="Stay informed about our latest activities and achievements." breadcrumbs={[{ label: "News & Updates", href: "/news-updates" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                <Link href={`/news-updates/${a.slug}`} className="group block card-base hover-lift h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={a.image} alt={a.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium text-neutral-600 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-brand-orange text-white text-xs font-medium">{a.category}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors tracking-normal line-clamp-2">{a.title}</h3>
                    <p className="mt-2 text-neutral-600 line-clamp-2">{a.excerpt}</p>
                    <div className="mt-3 flex items-center gap-1 text-brand-orange text-sm font-semibold">Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
