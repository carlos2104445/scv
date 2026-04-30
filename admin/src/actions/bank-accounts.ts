"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBankAccount(formData: FormData) {
  const bankName = formData.get("bankName") as string;
  const branch = formData.get("branch") as string || null;
  const accountName = formData.get("accountName") as string;
  const accountNumber = formData.get("accountNumber") as string;
  const currency = formData.get("currency") as string || "ETB";
  const swiftCode = formData.get("swiftCode") as string || null;
  const instructions = formData.get("instructions") as string || null;
  const logo = formData.get("logo") as string || null;
  const order = Number(formData.get("order")) || 0;
  const isPublic = formData.get("isPublic") !== "off";

  await prisma.bankAccount.create({ data: { bankName, branch, accountName, accountNumber, currency, swiftCode, instructions, logo, order, isPublic } });
  revalidatePath("/donations/bank-accounts");
  redirect("/donations/bank-accounts");
}

export async function updateBankAccount(id: string, formData: FormData) {
  const bankName = formData.get("bankName") as string;
  const branch = formData.get("branch") as string || null;
  const accountName = formData.get("accountName") as string;
  const accountNumber = formData.get("accountNumber") as string;
  const currency = formData.get("currency") as string || "ETB";
  const swiftCode = formData.get("swiftCode") as string || null;
  const instructions = formData.get("instructions") as string || null;
  const logo = formData.get("logo") as string || null;
  const order = Number(formData.get("order")) || 0;
  const isPublic = formData.get("isPublic") !== "off";

  await prisma.bankAccount.update({ where: { id }, data: { bankName, branch, accountName, accountNumber, currency, swiftCode, instructions, logo, order, isPublic } });
  revalidatePath("/donations/bank-accounts");
  redirect("/donations/bank-accounts");
}

export async function deleteBankAccount(id: string) {
  await prisma.bankAccount.delete({ where: { id } });
  revalidatePath("/donations/bank-accounts");
  redirect("/donations/bank-accounts");
}
