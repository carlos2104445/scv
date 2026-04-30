import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>TVET Departments</h1><p className="text-neutral-500 text-sm mt-1">Manage college departments.</p></div>
        <Link href="/content/departments/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Department</Link>
      </div>
      <div className="card">
        <table className="w-full"><thead><tr className="border-b border-border">
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Name</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-40">Short Title</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-20">Order</th>
        </tr></thead><tbody className="divide-y divide-border">
          {departments.map((d) => (
            <tr key={d.id} className="hover:bg-surface-muted transition-colors">
              <td className="px-5 py-3.5"><Link href={`/content/departments/${d.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{d.name}</Link><p className="text-xs text-neutral-400">/{d.slug}</p></td>
              <td className="px-5 py-3.5 text-sm text-neutral-600">{d.shortTitle}</td>
              <td className="px-5 py-3.5"><span className={d.status === "PUBLISHED" ? "badge-published" : "badge-draft"}>{d.status.toLowerCase()}</span></td>
              <td className="px-5 py-3.5 text-sm text-neutral-500">{d.order}</td>
            </tr>
          ))}
          {departments.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No departments yet</td></tr>}
        </tbody></table>
      </div>
    </div>
  );
}
