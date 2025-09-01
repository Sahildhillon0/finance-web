'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const PLACEHOLDER_IMAGE = '/placeholder.svg?height=480&width=800&query=car+photo';

// Helper function to check if an image is a placeholder
const isPlaceholder = (url: string) => {
  return url.includes('placeholder');
};

interface CarImagesProps {
  images: string[];
  name: string;
  type: string;
  className?: string;
}

export function CarImages({ images, name, type, className = '' }: CarImagesProps) {
  const [currentImage, setCurrentImage] = useState(images[0] || PLACEHOLDER_IMAGE);
  const [imageError, setImageError] = useState(false);
  
  // Update current image when images prop changes
  useEffect(() => {
    if (images.length > 0) {
      setCurrentImage(images[0]);
      setImageError(false);
    } else {
      setCurrentImage(PLACEHOLDER_IMAGE);
    }
  }, [images]);

  useEffect(() => {
    console.log('CarImages - Images:', images);
    console.log('CarImages - Current Image:', currentImage);
  }, [images, currentImage]);
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    console.error('Failed to load image:', target.src);
    
    // If this is not the placeholder and we have other images to try
    if (target.src !== PLACEHOLDER_IMAGE && images.length > 0) {
      const currentIndex = images.findIndex(img => img === target.src);
      if (currentIndex >= 0 && currentIndex < images.length - 1) {
        // Try the next image
        setCurrentImage(images[currentIndex + 1]);
        return;
      }
    }
    
    // If we can't find a working image, show the placeholder
    setImageError(true);
    setCurrentImage(PLACEHOLDER_IMAGE);
  };

  const showPlaceholder = isPlaceholder(currentImage) || imageError;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 bg-slate-100 dark:bg-slate-900">
        {showPlaceholder ? (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="text-center p-6">
              <div className="text-4xl mb-2">🚗</div>
              <p className="text-gray-500 dark:text-gray-400">No images available</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Add images in the admin panel</p>
            </div>
          </div>
        ) : (
          <Image
            src={currentImage}
            alt={name}
            fill
            className="object-cover"
            priority
            onError={handleImageError}
          />
        )}
        
        {!showPlaceholder && type && (
          <div className="absolute right-6 top-6 rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-100 ring-1 ring-blue-400/30">
            {type === "new" ? "New" : "Classic"}
          </div>
        )}
      </div>

      {/* Thumbnails - Only show if we have multiple real images */}
      {!showPlaceholder && images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(img)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                currentImage === img 
                  ? 'ring-2 ring-blue-500 border-transparent' 
                  : 'border-transparent hover:border-blue-400/30'
              } transition-all`}
            >
              <Image
                src={img}
                alt={`${name} - ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 200px"
                onError={(e) => {
                  // Skip this image if it fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
