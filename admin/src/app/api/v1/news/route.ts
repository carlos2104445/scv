import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("limit")) || 20;
  const featured = searchParams.get("featured");

  const where = {
    status: "PUBLISHED" as const,
    ...(featured === "true" ? { featured: true } : {}),
  };

  const [data, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { publishDate: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, title: true, slug: true, publishDate: true, coverImage: true, excerpt: true, category: true, tags: true, featured: true },
    }),
    prisma.news.count({ where }),
  ]);

  return NextResponse.json({ data, total, page, pageSize });
}
