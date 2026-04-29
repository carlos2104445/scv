"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

export default function JobOpeningsPage() {
  return (
    <>
      <PageHero title="Job Openings" subtitle="Join our team and make a difference." breadcrumbs={[{ label: "Job Openings", href: "/job-openings" }]} />
      <section className="section-padding">
        <div className="container-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 flex items-center justify-center mb-6"><Briefcase className="w-8 h-8 text-neutral-400" /></div>
            <h2 className="text-2xl font-bold text-brand-dark">No Current Openings</h2>
            <p className="mt-4 text-neutral-600">We currently have no job openings. Please check back later or follow us on social media for announcements about new positions.</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
