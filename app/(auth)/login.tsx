import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AuthContext } from "../../src/context/AuthContext";
import { useRouter } from "expo-router";

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (auth?.isLoggedIn) {
      router.replace("/home");
    }
  }, [auth?.isLoggedIn]);

  const validateInput = (): boolean => {
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      setError("Please enter your username or email.");
      return false;
    }

    if (username.includes("@") && !emailRegex.test(username)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      setError("Please enter your password.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateInput()) return;

    try {
      setIsLoading(true);
      setError("");

      if (!auth?.login) {
        throw new Error("Authentication service is unavailable.");
      }

      console.log("Attempting login...");
      await auth.login(username, password);
      console.log("Login successful");
    } catch (err: any) {
      const errorMessage = err.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
      console.error("Login failed:", err);
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/");
  };

  const handleSignUp = () => {
    router.push("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-white mt-28">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center px-4"
        keyboardVerticalOffset={100}
      >
        <View className="flex-1">
          <View className="items-center mb-10">
            <View className="w-32 h-32 bg-blue-600 rounded-full items-center justify-center mb-6">
              <Text className="text-white text-6xl font-bold">A</Text>
            </View>
            <Text className="text-5xl font-bold text-gray-900">Welcome Back!</Text>
            <Text className="text-gray-500 text-center mt-2 mb-8 text-lg">
              Sign in to continue to your account
            </Text>
          </View>

          {error ? (
            <View className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <Text className="text-red-600 text-base font-medium text-center">
                {error}
              </Text>
            </View>
          ) : null}

          <View className="mb-5">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Username or Email
            </Text>
            <TextInput
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError("");
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              className="p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg"
              placeholder="Enter your username or email"
              placeholderTextColor="#9CA3AF"
              editable={!isLoading}
            />
          </View>

          <View className="mb-5">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry={!showPassword}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50 text-lg"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                editable={!isLoading}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3"
              >
                <Text className="text-gray-500">{showPassword ? "Hide" : "Show"}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleForgotPassword}
            className="items-end mb-6"
            disabled={isLoading}
          >
            <Text className="text-blue-600 text-base font-medium">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`py-4 rounded-lg items-center ${
              isLoading ? "bg-blue-300" : "bg-blue-600"
            }`}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text className="text-white text-xl font-semibold">Log In</Text>
            )}
          </TouchableOpacity>

          <View className="flex-row justify-center items-center mt-8">
            <Text className="text-gray-600 text-base">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
              <Text className="text-blue-600 text-base font-semibold ml-2">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
