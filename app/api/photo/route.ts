import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { saveUploadedFile, getProfileData, updateProfile } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    // Check auth
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('photo') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Save the file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = await saveUploadedFile(buffer, file.name);

    // Update profile with new photo path
    updateProfile({ profilePhoto: path });

    return NextResponse.json({ 
      success: true, 
      path,
      message: 'Photo uploaded successfully'
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check auth
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Remove photo from profile
    updateProfile({ profilePhoto: null });

    return NextResponse.json({ 
      success: true, 
      message: 'Photo removed successfully'
    });
  } catch (error) {
    console.error('Photo delete error:', error);
    return NextResponse.json(
      { error: 'Failed to remove photo' },
      { status: 500 }
    );
  }
}
