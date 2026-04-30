import { PersonForm } from "../PersonForm";
import { createPerson } from "@/actions/people";

export default function NewPersonPage() {
  return <PersonForm action={createPerson} />;
}
