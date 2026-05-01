import { getPage } from "@/lib/api";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default async function DynamicCatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  
  if (!page) {
    return notFound();
  }

  return <GenericPage page={page} />;
}
