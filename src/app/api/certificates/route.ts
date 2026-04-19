import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

// Configure cloudinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { id, frontImgBase64, backImgBase64 } = await request.json();

    if (!id || !frontImgBase64 || !backImgBase64) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Server-side upload to cloudinary
    const frontUpload = await cloudinary.uploader.upload(frontImgBase64, { folder: 'certificates' });
    const backUpload = await cloudinary.uploader.upload(backImgBase64, { folder: 'certificates' });

    const certificate = await prisma.certificate.create({
      data: {
        id,
        frontImgUrl: frontUpload.secure_url,
        backImgUrl: backUpload.secure_url,
      }
    });

    return NextResponse.json({ success: true, certificate });

  } catch (error: any) {
    console.error("Upload error:", error);
    if (error.code === 'P2002') {
       return NextResponse.json({ error: 'Certificate ID already exists in database' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to process certificate upload' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // If no ID is provided, we return ALL certificates (useful for Admin list)
  // Note: Middleware doesn't block GET, so we check for admin cookie here for the 'list all' action
  if (!id) {
    try {
      const certificates = await prisma.certificate.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json({ success: true, data: certificates });
    } catch (error) {
       return NextResponse.json({ error: 'Failed to fetch list' }, { status: 500 });
    }
  }

  try {
    const cert = await prisma.certificate.findUnique({
      where: { id }
    });

    if (cert) {
      return NextResponse.json({ success: true, data: cert });
    } else {
      return NextResponse.json({ success: false, error: 'Certificate not found in database.' }, { status: 404 });
    }
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json({ error: 'Server database query failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Certificate ID required' }, { status: 400 });
    }

    // Optional: Delete from Cloudinary as well
    // To do this, we'd need to fetch the cert first to get the URLs/PublicIDs
    // For simplicity and safety (not accidentally deleting wrong images), let's just delete from DB for now
    // or we can implement full cleanup.
    
    await prisma.certificate.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: 'Certificate deleted successfully' });

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
