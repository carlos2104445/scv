import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await prisma.project.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { order: "asc" },
    include: { kpis: { orderBy: { order: "asc" } } },
  });
  return NextResponse.json({ data });
}
