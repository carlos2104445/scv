import { PersonForm } from "../PersonForm";
import { updatePerson, deletePerson } from "@/actions/people";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditPersonPage({
  params,
}: {
  params: { id: string };
}) {
  const person = await prisma.person.findUnique({
    where: { id: params.id },
  });

  if (!person) {
    notFound();
  }

  const updateWithId = updatePerson.bind(null, person.id);

  return (
    <PersonForm 
      initialData={person} 
      action={updateWithId} 
      deleteAction={deletePerson} 
    />
  );
}
