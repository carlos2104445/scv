import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function JobApplicationsPage() {
  const apps = await prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, include: { job: { select: { title: true } } } });
  return (
    <div className="space-y-6">
      <div><h1>Job Applications</h1><p className="text-neutral-500 text-sm mt-1">{apps.length} total applications</p></div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Applicant</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Position</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-24">CV</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-36">Applied</th>
      </tr></thead><tbody className="divide-y divide-border">
        {apps.map((a) => (
          <tr key={a.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5"><Link href={`/inbox/job-applications/${a.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{a.name}</Link><p className="text-xs text-neutral-400">{a.email}</p></td>
            <td className="px-5 py-3.5 text-sm text-neutral-600">{a.job.title}</td>
            <td className="px-5 py-3.5">{a.cvUrl ? <a href={a.cvUrl} className="text-brand-orange text-sm hover:underline" target="_blank">Download</a> : <span className="text-neutral-400 text-sm">—</span>}</td>
            <td className="px-5 py-3.5"><span className="badge-new">{a.status.toLowerCase()}</span></td>
            <td className="px-5 py-3.5 text-xs text-neutral-400">{formatDateTime(a.createdAt)}</td>
          </tr>
        ))}
        {apps.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-neutral-400 text-sm">No applications yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
