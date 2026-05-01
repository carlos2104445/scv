"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPerson(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const category = (formData.get("category") as string) || "BOARD";
  const bio = formData.get("bio") as string || null;
  const photo = formData.get("photo") as string || null;
  const order = Number(formData.get("order")) || 0;
  const status = (formData.get("status") as string) || "PUBLISHED";

  await prisma.person.create({
    data: { name, role, category: category as "BOARD" | "SENIOR" | "EXTENDED" | "SWITZERLAND", bio, photo, order, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" },
  });
  revalidatePath("/content/people");
  redirect("/content/people");
}

export async function updatePerson(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const category = (formData.get("category") as string) || "BOARD";
  const bio = formData.get("bio") as string || null;
  const photo = formData.get("photo") as string || null;
  const order = Number(formData.get("order")) || 0;
  const status = (formData.get("status") as string) || "PUBLISHED";

  await prisma.person.update({
    where: { id },
    data: { name, role, category: category as "BOARD" | "SENIOR" | "EXTENDED" | "SWITZERLAND", bio, photo, order, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" },
  });
  revalidatePath("/content/people");
  redirect("/content/people");
}

export async function deletePerson(id: string) {
  await prisma.person.delete({ where: { id } });
  revalidatePath("/content/people");
  redirect("/content/people");
}

export async function reorderPerson(id: string, direction: "up" | "down") {
  const person = await prisma.person.findUnique({ where: { id } });
  if (!person) return;

  // Find siblings in the same category, sorted by order
  const siblings = await prisma.person.findMany({
    where: { category: person.category },
    orderBy: { order: "asc" },
  });

  const idx = siblings.findIndex((s) => s.id === id);
  if (idx === -1) return;

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= siblings.length) return;

  const sibling = siblings[swapIdx];

  // Swap order values
  await prisma.$transaction([
    prisma.person.update({ where: { id: person.id }, data: { order: sibling.order } }),
    prisma.person.update({ where: { id: sibling.id }, data: { order: person.order } }),
  ]);

  revalidatePath("/content/people");
}

