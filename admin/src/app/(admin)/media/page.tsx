import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const media = await prisma.media.findMany({ orderBy: { createdAt: "desc" }, take: 50 });
  return (
    <div className="space-y-6">
      <div><h1>Media Library</h1><p className="text-neutral-500 text-sm mt-1">{media.length} files</p></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {media.map((m) => (
          <div key={m.id} className="card overflow-hidden group cursor-pointer hover:shadow-md transition-shadow">
            <div className="aspect-square bg-neutral-100 flex items-center justify-center overflow-hidden">
              {m.mimeType.startsWith("image/") ? (
                <img src={m.url} alt={m.alt || m.filename} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-neutral-400 px-2 text-center">{m.filename}</span>
              )}
            </div>
            <div className="p-2">
              <p className="text-xs font-medium truncate">{m.filename}</p>
              <p className="text-[10px] text-neutral-400">{(m.size / 1024).toFixed(0)} KB</p>
            </div>
          </div>
        ))}
        {media.length === 0 && <div className="col-span-full card p-12 text-center text-neutral-400 text-sm">No media files yet</div>}
      </div>
    </div>
  );
}
