import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const volunteerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = volunteerSchema.parse(body);
    const app = await prisma.volunteerApplication.create({ data });
    return NextResponse.json({ success: true, id: app.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
