import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PublicationForm } from "../PublicationForm";
import { updatePublication, deletePublication } from "@/actions/publications";

export const dynamic = "force-dynamic";
interface Props { params: Promise<{ id: string }>; }

export default async function EditPublicationPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.publication.findUnique({ where: { id } });
  if (!item) notFound();
  return <PublicationForm initialData={item} action={updatePublication.bind(null, id)} deleteAction={deletePublication} />;
}
