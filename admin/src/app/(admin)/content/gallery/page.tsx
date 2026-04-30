import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await prisma.galleryAlbum.findMany({ orderBy: { date: "desc" }, include: { _count: { select: { images: true } } } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Gallery</h1><p className="text-neutral-500 text-sm mt-1">Manage photo albums.</p></div>
        <Link href="/content/gallery/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> New Album</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((a) => (
          <Link key={a.id} href={`/content/gallery/${a.id}`} className="card p-4 hover:shadow-md transition-shadow group">
            <div className="aspect-video rounded-xl bg-neutral-100 flex items-center justify-center mb-3 overflow-hidden">
              {a.coverImage ? <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover" /> : <span className="text-neutral-300 text-sm">No cover</span>}
            </div>
            <h3 className="font-semibold text-sm group-hover:text-brand-orange transition-colors">{a.title}</h3>
            <p className="text-xs text-neutral-500 mt-1">{a._count.images} images · {a.category || "Uncategorized"}</p>
          </Link>
        ))}
        {albums.length === 0 && <div className="col-span-full card p-12 text-center text-neutral-400 text-sm">No albums yet</div>}
      </div>
    </div>
  );
}
