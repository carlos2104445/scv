import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Partners</h1><p className="text-neutral-500 text-sm mt-1">Manage partner organizations.</p></div>
        <Link href="/content/partners/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Partner</Link>
      </div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Name</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Type</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-20">Since</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-20">Order</th>
        <th className="px-5 py-3 text-right text-xs font-semibold text-neutral-500 uppercase w-24">Actions</th>
      </tr></thead><tbody className="divide-y divide-border">
        {partners.map((p) => (
          <tr key={p.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5"><Link href={`/content/partners/${p.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{p.name}</Link></td>
            <td className="px-5 py-3.5"><span className="badge bg-neutral-100 text-neutral-600">{p.type}</span></td>
            <td className="px-5 py-3.5 text-sm text-neutral-500">{p.since || "—"}</td>
            <td className="px-5 py-3.5 text-sm text-neutral-500">{p.order}</td>
            <td className="px-5 py-3.5 text-right">
              <Link href={`/content/partners/${p.id}`} className="text-sm font-medium text-brand-orange hover:text-brand-dark transition-colors">
                Edit
              </Link>
            </td>
          </tr>
        ))}
        {partners.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No partners yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
