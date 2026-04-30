import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() { return NextResponse.json({ data: await prisma.job.findMany({ where: { status: "OPEN" }, orderBy: { createdAt: "desc" } }) }); }
