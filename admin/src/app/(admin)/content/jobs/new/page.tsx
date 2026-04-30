import { JobForm } from "../JobForm";
import { createJob } from "@/actions/jobs";

export default function NewJobPage() {
  return <JobForm action={createJob} />;
}
