import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { HeroSlideForm } from "../HeroSlideForm";
import { updateHeroSlide, deleteHeroSlide } from "@/actions/hero-slides";

export const dynamic = "force-dynamic";
interface Props { params: Promise<{ id: string }>; }

export default async function EditHeroSlidePage({ params }: Props) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();
  return <HeroSlideForm initialData={slide} action={updateHeroSlide.bind(null, id)} deleteAction={deleteHeroSlide} />;
}
