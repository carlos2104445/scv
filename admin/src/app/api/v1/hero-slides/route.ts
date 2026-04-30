import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() { return NextResponse.json({ data: await prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }) }); }
