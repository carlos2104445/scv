import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { NewsTable } from "./NewsTable";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ page?: string; q?: string }>;
}

export default async function NewsListPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const pageSize = 20;
  const query = params.q || "";

  const where = query
    ? { title: { contains: query, mode: "insensitive" as const } }
    : {};

  const [news, total] = await Promise.all([
    prisma.news.findMany({
      where,
      orderBy: { publishDate: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.news.count({ where }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1>News</h1>
        <p className="text-neutral-500 text-sm mt-1">Manage news posts and articles.</p>
      </div>
      <NewsTable data={news} total={total} page={page} pageSize={pageSize} />
    </div>
  );
}
