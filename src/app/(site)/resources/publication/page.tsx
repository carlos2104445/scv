import type { Metadata } from "next";
import Link from "next/link";
import { FileText, BookOpen, FileSpreadsheet, Heart } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

export const metadata: Metadata = {
  title: "Publications",
  description: "Access our publications — annual reports, research papers, program briefs, and impact stories from Selam Children's Village.",
  openGraph: {
    title: "Publications | Selam Children's Village",
    description: "Access our publications, research papers, and organizational documents.",
  },
};

const publications = [
  {
    icon: FileText,
    title: "Annual Reports",
    description: "Comprehensive yearly reports detailing our programs, financials, and impact metrics.",
    href: "/resources/annual-report",
    cta: "View Reports",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: BookOpen,
    title: "Research Papers",
    description: "Studies and research conducted in collaboration with academic institutions.",
    href: null,
    cta: "Available upon request",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: FileSpreadsheet,
    title: "Program Briefs",
    description: "Summaries of key programs and their outcomes across all our initiatives.",
    href: null,
    cta: "Available upon request",
    color: "bg-emerald-50 text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    icon: Heart,
    title: "Impact Stories",
    description: "Narratives documenting the lives transformed through our work.",
    href: null,
    cta: "Available upon request",
    color: "bg-rose-50 text-rose-600",
    borderColor: "border-rose-200",
  },
];

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        badge="Resources"
        title="Publications"
        subtitle="Access our publications, research papers, and organizational documents."
      />

      <section className="section-padding">
        <div className="container-xl max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((pub) => (
              <div key={pub.title} className={`rounded-2xl border ${pub.borderColor} bg-white p-6 shadow-sm`}>
                <div className={`w-12 h-12 rounded-xl ${pub.color} flex items-center justify-center mb-4`}>
                  <pub.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{pub.title}</h3>
                <p className="text-neutral-600 leading-relaxed mb-4">{pub.description}</p>
                {pub.href ? (
                  <Link href={pub.href} className="inline-flex items-center text-sm font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors">
                    {pub.cta} →
                  </Link>
                ) : (
                  <span className="text-sm text-neutral-400 italic">{pub.cta}</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-neutral-500 mb-4">For specific documents or custom reports, please contact our communications team.</p>
            <Link href="/get-involved/contact-us" className="btn-primary">
              Request Documents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
