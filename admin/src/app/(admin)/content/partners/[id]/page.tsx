import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PartnerForm } from "../PartnerForm";
import { updatePartner, deletePartner } from "@/actions/partners";

export const dynamic = "force-dynamic";
interface Props { params: Promise<{ id: string }>; }

export default async function EditPartnerPage({ params }: Props) {
  const { id } = await params;
  const item = await prisma.partner.findUnique({ where: { id } });
  if (!item) notFound();
  return <PartnerForm initialData={item} action={updatePartner.bind(null, id)} deleteAction={deletePartner} />;
}
