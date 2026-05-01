import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isPdf = file.type === "application/pdf";
    let processedBuffer: Buffer;
    let filename: string;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    if (isPdf) {
      processedBuffer = buffer;
      filename = `${uniqueSuffix}.pdf`;
    } else {
      // Auto-crop and resize the image to a standard portrait size (400x500)
      // fit: "cover" ensures it fills the dimension, cropping excess
      processedBuffer = await sharp(buffer)
        .resize({
          width: 400,
          height: 500,
          fit: "cover",
          position: "top", // crop from the top so heads aren't cut off as often
        })
        .jpeg({ quality: 85 })
        .toBuffer();
      // Always save as .jpg since we convert with .jpeg()
      filename = `${uniqueSuffix}.jpg`;
    }
    
    // Store in uploads/ at project root (not public/ — standalone doesn't serve public/)
    const uploadsDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, processedBuffer);

    // Return the API-served URL so it works in both dev and standalone mode
    return NextResponse.json({ url: `/api/uploads/${filename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file", details: error?.message },
      { status: 500 }
    );
  }
}
