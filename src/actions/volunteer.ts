"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1),
  message: z.string().optional(),
});

export async function submitVolunteer(data: z.infer<typeof schema>) {
  try {
    const validData = schema.parse(data);
    await prisma.volunteerApplication.create({
      data: {
        firstName: validData.firstName,
        lastName: validData.lastName,
        gender: validData.gender,
        email: validData.email,
        phone: validData.phone,
        city: validData.city,
        country: validData.country,
        message: validData.message,
      },
    });
    return { success: true };
  } catch (error: any) {
    console.error("Volunteer form error:", error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}
