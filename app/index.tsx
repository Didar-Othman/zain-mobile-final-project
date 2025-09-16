import { useCategories } from "@/store/categories";
import { Link, router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { useStore } from "../store/auth";

export default function Index() {
  const { profile }: any = useStore();
  const { categories }: any = useCategories();

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
        gap: 10,
        paddingHorizontal: 20,
        paddingTop: 10,
        flexDirection: "column",
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: "",
          headerLeft() {
            return (
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  Welcome
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {profile?.id ? profile?.FirstName : "Guest"}
                </Text>
              </View>
            );
          },
          headerRight() {
            return (
              <View
                style={{
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {profile?.id ? (
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
                      }}
                    >
                      Log Out
                    </Text>
                  </Pressable>
                ) : (
                  <Link
                    href="/(auth)/login"
                    style={{
                      backgroundColor: "black",
                      padding: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    Login
                  </Link>
                )}
              </View>
            );
          },
        }}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 10,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
