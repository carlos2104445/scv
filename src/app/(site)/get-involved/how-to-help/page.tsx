import { getPage } from "@/lib/api";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default async function HowToHelpPage() {
  const page = await getPage("how-to-help");
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
