import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Plus, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Projects</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage programs and projects.</p>
        </div>
        <Link href="/content/projects/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Project</Link>
      </div>
      <div className="card">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Title</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Category</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-20">Order</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-surface-muted transition-colors">
                <td className="px-5 py-3.5"><Link href={`/content/projects/${p.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{p.title}</Link><p className="text-xs text-neutral-400">/{p.slug}</p></td>
                <td className="px-5 py-3.5"><span className="badge bg-neutral-100 text-neutral-600">{p.category}</span></td>
                <td className="px-5 py-3.5"><span className={p.status === "PUBLISHED" ? "badge-published" : "badge-draft"}>{p.status.toLowerCase()}</span></td>
                <td className="px-5 py-3.5 text-sm text-neutral-500">{p.order}</td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No projects yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
