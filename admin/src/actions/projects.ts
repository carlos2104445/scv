"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const body = formData.get("body") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = (formData.get("category") as string) || "CYC";
  const status = (formData.get("status") as string) || "DRAFT";
  const coverImage = formData.get("coverImage") as string || null;

  await prisma.project.create({
    data: { title, slug, body, excerpt, category: category as "CYC" | "COMMUNITY" | "TVET" | "PROJECT", status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", coverImage },
  });
  revalidatePath("/content/projects");
  redirect("/content/projects");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const body = formData.get("body") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = (formData.get("category") as string) || "CYC";
  const status = (formData.get("status") as string) || "DRAFT";
  const coverImage = formData.get("coverImage") as string || null;

  await prisma.project.update({
    where: { id },
    data: { title, slug, body, excerpt, category: category as "CYC" | "COMMUNITY" | "TVET" | "PROJECT", status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED", coverImage },
  });
  revalidatePath("/content/projects");
  redirect("/content/projects");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/content/projects");
  redirect("/content/projects");
}
