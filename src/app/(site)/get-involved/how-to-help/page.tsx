import type { Metadata } from "next";
import Link from "next/link";
import { Heart, Users, Handshake, Share2, Baby } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

export const metadata: Metadata = {
  title: "How to Help",
  description: "Discover the many ways you can support Selam Children's Village — donate, volunteer, partner, sponsor a child, or spread the word.",
  openGraph: {
    title: "How to Help | Selam Children's Village",
    description: "Make a lasting impact through donations, volunteering, partnerships, and child sponsorship.",
  },
};

const ways = [
  {
    icon: Heart,
    title: "Donate",
    description: "Your financial contribution directly supports our programs — from child care to vocational training. Every birr counts toward building a better future.",
    href: "/get-involved/donate",
    cta: "Donate Now",
    color: "bg-rose-50 text-rose-600",
    borderColor: "border-rose-200",
  },
  {
    icon: Users,
    title: "Volunteer",
    description: "Share your time and skills with us. Whether you're a professional, student, or retiree, your expertise can make a real impact in our children's lives.",
    href: "/get-involved/become-a-volunteer",
    cta: "Become a Volunteer",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description: "Organizations, businesses, and institutions can collaborate with us on projects, sponsor programs, or provide technical assistance.",
    href: "/get-involved/be-a-partner",
    cta: "Be a Partner",
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    icon: Share2,
    title: "Spread the Word",
    description: "Share our story on social media, tell your friends and family, and help raise awareness about the needs of vulnerable children in Ethiopia.",
    href: null,
    cta: null,
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: Baby,
    title: "Sponsor a Child",
    description: "You can directly sponsor a child's education, healthcare, and daily needs. Your sponsorship provides holistic support throughout their development.",
    href: "/get-involved/contact-us",
    cta: "Learn More",
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200",
  },
];

export default function HowToHelpPage() {
  return (
    <>
      <PageHero
        title="How to Help"
        subtitle="Discover the many ways you can support Selam Children's Village and make a lasting impact."
        breadcrumbs={[
          { label: "Get Involved", href: "/get-involved" },
          { label: "How to Help", href: "/get-involved/how-to-help" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-dark mb-3">Make a Difference Today</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              There are many ways you can support Selam Children&apos;s Village and contribute to the
              welfare of vulnerable children and communities in Ethiopia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ways.map((w) => {
              const Icon = w.icon;
              return (
                <div key={w.title} className={`card-base p-6 flex flex-col border ${w.borderColor}`}>
                  <div className={`w-12 h-12 rounded-xl ${w.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{w.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">{w.description}</p>
                  {w.href && w.cta && (
                    <Link
                      href={w.href}
                      className="mt-4 inline-flex items-center gap-1 text-brand-orange text-sm font-semibold hover:gap-2 transition-all"
                    >
                      {w.cta} →
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/20 text-center">
            <h3 className="text-lg font-bold text-brand-dark mb-2">Questions?</h3>
            <p className="text-neutral-600">
              For more information on how you can help, please{" "}
              <Link href="/get-involved/contact-us" className="text-brand-orange font-medium hover:underline">
                contact us
              </Link>
              . We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
