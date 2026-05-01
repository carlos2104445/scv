"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Trash2, ChevronDown } from "lucide-react";
import { cn, slugify } from "@/lib/utils";
import { ImageUpload } from "@/components/ui/ImageUpload";

interface NewsFormProps {
  initialData?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string;
    category: string;
    tags: string[];
    featured: boolean;
    coverImage: string | null;
    status: string;
    seoTitle: string | null;
    seoDesc: string | null;
  };
  action: (formData: FormData) => Promise<void>;
  deleteAction?: (id: string) => Promise<void>;
}

export function NewsForm({ initialData, action, deleteAction }: NewsFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [seoOpen, setSeoOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(initialData?.coverImage || null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (autoSlug) setSlug(slugify(val));
  };

  return (
    <form action={action} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/content/news" className="btn-ghost">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1>{isEdit ? "Edit Post" : "New Post"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {isEdit && deleteAction && (
            <button
              type="button"
              disabled={deleting}
              className="btn-danger text-sm py-2"
              onClick={async () => {
                if (confirm("Delete this post?")) {
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
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button type="submit" name="status" value="PUBLISHED" className="btn-primary text-sm py-2">
            <Eye className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-5 space-y-5">
            <div>
              <label className="label">Title</label>
              <input name="title" value={title} onChange={(e) => handleTitleChange(e.target.value)} className="input-field text-lg font-semibold" placeholder="Enter post title..." required />
            </div>
            <div>
              <label className="label">Slug</label>
              <div className="flex items-center gap-2">
                <input
                  name="slug"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }}
                  className="input-field font-mono text-sm"
                  placeholder="auto-generated-from-title"
                />
              </div>
            </div>
            <div>
              <label className="label">Excerpt</label>
              <textarea name="excerpt" defaultValue={initialData?.excerpt || ""} rows={3} className="input-field resize-none" placeholder="Brief summary..." />
            </div>
            <div>
              <label className="label">Body</label>
              <textarea name="body" defaultValue={initialData?.body || ""} rows={12} className="input-field resize-y font-mono text-sm" placeholder="Write your content here... (Markdown/HTML supported)" required />
            </div>
          </div>

          {/* SEO */}
          <div className="card">
            <button type="button" onClick={() => setSeoOpen(!seoOpen)} className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-brand-dark">
              SEO Settings
              <ChevronDown className={cn("w-4 h-4 transition-transform", seoOpen && "rotate-180")} />
            </button>
            {seoOpen && (
              <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                <div>
                  <label className="label">Meta Title</label>
                  <input name="seoTitle" defaultValue={initialData?.seoTitle || ""} className="input-field" placeholder="Custom title for search engines" />
                </div>
                <div>
                  <label className="label">Meta Description</label>
                  <textarea name="seoDesc" defaultValue={initialData?.seoDesc || ""} rows={2} className="input-field resize-none" placeholder="Custom description for search engines" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card p-5 space-y-4">
            <div>
              <label className="label">Category</label>
              <select name="category" defaultValue={initialData?.category || "news"} className="input-field">
                <option value="news">News</option>
                <option value="press">Press Release</option>
                <option value="announcement">Announcement</option>
                <option value="story">Success Story</option>
              </select>
            </div>
            <div>
              <label className="label">Tags</label>
              <input name="tags" defaultValue={initialData?.tags?.join(", ") || ""} className="input-field" placeholder="tag1, tag2, tag3" />
              <p className="text-xs text-neutral-400 mt-1">Comma-separated</p>
            </div>
            <div>
              <label className="label">Cover Image</label>
              <ImageUpload
                name="coverImage"
                value={coverImage}
                onChange={setCoverImage}
                onRemove={() => setCoverImage(null)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="featured" id="featured" defaultChecked={initialData?.featured} className="w-4 h-4 rounded border-border text-brand-orange focus:ring-brand-orange" />
              <label htmlFor="featured" className="text-sm font-medium text-brand-dark">Featured on homepage</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
