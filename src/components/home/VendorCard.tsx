import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { Vendor } from '@/src/types';

interface VendorCardProps {
  vendor: Vendor;
  onPress: () => void;
}

const formatReviewCount = (count: number): string => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden border border-gray-200"
    >
      <View className="relative">
        <Image
          source={{ uri: vendor.brand_image || vendor.logo }}
          className="w-full h-48"
          resizeMode="cover"
        />

        {/* Status Badge */}
        <View
          className={`absolute top-4 left-4 px-3 py-1 rounded-full shadow ${vendor.isOpen ? 'bg-green-500' : 'bg-red-500'}`}
        >
          <Text className="text-white text-xs font-semibold">
            {vendor.isOpen ? "Open Now" : "Closed"}
          </Text>
        </View>

        {/* Distance Badge */}
        <View className="absolute bottom-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded-full shadow">
          <Text className="text-white text-xs font-medium">
            {vendor.distance?.toFixed(1)} km away
          </Text>
        </View>
      </View>

      <View className="p-4">
        {/* Vendor Info */}
        <View className="flex-row items-center mb-2">
          <Image
            source={{ uri: vendor.logo }}
            className="w-12 h-12 rounded-full border-2 border-gray-200"
          />
          <View className="ml-3 flex-1">
            <Text className="text-lg font-bold text-gray-800" numberOfLines={1}>
              {vendor.name}
            </Text>
            <Text className="text-sm text-gray-500" numberOfLines={1}>
              {vendor.vendor_brand}
            </Text>
          </View>
        </View>

        {/* Ratings and Delivery Info */}
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <View className="bg-yellow-100 px-2 py-1 rounded-lg flex-row items-center">
              <Ionicons name="star" size={14} color="#FBC02D" />
              <Text className="ml-1 font-semibold text-gray-800">
                {vendor.rating.toFixed(1)}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 ml-2">
              ({formatReviewCount(vendor.reviewCount)} reviews)
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">
              {vendor.delivery_time}
            </Text>
          </View>
        </View>

        {/* Delivery Fee and Minimum Order */}
        {vendor.delivery_fee !== undefined && (
          <View className="border-t border-gray-200 pt-2 mt-2">
            <Text className="text-sm text-gray-600">
              Delivery: {formatPrice(vendor.delivery_fee)}
              {vendor.minimum_order && (
                <Text className="text-sm text-gray-600">
                  {" • Min. order: " + formatPrice(vendor.minimum_order)}
                </Text>
              )}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default VendorCard;