// This file contains configuration for the application

export function getApiBaseUrl() {
  // In the browser, use relative URL
  if (typeof window !== 'undefined') return ''
  
  // In production, use the custom domain
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.fojivehicleloan.tech'
  }
  
  // For Vercel preview deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  // Default to local development
  return 'http://localhost:3000'
}
