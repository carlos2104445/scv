"use client";

import { PageHero } from "@/components/blocks/PageHero";
import { motion } from "framer-motion";

export default function BoardSwitzerlandPage() {
  return (
    <>
      <PageHero
        title="Board Switzerland"
        subtitle="Selam Charity Switzerland — supporting Selam Children's Village from Europe."
        breadcrumbs={[
          { label: "Leadership", href: "/leadership" },
          { label: "Board Switzerland", href: "/leadership/board-switzerland" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2>Selam Charity Switzerland</h2>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
              Selam Charity Switzerland is a registered Swiss non-profit organization that serves as the European partner and fundraising arm of Selam Children&apos;s Village. The Swiss board works closely with the Ethiopian leadership to mobilize resources, build international partnerships, and advocate for the rights of vulnerable children.
            </p>
            <p className="mt-4 text-neutral-600 leading-relaxed">
              Through their dedicated efforts, Selam Charity Switzerland has helped secure critical funding for infrastructure projects, educational programs, and community development initiatives that directly benefit the children and communities we serve.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
