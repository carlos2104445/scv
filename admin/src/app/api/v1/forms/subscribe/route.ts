import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const subSchema = z.object({
  email: z.string().email(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = subSchema.parse(body);
    const existing = await prisma.subscriber.findUnique({ where: { email: data.email } });
    if (existing) return NextResponse.json({ success: true, message: "Already subscribed" });
    const sub = await prisma.subscriber.create({ data: { email: data.email, source: data.source || "website" } });
    return NextResponse.json({ success: true, id: sub.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation failed", details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
