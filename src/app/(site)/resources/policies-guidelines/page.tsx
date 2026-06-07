import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Users, BookOpen, DollarSign, Leaf, Lock, Ban } from "lucide-react";
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
  { icon: Shield, title: "Child Protection Policy", description: "Comprehensive safeguarding measures for all children in our care, ensuring their safety and well-being at all times.", color: "bg-red-50 text-red-600", borderColor: "border-red-200" },
  { icon: Users, title: "Code of Conduct", description: "Standards of behavior for staff, volunteers, and partners working with Selam Children's Village.", color: "bg-blue-50 text-blue-600", borderColor: "border-blue-200" },
  { icon: BookOpen, title: "Human Resources Policy", description: "Employment practices, benefits, professional development, and workplace standards.", color: "bg-indigo-50 text-indigo-600", borderColor: "border-indigo-200" },
  { icon: DollarSign, title: "Financial Management Policy", description: "Budgeting, procurement, and expenditure guidelines ensuring transparent financial operations.", color: "bg-emerald-50 text-emerald-600", borderColor: "border-emerald-200" },
  { icon: Leaf, title: "Environmental Policy", description: "Commitment to sustainable and environmentally responsible practices across all our programs.", color: "bg-green-50 text-green-600", borderColor: "border-green-200" },
  { icon: Lock, title: "Data Protection & Privacy", description: "Handling of personal information and confidential data in compliance with national and international standards.", color: "bg-purple-50 text-purple-600", borderColor: "border-purple-200" },
  { icon: Ban, title: "Anti-Fraud & Corruption Policy", description: "Zero tolerance for fraudulent activities with comprehensive prevention and reporting mechanisms.", color: "bg-amber-50 text-amber-600", borderColor: "border-amber-200" },
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
        badge="Resources"
        title="Policies & Guidelines"
        subtitle="Comprehensive policies ensuring the safety, well-being, and rights of all beneficiaries and stakeholders."
      />

      <section className="section-padding">
        <div className="container-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy) => (
              <div key={policy.title} className={`rounded-2xl border ${policy.borderColor} bg-white p-6 shadow-sm`}>
                <div className={`w-12 h-12 rounded-xl ${policy.color} flex items-center justify-center mb-4`}>
                  <policy.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{policy.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{policy.description}</p>
              </div>
            ))}
          </div>

          {/* Compliance */}
          <div className="mt-16 rounded-2xl bg-neutral-50 border border-neutral-200 p-8">
            <h3 className="text-xl font-bold text-brand-dark mb-4">Compliance Standards</h3>
            <p className="text-neutral-600 mb-6">Our policies align with:</p>
            <ul className="space-y-3">
              {compliance.map((item) => (
                <li key={item} className="flex items-center gap-3 text-neutral-700">
                  <span className="w-2 h-2 rounded-full bg-brand-orange flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 text-center">
            <p className="text-neutral-500 mb-4">For copies of specific policies, please contact our administration.</p>
            <Link href="/get-involved/contact-us" className="btn-primary">
              Contact Administration
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
