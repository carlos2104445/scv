"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTestimonial(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string || null;
  const quote = formData.get("quote") as string;
  const photo = formData.get("photo") as string || null;
  const featured = formData.get("featured") === "on";
  const order = Number(formData.get("order")) || 0;

  await prisma.testimonial.create({ data: { name, role, quote, photo, featured, order } });
  revalidatePath("/content/testimonials");
  redirect("/content/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string || null;
  const quote = formData.get("quote") as string;
  const photo = formData.get("photo") as string || null;
  const featured = formData.get("featured") === "on";
  const order = Number(formData.get("order")) || 0;

  await prisma.testimonial.update({ where: { id }, data: { name, role, quote, photo, featured, order } });
  revalidatePath("/content/testimonials");
  redirect("/content/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/content/testimonials");
  redirect("/content/testimonials");
}
