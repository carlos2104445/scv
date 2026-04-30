"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

interface HeroSlideFormProps {
  initialData?: { id: string; image: string; title: string | null; subtitle: string | null; ctaLabel: string | null; ctaUrl: string | null; order: number; isActive: boolean; };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function HeroSlideForm({ initialData, action, deleteAction }: HeroSlideFormProps) {
  const isEdit = !!initialData;
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/site/hero-slides" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Slide" : "Add Slide"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this slide?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" className="btn-primary text-sm py-2"><Save className="w-4 h-4" /> Save</button>
        </div>
      </div>
      <div className="card p-5 space-y-5">
        <div><label className="label">Image URL *</label><input name="image" defaultValue={initialData?.image || ""} className="input-field" placeholder="https://... or /images/hero/slide-1.png" required /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Title</label><input name="title" defaultValue={initialData?.title || ""} className="input-field" placeholder="Slide headline..." /></div>
          <div><label className="label">Subtitle</label><input name="subtitle" defaultValue={initialData?.subtitle || ""} className="input-field" placeholder="Subtitle text..." /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">CTA Label</label><input name="ctaLabel" defaultValue={initialData?.ctaLabel || ""} className="input-field" placeholder="e.g. Learn More" /></div>
          <div><label className="label">CTA URL</label><input name="ctaUrl" defaultValue={initialData?.ctaUrl || ""} className="input-field" placeholder="/about" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Order</label><input type="number" name="order" defaultValue={initialData?.order || 0} className="input-field" /></div>
          <div className="flex items-center gap-2 pt-7">
            <input type="checkbox" name="isActive" id="isActive" defaultChecked={initialData?.isActive !== false} className="w-4 h-4 rounded border-border" />
            <label htmlFor="isActive" className="text-sm font-medium">Active</label>
          </div>
        </div>
      </div>
    </form>
  );
}
