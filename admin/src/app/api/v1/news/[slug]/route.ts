import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const news = await prisma.news.findUnique({ where: { slug, status: "PUBLISHED" } });
  if (!news) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(news);
}
