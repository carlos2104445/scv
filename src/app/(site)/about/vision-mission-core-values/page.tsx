"use client";

import { motion } from "framer-motion";
import { Eye, Target, Heart, Shield, Users, Lightbulb, HandHeart, Scale } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

const coreValues = [
  { icon: Heart, title: "Love & Compassion", description: "We serve with love, treating every child and community member with warmth, dignity, and genuine care." },
  { icon: Shield, title: "Integrity", description: "We maintain the highest ethical standards in all our actions, ensuring transparency and accountability." },
  { icon: Users, title: "Inclusiveness", description: "We embrace diversity and ensure equal opportunity for all, regardless of background or circumstance." },
  { icon: Lightbulb, title: "Innovation", description: "We continuously seek creative and effective solutions to address the evolving needs of our community." },
  { icon: HandHeart, title: "Empowerment", description: "We equip individuals with the skills, knowledge, and confidence to become self-sufficient and productive members of society." },
  { icon: Scale, title: "Accountability", description: "We are responsible stewards of the resources entrusted to us, ensuring maximum impact for beneficiaries." },
];

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        title="Vision, Mission & Core Values"
        subtitle="The guiding principles that drive everything we do at Selam Children's Village."
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Vision, Mission & Core Values", href: "/about/vision-mission-core-values" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange/10 mb-6">
                <Eye className="w-8 h-8 text-brand-orange" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark tracking-tight mb-4">Our Vision</h2>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                To see a society where every child grows up in a loving family environment, has access to quality education and healthcare, and becomes a productive and responsible citizen.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-brand-dark tracking-tight mb-4">Our Mission</h2>
              <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                Selam Children&apos;s Village is committed to providing holistic care, education, and vocational training for orphaned and vulnerable children and youth, while empowering communities to become self-sufficient through sustainable development programs.
              </p>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-brand-dark tracking-tight mb-4">Our Core Values</h2>
                <p className="text-lg text-neutral-600">The principles that guide our work and define who we are.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coreValues.map((value, i) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="card-base hover-lift p-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-brand-orange" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark mb-2">{value.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
