"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface PersonFormProps {
  initialData?: {
    id: string;
    name: string;
    role: string;
    category: string;
    photo: string | null;
    bio: string | null;
    order: number;
    status: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function PersonForm({ initialData, action, deleteAction }: PersonFormProps) {
  const isEdit = !!initialData;
  const [photo, setPhoto] = useState<string | null>(initialData?.photo || null);
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/people" className="btn-ghost">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1>{isEdit ? "Edit Team Member" : "New Team Member"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button
              type="button"
              disabled={deleting}
              className="btn-danger text-sm py-2"
              onClick={async () => {
                if (confirm("Delete this person?")) {
                  setDeleting(true);
                  await deleteAction(initialData!.id);
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
          <button type="submit" name="status" value="DRAFT" className="btn-secondary text-sm py-2">
            Save as Draft
          </button>
          <button type="submit" name="status" value="PUBLISHED" className="btn-primary text-sm py-2">
            <Save className="w-4 h-4" /> Save & Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Col: Photo */}
        <div className="space-y-5 md:col-span-1">
          <div className="card p-5 space-y-4">
            <div>
              <label className="label">Photo</label>
              <ImageUpload
                name="photo"
                value={photo}
                onChange={setPhoto}
                onRemove={() => setPhoto(null)}
              />
            </div>
          </div>
        </div>

        {/* Right Col: Details */}
        <div className="space-y-5 md:col-span-2">
          <div className="card p-5 space-y-5">
            <div>
              <label className="label">Full Name</label>
              <input 
                name="name" 
                defaultValue={initialData?.name || ""} 
                className="input-field font-semibold text-lg" 
                placeholder="e.g. John Doe" 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Role / Job Title</label>
                <input 
                  name="role" 
                  defaultValue={initialData?.role || ""} 
                  className="input-field" 
                  placeholder="e.g. Chairperson" 
                  required 
                />
              </div>
              
              <div>
                <label className="label">Category</label>
                <select name="category" defaultValue={initialData?.category || "BOARD"} className="input-field">
                  <option value="BOARD">Executive Board</option>
                  <option value="SENIOR">Senior Management</option>
                  <option value="EXTENDED">Extended Management</option>
                  <option value="SWITZERLAND">Board Switzerland</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Bio / Description</label>
              <textarea 
                name="bio" 
                defaultValue={initialData?.bio || ""} 
                rows={4} 
                className="input-field resize-y" 
                placeholder="A short biography..." 
              />
            </div>

            <div>
              <label className="label">Display Order</label>
              <input 
                type="number" 
                name="order" 
                defaultValue={initialData?.order || 0} 
                className="input-field" 
              />
              <p className="text-xs text-neutral-400 mt-1">Lower numbers appear first.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
