import type { Metadata } from "next";
import { FileText, BookOpen, BarChart3, Heart } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

export const metadata: Metadata = {
  title: "Publications",
  description: "Access Selam Children's Village publications, research papers, program briefs, and impact stories.",
  openGraph: {
    title: "Publications | Selam Children's Village",
    description: "Research papers, program briefs, and impact stories from Selam Children's Village.",
  },
};

const publications = [
  {
    icon: FileText,
    title: "Annual Reports",
    description: "Comprehensive yearly reports detailing our programs, financials, and impact metrics across all centers.",
    href: "/resources/annual-report",
    color: "bg-brand-orange/10 text-brand-orange",
  },
  {
    icon: BookOpen,
    title: "Research Papers",
    description: "Studies and research conducted in collaboration with academic institutions on child development and vocational training.",
    href: null,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BarChart3,
    title: "Program Briefs",
    description: "Summaries of key programs and their outcomes — from BEYEPP to CYC, covering all major SCV initiatives.",
    href: null,
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Heart,
    title: "Impact Stories",
    description: "Narratives documenting the lives transformed through our child care, vocational training, and community programs.",
    href: null,
    color: "bg-rose-50 text-rose-600",
  },
];

export default function PublicationPage() {
  return (
    <>
      <PageHero
        title="Publications"
        subtitle="Access our publications, research papers, and organizational documents."
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Publications", href: "/resources/publication" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl max-w-4xl mx-auto">
          <p className="text-lg text-neutral-600 mb-10">
            Selam Children&apos;s Village regularly publishes reports, research papers, and
            organizational documents to maintain transparency and share our impact with
            stakeholders.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {publications.map((pub) => {
              const Icon = pub.icon;
              const content = (
                <div className="card-base p-6 h-full flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${pub.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{pub.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">{pub.description}</p>
                  {pub.href ? (
                    <span className="mt-4 text-brand-orange text-sm font-semibold">View Reports →</span>
                  ) : (
                    <span className="mt-4 text-neutral-400 text-sm font-medium">Available upon request</span>
                  )}
                </div>
              );

              return pub.href ? (
                <a key={pub.title} href={pub.href} className="group block hover-lift">
                  {content}
                </a>
              ) : (
                <div key={pub.title}>{content}</div>
              );
            })}
          </div>

          <div className="p-6 rounded-2xl bg-brand-orange/5 border border-brand-orange/20 text-center">
            <h3 className="text-lg font-bold text-brand-dark mb-2">Need a Specific Document?</h3>
            <p className="text-neutral-600 mb-4">
              For specific documents, custom reports, or older publications, please{" "}
              <a href="/get-involved/contact-us" className="text-brand-orange font-medium hover:underline">
                contact our communications team
              </a>
              .
            </p>
            <p className="text-sm text-neutral-500">
              We are committed to transparency and accountability in all our operations.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
