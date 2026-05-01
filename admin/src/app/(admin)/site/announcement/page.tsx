import { prisma } from "@/lib/prisma";
import { AnnouncementForm } from "./AnnouncementForm";
import { upsertAnnouncement, deleteAnnouncement } from "@/actions/announcement";
import { Eye, EyeOff, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AnnouncementPage() {
  // Get the most recent announcement (we only support one active at a time)
  const announcements = await prisma.announcement.findMany({ orderBy: { updatedAt: "desc" } });
  const current = announcements[0] || null;

  if (!current) {
    // No announcement exists — show create form
    return (
      <div className="space-y-6">
        <div>
          <h1>Popup Announcement</h1>
          <p className="text-neutral-500 text-sm mt-1">Configure the popup shown to visitors when they open the site.</p>
        </div>
        <div className="card p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange-50 flex items-center justify-center mx-auto">
            <Plus className="w-8 h-8 text-brand-orange" />
          </div>
          <p className="text-neutral-500 text-sm">No announcement configured yet.</p>
        </div>
        <AnnouncementForm action={upsertAnnouncement} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Popup Announcement</h1>
          <p className="text-neutral-500 text-sm mt-1">Configure the popup shown to visitors when they open the site.</p>
        </div>
        <div className="flex items-center gap-2">
          {current.isActive ? (
            <span className="badge-published flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> Live</span>
          ) : (
            <span className="badge-draft flex items-center gap-1"><EyeOff className="w-3.5 h-3.5" /> Inactive</span>
          )}
        </div>
      </div>

      {/* Preview card */}
      <div className="card p-5 space-y-2">
        <h3 className="text-xs font-semibold text-neutral-500 uppercase">Current Config</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div><span className="text-neutral-400">Type:</span> <strong className="capitalize">{current.type}</strong></div>
          <div><span className="text-neutral-400">Status:</span> <strong>{current.isActive ? "Active" : "Inactive"}</strong></div>
          <div><span className="text-neutral-400">Cooldown:</span> <strong>{current.cooldownHours === 0 ? "Once per session" : `${current.cooldownHours}h`}</strong></div>
          <div><span className="text-neutral-400">Updated:</span> <strong>{current.updatedAt.toLocaleDateString()}</strong></div>
        </div>
        {current.type === "text" && current.title && (
          <p className="text-sm text-neutral-600 mt-2">Title: <strong>{current.title}</strong></p>
        )}
      </div>

      <AnnouncementForm initialData={current} action={upsertAnnouncement} deleteAction={deleteAnnouncement} />
    </div>
  );
}
