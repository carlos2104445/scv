"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function createDepartment(formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || slugify(name);
  const shortTitle = formData.get("shortTitle") as string;
  const description = formData.get("description") as string;
  const body = formData.get("body") as string || null;
  const highlightsRaw = formData.get("highlights") as string;
  const highlights = highlightsRaw ? highlightsRaw.split("\n").map(h => h.trim()).filter(Boolean) : [];
  const order = Number(formData.get("order")) || 0;
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.department.create({ data: { name, slug, shortTitle, description, body, highlights, order, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  revalidatePath("/content/departments");
  redirect("/content/departments");
}

export async function updateDepartment(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const slug = (formData.get("slug") as string) || slugify(name);
  const shortTitle = formData.get("shortTitle") as string;
  const description = formData.get("description") as string;
  const body = formData.get("body") as string || null;
  const highlightsRaw = formData.get("highlights") as string;
  const highlights = highlightsRaw ? highlightsRaw.split("\n").map(h => h.trim()).filter(Boolean) : [];
  const order = Number(formData.get("order")) || 0;
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.department.update({ where: { id }, data: { name, slug, shortTitle, description, body, highlights, order, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  revalidatePath("/content/departments");
  redirect("/content/departments");
}

export async function deleteDepartment(id: string) {
  await prisma.department.delete({ where: { id } });
  revalidatePath("/content/departments");
  redirect("/content/departments");
}
