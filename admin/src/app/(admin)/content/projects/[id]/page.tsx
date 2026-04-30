import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectForm } from "../ProjectForm";
import { updateProject, deleteProject } from "@/actions/projects";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }>; }

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <ProjectForm
      initialData={project}
      action={updateProject.bind(null, id)}
      deleteAction={deleteProject}
    />
  );
}
