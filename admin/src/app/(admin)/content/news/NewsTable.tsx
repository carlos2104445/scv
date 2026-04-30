"use client";

import { DataTable, Column } from "@/components/ui/DataTable";
import { formatDate } from "@/lib/utils";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  publishDate: Date;
  status: string;
  featured: boolean;
  category: string;
}

const columns: Column<NewsItem>[] = [
  {
    key: "title",
    label: "Title",
    render: (item) => (
      <div>
        <p className="font-medium text-brand-dark">{item.title}</p>
        <p className="text-xs text-neutral-400 mt-0.5">/{item.slug}</p>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (item) => (
      <span className={item.status === "PUBLISHED" ? "badge-published" : item.status === "DRAFT" ? "badge-draft" : "badge-archived"}>
        {item.status.toLowerCase()}
      </span>
    ),
    className: "w-28",
  },
  {
    key: "category",
    label: "Category",
    render: (item) => <span className="text-neutral-600">{item.category}</span>,
    className: "w-28",
  },
  {
    key: "featured",
    label: "Featured",
    render: (item) => item.featured ? <span className="badge bg-brand-orange-50 text-brand-orange">★ Yes</span> : <span className="text-neutral-400">—</span>,
    className: "w-24",
  },
  {
    key: "publishDate",
    label: "Date",
    render: (item) => <span className="text-neutral-500">{formatDate(item.publishDate)}</span>,
    className: "w-32",
  },
];

export function NewsTable({ data, total, page, pageSize }: { data: NewsItem[]; total: number; page: number; pageSize: number }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      total={total}
      page={page}
      pageSize={pageSize}
      baseHref="/content/news"
      createLabel="New Post"
      createHref="/content/news/new"
      searchPlaceholder="Search news..."
    />
  );
}
