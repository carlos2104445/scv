import type { Metadata } from "next";
import { getStaticPage } from "@/data/pages";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Publications",
  description: "Access Selam Children's Village publications, research papers, program briefs, and impact stories.",
  openGraph: {
    title: "Publications | Selam Children's Village",
    description: "Research papers, program briefs, and impact stories from Selam Children's Village.",
  },
};

export default function PublicationPage() {
  const page = getStaticPage("publication");
  if (!page) return notFound();

  return (
    <GenericPage 
      page={page} 
      breadcrumbs={[
        { label: "Resources", href: "/resources" }, 
        { label: page.title, href: "/resources/publication" }
      ]} 
    />
  );
}
