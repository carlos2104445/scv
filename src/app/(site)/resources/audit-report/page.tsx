import type { Metadata } from "next";
import { ShieldCheck, Download, Calendar } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";
import { getAuditReports } from "@/data/resources";

export const metadata: Metadata = {
  title: "Audit Reports",
  description: "Access externally audited financial reports for Selam Children's Village from 2015 to 2024, ensuring transparency and accountability.",
  openGraph: {
    title: "Audit Reports | Selam Children's Village",
    description: "Access our externally audited financial reports ensuring transparency and accountability.",
  },
};

export default function AuditReportPage() {
  const reports = getAuditReports();

  return (
    <>
      <PageHero
        badge="Resources"
        title="Audit Reports"
        subtitle="We provide regular externally audited reports on our activities and finances."
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Audit Reports", href: "/resources/audit-report" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl max-w-4xl mx-auto">
          <p className="text-lg text-neutral-600 mb-10">
            Selam Children's Village undergoes annual external audits to ensure the highest
            standards of financial accountability and transparency. Our financial statements are
            audited by reputable Ethiopian audit firms in accordance with International Standards on
            Auditing (ISA).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reports.map((r) => (
              <div key={r.id} className="rounded-2xl border border-neutral-200 bg-white p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-brand-dark truncate">{r.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>Fiscal Year {r.year}</span>
                  </div>
                </div>
                {r.downloadUrl ? (
                  <a
                    href={r.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-9 h-9 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="shrink-0 text-xs text-neutral-400 font-medium">Soon</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
            <p className="text-neutral-600">
              For copies of our audit reports, please{" "}
              <a href="/get-involved/contact-us" className="text-brand-orange font-medium hover:underline">
                contact our finance department
              </a>
              . Financial integrity is foundational to our mission and the trust placed in us by our
              donors and partners.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
