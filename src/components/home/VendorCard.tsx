import { View, Text, Image, TouchableOpacity } from "react-native";
import { FC } from "react";

interface VendorProps {
  name: string;
  brand: string;
  logo: string;
  image: string;
  rating: number;
  onPress: () => void; // Callback for when the card is pressed
}

const VendorCard: FC<VendorProps> = ({ name, brand, logo, image, rating, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-4 rounded-lg bg-white shadow-md"
    >
      {/* Vendor Banner Image */}
      <Image
        source={{ uri: image }}
        className="w-full h-36 rounded-t-lg"
      />

      {/* Vendor Details */}
      <View className="p-4">
        {/* Vendor Logo and Name */}
        <View className="flex-row items-center mb-2">
          <Image
            source={{ uri: logo }}
            className="w-10 h-10 rounded-full mr-4"
          />
          <View>
            <Text className="text-lg font-bold text-gray-800">{name}</Text>
            <Text className="text-sm text-gray-500">{brand}</Text>
          </View>
        </View>

        {/* Vendor Rating */}
        <View className="flex-row items-center">
          <Text className="text-yellow-500 font-bold mr-2">⭐ {rating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VendorCard;
