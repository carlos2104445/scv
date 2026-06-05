import { getStaticPage } from "@/data/pages";
import { GenericPage } from "@/components/blocks/GenericPage";
import { notFound } from "next/navigation";

export default async function DynamicCatchAllPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getStaticPage(slug);
  
  if (!page) {
    return notFound();
  }

  return <GenericPage page={page} />;
}
