import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { getProfileData, getUploadedFilePath } from '@/lib/storage';

export async function GET() {
  try {
    const { profile } = getProfileData();
    
    if (!profile.resumeFile) {
      return NextResponse.json(
        { error: 'No resume file available' },
        { status: 404 }
      );
    }

    // Get the filename from the path
    const filename = path.basename(profile.resumeFile);
    const filePath = getUploadedFilePath(filename);

    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Resume file not found' },
        { status: 404 }
      );
    }

    const fileBuffer = readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();

    // Determine content type
    let contentType = 'application/octet-stream';
    if (ext === '.pdf') {
      contentType = 'application/pdf';
    } else if (ext === '.doc') {
      contentType = 'application/msword';
    } else if (ext === '.docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (ext === '.txt') {
      contentType = 'text/plain';
    }

    // Return file for download
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="resume${ext}"`,
      },
    });
  } catch (error) {
    console.error('Download resume error:', error);
    return NextResponse.json(
      { error: 'Failed to download resume' },
      { status: 500 }
    );
  }
}
