import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        href="/(auth)/login"
        style={{ padding: 10, backgroundColor: "blue" }}
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
    </View>
  );
}
