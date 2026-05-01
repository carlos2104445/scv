"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface TestimonialFormProps {
  initialData?: { id: string; name: string; role: string | null; quote: string; photo: string | null; featured: boolean; order: number; };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function TestimonialForm({ initialData, action, deleteAction }: TestimonialFormProps) {
  const isEdit = !!initialData;
  const [photo, setPhoto] = useState<string | null>(initialData?.photo || null);
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/testimonials" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Testimonial" : "New Testimonial"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" className="btn-primary text-sm py-2"><Save className="w-4 h-4" /> Save</button>
        </div>
      </div>
      <div className="card p-5 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Name</label><input name="name" defaultValue={initialData?.name || ""} className="input-field" required /></div>
          <div><label className="label">Role / Title</label><input name="role" defaultValue={initialData?.role || ""} className="input-field" placeholder="e.g. Former Student" /></div>
        </div>
        <div><label className="label">Quote</label><textarea name="quote" defaultValue={initialData?.quote || ""} rows={5} className="input-field resize-y" placeholder="Their testimonial..." required /></div>
        <div>
          <label className="label">Photo</label>
          <ImageUpload
            name="photo"
            value={photo}
            onChange={setPhoto}
            onRemove={() => setPhoto(null)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="label">Order</label><input type="number" name="order" defaultValue={initialData?.order || 0} className="input-field" /></div>
          <div className="flex items-center gap-2 pt-7">
            <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-4 h-4 rounded border-border" />
            <label htmlFor="featured" className="text-sm font-medium">Featured</label>
          </div>
        </div>
      </div>
    </form>
  );
}
