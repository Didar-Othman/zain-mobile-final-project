import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
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
  );
}
