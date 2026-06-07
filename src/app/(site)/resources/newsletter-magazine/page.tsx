import type { Metadata } from "next";
import { BookOpen, Mail } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

export const metadata: Metadata = {
  title: "Newsletter & Magazine",
  description: "Subscribe to the Selam Children's Village quarterly newsletter and annual magazine for updates, success stories, and impact highlights.",
  openGraph: {
    title: "Newsletter & Magazine | Selam Children's Village",
    description: "Stay connected through our quarterly newsletter and annual magazine featuring stories, updates, and impact reports.",
  },
};

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        badge="Resources"
        title="Newsletter & Magazine"
        subtitle="Stay connected with Selam Children's Village through our regular publications."
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Newsletter & Magazine", href: "/resources/newsletter-magazine" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Annual Magazine */}
            <div className="rounded-2xl border border-brand-orange-100 bg-white p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange-50 border border-brand-orange-100 flex items-center justify-center mb-4">
                <BookOpen className="w-7 h-7 text-brand-orange" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Annual Magazines</h2>
              <p className="text-neutral-600 mb-4">
                Our annual magazine provides in-depth features including photo essays, interviews
                with beneficiaries and staff, detailed program reports, and year-in-review
                highlights.
              </p>
              <p className="text-sm text-neutral-500">
                Previous issues are available upon request.
              </p>
            </div>

            {/* Newsletter */}
            <div className="rounded-2xl border border-blue-200 bg-white p-8 shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-3">Newsletters</h2>
              <p className="text-neutral-600 mb-4">
                Our quarterly newsletter covers the latest news and updates from all our centers,
                success stories from our programs, upcoming events and opportunities, and partner
                spotlights.
              </p>
              <p className="text-sm text-neutral-500">
                Subscribe by contacting us with your email address.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/20 text-center">
            <h3 className="text-lg font-bold text-brand-dark mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-neutral-600 mb-4">
              To receive our newsletter directly in your inbox, please{" "}
              <a href="/get-involved/contact-us" className="text-brand-orange font-medium hover:underline">
                contact us
              </a>{" "}
              with your email address.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
