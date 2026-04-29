"use client";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
export default function PoliciesPage() {
  return (
    <><PageHero title="Policies & Guidelines" subtitle="Organizational policies and governance documents." breadcrumbs={[{ label: "Resources", href: "/resources" }, { label: "Policies & Guidelines", href: "/resources/policies-guidelines" }]} />
    <section className="section-padding"><div className="container-xl"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center"><Shield className="w-12 h-12 text-neutral-300 mx-auto mb-4" /><h2 className="text-2xl font-bold">Coming Soon</h2><p className="mt-2 text-neutral-600">Policies and guidelines will be available for download soon.</p></motion.div></div></section></>
  );
}
