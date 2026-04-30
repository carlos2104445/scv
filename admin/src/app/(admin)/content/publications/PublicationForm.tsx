"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";

interface PublicationFormProps {
  initialData?: { id: string; title: string; type: string; year: number; coverImage: string | null; pdfUrl: string | null; summary: string | null; isPublic: boolean; };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function PublicationForm({ initialData, action, deleteAction }: PublicationFormProps) {
  const isEdit = !!initialData;
  const [deleting, setDeleting] = useState(false);

  return (
    <form action={action} className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/publications" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Publication" : "New Publication"}</h1>
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
        <div><label className="label">Title</label><input name="title" defaultValue={initialData?.title || ""} className="input-field font-semibold" required /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="label">Type</label>
            <select name="type" defaultValue={initialData?.type || "NEWSLETTER"} className="input-field">
              <option value="NEWSLETTER">Newsletter</option>
              <option value="MAGAZINE">Magazine</option>
              <option value="ANNUAL_REPORT">Annual Report</option>
              <option value="AUDIT_REPORT">Audit Report</option>
              <option value="POLICY">Policy Document</option>
            </select>
          </div>
          <div><label className="label">Year</label><input type="number" name="year" defaultValue={initialData?.year || new Date().getFullYear()} className="input-field" required /></div>
        </div>
        <div><label className="label">Cover Image URL</label><input name="coverImage" defaultValue={initialData?.coverImage || ""} className="input-field" placeholder="https://..." /></div>
        <div><label className="label">PDF URL</label><input name="pdfUrl" defaultValue={initialData?.pdfUrl || ""} className="input-field" placeholder="https://..." /></div>
        <div><label className="label">Summary</label><textarea name="summary" defaultValue={initialData?.summary || ""} rows={4} className="input-field resize-y" placeholder="Brief summary of this publication..." /></div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="isPublic" id="isPublic" defaultChecked={initialData?.isPublic !== false} className="w-4 h-4 rounded border-border" />
          <label htmlFor="isPublic" className="text-sm font-medium">Publicly visible</label>
        </div>
      </div>
    </form>
  );
}
