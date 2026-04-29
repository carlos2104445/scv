"use client";
import { use } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/blocks/PageHero";

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      <PageHero title={title} breadcrumbs={[{ label: "News", href: "/news-updates" }, { label: title, href: `/news-updates/${slug}` }]} />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 text-sm text-neutral-500 mb-6"><Calendar className="w-4 h-4" /><span>March 15, 2025</span></div>
              <div className="prose prose-lg prose-neutral max-w-none">
                <p>This is a placeholder article page for &quot;{title}&quot;. In the final version, this content will be populated from the CMS database with rich text, images, and media.</p>
                <p>Selam Children&apos;s Village continues to make significant strides in its mission to transform the lives of vulnerable children and youth across Ethiopia. Through our comprehensive programs and dedicated staff, we ensure that every child receives the care, education, and support they need to thrive.</p>
              </div>
              <div className="mt-10 pt-6 border-t border-neutral-200">
                <Link href="/news-updates" className="flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all"><ArrowLeft className="w-4 h-4" />Back to News</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
