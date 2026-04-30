import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const typeLabels: Record<string, string> = { NEWSLETTER: "Newsletter", MAGAZINE: "Magazine", ANNUAL_REPORT: "Annual Report", AUDIT_REPORT: "Audit Report", POLICY: "Policy" };

export default async function PublicationsPage() {
  const publications = await prisma.publication.findMany({ orderBy: { year: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Publications</h1><p className="text-neutral-500 text-sm mt-1">Manage PDFs, reports, and newsletters.</p></div>
        <Link href="/content/publications/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Publication</Link>
      </div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Title</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-32">Type</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-20">Year</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-24">Public</th>
      </tr></thead><tbody className="divide-y divide-border">
        {publications.map((p) => (
          <tr key={p.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5"><Link href={`/content/publications/${p.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{p.title}</Link></td>
            <td className="px-5 py-3.5"><span className="badge bg-neutral-100 text-neutral-600">{typeLabels[p.type]}</span></td>
            <td className="px-5 py-3.5 text-sm text-neutral-500">{p.year}</td>
            <td className="px-5 py-3.5">{p.isPublic ? <span className="badge-published">public</span> : <span className="badge-draft">private</span>}</td>
          </tr>
        ))}
        {publications.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No publications yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
