import { getStaticPage } from "@/data/pages";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default function NewsletterPage() {
  const page = getStaticPage("newsletter-magazine");
  if (!page) return notFound();

  return (
    <GenericPage 
      page={page} 
      breadcrumbs={[
        { label: "Resources", href: "/resources" }, 
        { label: page.title, href: "/resources/newsletter-magazine" }
      ]} 
    />
  );
}
