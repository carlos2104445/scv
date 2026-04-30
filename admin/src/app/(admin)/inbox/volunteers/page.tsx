import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = { NEW: "badge-new", REVIEWING: "badge-draft", INTERVIEW: "badge bg-purple-100 text-purple-700", ACCEPTED: "badge-published", REJECTED: "badge-danger", WITHDRAWN: "badge-archived" };

export default async function VolunteersPage() {
  const apps = await prisma.volunteerApplication.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div><h1>Volunteer Applications</h1><p className="text-neutral-500 text-sm mt-1">{apps.length} total applications</p></div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Name</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-48">Email</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Country</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-36">Applied</th>
      </tr></thead><tbody className="divide-y divide-border">
        {apps.map((a) => (
          <tr key={a.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5"><Link href={`/inbox/volunteers/${a.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{a.firstName} {a.lastName}</Link></td>
            <td className="px-5 py-3.5 text-sm text-neutral-500">{a.email}</td>
            <td className="px-5 py-3.5 text-sm text-neutral-500">{a.country || "—"}</td>
            <td className="px-5 py-3.5"><span className={statusColors[a.status] || "badge-draft"}>{a.status.toLowerCase()}</span></td>
            <td className="px-5 py-3.5 text-xs text-neutral-400">{formatDateTime(a.createdAt)}</td>
          </tr>
        ))}
        {apps.length === 0 && <tr><td colSpan={5} className="px-5 py-12 text-center text-neutral-400 text-sm">No applications yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
