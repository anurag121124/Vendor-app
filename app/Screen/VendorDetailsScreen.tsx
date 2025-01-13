import { View, Text } from "react-native";

const VendorDetailsScreen = ({ route }: { route: any }) => {
  const { vendorId } = route.params;

  // Fetch vendor details using vendorId or use dummy data
  const vendor = {
    id: vendorId,
    name: "Vendor Name",
    brand: "Brand Name",
    logo: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300",
    rating: 4.5,
    address: "123 Vendor Street",
    products: [
      { name: "Product 1", price: "$10" },
      { name: "Product 2", price: "$20" },
    ],
  };

  return (
    <View className="flex-1 px-6">
      <Text className="text-2xl font-bold mb-4">{vendor.name}</Text>
      <Text className="text-lg text-gray-600 mb-2">{vendor.brand}</Text>
      <Text className="text-md text-gray-500">{vendor.address}</Text>
      <Text className="text-md text-gray-500 mt-4">Products:</Text>
      {vendor.products.map((product, index) => (
        <Text key={index} className="text-md text-gray-700">{`${product.name}: ${product.price}`}</Text>
      ))}
    </View>
  );
};

export default VendorDetailsScreen;
