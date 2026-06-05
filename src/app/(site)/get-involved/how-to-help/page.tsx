import { getStaticPage } from "@/data/pages";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default function HowToHelpPage() {
  const page = getStaticPage("how-to-help");
  if (!page) return notFound();

  return (
    <GenericPage 
      page={page} 
      breadcrumbs={[
        { label: "Get Involved", href: "/get-involved" }, 
        { label: page.title, href: "/get-involved/how-to-help" }
      ]} 
    />
  );
}
