"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export async function deleteMedia(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) throw new Error("Media not found");

  // Remove the physical file if it's a local upload
  if (media.url.startsWith("/api/uploads/")) {
    const filename = media.url.replace("/api/uploads/", "");
    const filepath = path.join(process.cwd(), "uploads", filename);
    try {
      await unlink(filepath);
    } catch {
      // File may already be deleted
    }
  }

  await prisma.media.delete({ where: { id } });
  revalidatePath("/media");
}
