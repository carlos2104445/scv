import { getPage } from "@/lib/api";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default async function VisionMissionPage() {
  const page = await getPage("vision-mission-core-values");
  if (!page) return notFound();

  return (
    <GenericPage 
      page={page} 
      breadcrumbs={[
        { label: "About", href: "/about" }, 
        { label: page.title, href: "/about/vision-mission-core-values" }
      ]} 
    />
  );
}
