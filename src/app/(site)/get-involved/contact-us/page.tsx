"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PageHero } from "@/components/blocks/PageHero";
import { siteSettings } from "@/data/site-settings";
import { submitContact } from "@/actions/contact";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  
  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const result = await submitContact(data);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Something went wrong.");
    }
  };

  return (
    <>
      <PageHero 
        title="Contact Us" 
        subtitle="We'd love to hear from you." 
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved/how-to-help" }, 
          { label: "Contact Us", href: "/get-involved/contact-us" }
        ]} 
        backgroundImageUrl="/images/contact-banner.jpg"
      />
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold">Message Sent!</h2>
                  <p className="mt-2 text-neutral-600">We&apos;ll respond within 1-2 business days.</p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit(onSubmit)} className="card-base p-8 space-y-5">
                  <div><label className="block text-sm font-medium mb-1.5">Your Name *</label><input {...register("name")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm" />{errors.name && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.name.message}</p>}</div>
                  <div><label className="block text-sm font-medium mb-1.5">Email *</label><input type="email" {...register("email")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm" />{errors.email && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.email.message}</p>}</div>
                  <div><label className="block text-sm font-medium mb-1.5">Subject *</label><input {...register("subject")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm" />{errors.subject && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.subject.message}</p>}</div>
                  <div><label className="block text-sm font-medium mb-1.5">Message *</label><textarea rows={5} {...register("message")} className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none text-sm resize-none" />{errors.message && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.message.message}</p>}</div>
                  {submitError && <p className="text-sm text-red-500 text-center font-medium">{submitError}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full"><Send className="w-4 h-4" />{isSubmitting ? "Sending..." : "Send Message"}</button>
                </motion.form>
              )}
            </div>
            <div className="space-y-6">
              <div className="card-base p-6">
                <h3 className="font-bold text-brand-dark mb-4 tracking-normal">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3"><MapPin className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" /><div><p className="text-sm text-neutral-600">{siteSettings.contact.address}</p><p className="text-xs text-neutral-400">{siteSettings.contact.poBox}</p></div></div>
                  {siteSettings.contact.phones.map(p => (<div key={p.number} className="flex items-center gap-3"><Phone className="w-5 h-5 text-brand-orange shrink-0" /><div><p className="text-xs text-neutral-400">{p.label}</p><a href={`tel:${p.number}`} className="text-sm text-neutral-600 hover:text-brand-orange">{p.number}</a></div></div>))}
                  <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-brand-orange shrink-0" /><a href={`mailto:${siteSettings.contact.email}`} className="text-sm text-neutral-600 hover:text-brand-orange">{siteSettings.contact.email}</a></div>
                </div>
              </div>
              <div className="card-base overflow-hidden h-[400px]">
                <iframe 
                  src={siteSettings.map.embedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Location" 
                  className="invert-[90%] hue-rotate-180 contrast-125 opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
