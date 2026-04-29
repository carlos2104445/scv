"use client";
import { motion } from "framer-motion";
import { Newspaper } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
export default function NewsletterMagazinePage() {
  return (
    <><PageHero title="Newsletter & Magazine" subtitle="Periodic newsletters and magazine issues." breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Newsletter & Magazine", href: "/resources/newsletter-magazine" }]} />
    <section className="section-padding"><div className="container-xl"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center"><Newspaper className="w-12 h-12 text-neutral-300 mx-auto mb-4" /><h2 className="text-2xl font-bold">Coming Soon</h2><p className="mt-2 text-neutral-600">Newsletter and magazine archives will be available soon.</p></motion.div></div></section></>
  );
}
