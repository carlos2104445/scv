"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
export default function PublicationPage() {
  return (
    <><PageHero title="Publications" subtitle="Reports, studies, and publications." breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Publications", href: "/resources/publication" }]} />
    <section className="section-padding"><div className="container-xl"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center"><FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" /><h2 className="text-2xl font-bold">Coming Soon</h2><p className="mt-2 text-neutral-600">Publications will be available for download soon.</p></motion.div></div></section></>
  );
}
