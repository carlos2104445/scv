import { getPage } from "@/lib/api";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default async function AuditReportPage() {
  const page = await getPage("audit-report");
  if (!page) return notFound();

  return (
    <GenericPage 
      page={page} 
      breadcrumbs={[
        { label: "Resources", href: "/resources" }, 
        { label: page.title, href: "/resources/audit-report" }
      ]} 
    />
  );
}
