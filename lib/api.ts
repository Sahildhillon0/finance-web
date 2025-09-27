import { getApiBaseUrl } from "./config"

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
  cache?: RequestCache
}

export async function apiFetch<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const baseUrl = getApiBaseUrl()
  const url = `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers,
    cache: options.cache,
  }

  if (options.body) {
    config.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.message || 'An error occurred')
    }

    // For DELETE requests that might not return content
    if (response.status === 204) {
      return null as unknown as T
    }

    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Helper methods for common HTTP methods
export const api = {
  get: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'GET' }),
    
  post: <T = any>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'POST', body }),
    
  put: <T = any>(endpoint: string, body?: any, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'PUT', body }),
    
  del: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiFetch<T>(endpoint, { ...options, method: 'DELETE' }),
}
