"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  className?: string;
  name?: string;
}

export function ImageUpload({ value, onChange, onRemove, className, name }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      onChange(data.url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={cn("w-full relative", className)}>
      <input type="hidden" name={name} value={value || ""} />
      
      {value ? (
        <div className="relative w-full max-w-[200px] aspect-[4/5] rounded-xl overflow-hidden border border-border group">
          {/* Use native img to avoid Next.js Image optimization issues with uploaded files */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Uploaded image"
            className="w-full h-full object-cover"
            onError={(e) => {
              // If the image fails to load, show a placeholder
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='250' fill='%23f0f0f0'%3E%3Crect width='200' height='250'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' font-size='14' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full max-w-[200px] aspect-[4/5] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-4 text-center cursor-pointer transition-colors",
            dragActive ? "border-brand-orange bg-brand-orange/5" : "border-border hover:bg-surface-muted",
            isUploading && "opacity-50 pointer-events-none"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
          />
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
              <p className="text-xs text-neutral-500 font-medium">Uploading...</p>
            </>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-surface shadow-sm flex items-center justify-center text-neutral-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-brand-dark">Click or drag image</p>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wide">Auto-crops to 4:5</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
