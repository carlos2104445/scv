"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { getNewsArticles } from "@/data/news";

const articles = getNewsArticles();

export default function NewsPage() {
  return (
    <>
      <PageHero
        badge="Blog & Updates"
        title="News & Updates" subtitle="Stay informed about our latest activities, events, and achievements." breadcrumbs={[{ label: "News & Updates", href: "/news-updates" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <Link href={`/news-updates/${a.slug}`} className="group block rounded-2xl border border-neutral-200 bg-white h-full shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={a.image} alt={a.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
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
