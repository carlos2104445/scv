import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("limit")) || 20;

  const where = {
    status: "PUBLISHED" as const,
  };

  const [data, total] = await Promise.all([
    prisma.page.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: { id: true, title: true, slug: true, heroImage: true, seoTitle: true, seoDesc: true, seoImage: true, updatedAt: true },
    }),
    prisma.page.count({ where }),
  ]);

  return NextResponse.json({ data, total, page, pageSize });
}
