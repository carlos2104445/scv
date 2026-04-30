import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = { UNREAD: "badge-new", READ: "badge-draft", REPLIED: "badge-published", ARCHIVED: "badge-archived" };

export default async function ContactsPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div><h1>Contact Messages</h1><p className="text-neutral-500 text-sm mt-1">{messages.length} total messages</p></div>
      <div className="card"><table className="w-full"><thead><tr className="border-b border-border">
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Name</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase">Subject</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-28">Status</th>
        <th className="px-5 py-3 text-left text-xs font-semibold text-neutral-500 uppercase w-36">Received</th>
      </tr></thead><tbody className="divide-y divide-border">
        {messages.map((m) => (
          <tr key={m.id} className="hover:bg-surface-muted transition-colors">
            <td className="px-5 py-3.5"><Link href={`/inbox/contacts/${m.id}`} className="font-medium text-brand-dark hover:text-brand-orange">{m.name}</Link><p className="text-xs text-neutral-400">{m.email}</p></td>
            <td className="px-5 py-3.5 text-sm text-neutral-600">{m.subject}</td>
            <td className="px-5 py-3.5"><span className={statusColors[m.status] || "badge-draft"}>{m.status.toLowerCase()}</span></td>
            <td className="px-5 py-3.5 text-xs text-neutral-400">{formatDateTime(m.createdAt)}</td>
          </tr>
        ))}
        {messages.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-neutral-400 text-sm">No messages yet</td></tr>}
      </tbody></table></div>
    </div>
  );
}
