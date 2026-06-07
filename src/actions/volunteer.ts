"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit, isHoneypotFilled } from "@/lib/rate-limit";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  gender: z.enum(["male", "female", "other", "prefer-not-to-say"]),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  country: z.string().min(1),
  message: z.string().optional(),
  /** Honeypot field — must be empty for legitimate submissions */
  _hp: z.string().optional(),
});

export async function submitVolunteer(data: z.infer<typeof schema>) {
  try {
    const validData = schema.parse(data);

    // Honeypot check — bots fill hidden fields
    if (isHoneypotFilled(validData._hp)) {
      return { success: true };
    }

    // Rate limiting by IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimit = checkRateLimit(`volunteer:${ip}`, { maxRequests: 5, windowMs: 15 * 60 * 1000 });

    if (!rateLimit.allowed) {
      return {
        success: false,
        error: "Too many submissions. Please try again later.",
      };
    }

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
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data. Please check your inputs." };
    }
    console.error("Volunteer form error:", error instanceof Error ? error.message : error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}
