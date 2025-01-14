import React, { useContext, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  SignUp: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const auth = useContext(AuthContext);

  const validateInput = () => {
    if (!username.trim()) {
      setError("Please enter your username or email");
      return false;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;

    try {
      setIsLoading(true);
      setError("");
      await auth?.login(username, password);
      if (auth?.isLoggedIn) {
        navigation.replace("Home");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-4" // Adjusted side padding for larger screens
        keyboardVerticalOffset={100} // Adjust as necessary
      >
        <View className="flex-1">
          <View className="items-center mb-10">
            <View className="w-32 h-32 bg-blue-600 rounded-full items-center justify-center mb-6"> {/* Increased logo size */}
              <Text className="text-white text-6xl font-bold">A</Text> {/* Increased font size */}
            </View>
            <Text className="text-5xl font-bold text-gray-900">Welcome Back!</Text> {/* Increased font size */}
            <Text className="text-gray-500 text-center mt-2 mb-8 text-lg">
              Sign in to continue to your account
            </Text>
          </View>

          {error ? (
            <View className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <Text className="text-red-600 text-base font-medium text-center">{error}</Text>
            </View>
          ) : null}

          <View className="mb-5">
            <Text className="text-base font-medium text-gray-700 mb-2">Username or Email</Text>
            <TextInput
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
              style={{
                padding: 14,
                borderWidth: 1,
                borderColor: '#D1D5DB',
                borderRadius: 10,
                backgroundColor: '#F9FAFB',
                fontSize: 18, // Increased font size for better readability
                width: '100%', // Set width to full
              }}
              placeholder="Enter your username or email"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View className="mb-5">
            <Text className="text-base font-medium text-gray-700 mb-2">Password</Text>
            <View style={{ position: 'relative' }}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={{
                  padding: 14,
                  borderWidth: 1,
                  borderColor: '#D1D5DB',
                  borderRadius: 10,
                  backgroundColor: '#F9FAFB',
                  fontSize: 18, // Increased font size for better readability
                  width: '100%', // Set width to full
                }}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: 12 }}
              >
                <Text className="text-gray-500">{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            onPress={() => navigation.navigate("ForgotPassword")}
            className="items-end mb-6"
          >
            <Text className="text-blue-600 text-base font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? "#A5B4FC" : "#3B82F6",
              paddingVertical: 16,
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-white text-xl font-semibold">Log In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-8">
            <Text className="text-gray-600 text-base">Don't have an account?</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate("SignUp")}
              className="ml-2"
            >
              <Text className="text-blue-600 text-base font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
