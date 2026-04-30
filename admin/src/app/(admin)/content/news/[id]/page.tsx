import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
import { NewsForm } from "../NewsForm";
import { updateNews, deleteNews } from "@/actions/news";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });

  if (!news) notFound();

  const updateAction = updateNews.bind(null, id);

  return (
    <NewsForm
      initialData={news}
      action={updateAction}
      deleteAction={deleteNews}
    />
  );
}
