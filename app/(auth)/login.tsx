import React, { useContext, useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  TextInput,
  Animated,
  ActivityIndicator,
  Dimensions,
  Keyboard
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
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(0);
  
  const auth = useContext(AuthContext);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await auth?.login(username, password);
      if (auth?.isLoggedIn) {
        navigation.replace("Home");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      // Add shake animation to form
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-lg text-base";
  const focusedInputStyle = "border-blue-500 bg-white shadow-sm";

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Animated.View 
          className="flex-1 justify-between p-6"
          style={{
            opacity: fadeAnim,
            transform: [{
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          }}
        >
          <View className="items-center mt-10">
            <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4">
              {/* Add your logo/icon here */}
              <Text className="text-white text-3xl font-bold">A</Text>
            </View>
            <Text className="text-3xl font-bold text-gray-900 mt-4">
              Welcome Back!
            </Text>
            <Text className="text-gray-500 text-center mt-2 mb-8">
              Sign in to continue to your account
            </Text>
          </View>
    
          <View className="w-full">
            {error ? (
              <Animated.View 
                className="mb-4 bg-red-50 border border-red-200 rounded-md p-4"
                style={{
                  transform: [{
                    translateX: slideAnim.interpolate({
                      inputRange: [0.8, 1, 1.2],
                      outputRange: [-10, 0, 10],
                    }),
                  }],
                }}
              >
                <Text className="text-red-600 text-sm font-medium">{error}</Text>
              </Animated.View>
            ) : null}
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Username or Email
              </Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                keyboardType="email-address"
                className={`${inputStyle} ${username ? focusedInputStyle : ""}`}
                placeholderTextColor="#9CA3AF"
                placeholder="Enter your username or email"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className={`${inputStyle} ${password ? focusedInputStyle : ""}`}
                  placeholderTextColor="#9CA3AF"
                  placeholder="Enter your password"
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Text className="text-gray-500">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => navigation.navigate("ForgotPassword")}
              className="items-end mb-6"
            >
              <Text className="text-blue-600 text-sm font-medium">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogin}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl items-center shadow-sm ${
                isLoading ? "bg-blue-400" : "bg-blue-600"
              }`}
              style={{
                elevation: 2,
              }}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-base font-semibold">
                  Log In
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center items-center mt-8">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-500">or continue with</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <View className="flex-row justify-center space-x-4 mt-6">
              {/* Social login buttons */}
              <TouchableOpacity className="w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center">
                <Text>G</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center">
                <Text>f</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-14 h-14 rounded-full bg-white border border-gray-200 items-center justify-center">
                <Text>a</Text>
              </TouchableOpacity>
            </View>
          </View>

          {!isKeyboardVisible && (
            <View className="flex-row justify-center items-center mt-6 mb-4">
              <Text className="text-gray-600 text-sm">
                Don't have an account?
              </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate("SignUp")}
                className="ml-1"
              >
                <Text className="text-blue-600 text-sm font-semibold">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;