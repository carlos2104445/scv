"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-brand-dark via-brand-dark to-neutral-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(232,119,34,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(232,119,34,0.1),transparent_50%)]" />
      <div className="container-xl relative z-10 text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-brand-orange mb-6">
            <Mail className="w-4 h-4" />
            Stay Connected
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            Stay Updated on Our Mission
          </h2>
          <p className="mt-4 text-lg text-white/70 leading-relaxed">
            Join our community and receive updates on how your support is making a difference for children and youth in Ethiopia.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-brand-orange transition-colors"
            />
            <button className="px-6 py-3 rounded-xl bg-brand-orange text-white font-semibold hover:bg-brand-orange/90 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="mt-3 text-xs text-white/40">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
