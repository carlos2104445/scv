import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SubscribersPage() {
  const subs = await prisma.subscriber.findMany({ orderBy: { subscribedAt: "desc" } });
  return (
    <div className="space-y-6">
      <div><h1>Newsletter Subscribers</h1><p className="text-neutral-500 text-sm mt-1">{subs.length} total subscribers</p></div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Email</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-32">Source</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-36">Subscribed</th>
      </tr></thead><tbody className="divide-y divide-border">
        {subs.map((s) => (
          <tr key={s.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5 text-sm font-medium text-brand-dark">{s.email}</td>
            <td className="px-5 py-3.5 text-sm text-neutral-500">{s.source || "—"}</td>
            <td className="px-5 py-3.5"><span className={s.status === "CONFIRMED" ? "badge-published" : s.status === "PENDING" ? "badge-draft" : "badge-danger"}>{s.status.toLowerCase()}</span></td>
            <td className="px-5 py-3.5 text-xs text-neutral-400">{formatDateTime(s.subscribedAt)}</td>
          </tr>
        ))}
        {subs.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No subscribers yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
