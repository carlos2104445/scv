import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1>Testimonials</h1><p className="text-neutral-500 text-sm mt-1">Manage quotes and testimonials.</p></div>
        <Link href="/content/testimonials/new" className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Testimonial</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <Link key={t.id} href={`/content/testimonials/${t.id}`} className="card p-5 hover:shadow-md transition-shadow group">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange font-bold text-sm shrink-0">{t.name[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm group-hover:text-brand-orange transition-colors">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.role}</p>
                <p className="text-sm text-neutral-600 mt-2 line-clamp-2 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            </div>
            {t.featured && <span className="badge bg-brand-orange-50 text-brand-orange mt-3 inline-block">★ Featured</span>}
          </Link>
        ))}
        {testimonials.length === 0 && <div className="col-span-full card p-12 text-center text-neutral-400 text-sm">No testimonials yet</div>}
      </div>
    </div>
  );
}
