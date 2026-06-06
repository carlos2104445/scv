import type { Metadata } from "next";
import { getStaticPage } from "@/data/pages";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Policies & Guidelines",
  description: "Selam Children's Village organizational policies — child protection, code of conduct, financial management, and compliance standards.",
  openGraph: {
    title: "Policies & Guidelines | Selam Children's Village",
    description: "Our policies ensure the safety, well-being, and rights of all beneficiaries and stakeholders.",
  },
};

export default function PoliciesPage() {
  const page = getStaticPage("policies-guidelines");
  if (!page) return notFound();

  return (
    <GenericPage 
      page={page} 
      breadcrumbs={[
        { label: "Resources", href: "/resources" }, 
        { label: page.title, href: "/resources/policies-guidelines" }
      ]} 
    />
  );
}
