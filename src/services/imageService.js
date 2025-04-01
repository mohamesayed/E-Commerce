// Default placeholder image URL
const DEFAULT_PLACEHOLDER = 'https://via.placeholder.com/400x400?text=No+Image';

// Image service class
class ImageService {
  constructor() {
    this.imageCache = new Map();
  }

  // Get image URL with fallback
  getImageUrl(imageUrl, width = 400, height = 400) {
    if (!imageUrl) return DEFAULT_PLACEHOLDER;

    // Check if image is already in cache
    if (this.imageCache.has(imageUrl)) {
      return this.imageCache.get(imageUrl);
    }

    // Try to load the image
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.set(imageUrl, imageUrl);
        resolve(imageUrl);
      };
      img.onerror = () => {
        this.imageCache.set(imageUrl, DEFAULT_PLACEHOLDER);
        resolve(DEFAULT_PLACEHOLDER);
      };
      img.src = imageUrl;
    });
  }

  // Get responsive image URL
  getResponsiveImageUrl(imageUrl, sizes = { sm: 400, md: 600, lg: 800 }) {
    if (!imageUrl) return DEFAULT_PLACEHOLDER;

    // For now, return the original URL
    // In a real implementation, you would use an image CDN or service
    // that provides responsive images
    return imageUrl;
  }

  // Clear image cache
  clearCache() {
    this.imageCache.clear();
  }
}

// Export singleton instance
export const imageService = new ImageService(); 