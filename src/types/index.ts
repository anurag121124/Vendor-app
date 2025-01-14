import { Ionicons } from '@expo/vector-icons';

export interface Vendor {
    id: string;
    name: string;
    vendor_brand: string;
    logo: string;
    brand_image?: string;
    rating: number;
    category: string;
    location: { lat: number; lon: number };
    products: string[];
    isOpen: boolean;
    distance?: number;
    reviewCount: number;
    description?: string;
    delivery_time?: string;
    minimum_order?: number;
    delivery_fee?: number;
  }
  
  export interface Category {
    id: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
  
  export interface FilterState {
    rating: string;
    distance: string;
    price: string;
    isOpen: boolean;
  }
  
  export interface SortConfig {
    key: "rating" | "distance" | "delivery_fee";
    direction: "asc" | "desc";
  }
  
  