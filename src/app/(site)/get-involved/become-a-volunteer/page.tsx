"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
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
        title="Become a Volunteer"
        subtitle="Join our team and make a meaningful impact in the lives of children and youth."
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/how-to-help" },
          { label: "Volunteer", href: "/get-involved/become-a-volunteer" },
        ]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto">
            <motion.form
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="card-base p-8 space-y-6"
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
