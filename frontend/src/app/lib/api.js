/**
 * API Bridge for Next.js <-> Crow C++
 */

const getBaseUrl = () => {
  // Browser (Client-side) -> Use relative path (proxied by Next.js)
  if (typeof window !== 'undefined') {
    return ''; 
  }
  // Server-side (SSR/Docker) -> Use internal Docker/Localhost URL
  return process.env.BACKEND_INTERNAL_URL || 'http://localhost:18080';
};

export async function apiRequest(endpoint, options = {}) {
  const baseUrl = getBaseUrl();
  
  // Ensure endpoint format is correct (e.g. /api/login)
  const cleanEndpoint = endpoint.startsWith('/api') 
    ? endpoint 
    : `/api${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const url = `${baseUrl}${cleanEndpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers,
      cache: options.cache || 'no-store', 
    });

    if (!res.ok) {
      // Try to parse error message from backend JSON
      let errorMessage = `Backend Error (${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch (e) {}
      throw new Error(errorMessage);
    }

    if (res.status === 204) return {};

    return await res.json();
  } catch (error) {
    console.error(`[API Error] ${url}:`, error);
    throw error;
  }
}

export const api = {
  get: (url) => apiRequest(url, { method: 'GET' }),
  post: (url, body) => apiRequest(url, { method: 'POST', body: JSON.stringify(body) }),
  put: (url, body) => apiRequest(url, { method: 'PUT', body: JSON.stringify(body) }),
  del: (url) => apiRequest(url, { method: 'DELETE' }),
};