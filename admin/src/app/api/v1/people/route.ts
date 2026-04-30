import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await prisma.person.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return NextResponse.json({ data });
}
