"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHero } from "@/components/blocks/PageHero";

import { submitVolunteer } from "@/actions/volunteer";

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const result = await submitVolunteer(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Something went wrong.");
    }
  };

  if (submitted) {
    return (
      <>
        <PageHero
        badge="Get Involved"
        title="Become a Volunteer"
          breadcrumbs={[
            { label: "Get Involved", href: "/get-involved/how-to-help" },
            { label: "Volunteer", href: "/get-involved/become-a-volunteer" },
          ]}
        />
        <section className="section-padding">
          <div className="container-xl">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark">Thank You!</h2>
              <p className="mt-4 text-neutral-600">Your volunteer application has been submitted. We will review your information and get back to you soon.</p>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        badge="Get Involved"
        title="Become a Volunteer"
        subtitle="Join our team and make a meaningful impact in the lives of children and youth."
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/how-to-help" },
          { label: "Volunteer", href: "/get-involved/become-a-volunteer" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          
          {/* Introductory Content */}
          <div className="max-w-5xl mx-auto mb-20 space-y-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Where it all began. Let&apos;s help together.</h2>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Would you like to travel and give something back to the communities you visit at the same time? Do you want to make the world a better place? Have you got skills you&apos;d like to share? Do you want to learn new skills while helping others? If the answer to any of these questions is &apos;YES&apos;, then volunteering with us could be the perfect choice for you.
                </p>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/volunteer-real-1.jpg" alt="Volunteers helping in community" fill className="object-cover" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/volunteer-real-2.jpg" alt="Joyful volunteers showing impact" fill className="object-cover" />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-brand-dark mb-4">More People, More impact</h2>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Selam Children Village believes that unless members of the civil society are involved proactively in the process of development, sustainable change will not happen. We encourage and invite individuals for volunteer opportunities and volunteer registration, to be an active part of our organization and share the same vision and purpose as us &ndash; to work for the welfare of children and their families. Volunteers are the backbone of every organization &ndash; they not only carry the organization&apos;s ideals within them, but also spread the message far and beyond, sensitizing the society towards the cause. Volunteer for NGO, volunteer to serve, spread some smiles!
                </p>
              </div>
            </motion.div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-brand-dark">Apply to Volunteer</h3>
              <p className="text-neutral-500 mt-2">Fill out the form below and we will get back to you.</p>
            </div>
            <motion.form
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-neutral-200 bg-white p-8 space-y-6 shadow-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">First Name *</label>
                  <input {...register("firstName")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm" />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Last Name *</label>
                  <input {...register("lastName")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm" />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Gender *</label>
                <select {...register("gender")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm bg-white">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Email Address *</label>
                <input type="email" {...register("email")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm" />
                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Phone</label>
                <input type="tel" {...register("phone")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">City</label>
                  <input {...register("city")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1.5">Country *</label>
                  <input {...register("country")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm" />
                  {errors.country && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.country.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1.5">Message / Skills</label>
                <textarea rows={4} {...register("message")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all text-sm resize-none" placeholder="Tell us about your skills and how you'd like to help..." />
              </div>

              {submitError && <p className="text-sm text-red-500 text-center font-medium">{submitError}</p>}

              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  );
}
