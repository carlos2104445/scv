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

    // Auto-crop and resize the image to a standard portrait size (400x500)
    // fit: "cover" ensures it fills the dimension, cropping excess
    const processedBuffer = await sharp(buffer)
      .resize({
        width: 400,
        height: 500,
        fit: "cover",
        position: "top", // crop from the top so heads aren't cut off as often
      })
      .jpeg({ quality: 85 })
      .toBuffer();

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Always save as .jpg since we convert with .jpeg()
    const filename = `${uniqueSuffix}.jpg`;
    
    // Ensure public/uploads exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Directory might exist, ignore error
    }

    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, processedBuffer);

    // Return the URL that the frontend and admin can access
    // Admin uses relative /uploads/... 
    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Error uploading file", details: error?.message },
      { status: 500 }
    );
  }
}
