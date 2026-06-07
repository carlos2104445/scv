import Link from "next/link";
import { Briefcase, Mail, Bell } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { AnimatedSection } from "@/components/global/AnimatedSection";

export default function JobOpeningsPage() {
  return (
    <>
      <PageHero
        badge="Careers"
        title="Job Openings"
        subtitle="Join our team and make a difference in the lives of children and communities."
        breadcrumbs={[{ label: "Job Openings", href: "/job-openings" }]}
      />
      <section className="section-padding">
        <div className="container-xl">
          <AnimatedSection className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-brand-orange-50 border border-brand-orange-100 flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-brand-orange" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-brand-dark">No Current Openings</h2>
              <p className="mt-4 text-neutral-600 text-lg leading-relaxed">
                We currently have no open positions. New opportunities are posted here when available. Check back regularly or follow us on social media for announcements.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-left space-y-4 shadow-sm">
              <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                <Bell className="w-5 h-5 text-brand-orange" />
                Stay Notified
              </h3>
              <p className="text-neutral-600">
                Interested in working with us? Send your CV and a cover letter to our HR department and we will keep your application on file for future openings.
              </p>
              <div className="flex items-center gap-2 text-brand-orange font-semibold">
                <Mail className="w-5 h-5" />
                <a href="mailto:info@selamchildrenvillage.org" className="hover:underline">info@selamchildrenvillage.org</a>
              </div>
            </div>
            <div className="pt-4">
              <Link href="/get-involved/become-a-volunteer" className="btn-primary">
                Volunteer With Us Instead
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
