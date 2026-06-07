"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Phone, Mail, MapPin, Heart, Handshake } from "lucide-react";
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
        badge="Get in Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for inquiries, partnerships, or volunteer opportunities."
      />

      {/* Kindoora-style Colorful Inquiry Cards */}
      <section className="py-12">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-br from-brand-orange-50 to-brand-orange-100 border border-brand-orange-200 p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Heart className="w-7 h-7 text-brand-orange" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Donations & Sponsorships</h3>
              <p className="text-neutral-600 mb-4">Interested in supporting a child or contributing to our programs? Get in touch with our team.</p>
              <a href={`mailto:${siteSettings.contact.email}`} className="btn-primary text-sm">Get in Touch</a>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Handshake className="w-7 h-7 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-2">Partnerships & Volunteering</h3>
              <p className="text-neutral-600 mb-4">Organizations and individuals looking to partner or volunteer with Selam Children&apos;s Village.</p>
              <a href={`mailto:${siteSettings.contact.email}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-dark px-6 py-3 font-semibold text-white text-sm hover:bg-brand-dark-light transition-all">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-neutral-50">
        <div className="container-xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-50 border border-brand-orange-100 mb-4">
              <span className="w-5 h-5 rounded-full bg-brand-orange flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              <span className="text-sm font-semibold text-brand-dark">Why Reach Out</span>
            </span>
            <h2 className="text-brand-dark">We are always here to help you</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="font-bold text-brand-dark mb-2 tracking-normal">Visit Us</h3>
              <p className="text-neutral-600 text-sm">{siteSettings.contact.address}</p>
              <p className="text-neutral-400 text-sm">{siteSettings.contact.poBox}</p>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="font-bold text-brand-dark mb-2 tracking-normal">Call Us</h3>
              {siteSettings.contact.phones.map(p => (
                <p key={p.number} className="text-neutral-600 text-sm"><a href={`tel:${p.number}`} className="hover:text-brand-orange transition-colors">{p.number}</a></p>
              ))}
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 text-center shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="font-bold text-brand-dark mb-2 tracking-normal">Email Us</h3>
              <a href={`mailto:${siteSettings.contact.email}`} className="text-neutral-600 text-sm hover:text-brand-orange transition-colors">{siteSettings.contact.email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="container-xl max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-brand-dark">Send Us a Message</h2>
            <p className="mt-3 text-neutral-500">Fill out the form below and we&apos;ll get back to you within 1-2 business days.</p>
          </div>
          {submitted ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 rounded-2xl bg-green-50 border border-green-200">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-brand-dark">Message Sent!</h2>
              <p className="mt-2 text-neutral-600">We&apos;ll respond within 1-2 business days.</p>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit(onSubmit)} className="rounded-2xl bg-white border border-neutral-200 shadow-sm p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-medium text-brand-dark mb-1.5">Your Name *</label>
                  <input {...register("name")} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                  {errors.name && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block font-medium text-brand-dark mb-1.5">Email *</label>
                  <input type="email" {...register("email")} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                  {errors.email && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block font-medium text-brand-dark mb-1.5">Subject *</label>
                <input {...register("subject")} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none" />
                {errors.subject && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.subject.message}</p>}
              </div>
              <div>
                <label className="block font-medium text-brand-dark mb-1.5">Message *</label>
                <textarea rows={5} {...register("message")} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none resize-none" />
                {errors.message && <p className="mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 inline mr-1" />{errors.message.message}</p>}
              </div>
              {submitError && <p className="text-sm text-red-500 text-center font-medium">{submitError}</p>}
              <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                <Send className="w-4 h-4" />{isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Map */}
      <section className="pb-16">
        <div className="container-xl max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm h-[400px]">
            <iframe
              src={siteSettings.map.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
