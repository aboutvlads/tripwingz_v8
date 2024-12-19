// Utility functions for deals
export const generateDiscount = (basePrice: number): {
  discount: number,
  originalPrice: number
} => {
  // Fixed discount range to avoid hydration issues
  const discount = 45;
  const originalPrice = Math.floor(basePrice * (100 / (100 - discount)));
  
  return {
    discount,
    originalPrice
  };
};

export const getBasePrice = (city: string): number => {
  const prices: Record<string, number> = {
    'Paris': 214,
    'Amsterdam': 189,
    'Rome': 245,
    'Barcelona': 199,
    'London': 179
  };
  
  return prices[city] || 199;
};

export const isHotDeal = (city: string): boolean => {
  const hotDeals = ['Paris', 'Barcelona'];
  return hotDeals.includes(city);
};

// Generate deterministic likes based on deal ID
export const generateLikes = (id: string): number => {
  // Use a simple hash function to generate a consistent number
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash) + id.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Generate a number between 0 and 50
  return Math.abs(hash % 51);
};