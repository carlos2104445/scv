"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, Eye, EyeOff } from "lucide-react";

interface AnnouncementFormProps {
  initialData?: {
    id: string;
    type: string;
    title: string | null;
    body: string | null;
    ctaLabel: string | null;
    ctaUrl: string | null;
    desktopImageUrl: string | null;
    mobileImageUrl: string | null;
    imageAlt: string | null;
    linkUrl: string | null;
    isActive: boolean;
    cooldownHours: number;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function AnnouncementForm({ initialData, action, deleteAction }: AnnouncementFormProps) {
  const isEdit = !!initialData;
  const [type, setType] = useState(initialData?.type || "text");
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      {isEdit && <input type="hidden" name="id" value={initialData.id} />}

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/site/announcement" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Announcement" : "Create Announcement"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this announcement?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" className="btn-primary text-sm py-2"><Save className="w-4 h-4" /> Save</button>
        </div>
      </div>

      {/* Active / Enabled Toggle */}
      <div className="card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">Popup Status</h3>
            <p className="text-xs text-neutral-500 mt-0.5">When active, visitors will see this popup when they visit the site.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" name="isActive" id="isActive" defaultChecked={initialData?.isActive} className="sr-only peer" />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-orange/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-brand-orange after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            <span className="ml-2 text-sm font-medium">{initialData?.isActive ? "Active" : "Inactive"}</span>
          </label>
        </div>
      </div>

      {/* Type Selector */}
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Announcement Type</label>
          <div className="flex gap-3 mt-1">
            <button type="button" onClick={() => setType("text")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${type === "text" ? "border-brand-orange bg-brand-orange-50 text-brand-orange" : "border-border text-neutral-500 hover:border-neutral-300"}`}>
              📝 Rich Text
            </button>
            <button type="button" onClick={() => setType("image")}
              className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${type === "image" ? "border-brand-orange bg-brand-orange-50 text-brand-orange" : "border-border text-neutral-500 hover:border-neutral-300"}`}>
              🖼️ Image / Poster
            </button>
          </div>
          <input type="hidden" name="type" value={type} />
        </div>
      </div>

      {/* Text Mode Fields */}
      {type === "text" && (
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-sm text-neutral-700">Text Content</h3>
          <div><label className="label">Title</label><input name="title" defaultValue={initialData?.title || ""} className="input-field font-semibold" placeholder="Announcement headline..." /></div>
          <div><label className="label">Body (HTML)</label><textarea name="body" defaultValue={initialData?.body || ""} rows={6} className="input-field resize-y font-mono text-sm" placeholder="<p>Your announcement content here...</p>" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">CTA Button Label</label><input name="ctaLabel" defaultValue={initialData?.ctaLabel || ""} className="input-field" placeholder="e.g. Learn More" /></div>
            <div><label className="label">CTA Button URL</label><input name="ctaUrl" defaultValue={initialData?.ctaUrl || ""} className="input-field" placeholder="/get-involved/donate" /></div>
          </div>
        </div>
      )}

      {/* Image Mode Fields */}
      {type === "image" && (
        <div className="card p-5 space-y-4">
          <h3 className="font-semibold text-sm text-neutral-700">Poster Images</h3>
          <div><label className="label">Desktop Image URL (≥768px)</label><input name="desktopImageUrl" defaultValue={initialData?.desktopImageUrl || ""} className="input-field" placeholder="https://..." /></div>
          <div><label className="label">Mobile Image URL (&lt;768px)</label><input name="mobileImageUrl" defaultValue={initialData?.mobileImageUrl || ""} className="input-field" placeholder="https://..." /></div>
          <div><label className="label">Alt Text</label><input name="imageAlt" defaultValue={initialData?.imageAlt || ""} className="input-field" placeholder="Describe the image..." /></div>
          <div><label className="label">Link URL (optional, clicking image goes here)</label><input name="linkUrl" defaultValue={initialData?.linkUrl || ""} className="input-field" placeholder="https://..." /></div>
        </div>
      )}

      {/* Display Settings */}
      <div className="card p-5 space-y-4">
        <h3 className="font-semibold text-sm text-neutral-700">Display Settings</h3>
        <div>
          <label className="label">Cooldown (hours)</label>
          <input type="number" name="cooldownHours" defaultValue={initialData?.cooldownHours || 0} min={0} className="input-field w-32" />
          <p className="text-xs text-neutral-400 mt-1">0 = show once per session. Other values = hours before showing again after dismissal.</p>
        </div>
      </div>
    </form>
  );
}
