import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PagesPage() {
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Pages</h1><p className="text-neutral-500 text-sm mt-1">Manage static content pages.</p></div>
        <Link href="/content/pages/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Page</Link>
      </div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Title</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
      </tr></thead><tbody className="divide-y divide-border">
        {pages.map((p) => (
          <tr key={p.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5"><Link href={`/content/pages/${p.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{p.title}</Link><p className="text-xs text-neutral-400">/{p.slug}</p></td>
            <td className="px-5 py-3.5"><span className={p.status === "PUBLISHED" ? "badge-published" : "badge-draft"}>{p.status.toLowerCase()}</span></td>
          </tr>
        ))}
        {pages.length === 0 && <tr><td colSpan={2} className="px-5 py-12 text-center text-neutral-400 text-sm">No pages yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
