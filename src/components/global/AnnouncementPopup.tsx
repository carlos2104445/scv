"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";

/* ─── Types ─── */

export interface AnnouncementTextConfig {
  type: "text";
  /** HTML string — rendered via dangerouslySetInnerHTML */
  title: string;
  body: string;
  /** Optional CTA */
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface AnnouncementImageConfig {
  type: "image";
  /** Desktop poster (≥768 px) */
  desktopImageUrl: string;
  /** Mobile poster (<768 px) */
  mobileImageUrl: string;
  alt: string;
  /** If set, clicking the poster navigates here */
  linkUrl?: string;
}

export type AnnouncementConfig = AnnouncementTextConfig | AnnouncementImageConfig;

export interface AnnouncementPopupProps {
  config: AnnouncementConfig;
  /** Unique key used to track dismissal in storage (defaults to "scv-announcement") */
  storageKey?: string;
  /** How long (ms) before showing the popup again after dismissal.
   *  0 = once per session (sessionStorage), >0 = timed (localStorage).
   *  Default: 0 (session). */
  cooldownMs?: number;
  /** Whether the popup system is enabled at all (admin kill-switch) */
  enabled?: boolean;
}

/* ─── Helpers ─── */

const STORAGE_PREFIX = "popup_dismissed_";

function isDismissed(key: string, cooldownMs: number): boolean {
  if (typeof window === "undefined") return true;

  if (cooldownMs === 0) {
    // Session-based: use sessionStorage
    return sessionStorage.getItem(STORAGE_PREFIX + key) === "1";
  }

  // Time-based: use localStorage
  const raw = localStorage.getItem(STORAGE_PREFIX + key);
  if (!raw) return false;
  const ts = parseInt(raw, 10);
  return Date.now() - ts < cooldownMs;
}

function markDismissed(key: string, cooldownMs: number) {
  if (typeof window === "undefined") return;

  if (cooldownMs === 0) {
    sessionStorage.setItem(STORAGE_PREFIX + key, "1");
  } else {
    localStorage.setItem(STORAGE_PREFIX + key, String(Date.now()));
  }
}

/* ─── Component ─── */

export function AnnouncementPopup({
  config,
  storageKey = "scv-announcement",
  cooldownMs = 0,
  enabled = true,
}: AnnouncementPopupProps) {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  /* Show after mount if not dismissed */
  useEffect(() => {
    if (!enabled) return;
    // Small delay so the page renders first, feels less jarring
    const t = setTimeout(() => {
      if (!isDismissed(storageKey, cooldownMs)) {
        setVisible(true);
        // Prevent background scroll
        document.body.style.overflow = "hidden";
      }
    }, 600);
    return () => clearTimeout(t);
  }, [enabled, storageKey, cooldownMs]);

  const dismiss = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      markDismissed(storageKey, cooldownMs);
      document.body.style.overflow = "";
    }, 250); // matches exit animation
  }, [storageKey, cooldownMs]);

  /* Close on Escape */
  useEffect(() => {
    if (!visible) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [visible, dismiss]);

  /* Close on backdrop click */
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) dismiss();
  };

  if (!visible) return null;

  const animClass = closing
    ? "animate-[fadeOut_0.25s_ease-in_forwards]"
    : "animate-[fadeIn_0.3s_ease-out_forwards]";

  const modalAnimClass = closing
    ? "animate-[scaleOut_0.25s_ease-in_forwards]"
    : "animate-[scaleIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]";

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Announcement"
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 ${animClass}`}
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
    >
      {/* ── Close button (always visible) ── */}
      <button
        onClick={dismiss}
        aria-label="Close announcement"
        className="absolute top-4 right-4 z-[10001] flex h-10 w-10 items-center justify-center rounded-full
                   bg-white/10 text-white backdrop-blur-sm transition-all duration-200
                   hover:bg-white/25 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <X className="h-5 w-5" />
      </button>

      {/* ── Modal Card ── */}
      {config.type === "text" ? (
        <TextModal config={config} dismiss={dismiss} className={modalAnimClass} />
      ) : (
        <ImageModal config={config} className={modalAnimClass} />
      )}
    </div>
  );
}

/* ─── Text (Rich HTML) Modal ─── */

function TextModal({
  config,
  dismiss,
  className,
}: {
  config: AnnouncementTextConfig;
  dismiss: () => void;
  className: string;
}) {
  return (
    <div
      className={`relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl
                  ring-1 ring-neutral-200 ${className}`}
    >
      {/* Decorative top bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-orange-dark rounded-t-2xl" />

      <div className="p-6 sm:p-8 space-y-4">
        {/* Title */}
        <h2
          className="text-xl sm:text-2xl font-bold text-brand-dark leading-tight"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(config.title) }}
        />

        {/* Body — rich HTML */}
        <div
          className="prose prose-sm sm:prose-base max-w-none text-neutral-600
                     prose-headings:font-serif prose-headings:text-brand-dark
                     prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-brand-dark prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(config.body) }}
        />

        {/* CTA */}
        {config.ctaLabel && (
          <div className="pt-2">
            {config.ctaUrl ? (
              <a href={config.ctaUrl} className="btn-primary text-sm" onClick={dismiss}>
                {config.ctaLabel}
              </a>
            ) : (
              <button onClick={dismiss} className="btn-primary text-sm">
                {config.ctaLabel}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Image / Poster Modal ─── */

function ImageModal({
  config,
  className,
}: {
  config: AnnouncementImageConfig;
  className: string;
}) {
  const img = (
    <>
      {/* Desktop source: ≥768px */}
      <Image
        src={config.desktopImageUrl}
        alt={config.alt}
        width={1200}
        height={1200}
        className="hidden md:block w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        priority
      />
      {/* Mobile fallback */}
      <Image
        src={config.mobileImageUrl}
        alt={config.alt}
        width={800}
        height={1200}
        className="block md:hidden w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        priority
      />
    </>
  );

  return (
    <div className={`relative w-full max-w-3xl ${className}`}>
      {config.linkUrl ? (
        <a
          href={config.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-orange/50 rounded-2xl"
        >
          {img}
        </a>
      ) : (
        img
      )}
    </div>
  );
}
