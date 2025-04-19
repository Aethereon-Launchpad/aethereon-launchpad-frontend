/**
 * Ensures a GitHub Gist URL is in the raw format
 * @param url The URL to convert
 * @returns The raw URL
 */
export function ensureRawGistURL(url: string): string {
  // If it's already a raw URL, return it
  if (url.includes('raw.githubusercontent.com') || url.includes('gist.githubusercontent.com')) {
    return url;
  }

  // If it's a regular gist URL, convert it to raw
  if (url.includes('github.com/gist/') || url.includes('gist.github.com/')) {
    // Extract the gist ID and username
    const parts = url.split('/');
    const gistId = parts[parts.length - 1];
    const username = parts[parts.length - 2];
    
    // Construct the raw URL
    return `https://gist.githubusercontent.com/${username}/${gistId}/raw`;
  }

  // If it's not a recognized format, return as is
  return url;
}
