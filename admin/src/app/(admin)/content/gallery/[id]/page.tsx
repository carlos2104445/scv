import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { AlbumForm } from "../AlbumForm";
import { updateAlbum, deleteAlbum } from "@/actions/gallery";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ id: string }>; }

export default async function EditAlbumPage({ params }: Props) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({ where: { id } });
  if (!album) notFound();

  return <AlbumForm initialData={album} action={updateAlbum.bind(null, id)} deleteAction={deleteAlbum} />;
}
