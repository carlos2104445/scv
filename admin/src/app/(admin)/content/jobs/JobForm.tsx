"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react";
import { slugify } from "@/lib/utils";

interface JobFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    department: string | null;
    location: string | null;
    jobType: string;
    deadline: Date | null;
    description: string;
    requirements: string | null;
    responsibilities: string | null;
    benefits: string | null;
    applyMode: string;
    applyUrl: string | null;
    applyEmail: string | null;
    featured: boolean;
    status: string;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function JobForm({ initialData, action, deleteAction }: JobFormProps) {
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
          <Link href="/content/jobs" className="btn-ghost"><ArrowLeft className="w-4 h-4" /></Link>
          <h1>{isEdit ? "Edit Job" : "Post New Job"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button type="button" disabled={deleting} className="btn-danger text-sm py-2" onClick={async () => { if (confirm("Delete this job?")) { setDeleting(true); await deleteAction(initialData!.id); } }}>
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          )}
          <button type="submit" name="status" value="DRAFT" className="btn-secondary text-sm py-2"><Save className="w-4 h-4" /> Save Draft</button>
          <button type="submit" name="status" value="OPEN" className="btn-primary text-sm py-2"><Eye className="w-4 h-4" /> Publish</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5 space-y-5">
            <div><label className="label">Job Title</label><input name="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} className="input-field text-lg font-semibold" placeholder="e.g. Social Worker" required /></div>
            <div><label className="label">Slug</label><input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }} className="input-field font-mono text-sm" /></div>
            <div><label className="label">Description</label><textarea name="description" defaultValue={initialData?.description || ""} rows={6} className="input-field resize-y" placeholder="Job overview..." required /></div>
            <div><label className="label">Requirements</label><textarea name="requirements" defaultValue={initialData?.requirements || ""} rows={5} className="input-field resize-y" placeholder="One per line..." /></div>
            <div><label className="label">Responsibilities</label><textarea name="responsibilities" defaultValue={initialData?.responsibilities || ""} rows={5} className="input-field resize-y" placeholder="One per line..." /></div>
            <div><label className="label">Benefits</label><textarea name="benefits" defaultValue={initialData?.benefits || ""} rows={3} className="input-field resize-y" placeholder="Benefits offered..." /></div>
          </div>
        </div>
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div><label className="label">Department</label><input name="department" defaultValue={initialData?.department || ""} className="input-field" placeholder="e.g. CYC" /></div>
            <div><label className="label">Location</label><input name="location" defaultValue={initialData?.location || ""} className="input-field" placeholder="e.g. Addis Ababa" /></div>
            <div><label className="label">Job Type</label>
              <select name="jobType" defaultValue={initialData?.jobType || "FULL_TIME"} className="input-field">
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="VOLUNTEER">Volunteer</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>
            <div><label className="label">Deadline</label><input type="date" name="deadline" defaultValue={initialData?.deadline ? new Date(initialData.deadline).toISOString().slice(0, 10) : ""} className="input-field" /></div>
            <div><label className="label">Apply Mode</label>
              <select name="applyMode" defaultValue={initialData?.applyMode || "form"} className="input-field">
                <option value="form">In-app Form</option>
                <option value="url">External URL</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div><label className="label">Apply URL</label><input name="applyUrl" defaultValue={initialData?.applyUrl || ""} className="input-field" placeholder="https://..." /></div>
            <div><label className="label">Apply Email</label><input name="applyEmail" defaultValue={initialData?.applyEmail || ""} className="input-field" placeholder="hr@..." /></div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-4 h-4 rounded border-border" />
              <label htmlFor="featured" className="text-sm font-medium">Featured</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
