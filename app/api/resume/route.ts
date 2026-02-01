import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';
import { verifyToken } from '@/lib/auth';
import { saveUploadedFile, getProfileData, updateProfile, ensureDirectories } from '@/lib/storage';
import { extractProfileFromResume, isAIExtractionAvailable } from '@/lib/ai-extractor';

// Upload resume
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
    const file = formData.get('file') as File;
    const extractWithAI = formData.get('extractWithAI') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: PDF, TXT, DOC, DOCX' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file
    const savedPath = await saveUploadedFile(buffer, file.name);

    // Update profile with resume file path
    updateProfile({ resumeFile: savedPath });

    let extractedProfile = null;
    let extractionError = null;

    // Try AI extraction if requested
    if (extractWithAI) {
      // Extract text from the file
      let text = '';
      
      if (file.type === 'text/plain') {
        text = buffer.toString('utf-8');
      } else if (file.type === 'application/pdf') {
        // Dynamic import for pdf-parse
        try {
          const pdfParse = (await import('pdf-parse')).default;
          const pdfData = await pdfParse(buffer);
          text = pdfData.text;
        } catch (e) {
          extractionError = 'Failed to parse PDF. Please try a different format or use manual entry.';
        }
      } else {
        extractionError = 'AI extraction is only supported for PDF and TXT files. Please use manual entry for other formats.';
      }

      if (text && !extractionError) {
        const result = await extractProfileFromResume(text);
        
        if (result.success && result.profile) {
          extractedProfile = result.profile;
          // Auto-apply extracted profile
          updateProfile(result.profile);
        } else {
          extractionError = result.error || 'AI extraction failed';
        }
      }
    }

    return NextResponse.json({
      success: true,
      path: savedPath,
      extractedProfile,
      extractionError,
      aiAvailable: isAIExtractionAvailable(),
    });
  } catch (error) {
    console.error('Resume upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    );
  }
}

// Check AI availability
export async function GET() {
  return NextResponse.json({
    aiAvailable: isAIExtractionAvailable(),
    provider: process.env.AI_PROVIDER || 'openai',
  });
}
