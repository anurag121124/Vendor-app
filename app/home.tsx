import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import vendorData from "../src/data/vendors.json";
import VendorCard from "@/src/components/home/VendorCard";
// Core data interfaces
import { Vendor, Category, SortConfig, FilterState } from "@/src/types";
import { calculateDistance } from "@/src/utils/helpers";
// Layout constants
const { width } = Dimensions.get("window");
const CATEGORY_HEIGHT = 48;
const CATEGORY_MIN_WIDTH = width * 0.25;
const HEADER_PADDING_TOP = 48;
const HEADER_PADDING_BOTTOM = 16;
const ITEMS_PER_PAGE = 10;

// Utility functions

const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

const formatReviewCount = (count: number): string => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

const Homepage: React.FC = () => {
  // State management
  const [searchText, setSearchText] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filters, setFilters] = useState<FilterState>({
    rating: "all",
    distance: "all",
    price: "all",
    isOpen: false,
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "rating",
    direction: "desc",
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSort, setShowSort] = useState<boolean>(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // User's current location (would typically come from a location service)
  const userLocation = useMemo(
    () => ({
      lat: 37.7749,
      lon: -122.4194,
    }),
    []
  );

  // Transform and enhance vendor data
  const vendors: Vendor[] = useMemo(() => {
    return vendorData.data.get_nearby_vendors.map((vendor: any) => ({
      id: vendor.id,
      name: vendor.name,
      vendor_brand: vendor.vendor_brand,
      logo: vendor.brand_logo,
      brand_image: vendor.brand_image,
      rating: vendor.rating,
      category: vendor.category || "Unknown",
      location: {
        lat: vendor.location.coordinates[1],
        lon: vendor.location.coordinates[0],
      },
      products: vendor.vendor_products.map((product: any) => product.id),
      isOpen: vendor.is_open !== undefined ? vendor.is_open : false,
      reviewCount: vendor.review_count || 0,
      distance: calculateDistance(userLocation, {
        lat: vendor.location.coordinates[1],
        lon: vendor.location.coordinates[0],
      }),
      description: vendor.description,
      delivery_time: vendor.delivery_time,
      minimum_order: vendor.minimum_order,
      delivery_fee: vendor.delivery_fee,
    }));
  }, [userLocation]);

  // Available categories
  const categories: Category[] = [
    { id: "All", icon: "grid-outline" },
    { id: "Food", icon: "restaurant-outline" },
    { id: "Grocery", icon: "cart-outline" },
    { id: "Pharmacy", icon: "medical-outline" },
    { id: "Electronics", icon: "hardware-chip-outline" },
  ];

  // Filter and sort vendors
  const filteredVendors = useMemo(() => {
    let filtered = vendors;

    // Search filter
    if (searchText.trim()) {
      filtered = filtered.filter((vendor) =>
        vendor.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Category filter
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (vendor) => vendor.category === activeCategory
      );
    }

    // Rating filter
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter((vendor) => vendor.rating >= minRating);
    }

    // Distance filter
    if (filters.distance !== "all") {
      const maxDistance = parseFloat(filters.distance);
      filtered = filtered.filter((vendor) => vendor.distance! <= maxDistance);
    }

    // Open/Closed filter
    if (filters.isOpen) {
      filtered = filtered.filter((vendor) => vendor.isOpen);
    }

    // Sort vendors
    filtered.sort((a, b) => {
      const multiplier = sortConfig.direction === "asc" ? 1 : -1;
      return ((a[sortConfig.key] ?? 0) - (b[sortConfig.key] ?? 0)) * multiplier;
    });

    return filtered;
  }, [vendors, searchText, activeCategory, filters, sortConfig]);

  // Get paginated vendors
  const paginatedVendors = useCallback((): Vendor[] => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVendors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredVendors, currentPage]);

  // Log the filtered vendors to verify data
  // Log the filtered vendors to verify data
  useEffect(() => {
    console.log("Filtered Vendors:", filteredVendors);
  }, [filteredVendors]);

  // Log the paginated vendors to verify data
  useEffect(() => {
    console.log("Paginated Vendors:", paginatedVendors());
  }, [paginatedVendors]);

  // Event handlers
  const handleLoadMore = () => {
    if (paginatedVendors().length < filteredVendors.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSort = (key: SortConfig["key"]) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
    setShowSort(false);
  };

  const handleFilter = (key: keyof FilterState, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      rating: "all",
      distance: "all",
      price: "all",
      isOpen: false,
    });
    setShowFilters(false);
  };

  // Render functions
  return (
    <View style={{ flex: 1, backgroundColor: "#F3F4F6" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* Header Section */}
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          paddingTop: HEADER_PADDING_TOP,
          paddingBottom: HEADER_PADDING_BOTTOM,
        }}
      >
        {/* Title and Notifications */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", color: "#1F2937" }}
              >
                Discover
              </Text>
              <Text style={{ fontSize: 14, color: "#6B7280", marginTop: 4 }}>
                Find amazing vendors near you
              </Text>
            </View>
            <TouchableOpacity style={{ position: "relative" }}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#374151"
              />
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  width: 12,
                  height: 12,
                  backgroundColor: "red",
                  borderRadius: 6,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={{ marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F3F4F6",
              borderRadius: 24,
              paddingHorizontal: 16,
            }}
          >
            <Ionicons name="search-outline" size={20} color="#6B7280" />
            <TextInput
              style={{
                flex: 1,
                color: "#1F2937",
                fontSize: 16,
                paddingVertical: 12,
              }}
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

        <View className="flex-row items-center justify-between p-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
          key={category.id}
          onPress={() => {
            setActiveCategory(category.id);
            setCurrentPage(1);
          }}
          style={{
            backgroundColor:
              activeCategory === category.id ? "#3B82F6" : "#FFFFFF",
            borderColor:
              activeCategory === category.id ? "#3B82F6" : "#D1D5DB",
            height: CATEGORY_HEIGHT,
            minWidth: CATEGORY_MIN_WIDTH,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 24,
            marginRight: 8,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
          }}
              >
          <Ionicons
            name={category.icon}
            size={18}
            color={activeCategory === category.id ? "#FFFFFF" : "#6B7280"}
          />
          <Text
            style={{
              fontWeight: "500",
              marginLeft: 8,
              color: activeCategory === category.id ? "#FFFFFF" : "#6B7280",
            }}
          >
            {category.id}
          </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter and Sort Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
            marginHorizontal: 8,
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F6",
              paddingVertical: 12,
              borderRadius: 24,
            }}
          >
            <Ionicons name="filter-outline" size={20} color="#374151" />
            <Text
              style={{ marginLeft: 8, fontWeight: "500", color: "#374151" }}
            >
              Filters
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowSort(true)}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F3F4F6",
              paddingVertical: 12,
              borderRadius: 24,
            }}
          >
            <Ionicons name="swap-vertical-outline" size={20} color="#374151" />
            <Text
              style={{ marginLeft: 8, fontWeight: "500", color: "#374151" }}
            >
              Sort
            </Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <FlatList
            data={vendors}
            renderItem={({ item }) => (
              <VendorCard
                vendor={item}
                onPress={() => setSelectedVendor(item)}
              />
            )}
            keyExtractor={(item, index) =>
              item?.id?.toString() || index.toString()
            }
            numColumns={2} // Grid layout with 2 columns
            columnWrapperStyle={{
              justifyContent: "space-between",
              paddingHorizontal: 8,
            }}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center py-8">
                <Ionicons name="search" size={48} color="#9CA3AF" />
                <Text className="text-gray-500 mt-4 text-center">
                  No vendors found.{"\n"}Try adjusting your filters.
                </Text>
              </View>
            }
            contentContainerStyle={{
              paddingVertical: 16,
              flexGrow: 1, // Ensures the FlatList expands fully within the ScrollView
            }}
            nestedScrollEnabled={true} // Enables nested scrolling
          />
        </ScrollView>
      </View>
      ;{/* Filter Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 mt-auto bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-gray-900">Filters</Text>
                <TouchableOpacity onPress={() => setShowFilters(false)}>
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>

            <ScrollView className="p-4">
              {/* Rating Filter */}
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                  Minimum Rating
                </Text>
                <View className="flex-row space-x-3">
                  {["all", "3", "4", "4.5"].map((rating) => (
                    <TouchableOpacity
                      key={rating}
                      onPress={() => handleFilter("rating", rating)}
                      className={`px-4 py-2 rounded-full border ${
                        filters.rating === rating
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <Text
                        className={`${
                          filters.rating === rating
                            ? "text-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        {rating === "all" ? "Any" : `${rating}+`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Distance Filter */}
              <View className="mb-6">
                <Text className="text-base font-semibold text-gray-900 mb-3">
                  Maximum Distance
                </Text>
                <View className="flex-row flex-wrap gap-3">
                  {["all", "2", "5", "10"].map((distance) => (
                    <TouchableOpacity
                      key={distance}
                      onPress={() => handleFilter("distance", distance)}
                      className={`px-4 py-2 rounded-full border ${
                        filters.distance === distance
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300"
                      }`}
                    >
                      <Text
                        className={`${
                          filters.distance === distance
                            ? "text-blue-500"
                            : "text-gray-700"
                        }`}
                      >
                        {distance === "all" ? "Any" : `${distance} km`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Open Now Filter */}
              <View className="mb-6">
                <TouchableOpacity
                  onPress={() => handleFilter("isOpen", !filters.isOpen)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-6 h-6 rounded-md border ${
                      filters.isOpen
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300"
                    } mr-3`}
                  >
                    {filters.isOpen && (
                      <Ionicons name="checkmark" size={20} color="#fff" />
                    )}
                  </View>
                  <Text className="text-base text-gray-900">Open Now</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View className="p-4 border-t border-gray-200">
              <View className="flex-row space-x-4">
                <TouchableOpacity
                  onPress={resetFilters}
                  className="flex-1 py-3 rounded-xl border border-gray-300"
                >
                  <Text className="text-center font-medium text-gray-700">
                    Reset
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowFilters(false)}
                  className="flex-1 py-3 rounded-xl bg-blue-500"
                >
                  <Text className="text-center font-medium text-white">
                    Apply Filters
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Sort Modal */}
      <Modal
        visible={showSort}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowSort(false)}
      >
        <View className="flex-1 bg-black/50">
          <View className="flex-1 mt-auto bg-white rounded-t-3xl">
            <View className="p-4 border-b border-gray-200">
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-gray-900">Sort By</Text>
                <TouchableOpacity onPress={() => setShowSort(false)}>
                  <Ionicons name="close" size={24} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="p-4">
              {[
                { key: "rating" as const, label: "Rating" },
                { key: "distance" as const, label: "Distance" },
                { key: "delivery_fee" as const, label: "Delivery Fee" },
              ].map((option) => (
                <TouchableOpacity
                  key={option.key}
                  onPress={() => handleSort(option.key)}
                  className="flex-row items-center justify-between py-4 border-b border-gray-200"
                >
                  <Text className="text-base text-gray-900">
                    {option.label}
                  </Text>
                  {sortConfig.key === option.key && (
                    <Ionicons
                      name={
                        sortConfig.direction === "asc"
                          ? "arrow-up"
                          : "arrow-down"
                      }
                      size={20}
                      color="#3B82F6"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
      {/* Vendor Detail Modal */}
      <Modal
        visible={!!selectedVendor}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedVendor(null)}
      >
        {selectedVendor && (
          <View className="flex-1 bg-white">
            <View className="relative h-64">
              <Image
                source={{
                  uri: selectedVendor.brand_image || selectedVendor.logo,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => setSelectedVendor(null)}
                className="absolute top-12 left-4 w-10 h-10 rounded-full bg-white/90 items-center justify-center"
              >
                <Ionicons name="arrow-back" size={24} color="#374151" />
              </TouchableOpacity>
            </View>

            <View className="flex-1 px-4 pt-4">
              <View className="flex-row items-center mb-4">
                <Image
                  source={{ uri: selectedVendor.logo }}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                />
                <View className="ml-4">
                  <Text className="text-2xl font-bold text-gray-900">
                    {selectedVendor.name}
                  </Text>
                  <Text className="text-base text-gray-500">
                    {selectedVendor.vendor_brand}
                  </Text>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center mb-6">
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={20} color="#FBC02D" />
                    <Text className="ml-2 text-lg font-semibold">
                      {selectedVendor.rating.toFixed(1)}
                    </Text>
                    <Text className="ml-2 text-gray-500">
                      ({formatReviewCount(selectedVendor.reviewCount)} reviews)
                    </Text>
                  </View>
                  <View
                    className={`px-3 py-1 rounded-full ${
                      selectedVendor.isOpen ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <Text className="text-white font-medium">
                      {selectedVendor.isOpen ? "Open Now" : "Closed"}
                    </Text>
                  </View>
                </View>

                {selectedVendor.description && (
                  <View className="mb-6">
                    <Text className="text-base text-gray-600 leading-relaxed">
                      {selectedVendor.description}
                    </Text>
                  </View>
                )}

                <View className="flex-row justify-between mb-6">
                  <View className="items-center">
                    <Text className="text-gray-500 mb-1">Delivery Time</Text>
                    <Text className="text-lg font-semibold">
                      {selectedVendor.delivery_time}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-gray-500 mb-1">Delivery Fee</Text>
                    <Text className="text-lg font-semibold">
                      {formatPrice(selectedVendor.delivery_fee || 0)}
                    </Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-gray-500 mb-1">Min. Order</Text>
                    <Text className="text-lg font-semibold">
                      {formatPrice(selectedVendor.minimum_order || 0)}
                    </Text>
                  </View>
                </View>
              </ScrollView>

              <TouchableOpacity className="bg-blue-500 py-4 rounded-xl mb-8">
                <Text className="text-center text-white font-bold text-lg">
                  Start Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default Homepage;
