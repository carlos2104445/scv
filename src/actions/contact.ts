"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit, isHoneypotFilled } from "@/lib/rate-limit";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
  /** Honeypot field — must be empty for legitimate submissions */
  _hp: z.string().optional(),
});

export async function submitContact(data: z.infer<typeof schema>) {
  try {
    const validData = schema.parse(data);

    // Honeypot check — bots fill hidden fields
    if (isHoneypotFilled(validData._hp)) {
      // Return success to not alert the bot, but don't save
      return { success: true };
    }

    // Rate limiting by IP
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rateLimit = checkRateLimit(`contact:${ip}`, { maxRequests: 5, windowMs: 15 * 60 * 1000 });

    if (!rateLimit.allowed) {
      return {
        success: false,
        error: "Too many submissions. Please try again later.",
      };
    }

    await prisma.contactMessage.create({
      data: {
        name: validData.name,
        email: validData.email,
        subject: validData.subject,
        message: validData.message,
      },
    });
    return { success: true };
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid form data. Please check your inputs." };
    }
    console.error("Contact form error:", error instanceof Error ? error.message : error);
    return { success: false, error: "Failed to submit form. Please try again later." };
  }
}
