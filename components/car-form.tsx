"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Car } from "@/types/car"
import { uploadImage } from "@/lib/cloudinary"

// Import UI components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ImageData {
  url: string;
  isPrimary: boolean;
}

interface CloudinaryResponse {
  secure_url: string;
  // Add other Cloudinary response fields as needed
}

type CarFormData = Omit<Car, '_id' | 'createdAt' | 'updatedAt' | 'images'> & {
  images: ImageData[];
}

interface CarFormProps {
  existing?: Car;
  onSuccess?: () => Promise<void>;
}

export function CarForm({ existing, onSuccess }: CarFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const getDefaultFormData = (): CarFormData => ({
    name: "",
    description: "",
    price: 0,
    status: "available",
    type: "new",
    availability: "in-stock",
    images: [],
  });

  const [formData, setFormData] = useState<CarFormData>(() => {
    if (existing) {
      return {
        ...existing,
        images: existing.images.map(url => ({
          url,
          isPrimary: url === existing.images[0] // Set first image as primary by default
        }))
      };
    }
    return getDefaultFormData();
  });
  const [isDragging, setIsDragging] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Debug: Log form data before submission
    console.group('🚗 Car Form Submission')
    console.log('📋 Form Data:', JSON.parse(JSON.stringify(formData)))
    console.log('📌 Existing Car ID:', existing?._id || 'New car')
    
    if (formData.images.length === 0) {
      console.warn('⚠️ No images uploaded - submission blocked')
      console.groupEnd()
      alert("Please upload at least one image")
      return
    }
    
    setIsLoading(true)
    const method = existing?._id ? "PUT" : "POST"
    const url = existing?._id ? `/api/cars/${existing._id}` : "/api/cars"
    
    // Prepare the request payload
    const payload = {
      ...formData,
      images: formData.images.map(img => img.url) // Convert back to string array for API
    }
    
    console.log('📤 API Request:', {
      method,
      url,
      payload
    })
    
    try {
      console.log('⏳ Sending request to API...')
      const startTime = performance.now()
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      
      const endTime = performance.now()
      console.log(`⏱️  Request completed in ${(endTime - startTime).toFixed(2)}ms`)
      
      const responseData = await res.json().catch(() => ({}))
      
      console.log('📥 API Response:', {
        status: res.status,
        statusText: res.statusText,
        data: responseData
      })
      
      if (!res.ok) {
        console.error('❌ API Error:', responseData)
        throw new Error(responseData.message || 'Failed to save car')
      }

      console.log('✅ Car saved successfully!')
      console.groupEnd()
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form if it's a new car (not editing)
      if (!existing?._id) {
        setFormData(getDefaultFormData());
      }
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        await onSuccess();
      } else {
        // Fallback to default behavior if no callback is provided
        router.refresh();
      }
      
      // Hide success message after 2 seconds and redirect
      setTimeout(() => {
        setShowSuccess(false);
        router.push("/admin");
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error saving car:', error)
      console.groupEnd()
      alert(`Failed to save car: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);
    
    try {
      const uploadedImages: ImageData[] = [];
      
      // Process each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image`);
        }
        
        // Upload to Cloudinary
        const result = await uploadImage(file);
        
        // The upload was successful, add the image to our list
        uploadedImages.push({
          url: result.url,
          isPrimary: formData.images.length === 0 && i === 0 // Set first image as primary
        });
      }
      
      // Update form state with new images
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
      
    } catch (err) {
      console.error('Error uploading images:', err);
      setUploadError(err instanceof Error ? err.message : 'Failed to upload images');
    } finally {
      setIsUploading(false);
      // Reset the file input to allow selecting the same file again
      if (e.target) {
        (e.target as HTMLInputElement).value = '';
      }
    }
  }

  const setPrimaryImage = (index: number) => {
    setFormData((prev: CarFormData) => ({
      ...prev,
      images: prev.images.map((img: ImageData, i: number) => ({
        ...img,
        isPrimary: i === index
      }))
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev: CarFormData) => ({
      ...prev,
      images: prev.images.filter((_: ImageData, i: number) => i !== index)
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files?.length) {
      handleFileInputChange({ 
        target: { files: e.dataTransfer.files } 
      } as unknown as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CarFormData) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleSelectChange = (name: keyof CarFormData, value: string) => {
    setFormData((prev: CarFormData) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {/* Success Message Overlay */}
      {showSuccess && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Car {existing?._id ? 'Updated' : 'Added'} Successfully!</span>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Car Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={5}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "available" | "sold" | "pending") =>
                setFormData(prev => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "new" | "old") =>
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="old">Used</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="availability">Availability</Label>
            <Select
              value={formData.availability}
              onValueChange={(value: "in-stock" | "sold" | "reserved") =>
                setFormData(prev => ({ ...prev, availability: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="reserved">Reserved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="space-y-2">
            <Label>Car Images</Label>
            <div 
              className={`relative flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                isDragging ? 'border-blue-500 bg-blue-900/20' : 'border-white/20 hover:border-blue-500/50'
              } bg-slate-900/30 p-6 text-center transition-colors`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                onChange={handleFileInputChange}
                disabled={isUploading}
              />
              <div className="pointer-events-none">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="mt-2 text-sm text-slate-400">
                  Click to upload or drag and drop
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Uploaded Images</h4>
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={img.url} 
                        alt={`Preview ${index + 1}`} 
                        className={`h-24 w-full object-cover rounded-md ${img.isPrimary ? 'ring-2 ring-blue-500' : ''}`}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(index)}
                          className="p-1 rounded-full bg-white text-gray-800 hover:bg-gray-200"
                          title="Set as primary"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="p-1 rounded-full bg-white text-red-600 hover:bg-red-100"
                          title="Remove image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      {img.isPrimary && (
                        <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                          Primary
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isLoading || isUploading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center min-w-[100px] justify-center"
          disabled={isLoading || isUploading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : isUploading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </>
          ) : (
            'Save Car'
          )}
        </button>
      </div>
    </form>
  )
}
