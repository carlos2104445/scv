"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface PageFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    heroImage: string | null;
    body: string;
    seoTitle: string | null;
    seoDesc: string | null;
    seoImage: string | null;
    status: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function PageForm({ initialData, action, deleteAction }: PageFormProps) {
  const isEdit = !!initialData;
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [deleting, setDeleting] = useState(false);
  const [heroImage, setHeroImage] = useState<string | null>(initialData?.heroImage || null);
  const [seoImage, setSeoImage] = useState<string | null>(initialData?.seoImage || null);

  const handleTitleChange = (val: string) => { 
    setTitle(val); 
    if (autoSlug) setSlug(slugify(val)); 
  };

  return (
    <form action={action} className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/pages" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Page" : "New Page"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this page?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
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
            <div>
              <label className="label">Page Title</label>
              <input name="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} className="input-field text-lg font-semibold" placeholder="About Us..." required />
            </div>
            <div>
              <label className="label">URL Slug</label>
              <input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input-field font-mono text-sm" required />
            </div>
            <div>
              <label className="label">Body Content (HTML/Markdown)</label>
              <textarea name="body" defaultValue={initialData?.body || ""} rows={18} className="input-field font-mono text-sm resize-y" placeholder="## Main Heading..." required />
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-sm text-neutral-800">Media</h3>
            <div>
              <label className="label">Hero Image</label>
              <ImageUpload
                name="heroImage"
                value={heroImage}
                onChange={(url) => setHeroImage(url)}
                onRemove={() => setHeroImage(null)}
              />
            </div>
          </div>
          
          <div className="card p-5 space-y-4 bg-neutral-50 border-neutral-200">
            <h3 className="font-semibold text-sm text-neutral-800">SEO Meta Data</h3>
            <div><label className="label">SEO Title</label><input name="seoTitle" defaultValue={initialData?.seoTitle || ""} className="input-field" placeholder="Default uses Page Title" /></div>
            <div><label className="label">SEO Description</label><textarea name="seoDesc" defaultValue={initialData?.seoDesc || ""} rows={3} className="input-field resize-none" placeholder="Brief summary for search engines..." /></div>
            <div>
              <label className="label">Social Share Image</label>
              <ImageUpload
                name="seoImage"
                value={seoImage}
                onChange={(url) => setSeoImage(url)}
                onRemove={() => setSeoImage(null)}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
