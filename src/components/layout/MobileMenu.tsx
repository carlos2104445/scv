"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronDown, Heart, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigation, siteSettings } from "@/data/site-settings";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((i) => i !== label)
        : [...prev, label]
    );
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-orange-dark flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-brand-dark">Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-all"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Donate CTA */}
        <div className="p-4">
          <Link
            href="/get-involved/donate"
            onClick={onClose}
            className="btn-primary w-full text-center"
          >
            <Heart className="w-5 h-5" />
            Donate Now
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-4" aria-label="Mobile navigation">
          {navigation.main.map((item) => (
            <div key={item.label} className="border-b border-neutral-50 last:border-0">
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex-1 py-3 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "text-brand-orange"
                      : "text-neutral-700"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="p-2 rounded-lg hover:bg-neutral-100 transition-all"
                    aria-expanded={expandedItems.includes(item.label)}
                    aria-label={`Expand ${item.label} submenu`}
                  >
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-neutral-400 transition-transform duration-200",
                        expandedItems.includes(item.label) && "rotate-180"
                      )}
                    />
                  </button>
                )}
              </div>

              {/* Sub-menu */}
              {item.children && expandedItems.includes(item.label) && (
                <div className="pb-2 pl-4 space-y-0.5 animate-fade-in">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={onClose}
                      className={cn(
                        "block py-2 px-3 rounded-lg text-sm transition-all",
                        pathname === child.href
                          ? "text-brand-orange bg-brand-orange-50 font-medium"
                          : "text-neutral-600 hover:text-brand-dark hover:bg-neutral-50"
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Contact Info Footer */}
        <div className="border-t border-neutral-100 p-4 space-y-3 bg-neutral-50">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Phone className="w-4 h-4 text-brand-orange" />
            <span>{siteSettings.contact.phones[0].number}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Mail className="w-4 h-4 text-brand-orange" />
            <span>{siteSettings.contact.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <MapPin className="w-4 h-4 text-brand-orange" />
            <span>Kotebe, Addis Ababa</span>
          </div>
        </div>
      </div>
    </>
  );
}
