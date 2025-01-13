import { View, Text, FlatList } from "react-native";
import VendorCard from "@/src/components/home/VendorCard";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const vendors = [
    {
      id: 1,
      name: "Vendor 1",
      brand: "Brand 1",
      logo: "https://via.placeholder.com/40",
      image: "https://via.placeholder.com/300",
      rating: 4.5,
    },
    // Add more vendors
  ];

  return (
    <View className="flex-1 px-6">
      <Text className="text-2xl font-bold mb-4">Home</Text>
      <FlatList
        data={vendors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VendorCard
            {...item}
            onPress={() => navigation.navigate("VendorDetails", { vendorId: item.id })}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
