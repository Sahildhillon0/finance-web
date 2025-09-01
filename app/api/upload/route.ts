import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Initialize Cloudinary with environment variables
const cloudinaryConfig = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
};

// Verify all required environment variables are set
const missingConfig = Object.entries({
  cloud_name: cloudinaryConfig.cloud_name,
  api_key: cloudinaryConfig.api_key,
  api_secret: cloudinaryConfig.api_secret
})
.filter(([_, value]) => !value)
.map(([key]) => key);

if (missingConfig.length > 0) {
  console.error('Missing Cloudinary configuration:', missingConfig.join(', '));
}

// Configure Cloudinary
cloudinary.config(cloudinaryConfig);

export async function POST(request: Request) {
  try {
    // Check for missing configuration
    if (missingConfig.length > 0) {
      return NextResponse.json(
        { 
          error: 'Server configuration error',
          details: `Missing Cloudinary configuration: ${missingConfig.join(', ')}`
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = `data:${file.type};base64,${buffer.toString('base64')}`;

    console.log('Uploading file to Cloudinary...');
    const result = await cloudinary.uploader.upload(base64Data, {
      folder: 'vehicle-loans',
      resource_type: 'auto',
    });

    if (!result.secure_url) {
      throw new Error('No URL returned from Cloudinary');
    }

    return NextResponse.json({ 
      url: result.secure_url,
      public_id: result.public_id
    });
    
  } catch (error) {
    console.error('Upload failed:', error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error during file upload';
      
    return NextResponse.json(
      { 
        error: 'Upload failed',
        details: errorMessage,
        config: {
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'set' : 'missing',
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? 'set' : 'missing',
          api_secret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'missing'
        }
      },
      { status: 500 }
    );
  }
}
