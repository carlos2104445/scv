"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    excerpt: string | null;
    description: string | null;
    body: string;
    coverImage: string | null;
    donateUrl: string | null;
    order: number;
    sdgs: number[];
    status: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function ProjectForm({ initialData, action, deleteAction }: ProjectFormProps) {
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
          <Link href="/content/projects" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Project" : "New Project"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this project?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
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
            <div><label className="label">Title</label><input name="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} className="input-field text-lg font-semibold" placeholder="Project name..." required /></div>
            <div><label className="label">Slug</label><input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input-field font-mono text-sm" /></div>
            <div><label className="label">Excerpt</label><textarea name="excerpt" defaultValue={initialData?.excerpt || ""} rows={3} className="input-field resize-none" placeholder="Brief summary..." /></div>
            <div><label className="label">Description</label><textarea name="description" defaultValue={initialData?.description || ""} rows={4} className="input-field resize-y" placeholder="Longer description..." /></div>
            <div><label className="label">Body</label><textarea name="body" defaultValue={initialData?.body || ""} rows={10} className="input-field resize-y font-mono text-sm" placeholder="Full content... (HTML/Markdown)" required /></div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div><label className="label">Category</label>
              <select name="category" defaultValue={initialData?.category || "CYC"} className="input-field">
                <option value="CYC">Child & Youth Care</option>
                <option value="COMMUNITY">Community Support</option>
                <option value="TVET">TVET</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
            <div><label className="label">Cover Image URL</label><input name="coverImage" defaultValue={initialData?.coverImage || ""} className="input-field" placeholder="https://..." /></div>
            <div><label className="label">Donate URL</label><input name="donateUrl" defaultValue={initialData?.donateUrl || ""} className="input-field" placeholder="https://..." /></div>
            <div><label className="label">SDGs (comma-separated numbers)</label><input name="sdgs" defaultValue={initialData?.sdgs?.join(", ") || ""} className="input-field" placeholder="1, 4, 8" /></div>
            <div><label className="label">Display Order</label><input type="number" name="order" defaultValue={initialData?.order || 0} className="input-field" /></div>
          </div>
        </div>
      </div>
    </form>
  );
}
