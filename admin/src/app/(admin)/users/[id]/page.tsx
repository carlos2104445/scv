import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { UserForm } from "../UserForm";
import { updateUser, deleteUser } from "@/actions/users";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) notFound();

  const updateAction = updateUser.bind(null, id);

  return <UserForm initialData={user} action={updateAction} deleteAction={deleteUser} />;
}
