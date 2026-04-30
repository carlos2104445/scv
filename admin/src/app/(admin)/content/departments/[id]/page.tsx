import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DepartmentForm } from "../DepartmentForm";
import { updateDepartment, deleteDepartment } from "@/actions/departments";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }>; }

export default async function EditDepartmentPage({ params }: Props) {
  const { id } = await params;
  const dept = await prisma.department.findUnique({ where: { id } });
  if (!dept) notFound();

  return <DepartmentForm initialData={dept} action={updateDepartment.bind(null, id)} deleteAction={deleteDepartment} />;
}
