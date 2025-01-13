//appnavigator.tsx

import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../app/Screen/LoginScreen";
import HomeScreen from "../../app/Screen/HomeScreen";
import VendorDetailsScreen from "../../app/Screen/VendorDetailsScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  VendorDetails: { vendorId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="VendorDetails" component={VendorDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
