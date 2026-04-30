"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface EventFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    startsAt: Date;
    endsAt: Date | null;
    allDay: boolean;
    location: string | null;
    address: string | null;
    coverImage: string | null;
    body: string;
    registerUrl: string | null;
    tags: string[];
    status: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

function toDateTimeLocal(d: Date | null) {
  if (!d) return "";
  const dt = new Date(d);
  return dt.toISOString().slice(0, 16);
}

export function EventForm({ initialData, action, deleteAction }: EventFormProps) {
  const isEdit = !!initialData;
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [deleting, setDeleting] = useState(false);

  const handleTitleChange = (val: string) => { setTitle(val); if (autoSlug) setSlug(slugify(val)); };

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/events" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Event" : "New Event"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this event?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" name="status" value="DRAFT" className="btn-secondary text-sm py-2"><Save className="w-4 h-4" /> Save Draft</button>
          <button type="submit" name="status" value="PUBLISHED" className="btn-primary text-sm py-2"><Eye className="w-4 h-4" /> Publish</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5 space-y-5">
            <div><label className="label">Title</label><input name="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} className="input-field text-lg font-semibold" placeholder="Event title..." required /></div>
            <div><label className="label">Slug</label><input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input-field font-mono text-sm" /></div>
            <div><label className="label">Body / Description</label><textarea name="body" defaultValue={initialData?.body || ""} rows={10} className="input-field resize-y font-mono text-sm" placeholder="Event details... (HTML/Markdown)" required /></div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div><label className="label">Starts At</label><input type="datetime-local" name="startsAt" defaultValue={toDateTimeLocal(initialData?.startsAt ?? null)} className="input-field" required /></div>
            <div><label className="label">Ends At</label><input type="datetime-local" name="endsAt" defaultValue={toDateTimeLocal(initialData?.endsAt ?? null)} className="input-field" /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="allDay" id="allDay" defaultChecked={initialData?.allDay} className="w-4 h-4 rounded border-border" />
              <label htmlFor="allDay" className="text-sm font-medium">All Day Event</label>
            </div>
            <div><label className="label">Location</label><input name="location" defaultValue={initialData?.location || ""} className="input-field" placeholder="Venue name..." /></div>
            <div><label className="label">Cover Image URL</label><input name="coverImage" defaultValue={initialData?.coverImage || ""} className="input-field" placeholder="https://..." /></div>
            <div><label className="label">Registration URL</label><input name="registerUrl" defaultValue={initialData?.registerUrl || ""} className="input-field" placeholder="https://..." /></div>
            <div><label className="label">Tags</label><input name="tags" defaultValue={initialData?.tags?.join(", ") || ""} className="input-field" placeholder="tag1, tag2" /><p className="text-xs text-neutral-400 mt-1">Comma-separated</p></div>
          </div>
        </div>
      </div>
    </form>
  );
}
