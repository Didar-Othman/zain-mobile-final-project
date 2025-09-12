import { Link, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, Pressable, Text, View } from "react-native";
import { useStore } from "../store/auth";

export default function Index() {
  const { profile }: any = useStore();

  const LogOutHandler = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("token");
          router.replace("/login");
        },
      },
    ]);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {profile?.id ? (
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Welcome {profile?.email}
          </Text>
          <Pressable
            style={{
              backgroundColor: "black",
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={LogOutHandler}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
              }}
            >
              Log Out
            </Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Link
            href="/(auth)/login"
            style={{
              padding: 10,
              backgroundColor: "black",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
              }}
            >
              Go to Login
            </Text>
          </Link>
          <Link
            href="/(auth)/register"
            style={{
              padding: 10,
              backgroundColor: "black",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Go to Register</Text>
          </Link>
        </View>
      )}
    </View>
  );
}
