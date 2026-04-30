import { PublicationForm } from "../PublicationForm";
import { createPublication } from "@/actions/publications";

export default function NewPublicationPage() {
  return <PublicationForm action={createPublication} />;
}
