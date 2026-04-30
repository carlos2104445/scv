import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { JobForm } from "../JobForm";
import { updateJob, deleteJob } from "@/actions/jobs";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }>; }

export default async function EditJobPage({ params }: Props) {
  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) notFound();

  return <JobForm initialData={job} action={updateJob.bind(null, id)} deleteAction={deleteJob} />;
}
