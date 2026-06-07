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
    href: "#",
    cta: "Share Our Mission",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: Baby,
    title: "Sponsor a Child",
    description: "You can directly sponsor a child's education, healthcare, and daily needs. Your sponsorship provides holistic support throughout their development.",
    href: "/get-involved/contact-us",
    cta: "Learn About Sponsorship",
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200",
  },
];

export default function HowToHelpPage() {
  return (
    <>
      <PageHero
        badge="Get Involved"
        title="How to Help"
        subtitle="Discover the many ways you can support Selam Children's Village and make a lasting impact."
      />

      <section className="section-padding">
        <div className="container-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ways.map((way) => (
              <div
                key={way.title}
                className={`rounded-2xl border ${way.borderColor} bg-white p-6 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-12 h-12 rounded-xl ${way.color} flex items-center justify-center mb-4`}>
                  <way.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{way.title}</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">{way.description}</p>
                <Link href={way.href} className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors">
                  {way.cta} →
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-neutral-500 mb-4">Have questions about how you can help?</p>
            <Link href="/get-involved/contact-us" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
