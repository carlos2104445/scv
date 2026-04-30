"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const description = formData.get("description") as string;
  const department = formData.get("department") as string || null;
  const location = formData.get("location") as string || null;
  const jobType = (formData.get("jobType") as string) || "FULL_TIME";
  const deadlineRaw = formData.get("deadline") as string;
  const deadline = deadlineRaw ? new Date(deadlineRaw) : null;
  const requirements = formData.get("requirements") as string || null;
  const responsibilities = formData.get("responsibilities") as string || null;
  const benefits = formData.get("benefits") as string || null;
  const applyMode = formData.get("applyMode") as string || "form";
  const applyUrl = formData.get("applyUrl") as string || null;
  const applyEmail = formData.get("applyEmail") as string || null;
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.job.create({
    data: { title, slug, description, department, location, jobType: jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "VOLUNTEER" | "INTERNSHIP", deadline, requirements, responsibilities, benefits, applyMode, applyUrl, applyEmail, status: status as "DRAFT" | "OPEN" | "CLOSED" | "ARCHIVED" },
  });
  revalidatePath("/content/jobs");
  redirect("/content/jobs");
}

export async function updateJob(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const description = formData.get("description") as string;
  const department = formData.get("department") as string || null;
  const location = formData.get("location") as string || null;
  const jobType = (formData.get("jobType") as string) || "FULL_TIME";
  const deadlineRaw = formData.get("deadline") as string;
  const deadline = deadlineRaw ? new Date(deadlineRaw) : null;
  const requirements = formData.get("requirements") as string || null;
  const responsibilities = formData.get("responsibilities") as string || null;
  const benefits = formData.get("benefits") as string || null;
  const applyMode = formData.get("applyMode") as string || "form";
  const applyUrl = formData.get("applyUrl") as string || null;
  const applyEmail = formData.get("applyEmail") as string || null;
  const status = (formData.get("status") as string) || "DRAFT";

  await prisma.job.update({
    where: { id },
    data: { title, slug, description, department, location, jobType: jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "VOLUNTEER" | "INTERNSHIP", deadline, requirements, responsibilities, benefits, applyMode, applyUrl, applyEmail, status: status as "DRAFT" | "OPEN" | "CLOSED" | "ARCHIVED" },
  });
  revalidatePath("/content/jobs");
  redirect("/content/jobs");
}

export async function deleteJob(id: string) {
  await prisma.job.delete({ where: { id } });
  revalidatePath("/content/jobs");
  redirect("/content/jobs");
}
