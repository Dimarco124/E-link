/**
 * Utility to get the correct URL for files stored in Laravel's storage
 */
export const getStoragePath = (path) => {
  if (!path) return null;
  
  // If it's already a full URL, return it
  if (path.startsWith('http')) return path;
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  const baseUrl = apiUrl.replace('/api', '');
  
  // Clean up the path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  return `${baseUrl}/storage/${cleanPath}`;
};
