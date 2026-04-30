"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPublication(formData: FormData) {
  const title = formData.get("title") as string;
  const type = (formData.get("type") as string) || "NEWSLETTER";
  const year = Number(formData.get("year")) || new Date().getFullYear();
  const coverImage = formData.get("coverImage") as string || null;
  const pdfUrl = formData.get("pdfUrl") as string || null;
  const summary = formData.get("summary") as string || null;
  const isPublic = formData.get("isPublic") !== "off";

  await prisma.publication.create({ data: { title, type: type as "NEWSLETTER" | "MAGAZINE" | "ANNUAL_REPORT" | "AUDIT_REPORT" | "POLICY", year, coverImage, pdfUrl, summary, isPublic } });
  revalidatePath("/content/publications");
  redirect("/content/publications");
}

export async function updatePublication(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const type = (formData.get("type") as string) || "NEWSLETTER";
  const year = Number(formData.get("year")) || new Date().getFullYear();
  const coverImage = formData.get("coverImage") as string || null;
  const pdfUrl = formData.get("pdfUrl") as string || null;
  const summary = formData.get("summary") as string || null;
  const isPublic = formData.get("isPublic") !== "off";

  await prisma.publication.update({ where: { id }, data: { title, type: type as "NEWSLETTER" | "MAGAZINE" | "ANNUAL_REPORT" | "AUDIT_REPORT" | "POLICY", year, coverImage, pdfUrl, summary, isPublic } });
  revalidatePath("/content/publications");
  redirect("/content/publications");
}

export async function deletePublication(id: string) {
  await prisma.publication.delete({ where: { id } });
  revalidatePath("/content/publications");
  redirect("/content/publications");
}
