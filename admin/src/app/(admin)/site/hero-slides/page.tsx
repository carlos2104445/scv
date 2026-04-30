import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HeroSlidesPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Hero Slides</h1><p className="text-neutral-500 text-sm mt-1">Manage homepage hero slider.</p></div>
        <Link href="/site/hero-slides/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Slide</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {slides.map((s) => (
          <Link key={s.id} href={`/site/hero-slides/${s.id}`} className="card overflow-hidden hover:shadow-md transition-shadow group">
            <div className="aspect-video bg-neutral-100 flex items-center justify-center overflow-hidden">
              {s.image ? <img src={s.image} alt={s.title || "Slide"} className="w-full h-full object-cover" /> : <span className="text-neutral-300">No image</span>}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm group-hover:text-brand-orange transition-colors">{s.title || "Untitled"}</p>
                {s.isActive ? <span className="badge-published">active</span> : <span className="badge-draft">inactive</span>}
              </div>
              {s.subtitle && <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{s.subtitle}</p>}
              {s.ctaLabel && <p className="text-xs text-brand-orange mt-1">{s.ctaLabel} → {s.ctaUrl}</p>}
            </div>
          </Link>
        ))}
        {slides.length === 0 && <div className="col-span-full card p-12 text-center text-neutral-400 text-sm">No hero slides yet</div>}
      </div>
    </div>
  );
}
