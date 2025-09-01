import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

interface CloudinaryUploadResponse {
  url: string;
  public_id?: string;
}

export async function uploadImage(file: File): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.details || 'Failed to upload image');
  }

  const data = await response.json();
  
  if (!data || !data.url) {
    throw new Error('Invalid response from server: Missing URL');
  }
  
  return {
    url: data.url,
    public_id: data.public_id
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  // This would need to be implemented in your API route
  console.warn('Delete image functionality needs to be implemented in the API route');
}
