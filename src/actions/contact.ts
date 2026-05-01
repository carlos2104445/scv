"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function submitContact(data: z.infer<typeof schema>) {
  try {
    const validData = schema.parse(data);
    await prisma.contactMessage.create({
      data: {
        name: validData.name,
        email: validData.email,
        subject: validData.subject,
        message: validData.message,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}
