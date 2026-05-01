"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertAnnouncement(formData: FormData) {
  const id = formData.get("id") as string | null;
  const type = formData.get("type") as string || "text";
  const title = formData.get("title") as string || null;
  const body = formData.get("body") as string || null;
  const ctaLabel = formData.get("ctaLabel") as string || null;
  const ctaUrl = formData.get("ctaUrl") as string || null;
  const desktopImageUrl = formData.get("desktopImageUrl") as string || null;
  const mobileImageUrl = formData.get("mobileImageUrl") as string || null;
  const imageAlt = formData.get("imageAlt") as string || null;
  const linkUrl = formData.get("linkUrl") as string || null;
  const isActive = formData.get("isActive") === "on";
  const cooldownHours = Number(formData.get("cooldownHours")) || 0;

  const data = { type, title, body, ctaLabel, ctaUrl, desktopImageUrl, mobileImageUrl, imageAlt, linkUrl, isActive, cooldownHours };

  if (id) {
    await prisma.announcement.update({ where: { id }, data });
  } else {
    await prisma.announcement.create({ data });
  }

  revalidatePath("/site/announcement");
  redirect("/site/announcement");
}

export async function deleteAnnouncement(id: string) {
  await prisma.announcement.delete({ where: { id } });
  revalidatePath("/site/announcement");
  redirect("/site/announcement");
}
