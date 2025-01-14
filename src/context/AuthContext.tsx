import React, { createContext, useState, ReactNode } from "react";
import { API_ENDPOINTS } from "../api/endpoint";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: UserData | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface UserData {
  username: string;
  email: string;
  // Add other user fields as needed
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Login response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log("User data:", userData);

        setUser(userData);
        setIsLoggedIn(true);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Example usage outside of the AuthProvider
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
