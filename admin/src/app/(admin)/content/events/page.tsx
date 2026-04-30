import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { startsAt: "desc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Events</h1><p className="text-neutral-500 text-sm mt-1">Manage events and activities.</p></div>
        <Link href="/content/events/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Event</Link>
      </div>
      <div className="card">
        <table className="w-full"><thead><tr className="border-b border-border">
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Title</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-32">Date</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-40">Location</th>
          <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
        </tr></thead><tbody className="divide-y divide-border">
          {events.map((e) => (
            <tr key={e.id} className="hover:bg-surface-muted transition-colors">
              <td className="px-5 py-3.5"><Link href={`/content/events/${e.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{e.title}</Link></td>
              <td className="px-5 py-3.5 text-sm text-neutral-500">{formatDate(e.startsAt)}</td>
              <td className="px-5 py-3.5 text-sm text-neutral-500">{e.location || "—"}</td>
              <td className="px-5 py-3.5"><span className={e.status === "PUBLISHED" ? "badge-published" : "badge-draft"}>{e.status.toLowerCase()}</span></td>
            </tr>
          ))}
          {events.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No events yet</td></tr>}
        </tbody></table>
      </div>
    </div>
  );
}
