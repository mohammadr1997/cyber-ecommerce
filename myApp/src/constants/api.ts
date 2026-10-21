export const API_URL = "https://cyber-ecommerce-backend.vercel.app";

export const getProductImageUrl = (imageId: string) => {
  if (!imageId) return "";

  // Old local image path
  if (imageId.startsWith("/uploads/")) {
    return `${API_URL}${imageId}`;
  }

  // GridFS image
  return `${API_URL}/api/products/images/${imageId}`;
};

export const getBannerImageUrl = (imageUrl: string) => {
  if (!imageUrl) return "";

  // Full URL
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  // GridFS API path already includes /api
  if (imageUrl.startsWith("/api/")) {
    return `${API_URL}${imageUrl}`;
  }

  // Legacy local image path
  if (imageUrl.startsWith("/uploads/")) {
    return `${API_URL}${imageUrl}`;
  }

  // If only a GridFS image ID is stored
  return `${API_URL}/api/products/images/${imageUrl}`;
};
