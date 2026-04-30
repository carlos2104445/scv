"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createHeroSlide(formData: FormData) {
  const title = formData.get("title") as string || null;
  const subtitle = formData.get("subtitle") as string || null;
  const image = formData.get("image") as string;
  const ctaLabel = formData.get("ctaLabel") as string || null;
  const ctaUrl = formData.get("ctaUrl") as string || null;
  const order = Number(formData.get("order")) || 0;
  const isActive = formData.get("isActive") !== "off";

  await prisma.heroSlide.create({ data: { title, subtitle, image, ctaLabel, ctaUrl, order, isActive } });
  revalidatePath("/site/hero-slides");
  redirect("/site/hero-slides");
}

export async function updateHeroSlide(id: string, formData: FormData) {
  const title = formData.get("title") as string || null;
  const subtitle = formData.get("subtitle") as string || null;
  const image = formData.get("image") as string;
  const ctaLabel = formData.get("ctaLabel") as string || null;
  const ctaUrl = formData.get("ctaUrl") as string || null;
  const order = Number(formData.get("order")) || 0;
  const isActive = formData.get("isActive") !== "off";

  await prisma.heroSlide.update({ where: { id }, data: { title, subtitle, image, ctaLabel, ctaUrl, order, isActive } });
  revalidatePath("/site/hero-slides");
  redirect("/site/hero-slides");
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/site/hero-slides");
  redirect("/site/hero-slides");
}
