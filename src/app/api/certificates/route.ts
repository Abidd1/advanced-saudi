import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { verifyAdminToken } from '@/lib/auth';

// Configure cloudinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper to verify admin auth on protected API actions
async function requireAdminAuth(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_token')?.value;
  const auth = await verifyAdminToken(token);
  return !!auth;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawId = searchParams.get('id');

    // 1. If NO ID is provided, this is the full registry listing -> STRICTLY REQUIRE ADMIN AUTH
    if (!rawId) {
      const isAdmin = await requireAdminAuth(request);
      if (!isAdmin) {
        return NextResponse.json(
          { error: 'Unauthorized. Admin authentication required to view the certificate registry list.' },
          { status: 401 }
        );
      }

      const certificates = await prisma.certificate.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ success: true, data: certificates });
    }

    // 2. If ID IS provided, this is a public verification lookup
    const trimmedId = rawId.trim();
    if (!trimmedId) {
      return NextResponse.json({ success: false, error: 'Certificate ID is required' }, { status: 400 });
    }

    // First try exact match
    let cert = await prisma.certificate.findUnique({
      where: { id: trimmedId },
    });

    // If not found, perform case-insensitive fallback so users typing lowercase or uppercase always find their certificate
    if (!cert) {
      const allCerts = await prisma.certificate.findMany();
      cert = allCerts.find((c) => c.id.trim().toLowerCase() === trimmedId.toLowerCase()) || null;
    }

    if (cert) {
      return NextResponse.json({ success: true, data: cert });
    } else {
      return NextResponse.json(
        { success: false, error: 'Certificate not found in database.' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ error: 'Server database query failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const isAdmin = await requireAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON request payload' }, { status: 400 });
    }

    const { id, frontImgBase64, backImgBase64 } = body;

    // 2. Strict Input Validation
    if (!id || typeof id !== 'string' || !frontImgBase64 || !backImgBase64) {
      return NextResponse.json({ error: 'Missing required certificate ID or image data.' }, { status: 400 });
    }

    const trimmedId = id.trim();
    // Validate ID format: Alphanumeric, hyphen, underscore, period (between 3 and 64 characters)
    if (!/^[a-zA-Z0-9_\-\.]{3,64}$/.test(trimmedId)) {
      return NextResponse.json(
        { error: 'Invalid Certificate ID format. Use 3-64 alphanumeric characters, hyphens, or underscores.' },
        { status: 400 }
      );
    }

    // Validate that images are valid base64 strings
    const isBase64Image = (str: string) => {
      if (typeof str !== 'string') return false;
      return str.startsWith('data:image/') || str.length > 100;
    };

    if (!isBase64Image(frontImgBase64) || !isBase64Image(backImgBase64)) {
      return NextResponse.json({ error: 'Invalid image format. Expected valid image base64 data.' }, { status: 400 });
    }

    // Limit base64 payload size (approx 15MB limit)
    if (frontImgBase64.length > 20 * 1024 * 1024 || backImgBase64.length > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image file size is too large. Maximum 15MB allowed.' }, { status: 413 });
    }

    // 3. Check if certificate already exists before uploading to Cloudinary
    const existing = await prisma.certificate.findUnique({
      where: { id: trimmedId },
    });
    if (existing) {
      return NextResponse.json({ error: `Certificate ID "${trimmedId}" already exists in the database.` }, { status: 409 });
    }

    // 4. Server-side upload to Cloudinary
    const frontUpload = await cloudinary.uploader.upload(frontImgBase64, {
      folder: 'certificates',
      resource_type: 'image',
    });

    const backUpload = await cloudinary.uploader.upload(backImgBase64, {
      folder: 'certificates',
      resource_type: 'image',
    });

    // 5. Store in Prisma database
    const certificate = await prisma.certificate.create({
      data: {
        id: trimmedId,
        frontImgUrl: frontUpload.secure_url,
        backImgUrl: backUpload.secure_url,
      },
    });

    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error: any) {
    console.error('Upload error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Certificate ID already exists in database.' }, { status: 409 });
    }
    return NextResponse.json(
      { error: error?.message || 'Failed to process certificate upload.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // 1. Verify admin authentication
    const isAdmin = await requireAdminAuth(request);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const rawId = searchParams.get('id');

    if (!rawId) {
      return NextResponse.json({ error: 'Certificate ID required for deletion' }, { status: 400 });
    }

    const trimmedId = rawId.trim();

    // Check if certificate exists
    let certToDelete = await prisma.certificate.findUnique({
      where: { id: trimmedId },
    });

    if (!certToDelete) {
      const all = await prisma.certificate.findMany();
      certToDelete = all.find((c) => c.id.trim().toLowerCase() === trimmedId.toLowerCase()) || null;
    }

    if (!certToDelete) {
      return NextResponse.json({ error: 'Certificate not found in database.' }, { status: 404 });
    }

    await prisma.certificate.delete({
      where: { id: certToDelete.id },
    });

    return NextResponse.json({ success: true, message: `Certificate ${certToDelete.id} deleted successfully` });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
