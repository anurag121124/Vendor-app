import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  ListRenderItem,
} from "react-native";
import VendorCard from "@/src/components/home/VendorCard";
import vendorData from "../src/data/vendors.json";
import { Ionicons } from "@expo/vector-icons";

// Define proper interfaces for our data structures
interface Vendor {
  id: string;
  name: string;
  vendor_brand: string;
  brand_logo: string;
  brand_image: string;
  rating: number;
  category: string;
}

interface Category {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
}

// Get device width for responsive calculations
const { width } = Dimensions.get("window");

// Constants for consistent sizing
const CATEGORY_HEIGHT = 46;
const CATEGORY_MIN_WIDTH = width * 0.25;
const HEADER_PADDING_TOP = 48;
const HEADER_PADDING_BOTTOM = 16;

const Homepage: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const vendors: Vendor[] = vendorData.data.get_nearby_vendors;

  const categories: Category[] = [
    { id: "All", icon: "grid-outline" },
    { id: "Food", icon: "restaurant-outline" },
    { id: "Grocery", icon: "cart-outline" },
    { id: "Pharmacy", icon: "medical-outline" },
    { id: "Electronics", icon: "hardware-chip-outline" },
  ];

  const filterVendors = useCallback((): Vendor[] => {
    let filtered = vendors;

    if (searchText.trim()) {
      filtered = filtered.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (vendor) => vendor.category === activeCategory
      );
    }

    return filtered;
  }, [searchText, activeCategory, vendors]);

  const renderVendorCard: ListRenderItem<Vendor> = useCallback(
    ({ item }) => (
      <VendorCard
        name={item.name}
        brand={item.vendor_brand}
        logo={item.brand_logo}
        image={item.brand_image}
        rating={item.rating}
        reviewCount={Math.floor(Math.random() * 2000)}
        distance={`${(Math.random() * 5).toFixed(1)}km`}
        isOpen={Math.random() > 0.3}
      />
    ),
    []
  );

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header Container with Fixed Heights */}
      <View
        className="bg-white px-4 shadow-md"
        style={{
          paddingTop: HEADER_PADDING_TOP,
          paddingBottom: HEADER_PADDING_BOTTOM,
        }}
      >
        {/* Header Content */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Discover</Text>
              <Text className="text-sm text-gray-500 mt-1">
                Find amazing vendors near you
              </Text>
            </View>
            <TouchableOpacity className="relative">
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#374151"
              />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar with Fixed Height */}
        <View className="mb-6">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4">
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 text-gray-800 text-base"
              style={{ height: CATEGORY_HEIGHT }}
              placeholder="Search vendors..."
              placeholderTextColor="#9CA3AF"
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText("")}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories with Fixed Height */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }} // Added padding for spacing
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setActiveCategory(category.id)}
              style={{
                height: CATEGORY_HEIGHT,
                minWidth: CATEGORY_MIN_WIDTH,
                paddingHorizontal: 12, // Added padding for better touch targets
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 12, // Rounded corners for better appearance
                marginRight: 10, // Space between categories
                backgroundColor:
                  activeCategory === category.id ? "#3B82F6" : "#FFFFFF",
                borderColor:
                  activeCategory === category.id ? "#3B82F6" : "#E5E7EB",
                borderWidth: 1,
              }}
            >
              <Ionicons
                name={category.icon}
                size={18}
                color={activeCategory === category.id ? "#fff" : "#6B7280"}
              />
              <Text
                className={`font-medium ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-600"
                }`}
              >
                {category.id}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      

      {/* Vendor List */}
      <FlatList
        data={filterVendors()}
        keyExtractor={(item) => item.id}
        renderItem={renderVendorCard}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-8">
            <Ionicons name="search" size={48} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg mt-4">No vendors found</Text>
            <Text className="text-gray-400 text-sm mt-2">
              Try adjusting your search
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Homepage;
