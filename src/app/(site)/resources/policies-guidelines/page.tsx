import type { Metadata } from "next";
import { Shield, Users, DollarSign, Leaf, Lock, Ban, BookOpen, Scale } from "lucide-react";
import { PageHero } from "@/components/blocks/PageHero";

export const metadata: Metadata = {
  title: "Policies & Guidelines",
  description: "Selam Children's Village organizational policies — child protection, code of conduct, financial management, and compliance standards.",
  openGraph: {
    title: "Policies & Guidelines | Selam Children's Village",
    description: "Our policies ensure the safety, well-being, and rights of all beneficiaries and stakeholders.",
  },
};

const policies = [
  {
    icon: Shield,
    title: "Child Protection Policy",
    description: "Comprehensive safeguarding measures for all children in our care, including prevention protocols, reporting mechanisms, and response procedures.",
    color: "bg-red-50 text-red-600",
  },
  {
    icon: Users,
    title: "Code of Conduct",
    description: "Standards of behavior for staff, volunteers, and partners ensuring respectful, ethical, and professional interactions at all times.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Human Resources Policy",
    description: "Employment practices, benefits, professional development opportunities, and workplace standards for all SCV staff members.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: DollarSign,
    title: "Financial Management Policy",
    description: "Budgeting, procurement, and expenditure guidelines ensuring responsible stewardship of all organizational funds.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Leaf,
    title: "Environmental Policy",
    description: "Commitment to sustainable and environmentally responsible practices across all our programs and operations.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Lock,
    title: "Data Protection & Privacy",
    description: "Handling of personal information and confidential data in compliance with national and international privacy standards.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: Ban,
    title: "Anti-Fraud & Corruption Policy",
    description: "Zero tolerance for fraudulent activities with clear reporting channels, investigation procedures, and disciplinary actions.",
    color: "bg-rose-50 text-rose-600",
  },
];

const compliance = [
  "Ethiopian Charities and Societies Proclamation",
  "International NGO standards and best practices",
  "UN Convention on the Rights of the Child",
  "Partner and donor requirements",
];

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="Policies & Guidelines"
        subtitle="Our organizational policies ensure the safety, well-being, and rights of all beneficiaries and stakeholders."
        breadcrumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Policies & Guidelines", href: "/resources/policies-guidelines" },
        ]}
      />

      <section className="section-padding">
        <div className="container-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {policies.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card-base p-6 flex flex-col">
                  <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{p.title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed flex-1">{p.description}</p>
                </div>
              );
            })}
          </div>

          {/* Compliance section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-base p-8">
              <div className="w-12 h-12 rounded-xl bg-brand-orange/10 flex items-center justify-center mb-4">
                <Scale className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl font-bold text-brand-dark mb-4">Compliance</h2>
              <p className="text-neutral-600 mb-4">Our policies align with national and international standards:</p>
              <ul className="space-y-2.5">
                {compliance.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-neutral-600">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-base p-8 bg-brand-orange/5 border-brand-orange/20">
              <h2 className="text-xl font-bold text-brand-dark mb-4">Access Our Policies</h2>
              <p className="text-neutral-600 mb-6">
                For copies of specific policies, guidelines, or compliance documents, our
                administration team is happy to assist. Our policies are regularly reviewed and
                updated to reflect best practices and evolving standards.
              </p>
              <a
                href="/get-involved/contact-us"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange text-white text-sm font-medium hover:bg-brand-orange/90 transition-colors"
              >
                Contact Administration
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
