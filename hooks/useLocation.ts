// src/hooks/useLocation.ts
import { useState, useEffect } from "react";
import * as Location from "expo-location";

export const useLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: coords.latitude,
          lon: coords.longitude,
        });
      } catch (err) {
        setError("Failed to get location");
      }
    };

    getLocation();
  }, []);

  return { location, error };
};
