import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface VendorCardProps {
  name: string;
  brand: string;
  logo: string;
  image: string;
  rating: number;
  reviewCount?: number;
  distance?: string;
  isOpen?: boolean;
  onPress?: () => void;
  onFavorite?: () => void;
  onShare?: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({
  name,
  brand,
  logo,
  image,
  rating,
  reviewCount = 0,
  distance,
  isOpen = true,
  onPress,
  onFavorite,
  onShare,
}) => {
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-lg shadow-lg mb-4 overflow-hidden"
      activeOpacity={0.9}
    >
      <View className="relative">
        {/* Vendor Image */}
        <Image
          source={{ uri: image }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Favorite & Share */}
        <View className="absolute top-4 right-4 flex-row space-x-2">
          <Pressable
            onPress={onFavorite}
            className="bg-white/90 p-2 rounded-full"
          >
            <Ionicons name="heart-outline" size={18} color="#FF4785" />
          </Pressable>
          <Pressable
            onPress={onShare}
            className="bg-white/90 p-2 rounded-full"
          >
            <Ionicons name="share-social-outline" size={18} color="#374151" />
          </Pressable>
        </View>

        {/* Status Badge */}
        <View
          className={`absolute top-4 left-4 px-4 py-1 rounded-full ${
            isOpen ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <Text className="text-white text-xs font-semibold">
            {isOpen ? "Open Now" : "Closed"}
          </Text>
        </View>

        {/* Distance Badge */}
        {distance && (
          <View className="absolute bottom-4 right-4 bg-black/70 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-medium">
              {distance} away
            </Text>
          </View>
        )}
      </View>

      {/* Vendor Details */}
      <View className="p-4">
        <View className="flex-row items-center mb-3">
          {/* Vendor Logo */}
          <Image
            source={{ uri: logo }}
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
          />
          <View className="ml-4 flex-1">
            <Text className="text-lg font-bold text-gray-900">{name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{brand}</Text>
          </View>
        </View>

        {/* Ratings & Reviews */}
        <View className="flex-row items-center mt-2">
          <View className="bg-yellow-400/20 px-2 py-1 rounded-md flex-row items-center">
            <Ionicons name="star" size={14} color="#FBC02D" />
            <Text className="ml-1 font-semibold text-gray-800">
              {rating.toFixed(1)}
            </Text>
          </View>
          <Text className="text-xs text-gray-500 ml-2">
            ({formatReviewCount(reviewCount)} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorCard;
