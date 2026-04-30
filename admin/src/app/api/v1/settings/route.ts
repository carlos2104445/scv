import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await prisma.siteSetting.findMany();
  const obj = Object.fromEntries(settings.map(s => {
    try { return [s.key, JSON.parse(s.value)]; } catch { return [s.key, s.value]; }
  }));
  return NextResponse.json(obj);
}
