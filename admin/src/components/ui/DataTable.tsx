"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search, Trash2, MoreHorizontal } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  baseHref: string;
  createLabel?: string;
  createHref?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  total,
  page,
  pageSize,
  searchPlaceholder = "Search...",
  baseHref,
  createLabel = "Create New",
  createHref,
}: DataTableProps<T>) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const totalPages = Math.ceil(total / pageSize);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (search) params.set("q", search);
    else params.delete("q");
    params.set("page", "1");
    router.push(`${baseHref}?${params.toString()}`);
  };

  return (
    <div className="card">
      {/* Toolbar */}
      <div className="px-5 py-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="input-field pl-9 py-2 text-sm"
          />
        </form>
        {createHref && (
          <Link href={createHref} className="btn-primary text-sm py-2 shrink-0">
            + {createLabel}
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map((col) => (
                <th key={col.key} className={cn("px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider", col.className)}>
                  {col.label}
                </th>
              ))}
              <th className="px-5 py-3 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider w-12">
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-5 py-12 text-center text-neutral-400 text-sm">
                  No records found
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-surface-muted transition-colors cursor-pointer" onClick={() => router.push(`${baseHref}/${item.id}`)}>
                  {columns.map((col) => (
                    <td key={col.key} className={cn("px-5 py-3.5 text-sm", col.className)}>
                      {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                    </td>
                  ))}
                  <td className="px-5 py-3.5 text-right">
                    <button className="p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-all" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-neutral-500">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
          </p>
          <div className="flex items-center gap-1">
            <Link
              href={`${baseHref}?page=${page - 1}`}
              className={cn("p-1.5 rounded-lg transition-all", page <= 1 ? "text-neutral-300 pointer-events-none" : "text-neutral-600 hover:bg-neutral-100")}
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`${baseHref}?page=${p}`}
                className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all", p === page ? "bg-brand-orange text-white" : "text-neutral-600 hover:bg-neutral-100")}
              >
                {p}
              </Link>
            ))}
            <Link
              href={`${baseHref}?page=${page + 1}`}
              className={cn("p-1.5 rounded-lg transition-all", page >= totalPages ? "text-neutral-300 pointer-events-none" : "text-neutral-600 hover:bg-neutral-100")}
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
