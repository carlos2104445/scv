"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface DeptFormProps {
  initialData?: {
    id: string;
    name: string;
    slug: string;
    shortTitle: string;
    description: string;
    body: string | null;
    highlights: string[];
    order: number;
    status: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function DepartmentForm({ initialData, action, deleteAction }: DeptFormProps) {
  const isEdit = !!initialData;
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [deleting, setDeleting] = useState(false);

  const handleNameChange = (val: string) => { setName(val); if (autoSlug) setSlug(slugify(val)); };

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/departments" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Department" : "New Department"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this department?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" name="status" value="DRAFT" className="btn-secondary text-sm py-2"><Save className="w-4 h-4" /> Save Draft</button>
          <button type="submit" name="status" value="PUBLISHED" className="btn-primary text-sm py-2"><Eye className="w-4 h-4" /> Publish</button>
        </div>
      </div>

      <div className="card p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Department Name</label><input name="name" value={name} onChange={(e) => handleNameChange(e.target.value)} className="input-field font-semibold" placeholder="e.g. Woodwork" required /></div>
          <div><label className="label">Short Title</label><input name="shortTitle" defaultValue={initialData?.shortTitle || ""} className="input-field" placeholder="e.g. WW" required /></div>
        </div>
        <div><label className="label">Slug</label><input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input-field font-mono text-sm" /></div>
        <div><label className="label">Description</label><textarea name="description" defaultValue={initialData?.description || ""} rows={4} className="input-field resize-y" placeholder="Department overview..." required /></div>
        <div><label className="label">Body (full content)</label><textarea name="body" defaultValue={initialData?.body || ""} rows={8} className="input-field resize-y font-mono text-sm" placeholder="Detailed content... (HTML/Markdown)" /></div>
        <div><label className="label">Highlights (one per line)</label><textarea name="highlights" defaultValue={initialData?.highlights?.join("\n") || ""} rows={4} className="input-field resize-y" placeholder="Key highlight 1&#10;Key highlight 2" /></div>
        <div><label className="label">Display Order</label><input type="number" name="order" defaultValue={initialData?.order || 0} className="input-field w-32" /></div>
      </div>
    </form>
  );
}
