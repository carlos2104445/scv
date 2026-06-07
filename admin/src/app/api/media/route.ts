import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { filename, url, mimeType, size } = body;

  const media = await prisma.media.create({
    data: {
      filename,
      url,
      mimeType,
      size,
      uploadedBy: session.user?.id ?? null,
    },
  });

  return NextResponse.json(media, { status: 201 });
}
