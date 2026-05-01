"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface PartnerFormProps {
  initialData?: { id: string; name: string; logo: string | null; url: string | null; type: string; since: number | null; order: number; };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function PartnerForm({ initialData, action, deleteAction }: PartnerFormProps) {
  const isEdit = !!initialData;
  const [deleting, setDeleting] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(initialData?.logo || null);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/partners" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Partner" : "New Partner"}</h1>
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
        <div><label className="label">Organization Name</label><input name="name" defaultValue={initialData?.name || ""} className="input-field font-semibold" required /></div>
        
        <div>
          <label className="label">Logo Image</label>
          <ImageUpload
            name="logo"
            value={logoUrl}
            onChange={(url) => setLogoUrl(url)}
            onRemove={() => setLogoUrl(null)}
          />
        </div>

        <div><label className="label">Website URL</label><input name="url" defaultValue={initialData?.url || ""} className="input-field" placeholder="https://..." /></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label className="label">Type</label>
            <select name="type" defaultValue={initialData?.type || "Funder"} className="input-field">
              <option value="Funder">Funder</option>
              <option value="Government">Government</option>
              <option value="NGO">NGO</option>
              <option value="Corporate">Corporate</option>
              <option value="Academic">Academic</option>
            </select>
          </div>
          <div><label className="label">Since (year)</label><input type="number" name="since" defaultValue={initialData?.since || ""} className="input-field" placeholder="2010" /></div>
          <div><label className="label">Order</label><input type="number" name="order" defaultValue={initialData?.order || 0} className="input-field" /></div>
        </div>
      </div>
    </form>
  );
}
