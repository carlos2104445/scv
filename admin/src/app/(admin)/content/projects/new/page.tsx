import { ProjectForm } from "../ProjectForm";
import { createProject } from "@/actions/projects";

export default function NewProjectPage() {
  return <ProjectForm action={createProject} />;
}
