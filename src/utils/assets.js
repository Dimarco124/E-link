/**
 * Utility to get the correct asset path, accounting for the base URL
 * (especially useful for GitHub Pages subpath deployment)
 */
export const getAssetPath = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  
  // Clean up the path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  
  return `${cleanBase}${cleanPath}`;
};
