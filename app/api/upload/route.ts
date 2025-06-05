import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Get the form data (multipart/form-data)
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'File must be a valid image (JPEG, PNG, GIF, or WebP)' }, { status: 400 });
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 2MB' }, { status: 400 });
    }

    // Get file extension
    const fileExtension = file.name.split('.').pop() || 'jpg';
    
    // Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const uniqueId = uuidv4();
    const fileName = `template-${uniqueId}.${fileExtension}`;
    
    // Define the storage directory and ensure it exists
    const storageDir = path.join(process.cwd(), 'public', 'shop', 'templates');
    
    try {
      await mkdir(storageDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create directory:', error);
    }
    
    // Define the full file path
    const filePath = path.join(storageDir, fileName);
    
    // Write the file to the filesystem
    await writeFile(filePath, buffer);
    
    // Return the public URL to the file
    const publicUrl = `/shop/templates/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      id: uniqueId
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 