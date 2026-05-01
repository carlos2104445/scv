import { PersonForm } from "../PersonForm";
import { updatePerson, deletePerson } from "@/actions/people";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }>; }

export default async function EditPersonPage({ params }: Props) {
  const { id } = await params;
  const person = await prisma.person.findUnique({ where: { id } });
  if (!person) notFound();

  return (
    <PersonForm
      initialData={person}
      action={updatePerson.bind(null, id)}
      deleteAction={deletePerson}
    />
  );
}

