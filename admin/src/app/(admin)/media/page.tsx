import { prisma } from "@/lib/prisma";
import { MediaGrid } from "./MediaGrid";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return <MediaGrid initialMedia={media} />;
}
