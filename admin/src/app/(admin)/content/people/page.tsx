import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const categoryLabels: Record<string, string> = { BOARD: "Executive Board", SENIOR: "Senior Management", EXTENDED: "Extended Management", SWITZERLAND: "Board Switzerland" };

export default async function PeoplePage() {
  const people = await prisma.person.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  const grouped = people.reduce((acc, p) => { (acc[p.category] = acc[p.category] || []).push(p); return acc; }, {} as Record<string, typeof people>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>People</h1><p className="text-neutral-500 text-sm mt-1">Manage team members and leadership.</p></div>
        <Link href="/content/people/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Person</Link>
      </div>
      {Object.entries(grouped).map(([cat, members]) => (
        <div key={cat} className="card">
          <div className="px-5 py-3 border-b border-border"><h3 className="font-semibold text-sm">{categoryLabels[cat] || cat} ({members.length})</h3></div>
          <table className="w-full">
            <tbody className="divide-y divide-border">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-surface-muted transition-colors">
                  <td className="px-5 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center text-white text-xs font-bold shrink-0">{m.name[0]}</div>
                    <div><Link href={`/content/people/${m.id}`} className="font-medium text-brand-dark hover:text-brand-orange text-sm">{m.name}</Link><p className="text-xs text-neutral-500">{m.role}</p></div>
                  </td>
                  <td className="px-5 py-3 text-sm text-neutral-500 w-20">{m.order}</td>
                  <td className="px-5 py-3 w-28"><span className={m.status === "PUBLISHED" ? "badge-published" : "badge-draft"}>{m.status.toLowerCase()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {people.length === 0 && <div className="card p-12 text-center text-neutral-400 text-sm">No team members yet</div>}
    </div>
  );
}
