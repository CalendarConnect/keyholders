import { NextRequest, NextResponse } from "next/server";
import { join, basename } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueId = uuidv4();
    const originalName = file.name;
    const extension = originalName.split(".").pop() || "";
    const uniqueFilename = `${uniqueId}.${extension}`;
    
    // Create the directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "shop", "templates", "files");
    try {
      await stat(uploadsDir);
    } catch (e) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Write the file
    const filepath = join(uploadsDir, uniqueFilename);
    await writeFile(filepath, buffer);

    const fileUrl = `/shop/templates/files/${uniqueFilename}`;

    return NextResponse.json({
      url: fileUrl,
      name: originalName,
      type: file.type,
      size: file.size,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
} 