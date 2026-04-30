"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function createNews(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string || "news";
  const status = (formData.get("status") as string) || "DRAFT";
  const featured = formData.get("featured") === "on";
  const slug = (formData.get("slug") as string) || slugify(title);
  const coverImage = formData.get("coverImage") as string || null;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const seoTitle = formData.get("seoTitle") as string || null;
  const seoDesc = formData.get("seoDesc") as string || null;

  await prisma.news.create({
    data: {
      title, slug, body, excerpt, category, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured, coverImage, tags, seoTitle, seoDesc,
    },
  });

  revalidatePath("/content/news");
  redirect("/content/news");
}

export async function updateNews(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const excerpt = formData.get("excerpt") as string;
  const category = formData.get("category") as string || "news";
  const status = (formData.get("status") as string) || "DRAFT";
  const featured = formData.get("featured") === "on";
  const slug = (formData.get("slug") as string) || slugify(title);
  const coverImage = formData.get("coverImage") as string || null;
  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const seoTitle = formData.get("seoTitle") as string || null;
  const seoDesc = formData.get("seoDesc") as string || null;

  await prisma.news.update({
    where: { id },
    data: {
      title, slug, body, excerpt, category, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      featured, coverImage, tags, seoTitle, seoDesc,
    },
  });

  revalidatePath("/content/news");
  redirect("/content/news");
}

export async function deleteNews(id: string) {
  await prisma.news.delete({ where: { id } });
  revalidatePath("/content/news");
  redirect("/content/news");
}
