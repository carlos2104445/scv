"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function createEvent(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const body = formData.get("body") as string;
  const startsAt = new Date(formData.get("startsAt") as string);
  const endsAtRaw = formData.get("endsAt") as string;
  const endsAt = endsAtRaw ? new Date(endsAtRaw) : null;
  const allDay = formData.get("allDay") === "on";
  const location = formData.get("location") as string || null;
  const coverImage = formData.get("coverImage") as string || null;
  const registerUrl = formData.get("registerUrl") as string || null;
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.event.create({ data: { title, slug, body, startsAt, endsAt, allDay, location, coverImage, registerUrl, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  revalidatePath("/content/events");
  redirect("/content/events");
}

export async function updateEvent(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const body = formData.get("body") as string;
  const startsAt = new Date(formData.get("startsAt") as string);
  const endsAtRaw = formData.get("endsAt") as string;
  const endsAt = endsAtRaw ? new Date(endsAtRaw) : null;
  const allDay = formData.get("allDay") === "on";
  const location = formData.get("location") as string || null;
  const coverImage = formData.get("coverImage") as string || null;
  const registerUrl = formData.get("registerUrl") as string || null;
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.event.update({ where: { id }, data: { title, slug, body, startsAt, endsAt, allDay, location, coverImage, registerUrl, status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED" } });
  revalidatePath("/content/events");
  redirect("/content/events");
}

export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
  revalidatePath("/content/events");
  redirect("/content/events");
}
