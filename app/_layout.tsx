import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useStore } from "../store/auth";
SplashScreen.preventAutoHideAsync(); /// prevent auto hide of splash screen
export default function RootLayout() {
  const { setIsLoggedIn, setProfile }: any = useStore();

  /// Function to check if the user is logged in
  const checkLogin = async () => {
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
    if (data?.success) {
      if (data?.data?.id) {
        setIsLoggedIn(true);
        setProfile(data?.data);
      }
    }
    SplashScreen.hideAsync();
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return <Stack />;
}
