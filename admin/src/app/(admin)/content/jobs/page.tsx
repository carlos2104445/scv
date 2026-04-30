import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function JobsPage() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" }, include: { _count: { select: { applications: true } } } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Jobs</h1><p className="text-neutral-500 text-sm mt-1">Manage job openings.</p></div>
        <Link href="/content/jobs/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Post Job</Link>
      </div>
      <div className="card">
        <table className="w-full"><thead><tr className="border-b border-border">
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Title</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Type</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-32">Deadline</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Apps</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
        </tr></thead><tbody className="divide-y divide-border">
          {jobs.map((j) => (
            <tr key={j.id} className="hover:bg-surface-muted transition-colors">
              <td className="px-5 py-3.5"><Link href={`/content/jobs/${j.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{j.title}</Link><p className="text-xs text-neutral-400">{j.department || "General"}</p></td>
              <td className="px-5 py-3.5"><span className="badge bg-neutral-100 text-neutral-600">{j.jobType.replace("_", " ")}</span></td>
              <td className="px-5 py-3.5 text-sm text-neutral-500">{j.deadline ? formatDate(j.deadline) : "—"}</td>
              <td className="px-5 py-3.5"><span className="badge bg-blue-50 text-blue-600">{j._count.applications}</span></td>
              <td className="px-5 py-3.5"><span className={j.status === "OPEN" ? "badge-published" : j.status === "DRAFT" ? "badge-draft" : "badge-archived"}>{j.status.toLowerCase()}</span></td>
            </tr>
          ))}
          {jobs.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-neutral-400 text-sm">No job openings yet</td></tr>}
        </tbody></table>
      </div>
    </div>
  );
}
