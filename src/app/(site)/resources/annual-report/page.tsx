import type { Metadata } from "next";
import { FileText, Download, Calendar } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { getAnnualReports } from "@/data/resources";

export const metadata: Metadata = {
  title: "Annual Reports",
  description: "Download Selam Children's Village annual reports detailing programs, financial performance, and impact from 2019 to 2024.",
  openGraph: {
    title: "Annual Reports | Selam Children's Village",
    description: "Download our annual reports documenting the vital work and impact of Selam Children's Village.",
  },
};

export default function AnnualReportPage() {
  const reports = getAnnualReports();

  return (
    <>
      <PageHero
        title="Annual Reports"
        subtitle="Download our Annual Reports detailing the vital work of Selam Children's Village."
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Annual Reports", href: "/resources/annual-report" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl max-w-4xl mx-auto">
          <p className="text-lg text-neutral-600 mb-10">
            Our annual reports contain our impact and results as well as our visions for the future.
            They provide a comprehensive overview of activities, financial performance, and stories
            of transformation throughout the year.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((r) => (
              <div key={r.id} className="card-base p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 flex items-center justify-center mb-4">
                  <FileText className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark">{r.title}</h3>
                <div className="flex items-center gap-1 text-sm text-neutral-500 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{r.year}</span>
                </div>
                <p className="text-sm text-neutral-600 mt-2">{r.description}</p>
                {r.downloadUrl ? (
                  <a
                    href={r.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-orange text-white text-sm font-medium hover:bg-brand-orange/90 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                ) : (
                  <span className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-100 text-neutral-500 text-sm font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
            <p className="text-neutral-600">
              For older reports or specific financial documents, please{" "}
              <a href="/get-involved/contact-us" className="text-brand-orange font-medium hover:underline">
                contact our finance department
              </a>
              . We are committed to full transparency and are proud to share our progress with all stakeholders.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
