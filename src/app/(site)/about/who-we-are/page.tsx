"use client";

import { motion } from "framer-motion";
import { PageHero } from "@/components/blocks/PageHero";

export default function WhoWeArePage() {
  return (
    <>
      <PageHero
        title="Who We Are"
        subtitle="A comprehensive Ethiopian non-profit serving the most vulnerable children and youth."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Who We Are", href: "/about/who-we-are" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto prose prose-lg prose-neutral">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Selam Children&apos;s Village (SCV) is a registered Ethiopian non-governmental, non-profit organization headquartered in Addis Ababa, Ethiopia. Founded in 1986 by Mrs. Tsehay Roschli, SCV is dedicated to providing holistic care, protection, education, and empowerment to orphaned, abandoned, and vulnerable children and youth.
              </p>
              <h2 className="mt-10">Our Approach</h2>
              <p className="text-neutral-600 leading-relaxed">
                We operate on a family-based model where children live in small family units, each guided by a dedicated house mother who provides personalized care and emotional support. This model ensures that every child experiences the warmth and stability of a family environment while receiving quality education and healthcare.
              </p>
              <h2 className="mt-10">Our Campus</h2>
              <p className="text-neutral-600 leading-relaxed">
                Our campus in the Kotebe area of Addis Ababa hosts a comprehensive range of facilities including residential family homes, a school, a TVET college with 11 departments, a clinic, recreational areas, and administrative offices. The campus serves as both a home for the children in our care and a center for community development.
              </p>
              <h2 className="mt-10">Our Impact</h2>
              <p className="text-neutral-600 leading-relaxed">
                Over four decades, we have cared for thousands of children, graduated hundreds of skilled professionals from our TVET college, supported community women through economic empowerment programs, and provided healthcare to thousands of patients annually. Our alumni are now contributing members of society — teachers, engineers, healthcare workers, and entrepreneurs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
