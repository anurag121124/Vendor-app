export const calculateDistance = (
    location1: { lat: number; lon: number },
    location2: { lat: number; lon: number }
  ): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (location2.lat - location1.lat) * (Math.PI / 180);
    const dLon = (location2.lon - location1.lon) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(location1.lat * (Math.PI / 180)) *
        Math.cos(location2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  export const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };
  
  export const formatReviewCount = (count: number): string => {
    return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
  };
  
  