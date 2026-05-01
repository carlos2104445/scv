"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/blocks/SectionHeading";
import type { NewsArticle } from "@/lib/api";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NewsSection({ articles: newsArticles = [] }: { articles?: NewsArticle[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        <SectionHeading
          badge="Latest Updates"
          title="News & Stories"
          subtitle="Stay informed about our latest activities, achievements, and stories of transformation."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
            >
              <Link
                href={`/news-updates/${article.slug}`}
                className="group block card-base hover-lift h-full"
              >
                {/* Image placeholder */}
                <div className="relative h-52 bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-neutral-300 text-6xl font-serif font-bold">
                      {article.title[0]}
                    </div>
                  </div>
                  {/* Date badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishDate)}
                    </div>
                  </div>
                  {/* Category */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-brand-orange text-white text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-orange transition-colors line-clamp-2 tracking-normal">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-base text-neutral-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-brand-orange text-base font-semibold">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link href="/news-updates" className="btn-secondary">
            All News & Updates
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
