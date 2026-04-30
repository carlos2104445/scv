"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface AlbumFormProps {
  initialData?: { id: string; title: string; slug: string; coverImage: string | null; category: string | null; date: Date; status: string; };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function AlbumForm({ initialData, action, deleteAction }: AlbumFormProps) {
  const isEdit = !!initialData;
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/gallery" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Album" : "New Album"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this album and all its photos?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" name="status" value="DRAFT" className="btn-secondary text-sm py-2"><Save className="w-4 h-4" /> Save Draft</button>
          <button type="submit" name="status" value="PUBLISHED" className="btn-primary text-sm py-2"><Eye className="w-4 h-4" /> Publish</button>
        </div>
      </div>

      <div className="card p-5 space-y-5">
        <div><label className="label">Album Title</label><input name="title" value={title} onChange={(e) => { setTitle(e.target.value); if (autoSlug) setSlug(slugify(e.target.value)); }} className="input-field font-semibold" required /></div>
        <div><label className="label">Slug</label><input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input-field font-mono text-sm" /></div>
        <div><label className="label">Category</label><input name="category" defaultValue={initialData?.category || ""} className="input-field" placeholder="e.g. Campus, Events" /></div>
        <div><label className="label">Cover Image URL</label><input name="coverImage" defaultValue={initialData?.coverImage || ""} className="input-field" placeholder="https://..." /></div>
        <div><label className="label">Date</label><input type="date" name="date" defaultValue={initialData?.date ? new Date(initialData.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)} className="input-field w-48" /></div>
      </div>
    </form>
  );
}
