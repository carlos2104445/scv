"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPartner(formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string || null;
  const url = formData.get("url") as string || null;
  const type = formData.get("type") as string || "Funder";
  const sinceRaw = formData.get("since") as string;
  const since = sinceRaw ? Number(sinceRaw) : null;
  const order = Number(formData.get("order")) || 0;

  await prisma.partner.create({ data: { name, logo, url, type, since, order } });
  revalidatePath("/content/partners");
  redirect("/content/partners");
}

export async function updatePartner(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string || null;
  const url = formData.get("url") as string || null;
  const type = formData.get("type") as string || "Funder";
  const sinceRaw = formData.get("since") as string;
  const since = sinceRaw ? Number(sinceRaw) : null;
  const order = Number(formData.get("order")) || 0;

  await prisma.partner.update({ where: { id }, data: { name, logo, url, type, since, order } });
  revalidatePath("/content/partners");
  redirect("/content/partners");
}

export async function deletePartner(id: string) {
  await prisma.partner.delete({ where: { id } });
  revalidatePath("/content/partners");
  redirect("/content/partners");
}
