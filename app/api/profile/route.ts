import { NextRequest, NextResponse } from 'next/server';
import { getProfileData, updateProfile, updateSettings } from '@/lib/storage';
import { verifyToken } from '@/lib/auth';

// Get profile data (public)
export async function GET() {
  try {
    const data = getProfileData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

// Update profile (requires auth)
export async function PUT(request: NextRequest) {
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

    const body = await request.json();
    const { profile, settings } = body;

    let data = getProfileData();

    if (profile) {
      data = updateProfile(profile);
    }

    if (settings) {
      data = updateSettings(settings);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
