"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function createAlbum(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const category = formData.get("category") as string || null;
  const coverImage = formData.get("coverImage") as string || null;
  const dateRaw = formData.get("date") as string;
  const date = dateRaw ? new Date(dateRaw) : new Date();
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.galleryAlbum.create({ data: { title, slug, category, coverImage, date, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  revalidatePath("/content/gallery");
  redirect("/content/gallery");
}

export async function updateAlbum(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const category = formData.get("category") as string || null;
  const coverImage = formData.get("coverImage") as string || null;
  const dateRaw = formData.get("date") as string;
  const date = dateRaw ? new Date(dateRaw) : new Date();
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.galleryAlbum.update({ where: { id }, data: { title, slug, category, coverImage, date, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  revalidatePath("/content/gallery");
  redirect("/content/gallery");
}

export async function deleteAlbum(id: string) {
  await prisma.galleryAlbum.delete({ where: { id } });
  revalidatePath("/content/gallery");
  redirect("/content/gallery");
}
