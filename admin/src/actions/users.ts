"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (role !== "SUPER_ADMIN" && role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
}

export async function createUser(formData: FormData) {
  await requireAdmin();

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  const hashedPassword = await hash(password, 12);

  await prisma.user.create({
    data: { email, name, password: hashedPassword, role: role as any },
  });

  revalidatePath("/users");
  redirect("/users");
}

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();

  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  const data: Record<string, unknown> = { email, name, role };
  if (password) {
    data.password = await hash(password, 12);
  }

  await prisma.user.update({ where: { id }, data });

  revalidatePath("/users");
  redirect("/users");
}

export async function deleteUser(id: string) {
  await requireAdmin();
  await prisma.user.delete({ where: { id } });
  revalidatePath("/users");
  redirect("/users");
}
