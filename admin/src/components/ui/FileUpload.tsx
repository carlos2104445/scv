"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  className?: string;
  name?: string;
  accept?: string;
}

export function FileUpload({ value, onChange, onRemove, className, name, accept = "application/pdf" }: FileUploadProps) {
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
      alert("Failed to upload file. Please try again.");
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
        <div className="relative w-full max-w-[300px] p-4 rounded-xl border border-border group bg-surface flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-brand-dark truncate">
                {value.split('/').pop()}
              </p>
              <a 
                href={value} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-brand-orange hover:underline"
              >
                View file
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
          onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full max-w-[300px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 p-6 text-center cursor-pointer transition-colors",
            dragActive ? "border-brand-orange bg-brand-orange/5" : "border-border hover:bg-surface-muted",
            isUploading && "opacity-50 pointer-events-none"
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
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
                <p className="text-sm font-medium text-brand-dark">Click or drag file</p>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wide">
                  {accept === "application/pdf" ? "PDF ONLY" : accept.toUpperCase()}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
