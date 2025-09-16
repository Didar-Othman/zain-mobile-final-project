import { useCategories } from "@/store/categories";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useStore } from "../store/auth";
SplashScreen.preventAutoHideAsync(); /// prevent auto hide of splash screen
export default function RootLayout() {
  const { setIsLoggedIn, setProfile }: any = useStore();
  const { setCategories }: any = useCategories();
  const checkauth = async () => {
    const token = await SecureStore.getItemAsync("token");
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/auth/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(JSON.stringify(data));
    if (data?.success) {
      if (data?.data?.id) {
        setIsLoggedIn(true);
        setProfile(data?.data);
      }
    }
    SplashScreen.hideAsync();
  };
  const FetchGateries = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {}
  };
  useEffect(() => {
    checkauth();
    FetchGateries();
  }, []);

  return <Stack />;
}
