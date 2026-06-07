"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Trash2, Loader2, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { deleteMedia } from "@/actions/media";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  alt: string | null;
  createdAt: Date;
}

export function MediaGrid({ initialMedia }: { initialMedia: MediaItem[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();

        // Create a Media record in the database
        await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            url: data.url,
            mimeType: file.type,
            size: file.size,
          }),
        });
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to upload. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await deleteMedia(id);
      router.refresh();
    } catch {
      alert("Failed to delete file.");
    } finally {
      setDeleting(null);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1>Media Library</h1>
          <p className="text-neutral-500 text-sm mt-1">
            {initialMedia.length} file{initialMedia.length !== 1 && "s"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-primary text-sm py-2"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UploadCloud className="w-4 h-4" />
          )}
          {uploading ? "Uploading..." : "Upload Files"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Drop zone (when empty) or grid */}
      {initialMedia.length === 0 && !uploading ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "card p-16 text-center cursor-pointer transition-colors border-2 border-dashed",
            dragActive
              ? "border-brand-orange bg-brand-orange/5"
              : "border-neutral-200 hover:border-neutral-300",
          )}
        >
          <UploadCloud className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500 font-medium">
            Drag & drop files here, or click to browse
          </p>
          <p className="text-neutral-400 text-sm mt-1">
            Images (JPG, PNG, WebP) and PDFs accepted
          </p>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={cn(
            "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 rounded-xl p-1 transition-colors",
            dragActive && "bg-brand-orange/5 ring-2 ring-brand-orange/30",
          )}
        >
          {initialMedia.map((m) => (
            <div
              key={m.id}
              className="card overflow-hidden group relative"
            >
              {/* Thumbnail */}
              <div className="aspect-square bg-neutral-100 flex items-center justify-center overflow-hidden">
                {m.mimeType.startsWith("image/") ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={m.url}
                    alt={m.alt || m.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs text-neutral-400 px-2 text-center">
                    {m.filename}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-2">
                <p className="text-xs font-medium truncate">{m.filename}</p>
                <p className="text-[10px] text-neutral-400">
                  {(m.size / 1024).toFixed(0)} KB
                </p>
              </div>

              {/* Overlay actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => copyUrl(m.url)}
                  className="p-2 bg-white rounded-full hover:bg-neutral-100 transition-colors shadow-lg"
                  title="Copy URL"
                >
                  {copied === m.url ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-neutral-700" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(m.id)}
                  disabled={deleting === m.id}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg disabled:opacity-50"
                  title="Delete"
                >
                  {deleting === m.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
